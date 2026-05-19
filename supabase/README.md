# Supabase Setup

1. Create a Supabase project.
2. Run migrations in `supabase/migrations`.
3. Enable Auth providers:
   - Email/password.
   - Google OAuth.
   - Phone Auth with an SMS provider.
4. Add Vercel callback URLs:
   - `https://YOUR_DOMAIN/auth/callback`
   - `http://localhost:3000/auth/callback`
5. Create the first company and admin member manually or through a restricted internal script.

Production starts with no leads, customers, contracts, installments, costs or technical records.
