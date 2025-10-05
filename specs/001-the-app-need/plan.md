
# Implementation Plan: Legal Document Editor with AI Integration

**Branch**: `001-the-app-need` | **Date**: 2025-10-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-the-app-need/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code, or `AGENTS.md` for all other agents).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

**Primary Requirement**: Build a multi-tenant legal document editor with AI integration featuring a three-panel layout (menu bar, Tiptap editor, AI chat), immutable version control, and comprehensive audit trails for attorney-client privileged documents.

**Technical Approach**: Next.js 15 full-stack application with Supabase multi-tenant PostgreSQL backend, Tiptap rich text editor, AI provider abstraction layer supporting Claude/ChatGPT/GLM, MCP integrations for legal knowledge bases, and cryptographically-signed document versioning for compliance with legal professional responsibility standards.

## Technical Context
**Language/Version**: TypeScript 5.x with Next.js 15.x (App Router), React 19.x
**Primary Dependencies**:
- Frontend: Tiptap 2.x (WYSIWYG editor), Tailwind CSS 4.x, Framer Motion
- Backend: Supabase (PostgreSQL + Auth + Storage + Realtime), Prisma ORM
- AI: Anthropic Claude SDK, OpenAI SDK, custom provider abstraction layer
- MCP: @modelcontextprotocol/sdk for knowledge base integrations
**Storage**: Supabase PostgreSQL with Row Level Security (RLS) for multi-tenancy, Supabase Storage for document exports
**Testing**: Vitest (unit), Playwright (E2E), Jest (integration), Contract testing for API endpoints
**Target Platform**: Web (Chrome/Firefox/Safari/Edge latest 2 versions), Progressive Web App (PWA) for offline support
**Project Type**: web (Next.js full-stack with frontend + backend API routes)
**Performance Goals**:
- Document rendering: <2s for 50-page documents
- AI streaming responses: First token <1s, complete response <5s
- Auto-save latency: <500ms to Supabase
- Real-time sync: <200ms for concurrent edits
**Constraints**:
- Offline-capable editor (IndexedDB for local storage)
- TLS 1.3+ for all communications
- GDPR/CCPA compliant data handling
- Attorney-client privilege protection (no data training)
- Cryptographic signing for audit trails (HMAC-SHA256)
**Scale/Scope**:
- Initial: 100 concurrent users, 10K documents/tenant, 1GB storage/tenant
- Target: 1000 concurrent users, 100K documents/tenant, 10GB storage/tenant

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Security-First Development
- [x] All document data encrypted at rest (Supabase encryption) and in transit (TLS 1.3+)
- [x] AI API calls do not expose client/case identifying information without consent (sanitized prompts, no PII in API calls)
- [x] Enterprise SSO and MFA support planned (Supabase Auth with OAuth providers + MFA)
- [x] Audit logging implemented for all data access (Supabase audit logs + custom AuditLog table)
- [x] Third-party integrations have undergone security review (MCP integrations sandboxed, Drive/365 via OAuth)

### II. AI Provider Abstraction
- [x] Core features function independently of specific AI providers (Tiptap editor works offline)
- [x] Adapter/provider pattern used for AI integration (AIProviderAdapter interface with Claude/OpenAI/GLM implementations)
- [x] Provider switching does not require document migration (provider metadata stored separately from document content)
- [x] AI responses include provider attribution and citations (AIConversation entity tracks provider + sources)

### III. Document Integrity & Audit Trail
- [x] Every document modification is versioned with timestamp, user, and description (Version entity with RLS)
- [x] AI-generated content is distinguishable from human content (metadata tags + visual indicators in Tiptap)
- [x] Version history is immutable with cryptographic signing (HMAC-SHA256 signatures on version snapshots)
- [x] Document exports preserve full audit metadata (PDF/A with XMP metadata, DOCX with track changes)

### IV. Integration Layer Architecture
- [x] External integrations use adapter pattern (StorageAdapter for Drive/365, MCPAdapter for knowledge bases)
- [x] Integration failures do not block core editing functionality (offline-first architecture with IndexedDB)
- [x] Integration data is cached for offline operation (service worker + IndexedDB for templates and KB results)
- [x] Circuit breaker patterns implemented for integration health (exponential backoff + fallback to cached data)

