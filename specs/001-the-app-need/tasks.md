# Tasks: Legal Document Editor with AI Integration

**Feature**: 001-the-app-need
**Branch**: `001-the-app-need`
**Date**: 2025-10-05
**Input**: Phase 1 artifacts (plan.md, research.md, data-model.md, contracts/, quickstart.md)

## Task Execution Instructions

**Parallel Tasks**: Tasks marked `[P]` can run concurrently with other `[P]` tasks in the same phase.
**Sequential Tasks**: Tasks without `[P]` must complete before the next task starts.
**Dependencies**: Listed explicitly when a task requires outputs from other tasks.

## Phase 3.1: Setup & Infrastructure

### T001 [P] - Initialize Next.js 15 Project
**Type**: Setup
**Estimated Time**: 15 min

Create Next.js 15 application with TypeScript and App Router.

```bash
npx create-next-app@latest mindlaw \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
cd mindlaw
npm install
```

**Acceptance**:
- Project created with TypeScript 5.x
- App Router structure in place
- Tailwind CSS 4.x configured
- Development server runs on `npm run dev`

---

### T002 [P] - Configure Supabase Project
**Type**: Setup
**Estimated Time**: 20 min

Set up Supabase PostgreSQL database and authentication.

1. Log into Supabase dashboard
2. Create new project "mindlaw-production"
3. Note: Database URL, Anon Key, Service Role Key
4. Enable Auth providers: Email/Password, Google OAuth, Microsoft OAuth
5. Create `.env.local` with credentials

**Acceptance**:
- Supabase project created
- Environment variables in `.env.local`
- Database connection verified via Supabase SQL editor

---

### T003 [P] - Install Core Dependencies
**Type**: Setup
**Estimated Time**: 10 min
**Dependencies**: T001

