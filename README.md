# Blog API

A fullstack application made using ExpressJs for the backend,
ReactJS for the frontends. It has 2 frontends. One for viewing
anyone's blogs and one for editing your blogs, and administring
the comments on your blogs.

![frontend-view](./.assets/frontend-view.png)
![frontend-view-2](./.assets/frontend-view-2.png)

## Project setup

After cloning the repository,

1. Install dependencies with

```bash
npm install
```

2. Create `.env` file under `/packages/backend/` with structure

```env
PORT=3000
JWT_SECRET=your_custom_secret_key
DATABASE_URL="postgresql://username:password@servername:port/database"
```

3. Synchronize your database with

```bash
cd packages/backend
npx prisma migrate dev
```

4. Start the application

```bash
npm run start:server
npm run start:clients
```

You'll find that your clients are running on ports `5000` and `5173`.
