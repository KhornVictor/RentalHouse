# 🏠 Rent House App

A full-stack Rent House Management Application built using modern web technologies.

This project demonstrates a scalable full-stack architecture using:

- 🔵 Next.js (Frontend)
- 🔴 NestJS (Backend)
- 🐘 PostgreSQL (Database)
- 🐳 Docker (Containerization)
- 🔐 JWT Authentication
- 🧠 Prisma ORM

---

# 📁 Project Structure

```
rent-house-app/
│
├── frontend/ # Next.js frontend application
├── backend/ # NestJS backend REST API
├── docker-compose.yml # Docker configuration
├── .hintrc # configuration file for Webhint
└── README.md # Project documentation
```


---

# 🚀 Tech Stack

## Frontend (Next.js)
- Next.js 14+
- TypeScript
- App Router
- TailwindCSS / HeroUI
- Axios / Fetch API
- JWT Authentication

## Backend (NestJS)
- NestJS Framework
- TypeScript
- REST API
- Prisma ORM
- PostgreSQL
- JWT Strategy (Passport)
- Swagger (optional)

---

```yml
services:
  database:
    image: postgres:18
    container_name: my-postgres
    restart: always
    env_file:
      - .env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql
    networks:
      - backend

  api:
    build: ./backend
    command: npm run start:dev
    container_name: my-api
    restart: always
    env_file:
      - .env
    ports:
      - "${PORT}:3000"
    depends_on:
      - database
    networks:
      - backend
    volumes:
      - ./backend/src:/app/src
      - ./backend/package.json:/app/package.json

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: my-pgadmin
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
      PYTHONWARNINGS: ignore::SyntaxWarning
    ports:
      - "${PGADMIN_PORT}:80"
    depends_on:
      - database
    networks:
      - backend

  frontend:
    build:
      context: ./frontend
      dockerfile: dockerFile
    container_name: my-frontend
    restart: always
    env_file:
      - .env
    environment:
      NODE_ENV: development
    ports:
      - "${FRONTEND_PORT}:3000"
    depends_on:
      - api
    networks:
      - backend

volumes:
  postgres_data:

networks:
  backend:
```

# ⚙️ Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/KhornVictor/RentalHouse.git
cd RentalHouse
