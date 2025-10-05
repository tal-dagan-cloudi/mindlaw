# Data Model: Legal Document Editor

**Feature**: 001-the-app-need
**Date**: 2025-10-05
**Database**: Supabase PostgreSQL with Row Level Security (RLS)

## Entity Relationship Diagram (ERD)

```
┌─────────────┐
│   Tenant    │
└──────┬──────┘
       │
       │ 1:N
       ├─────────────────┬──────────────────┬────────────────┬─────────────────┐
       │                 │                  │                │                 │
       ▼                 ▼                  ▼                ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌──────────────┐  ┌─────────────┐  ┌──────────────┐
│    User     │   │  Document   │   │   Template   │  │   AuditLog  │  │ TenantSettings│
└──────┬──────┘   └──────┬──────┘   └──────────────┘  └─────────────┘  └──────────────┘
       │                 │
       │ 1:N             │ 1:N
       ▼                 ├──────────────────┬─────────────────┐
┌──────────────┐         ▼                  ▼                 ▼
│ UserConsent  │  ┌──────────────┐  ┌───────────────┐ ┌──────────────┐
└──────────────┘  │   Version    │  │AIConversation │ │DocumentShare │
                  └──────┬───────┘  └──────┬────────┘ └──────────────┘
                         │                 │
                         │ 1:N             │ 1:N
                         ▼                 ▼
                  ┌──────────────┐  ┌──────────────┐
                  │VersionDiff   │  │AIMessage     │
                  └──────────────┘  └──────┬───────┘
                                           │
                                           │ N:M
                                           ▼
                                    ┌───────────────┐
                                    │KnowledgeSource│
                                    └───────────────┘
```

## Core Entities

### 1. Tenant

Multi-tenant organization (law firm, legal department, sole practitioner).

**Fields**:
- `id` (UUID, PK): Unique tenant identifier
- `name` (VARCHAR(255), NOT NULL): Organization name
- `slug` (VARCHAR(100), UNIQUE, NOT NULL): URL-friendly identifier
- `plan` (ENUM): Subscription plan (free, professional, enterprise)
- `billing_email` (VARCHAR(255)): Billing contact email
- `storage_quota_gb` (INTEGER, DEFAULT 1): Storage limit in GB
- `storage_used_bytes` (BIGINT, DEFAULT 0): Current storage usage
- `ai_query_quota_monthly` (INTEGER, DEFAULT 1000): Monthly AI query limit
- `ai_queries_used_month` (INTEGER, DEFAULT 0): Queries used this month
- `data_residency` (ENUM): Data location (us, eu, asia)
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- `updated_at` (TIMESTAMP WITH TIME ZONE)
- `deleted_at` (TIMESTAMP WITH TIME ZONE, NULL): Soft delete

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE (slug)
- INDEX (plan, created_at) for billing queries

**RLS Policy**:
```sql
-- Users can only access their own tenant
CREATE POLICY tenant_isolation ON tenants
FOR ALL USING (id = auth.jwt() ->> 'tenant_id'::uuid);
```

---

### 2. User

Individual legal professional belonging to a tenant.

**Fields**:
- `id` (UUID, PK): Unique user identifier (from Supabase Auth)
- `tenant_id` (UUID, FK → Tenant.id, NOT NULL): Parent tenant
- `email` (VARCHAR(255), UNIQUE, NOT NULL): Login email
- `full_name` (VARCHAR(255)): Display name
- `role` (ENUM): User role (admin, attorney, paralegal, viewer)
- `avatar_url` (TEXT): Profile picture URL
- `preferences` (JSONB): UI preferences (theme, editor settings)
- `last_login_at` (TIMESTAMP WITH TIME ZONE)
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- `updated_at` (TIMESTAMP WITH TIME ZONE)
- `deleted_at` (TIMESTAMP WITH TIME ZONE, NULL): Soft delete

**Indexes**:
- PRIMARY KEY (id)
- INDEX (tenant_id, role) for permission checks
- INDEX (tenant_id, email) for lookups

**RLS Policy**:
```sql
-- Users can see other users in their tenant
CREATE POLICY tenant_users ON users
FOR SELECT USING (tenant_id = auth.jwt() ->> 'tenant_id'::uuid);

-- Users can update their own profile
CREATE POLICY update_own_profile ON users
FOR UPDATE USING (id = auth.uid());
```

