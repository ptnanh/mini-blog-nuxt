# Mini Notes

A full-stack notes app with sub-tasks, built to practice Nuxt 4, TypeScript and PostgreSQL.

## Tech stack

- Nuxt 4, Vue 3 (Composition API), TypeScript
- Nitro server routes (REST API)
- PostgreSQL with Drizzle ORM (schema and migrations)
- Docker Compose for the local database

## Features

- Create, edit, complete and delete notes
- Add sub-tasks to each note and track progress
- Filter by all, to do or done
- Detail page for each note
- Responsive UI with light and dark mode

## Run locally

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

Then open http://localhost:3000.

## Project structure

- `app/` pages, layouts, components, composables
- `server/api/` REST endpoints
- `server/database/` schema and migrations
- `shared/types/` types shared by the app and the server
