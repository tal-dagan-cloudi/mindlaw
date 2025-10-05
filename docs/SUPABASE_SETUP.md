# Supabase Setup Guide

## Prerequisites
- Supabase account at https://supabase.com
- Access to create new projects

## Step 1: Create Supabase Project

1. Log into Supabase dashboard: https://app.supabase.com
2. Click "New Project"
3. Fill in project details:
   - **Name**: `mindlaw-production` (or `mindlaw-dev` for development)
   - **Database Password**: Generate a strong password and save it securely
   - **Region**: Choose based on data residency requirements (us-east-1, eu-west-1, etc.)
   - **Plan**: Free tier for development, Pro/Team for production
4. Wait for project to provision (~2 minutes)

## Step 2: Get API Credentials

Once the project is ready:

1. Go to **Settings** → **API**
2. Copy the following credentials:
   - **Project URL**: `https://[project-ref].supabase.co`
   - **Anon (public) key**: `eyJ...` (safe to use in browser)
   - **Service role key**: `eyJ...` (secret, server-side only)

## Step 3: Configure Environment Variables

Create `.env.local` file in project root (copy from `.env.local.example`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key...

# AI Providers (to be configured later)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GLM_API_KEY=

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Step 4: Enable Authentication Providers

1. Go to **Authentication** → **Providers**
2. Enable the following providers:
   - ✅ Email (already enabled)
   - ✅ Google OAuth
   - ✅ Microsoft OAuth (Azure AD)

### Google OAuth Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth credentials
3. Add authorized redirect URI: `https://[project-ref].supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret to Supabase

### Microsoft OAuth Setup:
1. Go to [Azure Portal](https://portal.azure.com)
2. Register new app in Azure AD
3. Add redirect URI: `https://[project-ref].supabase.co/auth/v1/callback`
4. Copy Application (client) ID and Client Secret to Supabase

## Step 5: Configure Row Level Security (RLS)

RLS policies will be created automatically when running Prisma migrations in Task T023.

## Step 6: Enable Realtime (Optional)

For collaborative editing features:

1. Go to **Database** → **Replication**
2. Enable replication for tables:
   - `documents`
   - `versions`
   - `ai_conversations`

## Step 7: Configure Storage

1. Go to **Storage**
2. Create buckets:
   - `document-exports` (private)
   - `template-attachments` (public)
   - `user-avatars` (public)

## Step 8: Verify Connection

Run the following command to test connection:

```bash
npm install
npm run db:push
```

If successful, you should see "Database is up to date" message.

## Troubleshooting

### Connection timeout
- Check firewall settings
- Verify project URL is correct
- Ensure database password is correct

### RLS policies preventing access
- Temporarily disable RLS for testing: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`
- Check JWT token includes `tenant_id` claim
- Verify user role in `users` table

### Authentication errors
- Confirm OAuth redirect URIs match exactly
- Check OAuth credentials are not expired
- Verify email confirmation settings in Auth settings

## Next Steps

After Supabase is configured:
1. Install dependencies (Task T003)
2. Initialize Prisma schema (Task T005)
3. Run database migrations (Task T023)