---

### 3. Document

Legal document being drafted or edited.

**Fields**:
- `id` (UUID, PK): Unique document identifier
- `tenant_id` (UUID, FK → Tenant.id, NOT NULL): Tenant ownership
- `created_by_user_id` (UUID, FK → User.id, NOT NULL): Original author
- `template_id` (UUID, FK → Template.id, NULL): Source template if instantiated
- `title` (VARCHAR(500), NOT NULL): Document name
- `content` (JSONB, NOT NULL): Tiptap JSON content
- `content_text` (TEXT): Plain text for search (generated from content)
- `jurisdiction` (VARCHAR(100)): Legal jurisdiction (e.g., "US-CA", "US-NY", "UK")
- `practice_area` (VARCHAR(100)): Legal practice area (e.g., "contract", "litigation")
- `status` (ENUM): Document status (draft, in_review, finalized, archived)
- `version_number` (INTEGER, DEFAULT 1): Current version number
- `last_edited_by_user_id` (UUID, FK → User.id): Last editor
- `last_edited_at` (TIMESTAMP WITH TIME ZONE)
- `size_bytes` (INTEGER): Approximate content size
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- `updated_at` (TIMESTAMP WITH TIME ZONE)
- `deleted_at` (TIMESTAMP WITH TIME ZONE, NULL): Soft delete

**Indexes**:
- PRIMARY KEY (id)
- INDEX (tenant_id, created_by_user_id) for user's documents
- INDEX (tenant_id, status, updated_at) for filtering/sorting
- GIN INDEX (content_text gin_trgm_ops) for full-text search
- INDEX (jurisdiction, practice_area) for template suggestions

**RLS Policy**:
```sql
-- Users can only access documents in their tenant
CREATE POLICY document_tenant_isolation ON documents
FOR ALL USING (tenant_id = auth.jwt() ->> 'tenant_id'::uuid);

-- Viewers can only SELECT, not INSERT/UPDATE/DELETE
CREATE POLICY viewer_read_only ON documents
FOR INSERT, UPDATE, DELETE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND tenant_id = documents.tenant_id
    AND role IN ('admin', 'attorney', 'paralegal')
  )
);
```

---

### 4. Version

Immutable snapshot of document at a point in time.

**Fields**:
- `id` (UUID, PK): Unique version identifier
- `document_id` (UUID, FK → Document.id, NOT NULL): Parent document
- `version_number` (INTEGER, NOT NULL): Sequential version number
- `content_snapshot` (JSONB, NOT NULL): Full Tiptap content at this version
- `content_hash` (VARCHAR(64), NOT NULL): SHA-256 hash of content
- `signature` (VARCHAR(512), NOT NULL): HMAC-SHA256 signature
- `created_by_user_id` (UUID, FK → User.id, NOT NULL): Who created this version
- `change_description` (TEXT): User-provided or auto-generated description
- `ai_suggestions_count` (INTEGER, DEFAULT 0): Number of AI suggestions in this version
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE (document_id, version_number)
- INDEX (document_id, created_at DESC) for history retrieval

**RLS Policy**:
```sql
-- Inherit document access (can see versions of accessible documents)
CREATE POLICY version_document_access ON versions
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM documents
    WHERE id = versions.document_id
    AND tenant_id = auth.jwt() ->> 'tenant_id'::uuid
  )
);

-- Versions are append-only (no UPDATE/DELETE)
CREATE POLICY version_immutable ON versions
FOR UPDATE, DELETE USING (false);
```

---

### 5. VersionDiff

Difference between consecutive versions (for efficient storage and display).

**Fields**:
- `id` (UUID, PK)
- `from_version_id` (UUID, FK → Version.id, NOT NULL)
- `to_version_id` (UUID, FK → Version.id, NOT NULL)
- `diff_operations` (JSONB, NOT NULL): Array of diff operations (insert/delete/retain)
- `added_text_length` (INTEGER)
- `removed_text_length` (INTEGER)
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE (from_version_id, to_version_id)

---

### 6. AIConversation

Chat session between user and AI related to a document.

