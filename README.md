# 📝 Blog Server API

A full-featured **Blog Backend Server** built with **Node.js, Express, TypeScript, and Prisma**.  
This project supports **authentication, role-based authorization (User & Admin)**, blog posts, comments, admin dashboard statistics, and global error handling.

---

## 🚀 Features

- 🔐 Authentication & Authorization (BetterAuth)
- 👥 Role-based access control (USER, ADMIN)
- 📝 Blog Post CRUD (Create, Read, Update, Delete)
- 💬 Comment system with approval flow
- 📊 Admin Dashboard Statistics
  - Total posts
  - Published / Draft / Archived posts
  - Total views
  - Total users (Admin & User count)
  - Total comments & approved comments
- ⚡ Prisma ORM with PostgreSQL / MySQL
- 🧩 Modular architecture (Controller, Service, Routes)
- ❌ Global error handling
- 🚫 404 Not Found handler
- 🔒 Secure and scalable API design

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL / MySQL
- **Authentication:** BetterAuth
- **Authorization:** Role-based (User / Admin)
- **Validation:** Prisma + Custom Error Handling

---

## 📂 Project Structure
src/
│── modules/
│ ├── auth/
│ ├── post/
│ ├── comment/│ 
│
│── middlewares/
│ ├── auth.ts
│ ├── errorHandler.ts
│ ├── notFound.ts
│
│── errors/
│ └── AppError.ts
│
│── app.ts
│── server.ts

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone [https://github.com/your-username/blog-server.git](https://github.com/mdasifalijihat/blog-server)
cd blog-server

2️⃣ Install dependencies
   npm install

3️⃣ Setup environment variables
 Create a .env file:
 DATABASE_URL=your_database_url
 JWT_SECRET=your_secret_key
 NODE_ENV=development

4️⃣ Prisma setup 
  npx prisma generate
  npx prisma migrate dev

5️⃣ Run the server
npm run dev 

🔐 Roles & Permissions
👤 USER
Create posts
Update & delete own posts
Create comments
View own posts

🛡️ ADMIN

Access all posts
Manage users
Approve / delete comments
View dashboard statistics

