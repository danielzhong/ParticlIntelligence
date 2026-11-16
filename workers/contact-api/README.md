# Partintell contact API

This Worker accepts the website's contact form at `https://api.partintell.com/contact`
and stores submissions in a private D1 database. It exposes no endpoint for reading
submissions. Review them in Cloudflare's D1 console with a query such as:

```sql
SELECT id, name, email, organization, application, goals, created_at
FROM inquiries
ORDER BY created_at DESC;
```

## One-time Cloudflare setup

Run these commands from this directory with Wrangler installed and authenticated:

```sh
npx wrangler@latest login
npx wrangler@latest d1 create partintell-contact
```

Copy the returned database UUID into `wrangler.toml` in place of
`REPLACE_WITH_D1_DATABASE_ID`, then run:

```sh
npx wrangler@latest d1 migrations apply partintell-contact --remote
npx wrangler@latest deploy
```

The custom-domain route creates `api.partintell.com` for the Worker. Its zone must
be active in the same Cloudflare account. Confirm the domain is available under
Workers & Pages after deploy, then submit a test inquiry from the live site.

Submissions are stored; this setup does not send notification emails. Check the
D1 database for new records. If you later want email alerts, connect an email
provider such as Resend or MailChannels to the Worker and keep its API key in a
Worker secret.
