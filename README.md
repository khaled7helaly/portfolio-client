# Portfolio frontend

This directory contains the Vite + React frontend. It uses JavaScript and local
mock data only; it does not connect to or implement a backend.

## Getting started

```bash
npm install
npm run dev
```

## Architecture

- `src/app/`: application routing and shared layouts.
- `src/pages/`: route-level screens.
- `src/sections/`: composable portfolio sections.
- `src/components/`: reusable presentation components and feedback.
- `src/content/`: fixed interface copy and navigation labels.
- `src/data/mock/`: local project and certificate records.
- `src/services/`: asynchronous public-data access; replace the mock imports
  here when an API is introduced.
- `src/hooks/`: React data state, loading/error handling, and retry behavior.
- `src/styles/`: design tokens and global browser styles.

The data flow is `pages/sections -> hooks -> services -> data/mock`. UI
components must not import mock records directly. Before connecting an API,
validate and map its responses in the service layer to preserve the frontend
data contract; this scaffold does not assume that API work is change-free.

Projects use `id` and `slug` as unique identifiers. `featured` controls the
home-page selection, `published` controls public visibility, and `status`
describes the project's progress. `technologies` is an array of labels;
`image`, `liveUrl`, and `githubUrl` are optional strings and may be empty.
Certificates use unique `id` values, `title`, `issuer`, `issueDate`,
`credentialUrl`, `image`, and `published`. The mock certificate record is an
explicitly labeled unpublished placeholder, not a qualification claim.
Project mock records are also explicit unpublished placeholders and are
filtered out of public service results.

## Routes

- `/` — home page with featured projects and certificates
- `/projects` — published projects
- `/projects/:slug` — published project details; missing or unpublished slugs
  show an unavailable state
- `*` — not-found page

## Scripts

- `npm run dev` — start Vite
- `npm run lint` — run Oxlint
- `npm run build` — create the production bundle
- `npm run preview` — preview the production bundle

There is not yet a test runner configured in this client package.
