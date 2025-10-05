# Quickstart Test: Legal Document Editor

**Feature**: 001-the-app-need
**Purpose**: Manual validation of core user flows
**Estimated Time**: 20 minutes

## Prerequisites

- Development environment running (Next.js dev server + Supabase)
- Test tenant created with sample data
- Test user accounts: admin@test.law, attorney@test.law, viewer@test.law
- Browser with DevTools open

## Test Flow 1: Document Creation from Template

**Goal**: Verify document creation, template instantiation, and versioning

1. **Login** as attorney@test.law
   - Navigate to `http://localhost:3000/login`
   - Enter credentials
   - ✅ Redirects to `/documents` dashboard
   - ✅ Shows welcome message with user name

2. **Select Template**
   - Click "New Document" in left sidebar
   - Select "Commercial Lease Agreement - California"
   - ✅ Template preview shown
   - ✅ Jurisdiction badge shows "US-CA"

3. **Fill Template Parameters**
   - Enter: Client Name = "Acme Corp"
   - Enter: Effective Date = "2025-11-01"
   - Enter: Property Address = "123 Main St, San Francisco"
   - Click "Create Document"
   - ✅ Document created and editor opens
   - ✅ Placeholders replaced with entered values
   - ✅ Document title = "Commercial Lease Agreement - Acme Corp"

4. **Verify Initial Version**
   - Check version indicator (top-right)
   - ✅ Shows "Version 1.0"
   - ✅ No unsaved changes indicator

5. **Make Edit**
   - Add paragraph: "Additional clause: Tenant shall..."
   - Wait 30 seconds (auto-save)
   - ✅ Shows "Saving..." then "Saved"
   - ✅ Version increments to "Version 1.1"

6. **View Version History**
   - Click version indicator
   - ✅ Shows 2 versions in dropdown
   - ✅ Each version shows timestamp and user

---

## Test Flow 2: AI Chat Integration

**Goal**: Verify AI provider abstraction, citation generation, content insertion

1. **Open AI Chat Panel** (right sidebar)
   - ✅ Chat panel is visible
   - ✅ Shows "Claude" as default provider
   - ✅ Provider selector dropdown available

2. **Ask Legal Question**
   - Type: "What are standard rent escalation clauses for California commercial leases?"
   - Press Enter
   - ✅ Message appears in chat
   - ✅ AI response streams in (shows typing indicator)
   - ✅ Response includes citations (e.g., "Cal. Civ. Code § 1954")
   - ✅ Response time < 5 seconds for first token

3. **Verify Citation Links**
   - Click on a citation link
   - ✅ Opens knowledge source in new tab OR shows citation details popup
   - ✅ Citation includes: case name, jurisdiction, excerpt

4. **Insert AI Suggestion**
   - Hover over AI response with suggested clause text
   - Click "Insert into Document"
   - ✅ Text inserted at cursor position in editor
   - ✅ Inserted text has AI content marker (light blue background)
   - ✅ Auto-save triggers
   - ✅ Version increments

5. **Switch AI Provider**
   - Select "OpenAI" from provider dropdown
   - Ask: "Summarize the key terms of this lease"
   - ✅ Response uses OpenAI (different response style)
   - ✅ Previous conversation with Claude preserved in history
   - ✅ Provider attribution shown on each message

---

## Test Flow 3: Multi-Tenant Isolation

**Goal**: Verify tenant data isolation and RLS policies

1. **Create Document as attorney@test.law**
   - Create document "Confidential Agreement - Tenant A"
   - Note document ID from URL
   - Logout

2. **Login as Different Tenant**
   - Login as attorney@otherfirm.law (different tenant)
   - Try to access document via direct URL: `/documents/{document_id_from_step_1}`
   - ✅ Shows 404 Not Found OR redirects to dashboard
   - ✅ Console shows no data leakage in network tab
   - ✅ Document NOT visible in document list

3. **Verify Audit Log**
   - Login as admin@test.law
   - Navigate to Admin > Audit Log
   - ✅ Shows unauthorized access attempt by attorney@otherfirm.law
   - ✅ Log includes: timestamp, user email, resource ID, event type

---

## Test Flow 4: Offline Support

**Goal**: Verify offline editing and sync resumption

1. **Open Document**
   - Login and open any document
   - ✅ Document loads normally

2. **Go Offline**
   - Open DevTools > Network tab
   - Enable "Offline" mode
   - ✅ UI shows offline indicator (e.g., yellow banner "You are offline")

3. **Edit Offline**
   - Type: "This edit was made offline"
   - ✅ Editor remains functional
   - ✅ Changes saved to IndexedDB (check Application > IndexedDB)
   - ✅ Sync queue shows pending changes

4. **Go Back Online**
   - Disable "Offline" mode in DevTools
   - ✅ Offline indicator disappears
   - ✅ Pending changes sync to server automatically
   - ✅ Version increments on server
   - ✅ No data loss

