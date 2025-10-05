# Research: Legal Document Editor with AI Integration

**Feature**: 001-the-app-need
**Date**: 2025-10-05
**Status**: Complete

## Research Areas

### 1. Tiptap Integration with Next.js 15

**Decision**: Use Tiptap 2.x with React hooks and Next.js App Router client components for editor

**Rationale**:
- Tiptap is a headless, framework-agnostic WYSIWYG editor built on ProseMirror
- Excellent TypeScript support and extensibility via plugins
- Native React integration with `@tiptap/react` package
- Supports all required features: rich text, tables, footnotes, custom marks for AI content
- Active development and legal doc editor precedents
- Client-side rendering required for interactive editing (use `'use client'` directive)
- Collaboration extension available for concurrent editing (future enhancement)

**Alternatives Considered**:
- Lexical (Meta): Newer but less mature ecosystem, fewer plugins
- Slate: More low-level, would require more custom development
- Draft.js: Deprecated by Meta, not recommended for new projects
- Quill: Simpler but less extensible for legal document formatting needs

**Implementation Notes**:
- Use `@tiptap/starter-kit` for basic functionality
- Add custom extensions: LegalNumbering, Footnotes, CrossReferences, AIContentMarker
- Store document as JSON (Tiptap's native format) in PostgreSQL JSONB column
- Convert to DOCX/PDF for export using `tiptap-to-docx` and `pdf-lib`

### 2. Supabase Multi-Tenant Architecture

**Decision**: Use Supabase with Row Level Security (RLS) policies for tenant isolation

**Rationale**:
- Supabase provides PostgreSQL + Auth + Storage + Realtime in single platform
- RLS policies enforce tenant isolation at database level (defense in depth)
- Built-in JWT-based authentication with support for OAuth providers (Google, Microsoft)
- Realtime subscriptions for concurrent editing notifications
- Edge Functions for server-side logic without managing infrastructure
- Auto-generated TypeScript types from database schema
- GDPR/CCPA compliance tools (data export, deletion)
**Alternatives Considered**:
- Firebase: Vendor lock-in, less SQL flexibility, higher cost at scale
- AWS Amplify: More complex setup, requires more DevOps expertise
- Self-hosted PostgreSQL + Auth0: More operational overhead, higher complexity
- Prisma + Clerk: Good but requires managing separate services

**Implementation Notes**:
- RLS policy pattern: `tenant_id = auth.jwt() ->> 'tenant_id'`
- Use `pg_cron` for scheduled tasks (e.g., cleanup, billing aggregation)
- Supabase Storage for document exports (PDF/DOCX files)
- Enable Point-in-Time Recovery (PITR) for 7-day backup retention

### 3. AI Provider Abstraction

**Decision**: Implement AIProviderAdapter interface with Claude, OpenAI, and GLM implementations

**Rationale**:
- Satisfies Constitutional Principle II (AI Provider Abstraction)
- Allows users to choose providers based on cost, features, compliance requirements
- Enables A/B testing of different models for legal accuracy
- Fallback mechanism for provider outages
- Future-proofs against provider pricing changes or service discontinuation

**Alternatives Considered**:
- Single provider (e.g., Claude only): Creates vendor lock-in, violates constitution
- LangChain abstraction: Adds unnecessary complexity, overhead for our use case
- Vercel AI SDK: Good but less control over prompt engineering and streaming

**Implementation Notes**:
```typescript
interface AIProviderAdapter {
  name: string;
  streamCompletion(prompt: string, context: DocumentContext): AsyncIterator<string>;
  generateCitations(query: string, jurisdiction: string): Promise<Citation[]>;
  estimateCost(tokens: number): number;
}
```
- Sanitize prompts to remove PII before API calls
- Track provider usage per tenant for billing
- Cache common legal queries to reduce API costs
- Implement exponential backoff for rate limits

### 4. Document Versioning & Cryptographic Signing

**Decision**: Use HMAC-SHA256 for version signatures with timestamp + content hash

**Rationale**:
- Satisfies Constitutional Principle III (Document Integrity & Audit Trail)
- HMAC provides authentication and integrity without requiring PKI infrastructure
- SHA-256 is NIST-approved and suitable for legal compliance
- Lightweight enough to sign on every save (every 30s)
- Verifiable by courts and regulators

**Alternatives Considered**:
- Digital signatures (RSA/ECDSA): More complex, requires key management, slower
- Simple SHA-256 hash: No authentication, can't prove who created the hash
- Blockchain: Overkill, expensive, unnecessary complexity for single-tenant documents
- No signing: Violates constitutional requirements, insufficient for legal compliance

**Implementation Notes**:
```typescript
function signVersion(content: string, timestamp: string, userId: string, tenantSecret: string): string {
  const message = `${timestamp}:${userId}:${SHA256(content)}`;
  return HMAC_SHA256(message, tenantSecret);
}
```
- Store tenant-specific HMAC secrets in Supabase Vault
- Include signature in Version table for audit trail
- Verify signatures on export to detect tampering
- Log signature mismatches as security incidents

### 5. MCP Integration for Legal Knowledge Bases

**Decision**: Use @modelcontextprotocol/sdk with custom legal knowledge base servers

**Rationale**:
- MCP provides standardized protocol for connecting AI to external data sources
- Allows integration with legal databases (Westlaw, LexisNexis, Fastcase) via custom servers
- Supports citation extraction and source attribution
- Enables jurisdiction-specific knowledge bases
- Future-proof: MCP is gaining adoption across AI tools

**Alternatives Considered**:
- Direct API integrations: More brittle, requires per-provider adapters
- RAG with vector database: Good for custom content but doesn't access commercial legal DBs
- Manual citation entry: Doesn't leverage AI capabilities, slow for users

**Implementation Notes**:
- Create MCP servers for:
  * Free legal resources (Cornell LII, Justia, Google Scholar)
  * Commercial APIs (Westlaw/LexisNexis if customer has account)
  * Tenant-specific knowledge bases (firm precedents, templates)
- Cache KB results in PostgreSQL with TTL (legal content changes slowly)
- Include jurisdiction filter in all queries
- Track citation usage for billing/analytics

### 6. Offline Support Strategy

**Decision**: Service Worker + IndexedDB for offline document editing

**Rationale**:
- Satisfies Constitutional Principle IV (Integration Layer Architecture - offline requirement)
- Legal professionals work in courts, client offices with unreliable internet
- Progressive Web App (PWA) provides app-like experience
- IndexedDB supports large documents and structured queries
- Service Worker intercepts network requests for seamless offline/online transition

**Alternatives Considered**:
- LocalStorage: 5-10MB limit, insufficient for documents + templates
- No offline support: Violates requirements, poor UX for target users
- Electron app: Platform-specific, more complex deployment, slower iteration

**Implementation Notes**:
- Use `workbox` for service worker generation
- Cache strategy:
  * Documents: "network-first" (always try server, fallback to cache)
  * Templates: "cache-first" (rarely change)
  * AI chat: "network-only" (requires real-time response)
- Sync queue for pending changes when offline
- Conflict detection when multiple devices edit offline
- Show clear offline indicator in UI

### 7. Authentication & Authorization

**Decision**: Supabase Auth with OAuth (Google/Microsoft) + email/password, optional MFA

**Rationale**:
- Enterprise users expect SSO (Google Workspace, Microsoft 365)
- Email/password for solo practitioners and small firms
- MFA optional initially, can enforce per-tenant later
- Supabase handles OAuth flows, token refresh, session management
- Role-based access control (RBAC) via Supabase policies

**Alternatives Considered**:
- Auth0: More features but higher cost, complex setup
- Clerk: Good DX but requires separate service, higher pricing
- NextAuth.js: Self-managed, more operational burden
- AWS Cognito: Complex, poor DX, high learning curve

**Implementation Notes**:
- Roles: Admin, Attorney, Paralegal, Viewer (defined in User table)
- Permissions enforced via RLS policies + API middleware
- Session expiry: 24 hours (refresh token: 30 days)
- MFA: TOTP via Supabase (Google Authenticator, Authy compatible)
- Audit all auth events in AuditLog table

### 8. Testing Strategy

**Decision**: Vitest (unit), Playwright (E2E), contract tests (Pact-style) for TDD workflow

**Rationale**:
- Constitutional requirement for Test-First Development
- Vitest: Fast, modern, excellent TypeScript support, Vite-native
- Playwright: Cross-browser, reliable, great for E2E and visual regression
- Contract tests: Ensure API stability, prevent breaking changes
- Satisfies CI/CD requirements in constitution

**Alternatives Considered**:
- Jest: Slower, older architecture, less modern than Vitest
- Cypress: Good but Playwright has better cross-browser support
- Manual testing only: Violates constitutional TDD requirement

**Implementation Notes**:
- Write failing tests BEFORE implementation
- Contract tests for all API routes (documents, AI, auth)
- E2E tests for critical user flows (auth, document editing, AI chat)
- Visual regression tests for editor (prevent UI regressions)
- Coverage target: 80% for critical paths (versioning, auth, RLS)

### 9. Performance Optimization

**Decision**: Edge caching (Vercel Edge), PostgreSQL indexing, lazy loading, streaming AI responses

**Rationale**:
- Requirements: <2s document load, <5s AI response, <200ms sync
- Edge caching reduces TTFB for static assets and API routes
- Proper indexing critical for multi-tenant queries at scale
- Lazy loading reduces initial bundle size
- Streaming AI responses improve perceived performance

**Alternatives Considered**:
- Client-side only optimization: Insufficient for multi-tenant scale
- CDN only: Doesn't help with database queries
- No optimization: Will fail performance requirements

**Implementation Notes**:
- PostgreSQL indexes:
  * (tenant_id, document_id) composite for RLS queries
  * GIN index on JSONB document content for full-text search
  * BTREE index on created_at for sorting
- Next.js Image optimization for template previews
- Dynamic imports for heavy components (PDF viewer, chart library)
- React Suspense for streaming AI responses
- Vercel Edge Config for feature flags and A/B tests

### 10. GDPR/CCPA Compliance

**Decision**: Data export API, deletion workflows, consent tracking, data residency options

**Rationale**:
- Constitutional requirement (Compliance & Legal Requirements)
- EU/California users have right to data access, portability, deletion
- Legal tech must meet higher compliance bar than general SaaS
- Attorney-client privilege requires extra protections

**Alternatives Considered**:
- Manual compliance: Doesn't scale, error-prone
- Ignore until required: Risky, expensive to retrofit

**Implementation Notes**:
- Data export: ZIP file with all documents, conversations, audit logs (JSON + PDF)
- Deletion: Soft-delete with 30-day grace period, hard-delete after (except audit logs)
- Consent: Track in UserConsent table (analytics, AI training, marketing)
- Data residency: Supabase regions (US, EU, Asia) - tenant selects on signup
- Retention: Documents retain 7 years even after user deletion (legal requirement)
- DPA template: Data Processing Agreement for enterprise customers

## Research Summary

All technical unknowns resolved. Key decisions:
1. **Frontend**: Tiptap 2.x + Next.js 15 + Tailwind CSS
2. **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
3. **AI**: Provider abstraction layer (Claude/OpenAI/GLM)
4. **Versioning**: HMAC-SHA256 signatures, immutable audit trail
5. **Offline**: Service Worker + IndexedDB
6. **MCP**: Custom legal knowledge base integrations
7. **Auth**: Supabase Auth with OAuth + email/password + optional MFA
8. **Testing**: Vitest + Playwright + contract tests (TDD)
9. **Performance**: Edge caching, indexing, lazy loading, streaming
10. **Compliance**: GDPR/CCPA workflows, data residency, consent tracking

All constitutional principles satisfied. Ready for Phase 1 (Design & Contracts).
