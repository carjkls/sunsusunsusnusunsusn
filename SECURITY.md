# Security Policy

## Supported Version

The production branch is `main`.

## Reporting

Report security issues privately to the project owner before opening public issues.

Include:

- affected route or table;
- account role used;
- expected behavior;
- observed behavior;
- reproduction steps;
- screenshots or logs without secrets.

## Scope

Allowed:

- testing your own deployment;
- testing RLS isolation with accounts you control;
- checking auth redirects and role restrictions.

Not allowed:

- attacking third-party services;
- brute forcing real users;
- exfiltrating data;
- bypassing rate limits;
- scanning infrastructure you do not own.

## Core Controls

- Supabase Auth for identity.
- Supabase RLS for authorization.
- `company_id` isolation for business data.
- Role-based policies for admin, comercial, financeiro and tecnico.
- Server-only service role key.
- No production seed with prototype customer data.
