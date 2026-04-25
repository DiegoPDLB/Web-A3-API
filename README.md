# Web-A3-API

Proyecto de práctica: API + React

## Requisitos
- Node.js >= 16
- npm

## Backend (API)
1. Entrar en la carpeta `API`

```bash
cd API
npm install
npm run dev   # usa nodemon
```

- Variables de entorno en `API/.env`:
  - `URI` -> MongoDB connection string (si no se configura, el servidor arrancará pero las operaciones serán simuladas)
  - `PORT` -> puerto (default 3000)
  - `JWT_SECRET` -> secreto para tokens

## Frontend (React)
1. En la raíz del proyecto:

```bash
npm install
npm run dev
```

- Puedes copiar `.env.example` a `.env` y ajustar `REACT_APP_API_URL` si el backend corre en otra URL.