### V. Template System & Domain Knowledge
- [x] Templates include jurisdiction metadata (Template entity with jurisdiction enum)
- [x] AI recommendations include citations to source material (KnowledgeSource citations linked to AIConversation)
- [ ] Templates reviewed by licensed attorneys before deployment (process documented, requires manual review workflow)
- [x] AI confidence levels indicated for legal suggestions (confidence score 0-1 + uncertainty flags)

**Compliance & Legal Requirements**:
- [x] GDPR/CCPA compliance measures in place (data export, deletion, consent tracking in Supabase)
- [x] Attorney-client privilege protection ensured (no AI training on user data, explicit opt-in required)
- [x] Jurisdictional awareness implemented (jurisdiction field on templates, configurable per tenant)
- [x] Professional liability safeguards documented (AI disclaimers, terms of service, error reporting system)

**GATE STATUS**: PASS (1 item requires manual process setup - attorney template review workflow)

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
mindlaw/
├── app/                           # Next.js 15 App Router
│   ├── (auth)/                   # Auth routes group
│   │   ├── login/
│   │   ├── signup/
│   │   └── reset-password/
│   ├── (dashboard)/              # Protected routes
│   │   ├── documents/
│   │   │   ├── [id]/            # Document editor page
│   │   │   └── page.tsx         # Document list
│   │   ├── templates/
│   │   ├── settings/
│   │   └── admin/               # Tenant admin
│   ├── api/                      # API routes
│   │   ├── documents/
│   │   ├── ai/                  # AI provider endpoints
│   │   ├── templates/
│   │   ├── auth/
│   │   └── webhooks/
│   ├── layout.tsx
│   └── globals.css
│
├── components/                    # React components
│   ├── editor/
│   │   ├── TiptapEditor.tsx
│   │   ├── EditorToolbar.tsx
│   │   ├── AIContentMarker.tsx
│   │   └── VersionHistory.tsx
│   ├── chat/
│   │   ├── AIChat.tsx
│   │   ├── ChatMessage.tsx
│   │   └── ProviderSelector.tsx
│   ├── sidebar/
│   │   ├── DocumentList.tsx
│   │   ├── TemplateLibrary.tsx
│   │   └── UserMenu.tsx
│   ├── ui/                       # shadcn/ui components
│   └── providers/
│       ├── SupabaseProvider.tsx
│       └── ThemeProvider.tsx
│
├── lib/                          # Core libraries
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── ai/
│   │   ├── providers/
│   │   │   ├── AIProviderAdapter.ts
│   │   │   ├── ClaudeProvider.ts
│   │   │   ├── OpenAIProvider.ts
│   │   │   └── GLMProvider.ts
│   │   ├── prompt-sanitizer.ts
│   │   └── citation-parser.ts
│   ├── mcp/
│   │   ├── MCPAdapter.ts
│   │   └── knowledge-base-client.ts
│   ├── versioning/
│   │   ├── document-versioner.ts
│   │   ├── crypto-signer.ts
│   │   └── diff-generator.ts
│   ├── storage/
│   │   ├── StorageAdapter.ts
│   │   ├── DriveAdapter.ts
│   │   └── OneDriveAdapter.ts
│   └── utils/
│       ├── audit-logger.ts
│       └── rls-helpers.ts
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/
│   └── seed.ts
│
├── tests/
│   ├── contract/                 # API contract tests
│   │   ├── documents.test.ts
│   │   ├── ai.test.ts
│   │   └── auth.test.ts
│   ├── integration/              # Integration tests
│   │   ├── document-editor.test.ts
│   │   ├── ai-chat.test.ts
│   │   └── multi-tenant.test.ts
│   ├── e2e/                      # Playwright E2E
│   │   ├── auth-flow.spec.ts
│   │   ├── document-editing.spec.ts
│   │   └── ai-interaction.spec.ts
│   └── unit/                     # Unit tests
│       ├── ai-providers.test.ts
│       ├── versioning.test.ts
│       └── crypto-signer.test.ts
│
├── public/
│   ├── templates/                # Initial legal templates
│   └── icons/
│
├── supabase/
│   ├── migrations/               # Supabase migrations
│   ├── functions/                # Edge functions
│   └── config.toml
│
└── docs/
    ├── api/                      # API documentation
    ├── architecture/
    └── compliance/               # GDPR/CCPA compliance docs