Install all required packages from research.md and plan.md.

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install @tiptap/react @tiptap/starter-kit @tiptap/pm
npm install @anthropic-ai/sdk openai
npm install framer-motion zod
npm install -D prisma @prisma/client
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D playwright @playwright/test
```

**Acceptance**:
- All dependencies installed without errors
- `package.json` includes all packages
- TypeScript types available for all packages

---

### T004 [P] - Configure Security Tooling
**Type**: Setup
**Estimated Time**: 15 min
**Dependencies**: T001

Set up SAST scanning, dependency checks, and secrets detection.

```bash
npm install -D eslint-plugin-security
npm install -D @types/node
```

Create `.github/workflows/security.yml` for CI checks.

**Acceptance**:
- ESLint security rules enabled
- Secrets detection configured (GitHub Actions)
- Dependency scanning active

---

### T005 [P] - Initialize Prisma Schema
**Type**: Setup
**Estimated Time**: 30 min
**Dependencies**: T002, T003

Create Prisma schema from data-model.md (14 entities).

```bash
npx prisma init
```

Create `prisma/schema.prisma` with:
- Tenant, User, Document, Version, VersionDiff
- AIConversation, AIMessage, KnowledgeSource, AIMessageCitation
- Template, AuditLog, TenantSettings, UserConsent, DocumentShare

**Acceptance**:
- All 14 entities defined in schema
- Foreign keys and indexes specified
- Enums defined (role, status, provider)
- `npx prisma validate` passes

---

## Phase 3.2: Tests First (TDD - MUST COMPLETE BEFORE 3.3)

### T006 [P] - Contract Test: GET /api/documents
**Type**: Test (Contract)
**Estimated Time**: 20 min
**Dependencies**: T001, T005

Create `tests/contract/documents-list.test.ts` to verify GET /documents endpoint.

Test cases:
- Returns 200 with array of documents
- Supports pagination (page, limit)
- Supports status filter (draft, in_review, finalized, archived)
- Supports full-text search query
- Returns 401 if not authenticated
- Enforces tenant isolation (RLS)

**Acceptance**:
- Test file created
- All test cases written and FAILING (no implementation yet)
- Uses Vitest + Supabase test client

---

### T007 [P] - Contract Test: POST /api/documents
**Type**: Test (Contract)
**Estimated Time**: 20 min
**Dependencies**: T001, T005

Create `tests/contract/documents-create.test.ts` to verify POST /documents endpoint.

Test cases:
- Returns 201 with created document
- Requires title field
- Accepts optional template_id, jurisdiction, practice_area
- Creates initial Version 1.0
- Returns 400 for invalid data
- Returns 403 for viewer role

**Acceptance**:
- Test file created
- All test cases written and FAILING
- Validates response schema matches contracts/documents-api.yaml

---

### T008 [P] - Contract Test: PATCH /api/documents/:id
**Type**: Test (Contract)
**Estimated Time**: 20 min
**Dependencies**: T001, T005

Create `tests/contract/documents-update.test.ts` to verify PATCH /documents/:id endpoint.

Test cases:
- Returns 200 with updated document
- Accepts title, content, jurisdiction, practice_area, status
- Increments version_number on content change
- Returns 404 for non-existent document
- Returns 403 for wrong tenant

**Acceptance**:
- Test file created
- All test cases written and FAILING
- Tests multi-tenant isolation

---

### T009 [P] - Contract Test: GET /api/documents/:id/versions
**Type**: Test (Contract)
**Estimated Time**: 15 min
**Dependencies**: T001, T005

Create `tests/contract/documents-versions.test.ts` to verify version history endpoint.

Test cases:
- Returns 200 with array of versions
- Supports pagination
- Orders by created_at DESC
- Each version includes signature and content_hash
- Returns 404 for non-existent document

**Acceptance**:
- Test file created
- All test cases written and FAILING

---

### T010 [P] - Contract Test: POST /api/documents/:id/rollback
**Type**: Test (Contract)
**Estimated Time**: 20 min
**Dependencies**: T001, T005

Create `tests/contract/documents-rollback.test.ts` to verify rollback endpoint.

Test cases:
- Returns 200 with new version containing old content
- Requires version_number and reason
- Creates new version (not in-place update)
- Logs rollback in audit trail
- Returns 403 for insufficient permissions

**Acceptance**:
- Test file created
- All test cases written and FAILING
- Validates immutability principle

---

### T011 [P] - Contract Test: POST /api/documents/:id/export
**Type**: Test (Contract)
**Estimated Time**: 25 min
**Dependencies**: T001, T005

Create `tests/contract/documents-export.test.ts` to verify export endpoint.

Test cases:
- Returns 200 with download_url and expires_at
- Supports formats: docx, pdf, pdf-a
- include_audit_trail option works
- include_ai_conversations option works
- Generated file is valid (check MIME type)

**Acceptance**:
- Test file created
- All test cases written and FAILING
- Tests export with audit trail metadata

---

### T012 [P] - Contract Test: POST /api/ai/chat/:documentId/stream
**Type**: Test (Contract)
**Estimated Time**: 25 min
**Dependencies**: T001, T005

Create `tests/contract/ai-chat-stream.test.ts` to verify AI streaming endpoint.

Test cases:
- Returns 200 with text/event-stream content type
- Accepts message, provider (claude, openai, glm), jurisdiction
- Streams response chunks (Server-Sent Events)
- include_citations=true returns citation objects
- Returns 401 if not authenticated
- Sanitizes prompts (no PII in API calls)

**Acceptance**:
- Test file created
- All test cases written and FAILING
- Validates streaming response format

---

### T013 [P] - Contract Test: GET /api/ai/providers
**Type**: Test (Contract)
**Estimated Time**: 15 min
**Dependencies**: T001, T005

Create `tests/contract/ai-providers.test.ts` to verify provider listing endpoint.

Test cases:
- Returns 200 with array of available providers
- Each provider includes: name, available, cost_per_1k_tokens
- Respects tenant settings (default_ai_provider)
- Returns only active providers

**Acceptance**:
- Test file created
- All test cases written and FAILING

---

### T014 [P] - Integration Test: Document Creation from Template
**Type**: Test (Integration)
**Estimated Time**: 30 min
**Dependencies**: T001, T005

Create `tests/integration/document-template-flow.test.ts` from quickstart.md Test Flow 1.

Test steps:
1. Login as attorney@test.law
2. Select "Commercial Lease Agreement - California" template
3. Fill parameters (Client Name, Effective Date, Property Address)
4. Verify document created with placeholders replaced
5. Verify initial version 1.0 created
6. Make edit and verify version increments to 1.1

**Acceptance**:
- Test file created
- All steps written and FAILING
- Uses Playwright for E2E simulation

---

### T015 [P] - Integration Test: AI Chat with Citations
**Type**: Test (Integration)
**Estimated Time**: 30 min
**Dependencies**: T001, T005

Create `tests/integration/ai-chat-flow.test.ts` from quickstart.md Test Flow 2.

Test steps:
1. Open AI chat panel
2. Verify default provider shown
3. Ask legal question
4. Verify streaming response with citations
5. Click "Insert into Document"
6. Verify text inserted with AI content marker
7. Switch provider and verify conversation preserved

**Acceptance**:
- Test file created
- All steps written and FAILING
- Validates citation links and provider switching

---

### T016 [P] - Integration Test: Multi-Tenant Isolation
**Type**: Test (Integration)
**Estimated Time**: 25 min
**Dependencies**: T001, T005

Create `tests/integration/multi-tenant-isolation.test.ts` from quickstart.md Test Flow 3.

Test steps:
1. Create document as attorney@test.law (Tenant A)
2. Logout and login as attorney@otherfirm.law (Tenant B)
3. Try to access Tenant A document via direct URL
4. Verify 404 or redirect
5. Verify document not in Tenant B document list
6. Verify audit log shows unauthorized access attempt

**Acceptance**:
- Test file created
- All steps written and FAILING
- RLS policies enforced correctly

---

### T017 [P] - Integration Test: Offline Editing and Sync
**Type**: Test (Integration)
**Estimated Time**: 35 min
**Dependencies**: T001, T005

Create `tests/integration/offline-editing.test.ts` from quickstart.md Test Flow 4.

Test steps:
1. Open document while online
2. Enable offline mode (DevTools network)
3. Make edits offline
4. Verify changes saved to IndexedDB
5. Go back online
6. Verify pending changes sync to server
7. Verify version incremented on server

**Acceptance**:
- Test file created
- All steps written and FAILING
- No data loss in offline/online transition

---

### T018 [P] - Integration Test: Version Control & Rollback
**Type**: Test (Integration)
**Estimated Time**: 30 min
**Dependencies**: T001, T005

Create `tests/integration/version-rollback.test.ts` from quickstart.md Test Flow 5.

Test steps:
1. Create document and make 3 edits (3 versions)
2. View version history
3. Preview Version 1.0 (read-only)
4. Rollback to Version 1.0 with reason
5. Verify new Version 4.0 created with rollback note
6. Verify signature integrity for all versions

**Acceptance**:
- Test file created
- All steps written and FAILING
- Validates immutable audit trail

---

### T019 [P] - Integration Test: Export with Audit Trail
**Type**: Test (Integration)
**Estimated Time**: 30 min
**Dependencies**: T001, T005

Create `tests/integration/document-export.test.ts` from quickstart.md Test Flow 6.

Test steps:
1. Create document with AI suggestions and multiple versions
2. Export as PDF with audit trail
3. Download and verify PDF content
4. Verify audit trail appended as separate pages
5. Verify XMP metadata includes document ID, timestamps, signatures

**Acceptance**:
- Test file created
- All steps written and FAILING
- PDF/A compliance validated

---

### T020 [P] - Integration Test: GDPR Data Export
**Type**: Test (Integration)
**Estimated Time**: 25 min
**Dependencies**: T001, T005

Create `tests/integration/gdpr-export.test.ts` from quickstart.md Test Flow 7.

Test steps:
1. Login as attorney@test.law
2. Request data export
3. Verify email sent with download link
4. Download ZIP file
5. Verify contents: profile.json, documents/, ai_conversations/, audit_logs/, README.txt
6. Verify all data matches user's actual data

**Acceptance**:
- Test file created
- All steps written and FAILING
- GDPR compliance requirements met

---

### T021 [P] - Security Test: Encryption & TLS
**Type**: Test (Security)
**Estimated Time**: 20 min
**Dependencies**: T001, T005

Create `tests/security/encryption.test.ts` to verify encryption requirements.

Test cases:
- Database connections use TLS 1.3+
- Document content encrypted at rest (Supabase encryption)
- Passwords hashed with bcrypt (Supabase Auth)
- API keys stored in Supabase Vault (not plaintext)
- Session tokens use secure cookies (httpOnly, secure, sameSite)

**Acceptance**:
- Test file created
- All test cases written and FAILING
- Constitutional Principle I verified

---

### T022 [P] - Security Test: RLS Policy Enforcement
**Type**: Test (Security)
**Estimated Time**: 25 min
**Dependencies**: T001, T005

Create `tests/security/rls-policies.test.ts` to verify Row Level Security.

Test cases:
- User can only see documents in their tenant
- Viewer role cannot INSERT/UPDATE/DELETE documents
- Admin role can access tenant settings
- Audit logs are append-only (no UPDATE/DELETE)
- Versions are immutable after creation

**Acceptance**:
- Test file created
- All test cases written and FAILING
- All 14 entities tested for RLS compliance

---

## Phase 3.3: Core Implementation (ONLY AFTER TESTS FAILING)

### T023 - Prisma Database Migration
**Type**: Implementation
**Estimated Time**: 30 min
**Dependencies**: T005, All Phase 3.2 tests

Apply Prisma schema to Supabase database.

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Create RLS policies in Supabase SQL editor from data-model.md.

**Acceptance**:
- All 14 tables created in database
- RLS policies applied
- Indexes created
- `npx prisma db pull` shows all entities

---

### T024 - Supabase Client Configuration
**Type**: Implementation
**Estimated Time**: 20 min
**Dependencies**: T002, T023

Create `lib/supabase/client.ts` and `lib/supabase/server.ts`.

Implement:
- Client-side Supabase client (for browser)
- Server-side Supabase client (for API routes)
- Auth middleware for protected routes
- RLS helper functions

**Acceptance**:
- Client initialized with proper credentials
- Auth state persisted across page loads
- T006 (GET /documents) test starts passing

---

### T025 - Document CRUD API Routes
**Type**: Implementation
**Estimated Time**: 2 hours
**Dependencies**: T023, T024

Implement API routes from contracts/documents-api.yaml:
- `app/api/documents/route.ts` (GET, POST)
- `app/api/documents/[id]/route.ts` (GET, PATCH, DELETE)

**Acceptance**:
- T006, T007, T008 tests pass
- RLS policies enforced automatically
- Proper error handling (400, 401, 403, 404)

---

### T026 - Version Management Service
**Type**: Implementation
**Estimated Time**: 1.5 hours
**Dependencies**: T023

Create `lib/versioning/document-versioner.ts` with:
- `createVersion(documentId, content, userId)`
- `getVersionHistory(documentId)`
- `diffVersions(fromVersionId, toVersionId)`

**Acceptance**:
- T009 (version history) test passes
- Version numbers increment correctly
- Content snapshots stored in JSONB

---

### T027 - Cryptographic Signing Service
**Type**: Implementation
**Estimated Time**: 1 hour
**Dependencies**: T023

Create `lib/versioning/crypto-signer.ts` with HMAC-SHA256 implementation.

Functions:
- `signVersion(content, timestamp, userId, tenantSecret)`
- `verifySignature(versionId)`

**Acceptance**:
- Signatures generated on every version creation
- T018 (version control) test passes
- T021 (security) test passes

---

### T028 - Document Rollback Endpoint
**Type**: Implementation
**Estimated Time**: 1 hour
**Dependencies**: T026, T027

Implement `app/api/documents/[id]/rollback/route.ts`.

Logic:
1. Fetch specified version content
2. Create new version with old content
3. Log rollback event in AuditLog
4. Return new version

**Acceptance**:
- T010 (rollback) test passes
- New version created (not in-place update)
- Audit trail preserved

---

### T029 - AI Provider Adapter Interface
**Type**: Implementation
**Estimated Time**: 1 hour
**Dependencies**: T001

Create `lib/ai/providers/AIProviderAdapter.ts` interface.

```typescript
interface AIProviderAdapter {
  name: string;
  streamCompletion(prompt: string, context: DocumentContext): AsyncIterator<string>;
  generateCitations(query: string, jurisdiction: string): Promise<Citation[]>;
  estimateCost(tokens: number): number;
}
```

**Acceptance**:
- Interface defined with proper TypeScript types
- DocumentContext type defined
- Citation type defined

---

### T030 - Claude Provider Implementation
**Type**: Implementation
**Estimated Time**: 1.5 hours
**Dependencies**: T029

Create `lib/ai/providers/ClaudeProvider.ts` implementing AIProviderAdapter.

Use `@anthropic-ai/sdk` for API calls.

**Acceptance**:
- Streams responses from Claude API
- Sanitizes prompts (removes PII)
- Generates legal citations using knowledge base
- T012 (AI streaming) test passes for Claude

---

### T031 - OpenAI Provider Implementation
**Type**: Implementation
**Estimated Time**: 1.5 hours
**Dependencies**: T029

Create `lib/ai/providers/OpenAIProvider.ts` implementing AIProviderAdapter.

Use `openai` SDK for API calls.

**Acceptance**:
- Streams responses from OpenAI API
- Sanitizes prompts
- Generates citations
- T012 test passes for OpenAI

---

### T032 - AI Chat Streaming Endpoint
**Type**: Implementation
**Estimated Time**: 1.5 hours
**Dependencies**: T030, T031

Implement `app/api/ai/chat/[documentId]/stream/route.ts`.

Logic:
1. Parse request (message, provider, jurisdiction, include_citations)
2. Sanitize prompt
3. Get provider adapter
4. Stream response as Server-Sent Events
5. Log conversation in AIConversation + AIMessage tables

**Acceptance**:
- T012 (AI streaming) test passes
- T015 (AI chat integration) test passes
- Citations included when requested

---

### T033 - AI Providers Listing Endpoint
**Type**: Implementation
**Estimated Time**: 30 min
**Dependencies**: T029, T030, T031

Implement `app/api/ai/providers/route.ts`.

Returns:
```json
[
  { "name": "claude", "available": true, "cost_per_1k_tokens": 0.015 },
  { "name": "openai", "available": true, "cost_per_1k_tokens": 0.01 }
]
```

**Acceptance**:
- T013 (providers list) test passes
- Respects tenant settings

---

### T034 - Tiptap Editor Component
**Type**: Implementation
**Estimated Time**: 2 hours
**Dependencies**: T003

Create `components/editor/TiptapEditor.tsx` with:
- Starter kit extensions
- Custom AI content marker extension
- Autosave functionality (debounced 30s)
- Version indicator

**Acceptance**:
- Editor renders and accepts input
- Content stored as Tiptap JSON
- Autosave triggers version creation
- T014 (document creation) test passes

---

### T035 - AI Chat Panel Component
**Type**: Implementation
**Estimated Time**: 2 hours
**Dependencies**: T032, T033

Create `components/chat/AIChat.tsx` with:
- Message list (user + assistant)
- Input field with send button
- Provider selector dropdown
- Streaming response handling
- "Insert into Document" button

**Acceptance**:
- Chat panel displays messages
- Streaming responses show typing indicator
- T015 (AI chat) test passes
- Provider switching works

---

### T036 - Document Export Service
**Type**: Implementation
**Estimated Time**: 2.5 hours
**Dependencies**: T026, T027

Implement `app/api/documents/[id]/export/route.ts`.

Features:
- DOCX export (Tiptap JSON → DOCX)
- PDF export (Tiptap JSON → HTML → PDF)
- PDF/A export with XMP metadata
- Audit trail appendix (version history + signatures)

**Acceptance**:
- T011 (export) test passes
- T019 (export with audit trail) test passes
- Metadata includes document ID, timestamps, signatures

---

## Phase 3.4: Integrations

### T037 - Supabase Auth Integration
**Type**: Implementation
**Estimated Time**: 1.5 hours
**Dependencies**: T024

Implement:
- `app/(auth)/login/page.tsx`
- `app/(auth)/signup/page.tsx`
- OAuth buttons (Google, Microsoft)
- Session management

**Acceptance**:
- Login/signup flows work
- OAuth redirects correctly
- Sessions persist across page reloads
- T014, T015, T016 tests pass (auth required)

---

### T038 - MCP Knowledge Base Client
**Type**: Implementation
**Estimated Time**: 2 hours
**Dependencies**: T003

Create `lib/mcp/knowledge-base-client.ts` using `@modelcontextprotocol/sdk`.

Functions:
- `searchCitations(query, jurisdiction)`
- `getCitationDetails(citationId)`

**Acceptance**:
- Connects to MCP servers
- Returns legal citations
- T015 (AI chat with citations) test passes

---

### T039 - Service Worker for Offline Support
**Type**: Implementation
**Estimated Time**: 2 hours
**Dependencies**: T034

Create `public/sw.js` using Workbox.

Cache strategies:
- Documents: network-first
- Templates: cache-first
- AI chat: network-only

**Acceptance**:
- Service worker registers
- T017 (offline editing) test passes
- Offline indicator shown in UI

---

### T040 - IndexedDB Document Storage
**Type**: Implementation
**Estimated Time**: 1.5 hours
**Dependencies**: T039

Create `lib/offline/indexeddb-client.ts`.

Functions:
- `saveDocumentOffline(documentId, content)`
- `getPendingChanges()`
- `syncToServer()`

**Acceptance**:
- Documents saved to IndexedDB when offline
- Sync queue processes on reconnection
- T017 test passes completely

---

### T041 - Audit Logging Service
**Type**: Implementation
**Estimated Time**: 1 hour
**Dependencies**: T023

Create `lib/utils/audit-logger.ts`.

Functions:
- `logEvent(eventType, eventAction, resourceType, resourceId, metadata)`
- `logSecurityEvent(severity, description)`

**Acceptance**:
- All API routes log events to AuditLog table
- T016 (multi-tenant) test passes (audit log check)
- T022 (RLS) test passes (audit log immutability)

---

### T042 - GDPR Data Export Endpoint
**Type**: Implementation
**Estimated Time**: 2 hours
**Dependencies**: T023, T036

Implement `app/api/gdpr/export/route.ts`.

Logic:
1. Generate ZIP with all user data
2. Include: profile.json, documents/, ai_conversations/, audit_logs/
3. Send email with download link
4. Auto-delete export after 7 days

**Acceptance**:
- T020 (GDPR export) test passes
- ZIP structure matches specification
- All user data included

---

## Phase 3.5: Polish & Validation

### T043 - Unit Tests for AI Providers
**Type**: Test (Unit)
**Estimated Time**: 1.5 hours
**Dependencies**: T030, T031

Create `tests/unit/ai-providers.test.ts`.

Test cases:
- Prompt sanitization (removes PII)
- Cost estimation accuracy
- Error handling (rate limits, API errors)
- Citation formatting

**Acceptance**:
- 80%+ code coverage for AI provider classes
- All edge cases covered

---

### T044 - Unit Tests for Versioning Service
**Type**: Test (Unit)
**Estimated Time**: 1 hour
**Dependencies**: T026, T027

Create `tests/unit/versioning.test.ts`.

Test cases:
- Version number increments correctly
- Signatures verify successfully
- Signature tampering detected
- Diff generation accuracy

**Acceptance**:
- 80%+ code coverage for versioning service
- Cryptographic functions tested thoroughly

---

### T045 - Performance Optimization: Database Queries
**Type**: Optimization
**Estimated Time**: 1.5 hours
**Dependencies**: T023, T025

Optimize PostgreSQL queries:
- Add composite indexes for RLS queries
- Enable pg_trgm extension for full-text search
- Add GIN index on documents.content_text

**Acceptance**:
- Document list query <100ms (50 documents)
- Full-text search <200ms (1000 documents)
- Version history <150ms (100 versions)

---

### T046 - Performance Optimization: Frontend Bundle
**Type**: Optimization
**Estimated Time**: 1 hour
**Dependencies**: T034, T035

Optimize Next.js bundle:
- Dynamic imports for heavy components
- Image optimization for template previews
- Code splitting by route

**Acceptance**:
- Initial bundle <200KB gzipped
- First Contentful Paint <500ms
- Time to Interactive <2s

---

### T047 - Security Audit
**Type**: Validation
**Estimated Time**: 2 hours
**Dependencies**: All Phase 3.3, 3.4 tasks

Perform security review:
- RLS policies cover all tables
- API routes validate JWT tokens
- Input sanitization for all user inputs
- No SQL injection vulnerabilities
- XSS prevention (React escaping)
- CSRF protection (Next.js built-in)

**Acceptance**:
- T021, T022 (security tests) pass
- No high/critical vulnerabilities found
- Constitutional Principle I satisfied

---

### T048 - GDPR/CCPA Compliance Verification
**Type**: Validation
**Estimated Time**: 1.5 hours
**Dependencies**: T042

Review compliance requirements:
- Data export API works (T020 test)
- Deletion workflows implemented
- Consent tracking in place
- Data Processing Agreement template created

**Acceptance**:
- All GDPR/CCPA requirements met
- Constitutional compliance section verified

---

### T049 - Run Full Quickstart Test Suite
**Type**: Validation
**Estimated Time**: 1 hour
**Dependencies**: All Phase 3.5 tasks

Execute all 7 test flows from quickstart.md manually:
1. Document creation from template
2. AI chat integration
3. Multi-tenant isolation
4. Offline editing
5. Version control & rollback
6. Export with audit trail
7. GDPR data export

**Acceptance**:
- All test flows pass
- All ✅ checkpoints verified
- Performance benchmarks met

---

### T050 - Documentation & README
**Type**: Documentation
**Estimated Time**: 1 hour
**Dependencies**: T049

Create comprehensive README.md with:
- Quick start guide
- Development setup
- Environment variables
- Testing instructions
- Deployment guide
- API documentation links

**Acceptance**:
- README.md created
- API documentation generated from contracts/
- Architecture diagrams included

---

## Task Summary

**Total Tasks**: 50
**Estimated Time**: ~60 hours

**Breakdown**:
- Phase 3.1 Setup: 5 tasks (~1.5 hours)
- Phase 3.2 Tests: 17 tasks (~7 hours)
- Phase 3.3 Core Implementation: 14 tasks (~22 hours)
- Phase 3.4 Integrations: 6 tasks (~10.5 hours)
- Phase 3.5 Polish: 8 tasks (~10 hours)

**Parallel Execution**:
- Phase 3.1: All 5 tasks can run in parallel (setup tasks)
- Phase 3.2: All 17 tests can be written in parallel
- Phase 3.3: Tasks mostly sequential (implementation depends on tests failing)
- Phase 3.4: 4 tasks can run in parallel after core implementation
- Phase 3.5: Tests and optimizations can run in parallel

**Critical Path**: T001 → T005 → T023 → T025 → T034 → T049
**Estimated Critical Path Time**: ~8 hours

---

## Execution Notes

1. **TDD Requirement**: All Phase 3.2 tests MUST be written and failing before starting Phase 3.3 implementation
2. **Constitutional Compliance**: Security tests (T021, T022) must pass before deployment
3. **Performance Validation**: T045, T046 optimizations required to meet performance goals from plan.md
4. **Parallel Execution**: Use `[P]` marker to run tests concurrently (e.g., all contract tests can run simultaneously)

---

*Generated from Phase 1 artifacts - Ready for implementation*