5. **Verify AI Chat Offline**
   - Try to send AI message while offline
   - ✅ Shows clear error: "AI chat requires internet connection"
   - ✅ Message not lost (saved locally)
   - ✅ Retry button appears when back online

---

## Test Flow 5: Version Control & Rollback

**Goal**: Verify immutable audit trail and rollback functionality

1. **Create Multiple Versions**
   - Open document
   - Make edit: "Version 2 edit"
   - Wait for auto-save (Version 2.0)
   - Make edit: "Version 3 edit"
   - Wait for auto-save (Version 3.0)

2. **View Version History**
   - Click version indicator > "View Full History"
   - ✅ Shows 3 versions with diffs
   - ✅ Each version shows:
     - Timestamp (UTC)
     - User name
     - Change description
     - Content hash
     - Signature status (✅ Valid)

3. **Preview Old Version**
   - Click "Version 1.0"
   - ✅ Editor shows read-only view of Version 1 content
   - ✅ Banner shows: "Viewing Version 1.0 (read-only)"
   - ✅ "Restore this Version" button visible

4. **Rollback**
   - Click "Restore this Version"
   - Enter reason: "Reverted erroneous edits"
   - Confirm
   - ✅ Document content restored to Version 1
   - ✅ New version created (Version 4.0) with rollback note
   - ✅ Audit log shows rollback event with reason

5. **Verify Signature Integrity**
   - View any version
   - Check signature status badge
   - ✅ Shows "✅ Signature Valid"
   - ✅ Tooltip shows: HMAC-SHA256, timestamp, signer

---

## Test Flow 6: Export with Audit Trail

**Goal**: Verify document export with metadata preservation

1. **Export as PDF/A**
   - Open document with multiple versions and AI suggestions
   - Click "Export" > "PDF with Audit Trail"
   - ✅ Export dialog shows options:
     - Include version history ✅
     - Include AI conversations ☐
     - Format: PDF/A (archival)

2. **Download and Verify**
   - Click "Generate Export"
   - ✅ Shows progress indicator
   - ✅ Download starts within 10 seconds
   - Open PDF in viewer
   - ✅ Document content rendered correctly
   - ✅ Audit trail appended as separate pages
   - ✅ Each version timestamped
   - ✅ AI-suggested content marked with icons

3. **Verify Metadata**
   - Check PDF properties (File > Properties)
   - ✅ XMP metadata includes:
     - Document ID
     - Tenant ID
     - Creation date
     - All version timestamps
     - Cryptographic signatures
     - AI providers used

---

## Test Flow 7: GDPR Data Export

**Goal**: Verify GDPR compliance and data portability

1. **Request Data Export**
   - Login as attorney@test.law
   - Navigate to Settings > Privacy
   - Click "Export My Data"
   - ✅ Confirmation modal explains what's included
   - Confirm request

2. **Receive Export**
   - ✅ Email sent to user: "Your data export is ready"
   - Click link in email
   - ✅ Downloads ZIP file

3. **Verify Export Contents**
   - Extract ZIP
   - ✅ Contains:
     - `profile.json` (user account data)
     - `documents/` (all documents as DOCX + JSON)
     - `ai_conversations/` (JSON files)
     - `audit_logs/` (CSV or JSON)
     - `README.txt` (explains file structure)
   - ✅ All data matches user's actual data

---

## Performance Benchmarks

Run these with Chrome DevTools Performance tab:

1. **Document Load Time**
   - Open 50-page document
   - ✅ Time to Interactive < 2 seconds
   - ✅ First Contentful Paint < 500ms

2. **AI Response Time**
   - Send AI query
   - ✅ First token < 1 second
   - ✅ Complete response < 5 seconds

3. **Auto-save Latency**
   - Type 100 words
   - Trigger auto-save
   - ✅ Save completes < 500ms
   - ✅ No typing lag

4. **Concurrent Edits**
   - Open same document in 2 browser tabs (same user)
   - Edit in both tabs
   - ✅ Conflict detection works
   - ✅ No data loss
   - ✅ Sync latency < 200ms

---

## Security Validation

1. **RLS Policy Check**
   - Open Supabase Dashboard > Table Editor
   - View `documents` table as different users
   - ✅ Each user sees only their tenant's documents
   - ✅ Direct SQL query with wrong `tenant_id` returns no rows

2. **JWT Token Inspection**
   - Open DevTools > Application > Local Storage
   - Find Supabase auth token
   - Decode JWT at jwt.io
   - ✅ Contains `tenant_id` claim
   - ✅ Contains `user_id` claim
   - ✅ Contains `role` claim

3. **API Authorization**
   - Send API request with missing or invalid JWT
   - ✅ Returns 401 Unauthorized
   - Send API request with valid JWT but wrong tenant
   - ✅ Returns 403 Forbidden or 404 Not Found

---

## Success Criteria

All test flows must pass with ✅ for feature to be considered complete. Any failures must be logged as bugs and fixed before deployment.

**Sign-off**: [ ] QA Lead  [ ] Product Owner  [ ] Security Review