**Fields**:
- `id` (UUID, PK)
- `document_id` (UUID, FK → Document.id, NOT NULL)
- `user_id` (UUID, FK → User.id, NOT NULL): User who initiated conversation
- `provider` (VARCHAR(50), NOT NULL): AI provider used (claude, openai, glm)
- `model` (VARCHAR(100)): Specific model version (e.g., "claude-3-opus")
- `total_messages` (INTEGER, DEFAULT 0): Number of messages in conversation
- `total_tokens_used` (INTEGER, DEFAULT 0): Cumulative token usage
- `estimated_cost_usd` (DECIMAL(10, 6), DEFAULT 0.00): Estimated API cost
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- `last_message_at` (TIMESTAMP WITH TIME ZONE)

**Indexes**:
- PRIMARY KEY (id)
- INDEX (document_id, created_at DESC)
- INDEX (user_id, created_at DESC) for user's chat history

**RLS Policy**:
```sql
-- Inherit document access
CREATE POLICY conversation_document_access ON ai_conversations
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM documents
    WHERE id = ai_conversations.document_id
    AND tenant_id = auth.jwt() ->> 'tenant_id'::uuid
  )
);
```

---

### 7. AIMessage

Individual message in an AI conversation.

**Fields**:
- `id` (UUID, PK)
- `conversation_id` (UUID, FK → AIConversation.id, NOT NULL)
- `role` (ENUM): Message author (user, assistant, system)
- `content` (TEXT, NOT NULL): Message text
- `confidence_score` (DECIMAL(3, 2), NULL): AI confidence level (0.00-1.00)
- `has_citations` (BOOLEAN, DEFAULT false): Whether message includes legal citations
- `tokens_used` (INTEGER): Tokens for this message
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

**Indexes**:
- PRIMARY KEY (id)
- INDEX (conversation_id, created_at ASC) for chronological retrieval

**RLS Policy**:
```sql
-- Inherit conversation access
CREATE POLICY message_conversation_access ON ai_messages
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM ai_conversations
    JOIN documents ON documents.id = ai_conversations.document_id
    WHERE ai_conversations.id = ai_messages.conversation_id
    AND documents.tenant_id = auth.jwt() ->> 'tenant_id'::uuid
  )
);
```

---

### 8. KnowledgeSource

Legal knowledge base or MCP integration source.

**Fields**:
- `id` (UUID, PK)
- `name` (VARCHAR(255), NOT NULL): Source name (e.g., "Cornell LII", "Westlaw")
- `type` (ENUM): Source type (free_public, commercial, tenant_custom)
- `jurisdiction` (VARCHAR(100), NULL): Applicable jurisdiction
- `mcp_server_url` (TEXT, NULL): MCP server endpoint if applicable
- `api_credentials_encrypted` (TEXT, NULL): Encrypted API keys for commercial sources
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

**Indexes**:
- PRIMARY KEY (id)
- INDEX (type, jurisdiction, is_active) for filtering

**RLS Policy**:
```sql
-- Public sources visible to all authenticated users
-- Tenant-specific sources only visible to that tenant
CREATE POLICY knowledge_source_access ON knowledge_sources
FOR SELECT USING (
  type IN ('free_public', 'commercial')
  OR (
    type = 'tenant_custom'
    AND tenant_id = auth.jwt() ->> 'tenant_id'::uuid
  )
);
```

---

### 9. AIMessageCitation

Many-to-many relationship between AI messages and knowledge sources.

**Fields**:
- `id` (UUID, PK)
- `ai_message_id` (UUID, FK → AIMessage.id, NOT NULL)
- `knowledge_source_id` (UUID, FK → KnowledgeSource.id, NOT NULL)
- `citation_text` (TEXT, NOT NULL): Full citation (e.g., "Smith v. Jones, 123 F.3d 456 (9th Cir. 2020)")
- `excerpt` (TEXT): Relevant excerpt from source
- `url` (TEXT, NULL): Direct link to source if available
- `confidence` (DECIMAL(3, 2)): Citation relevance score
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

**Indexes**:
- PRIMARY KEY (id)
- INDEX (ai_message_id)
- INDEX (knowledge_source_id)

---

### 10. Template

Reusable legal document template.

