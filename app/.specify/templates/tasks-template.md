# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools
- [ ] T004 [P] Configure security scanning (SAST, dependency scanning, secrets detection)
- [ ] T005 [P] Set up encryption libraries and secure credential storage

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T006 [P] Contract test POST /api/users in tests/contract/test_users_post.py
- [ ] T007 [P] Contract test GET /api/users/{id} in tests/contract/test_users_get.py
- [ ] T008 [P] Integration test user registration in tests/integration/test_registration.py
- [ ] T009 [P] Integration test auth flow in tests/integration/test_auth.py
- [ ] T010 [P] Security test for encryption at rest/transit in tests/security/test_encryption.py
- [ ] T011 [P] Audit trail test for document versioning in tests/integration/test_audit_trail.py

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T012 [P] User model in src/models/user.py
- [ ] T013 [P] UserService CRUD in src/services/user_service.py
- [ ] T014 [P] CLI --create-user in src/cli/user_commands.py
- [ ] T015 [P] AI provider adapter interface in src/services/ai/provider_adapter.py
- [ ] T016 POST /api/users endpoint
- [ ] T017 GET /api/users/{id} endpoint
- [ ] T018 Input validation with security sanitization
- [ ] T019 Error handling and audit logging
- [ ] T020 Document versioning and cryptographic signing

## Phase 3.4: Integration
- [ ] T021 Connect UserService to DB with encryption at rest
- [ ] T022 Auth middleware (SSO/MFA support)
- [ ] T023 Audit logging for all data access
- [ ] T024 CORS and security headers (TLS 1.3+)
- [ ] T025 [P] Integration adapter for external services (Drive, Office 365)
- [ ] T026 Circuit breaker pattern for integration health monitoring

## Phase 3.5: Polish
- [ ] T027 [P] Unit tests for validation in tests/unit/test_validation.py
- [ ] T028 Performance tests (document loading <2s, AI response <5s)
- [ ] T029 [P] Security audit and penetration testing
- [ ] T030 [P] Compliance verification (GDPR/CCPA requirements)
- [ ] T031 [P] Update docs/api.md with security and audit trail documentation
- [ ] T032 Remove duplication
- [ ] T033 Run manual-testing.md with legal professional UAT

## Dependencies
- Setup (T001-T005) before tests
- Tests (T006-T011) before implementation (T012-T020)
- T012 blocks T013, T021
- T015 (AI adapter) blocks AI integration features
- T022 (Auth middleware) blocks T024 (Security headers)
- Integration (T021-T026) before polish (T027-T033)

## Parallel Example
```
# Launch T006-T011 together (all test tasks):
Task: "Contract test POST /api/users in tests/contract/test_users_post.py"
Task: "Contract test GET /api/users/{id} in tests/contract/test_users_get.py"
Task: "Integration test registration in tests/integration/test_registration.py"
Task: "Integration test auth in tests/integration/test_auth.py"
Task: "Security test for encryption at rest/transit in tests/security/test_encryption.py"
Task: "Audit trail test for document versioning in tests/integration/test_audit_trail.py"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task