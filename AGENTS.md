# Horoscope Project

Ứng dụng xem tử vi.

## Cấu trúc project

- `frontend/`: Next.js + React
- `backend/`: NestJS
- Database: PostgreSQL
- ORM: Prisma

## Frontend

Chạy frontend:

npm install
npm run dev

## Backend

Chạy backend:

npm install
npm run dev

## Architecture

```text
┌──────────────┐
│   Next.js    │
│   Frontend   │
└──────┬───────┘
       │ Axios
       │ POST /horoscope
       ▼
┌──────────────┐
│    NestJS    │
│   Backend    │
└──────┬───────┘
       │ Prisma
       ▼
┌──────────────┐
│  PostgreSQL  │
│   Database   │
└──────────────┘
```