**Fields**:
- `id` (UUID, PK)
- `tenant_id` (UUID, FK → Tenant.id, NULL): NULL for system templates, tenant-specific otherwise
- `name` (VARCHAR(255), NOT NULL): Template name
- `description` (TEXT): Template purpose and usage notes
- `jurisdiction` (VARCHAR(100), NOT NULL): Applicable jurisdiction
- `practice_area` (VARCHAR(100), NOT NULL): Legal practice area
- `content_template` (JSONB, NOT NULL): Tiptap content with placeholders
- `parameters` (JSONB): Array of parameter definitions (name, type, required, default)
- `version` (INTEGER, DEFAULT 1): Template version number
- `is_active` (BOOLEAN, DEFAULT true)
- `reviewed_by_attorney` (BOOLEAN, DEFAULT false): Attorney approval flag
- `reviewed_at` (TIMESTAMP WITH TIME ZONE, NULL)
- `created_by_user_id` (UUID, FK → User.id, NOT NULL)
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- `updated_at` (TIMESTAMP WITH TIME ZONE)

**Indexes**:
- PRIMARY KEY (id)
- INDEX (jurisdiction, practice_area, is_active) for search
- INDEX (tenant_id, is_active) for tenant templates

**RLS Policy**:
```sql
-- System templates visible to all, tenant templates only to that tenant
CREATE POLICY template_access ON templates
FOR SELECT USING (
  tenant_id IS NULL  -- System template
  OR tenant_id = auth.jwt() ->> 'tenant_id'::uuid  -- Tenant template
);

-- Only admins can create/update tenant templates
CREATE POLICY template_admin_only ON templates
FOR INSERT, UPDATE, DELETE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND tenant_id = templates.tenant_id
    AND role = 'admin'
  )
);
```

---

### 11. AuditLog

Security and compliance event log (immutable).

**Fields**:
- `id` (UUID, PK)
- `tenant_id` (UUID, FK → Tenant.id, NOT NULL)
- `user_id` (UUID, FK → User.id, NULL): User who triggered event (NULL for system events)
- `event_type` (VARCHAR(100), NOT NULL): Event category (auth, document, export, admin)
- `event_action` (VARCHAR(100), NOT NULL): Specific action (login, document_view, export_pdf)
- `resource_type` (VARCHAR(100), NULL): Resource affected (document, user, template)
- `resource_id` (UUID, NULL): Specific resource ID
- `ip_address` (INET): Client IP address
- `user_agent` (TEXT): Client user agent string
- `metadata` (JSONB): Additional event-specific data
- `severity` (ENUM): Event severity (info, warning, error, critical)
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

**Indexes**:
- PRIMARY KEY (id)
- INDEX (tenant_id, created_at DESC) for tenant audit trail
- INDEX (user_id, created_at DESC) for user activity
- INDEX (event_type, severity, created_at DESC) for security monitoring
- INDEX (resource_type, resource_id) for resource audit history

**RLS Policy**:
```sql
-- Only admins can view audit logs
CREATE POLICY audit_log_admin_only ON audit_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND tenant_id = audit_logs.tenant_id
    AND role = 'admin'
  )
);

-- Audit logs are append-only (no UPDATE/DELETE)
CREATE POLICY audit_log_immutable ON audit_logs
FOR UPDATE, DELETE USING (false);
```

---

### 12. TenantSettings

Tenant-specific configuration and preferences.

**Fields**:
- `tenant_id` (UUID, PK, FK → Tenant.id)
- `branding_logo_url` (TEXT, NULL): Custom logo URL
- `branding_primary_color` (VARCHAR(7), NULL): Hex color code
- `default_ai_provider` (VARCHAR(50), DEFAULT 'claude'): Preferred AI provider
- `mfa_required` (BOOLEAN, DEFAULT false): Enforce MFA for all users
- `allowed_domains` (TEXT[], NULL): Email domains for auto-approval signups
- `retention_policy_years` (INTEGER, DEFAULT 7): Document retention period
- `notification_preferences` (JSONB): Email/webhook notification settings
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- `updated_at` (TIMESTAMP WITH TIME ZONE)

**Indexes**:
- PRIMARY KEY (tenant_id)

**RLS Policy**:
```sql
-- Only admins can view/update tenant settings
CREATE POLICY settings_admin_only ON tenant_settings
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND tenant_id = tenant_settings.tenant_id
    AND role = 'admin'
  )
);
```

---

### 13. UserConsent

