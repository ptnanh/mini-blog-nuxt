# Mini Notes

A full-stack notes application with sub-tasks, built to practice Nuxt 4, Vue 3, TypeScript, and PostgreSQL.

## Tech Stack

- **Frontend:** Nuxt 4, Vue 3 Composition API, TypeScript
- **Backend:** Nuxt server routes (Nitro), REST API
- **Database:** PostgreSQL, Drizzle ORM
- **Development tools:** Docker Compose

## Features

- Create, edit, delete, and view notes
- Manage tasks within each note
- Filter notes by status
- Note detail page
- Responsive interface
- Light and dark mode

## Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- Docker Desktop with Docker Compose

## Run Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file from `.env.example`.

**Windows PowerShell:**

```powershell
copy .env.example .env
```

Update `DATABASE_URL` in `.env` to match the PostgreSQL configuration in `docker-compose.yml`.

### 4. Start the database

```bash
docker compose up -d
```

Make sure PostgreSQL is running before proceeding.

### 5. Run database migrations

```bash
npm run db:migrate
```

### 6. Seed sample data

```bash
npm run db:seed
```

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | Start the development server                 |
| `npm run build`       | Build the application for production         |
| `npm run generate`    | Generate a static version of the application |
| `npm run preview`     | Preview the production build                 |
| `npm run typecheck`   | Run TypeScript checks                        |
| `npm run db:generate` | Generate database migrations                 |
| `npm run db:migrate`  | Apply database migrations                    |
| `npm run db:seed`     | Insert sample data into the database         |

## Project Structure

```text
app/                  # Nuxt frontend application
server/
  api/                # API endpoints
  database/           # Database schema, migrations, and seed data
shared/
  types/              # Shared TypeScript types
```

## Notes

- Do not commit your `.env` file or database credentials.
- Keep `.env.example` in the repository with placeholder values.
- Run database migrations before seeding sample data.
