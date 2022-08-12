# eg-lierno-backend
Backend for Lierno app.

## Stack
Node v12
express v4
mongoose v5

## Scripts
- `start` runs the server in development mode with nodemon.
- `dev` runs the server & client in the browser.
- `dev-electron` runs the server & client in desktop.

## Running with docker

The docker setup expects the following file and folder structure:
```
lierno-app/
├─ server/
│  ├─ Dockerfile
│  └─ docker-compose.yml
└─ client/
   └─ Dockerfile
```

In order to run the docker containers, enter the server folder with `cd server` and run `docker compose build` and `docker compose up`.

The client will be available at `localhost:3000` and the server will be at `localhost:3001`