GDPR/CCPA consent tracking for each user.

**Fields**:
- `id` (UUID, PK)
- `user_id` (UUID, FK → User.id, NOT NULL)
- `consent_type` (VARCHAR(100), NOT NULL): Type of consent (analytics, ai_training, marketing)
- `granted` (BOOLEAN, NOT NULL): Whether consent is granted
- `granted_at` (TIMESTAMP WITH TIME ZONE, NULL)
- `revoked_at` (TIMESTAMP WITH TIME ZONE, NULL)
- `ip_address` (INET): IP where consent was recorded
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE (user_id, consent_type, revoked_at) for current consent state
- INDEX (user_id, consent_type) for consent lookups

**RLS Policy**:
```sql
-- Users can view and update their own consent
CREATE POLICY consent_own_user ON user_consents
FOR ALL USING (user_id = auth.uid());
```

---

### 14. DocumentShare

Document sharing and collaboration permissions.

**Fields**:
- `id` (UUID, PK)
- `document_id` (UUID, FK → Document.id, NOT NULL)
- `shared_with_user_id` (UUID, FK → User.id, NULL): User being granted access
- `shared_with_email` (VARCHAR(255), NULL): External email (guest access)
- `permission` (ENUM): Access level (view, comment, edit)
- `shared_by_user_id` (UUID, FK → User.id, NOT NULL): User who shared
- `expires_at` (TIMESTAMP WITH TIME ZONE, NULL): Optional expiration
- `access_count` (INTEGER, DEFAULT 0): Number of times accessed
- `last_accessed_at` (TIMESTAMP WITH TIME ZONE)
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- `revoked_at` (TIMESTAMP WITH TIME ZONE, NULL): When access was revoked

**Indexes**:
- PRIMARY KEY (id)
- INDEX (document_id, revoked_at) for active shares
- INDEX (shared_with_user_id, revoked_at) for user's shared documents
- INDEX (shared_with_email) for guest access

**RLS Policy**:
```sql
-- Users can see shares for documents they own or have access to
CREATE POLICY share_document_access ON document_shares
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM documents
    WHERE id = document_shares.document_id
    AND (created_by_user_id = auth.uid() OR tenant_id = auth.jwt() ->> 'tenant_id'::uuid)
  )
);
```

---

## Validation Rules

### Document
- `title` length: 1-500 characters
- `jurisdiction` format: ISO 3166-1 alpha-2 + optional region (e.g., "US-CA")
- `content` must be valid Tiptap JSON schema
- `version_number` must increment sequentially

### Version
- `signature` must be valid HMAC-SHA256 (verified on creation)
- `content_hash` must match SHA-256 of content_snapshot
- Immutable after creation (no updates/deletes)

### AIConversation
- `provider` must be one of: claude, openai, glm
- `total_tokens_used` cannot decrease (only increment)

### Template
- `parameters` must be valid JSON array of parameter definitions
- `reviewed_by_attorney` can only be set by users with attorney role
- System templates (tenant_id IS NULL) cannot be deleted

### AuditLog
- Immutable after creation
- `created_at` cannot be in the future
- `severity` required for all events

---

## State Transitions

### Document Status
```
draft → in_review → finalized → archived
  ↓         ↓           ↓
  └─────────┴───────────┴──→ (can revert to draft)
```

### UserConsent
```
(not granted) → granted → revoked
                   ↓
                   └──→ granted (can re-grant)
```

### Template Version
```
v1 (draft) → v1 (reviewed) → v2 (draft) → v2 (reviewed) → ...
```

---

## Performance Considerations

1. **Multi-tenant Queries**: All tenant-scoped queries use `(tenant_id, ...)` composite indexes
2. **Full-text Search**: GIN index on `documents.content_text` with trigram support
3. **Version History**: Partition `versions` table by `document_id` for large documents
4. **Audit Logs**: Archive logs older than retention period to cold storage
5. **Realtime Subscriptions**: Use Supabase Realtime channels scoped by `document_id`

---

## Database Schema Ready for Implementation

All entities defined with:
✅ Primary/foreign keys
✅ Indexes for query performance
✅ RLS policies for multi-tenant security
✅ Validation rules
✅ State transitions
✅ GDPR/CCPA compliance fields

Next: Generate API contracts and tests based on this schema.