```

**Structure Decision**: Next.js 15 full-stack web application with App Router. All code in single `mindlaw/` repository. Frontend components in `components/`, backend API routes in `app/api/`, shared libraries in `lib/`, database schema in `prisma/`. Multi-tenant isolation enforced via Supabase Row Level Security (RLS) policies. Offline support via service worker + IndexedDB (not shown in tree). Tests organized by type (contract/integration/e2e/unit) for TDD workflow.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
1. **From Contracts** (documents-api.yaml, ai-api.yaml):
   - Contract test for GET /documents [P]
   - Contract test for POST /documents [P]
   - Contract test for PATCH /documents/:id [P]
   - Contract test for GET /documents/:id/versions [P]
   - Contract test for POST /documents/:id/rollback [P]
   - Contract test for POST /documents/:id/export [P]
   - Contract test for POST /ai/chat/:id/stream [P]
   - Contract test for GET /ai/providers [P]

2. **From Data Model** (14 entities):
   - Prisma schema definition [P]
   - RLS policy creation for each entity [P]
   - Database migration scripts
   - Seed data for development

3. **From Quickstart** (7 test flows):
   - Integration test: Document creation from template
   - Integration test: AI chat with citation generation
   - Integration test: Multi-tenant isolation
   - Integration test: Offline editing and sync
   - Integration test: Version control and rollback
   - Integration test: Document export with audit trail
   - Integration test: GDPR data export

4. **Core Implementation Tasks**:
   - Tiptap editor setup with custom extensions
   - AI provider adapter interface + implementations (Claude/OpenAI/GLM)
   - Document versioning service with HMAC signing
   - Supabase client configuration + RLS helpers
   - MCP adapter for knowledge base integration
   - Service worker + IndexedDB for offline support
   - Export service (DOCX/PDF/PDF-A generation)

**Ordering Strategy**:
- **Phase 3.1 Setup**: Project init, Supabase setup, Prisma schema, security scanning
- **Phase 3.2 Tests First** (TDD - MUST COMPLETE BEFORE 3.3):
  * All 8 contract tests [P]
  * All 7 integration tests from quickstart [P]
  * Security tests (RLS, encryption, audit logging) [P]
- **Phase 3.3 Core Implementation** (ONLY after tests failing):
  * Database entities (Prisma models)
  * AI provider adapters
  * Document versioning + crypto signing
  * Tiptap editor components
- **Phase 3.4 Integration**:
  * Supabase auth + RLS enforcement
  * MCP knowledge base client
  * Storage adapters (Drive, OneDrive)
  * Offline service worker
- **Phase 3.5 Polish**:
  * Unit tests for critical services
  * Performance optimization
  * Security audit
  * GDPR/CCPA compliance verification

**Estimated Output**: 40-50 numbered, ordered tasks in tasks.md

**Dependencies**:
- Tests (contract + integration) MUST be written and failing before any implementation
- Prisma schema blocks all database-dependent tasks
- AI adapter interface blocks provider implementations
- Tiptap editor blocks UI components
- Service worker blocks offline features

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command) - `research.md` created
- [x] Phase 1: Design complete (/plan command) - `data-model.md`, `contracts/`, `quickstart.md` created
- [x] Phase 2: Task planning complete (/plan command - describe approach only) - Strategy documented above
- [ ] Phase 3: Tasks generated (/tasks command) - Ready for `/tasks` execution
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS (1 item requires manual process - attorney template review workflow)
- [x] Post-Design Constitution Check: PASS (re-verified after Phase 1, no new violations)
- [x] All NEEDS CLARIFICATION resolved (made reasonable technical decisions for MVP)
- [x] Complexity deviations documented (None - all constitutional principles satisfied)

**Artifacts Generated**:
- ✅ `plan.md` - This file (implementation plan)
- ✅ `research.md` - Technical decisions and alternatives (10 research areas)
- ✅ `data-model.md` - Database schema with 14 entities, RLS policies, indexes
- ✅ `contracts/documents-api.yaml` - OpenAPI spec for document management (11 endpoints)
- ✅ `contracts/ai-api.yaml` - OpenAPI spec for AI integration (2 endpoints)
- ✅ `quickstart.md` - Manual test scenarios (7 user flows, 4 performance benchmarks)

**Ready for Next Phase**: Execute `/tasks` command to generate `tasks.md`

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
