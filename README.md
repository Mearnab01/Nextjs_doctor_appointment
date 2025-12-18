# 🩺 CarePulse – Doctor Appointment Platform

CarePulse is a full-stack doctor appointment booking platform built with **Next.js**, **TypeScript**, **Prisma**, **Neon PostgreSQL**, and **Clerk Authentication**.  
It allows patients to book appointments, doctors to manage availability, and both to join secure video consultations.

🔗 **Live App:** https://carepulse-tiu.vercel.app/  
📦 **Repository:** https://github.com/Mearnab01/Nextjs_doctor_appointment

---

## ✨ Features

### 👤 Authentication
- Secure user authentication using **Clerk**
- Role-based access (Patient / Doctor)
- Automatic user sync to database on login

### 🩺 Patient Features
- Browse doctors
- Book appointments based on availability
- View upcoming & past appointments
- Join video consultations
- Cancel appointments

### 👨‍⚕️ Doctor Features
- Set availability slots
- View scheduled appointments
- Add appointment notes
- Mark appointments as completed
- Join video consultations

### 📹 Video Consultation
- Real-time video calls using **Vonage (OpenTok)**
- Secure session & token generation
- Time-restricted access to calls

### 🗄️ Backend & Database
- PostgreSQL database powered by **Neon**
- ORM handled by **Prisma**
- Transaction-safe operations
- Server Actions for secure backend logic

---

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend**
- Next.js Server Actions
- Prisma ORM
- Neon PostgreSQL

**Authentication**
- Clerk

**Video Calling**
- Vonage Video API (OpenTok)

**Deployment**
- Vercel

---

## 📂 Project Structure

├── app/
│ ├── (auth)
│ ├── (protected)
│ ├── doctor
│ ├── appointments
│ └── video-call
├── components/
├── actions/
├── prisma/
│ └── schema.prisma
├── lib/
│ └── prisma.ts
└── hooks/

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env.local` file and add:

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

NEXT_PUBLIC_VONAGE_APPLICATION_ID=...
VONAGE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----
⚠️ Never expose private keys on the client.

🚀 Getting Started Locally
bash
Copy code
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations (if needed)
npx prisma migrate dev

# Start development server
npm run dev
🧪 Prisma Configuration (Vercel-safe)
prisma
Copy code
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
🧠 Key Learnings
End-to-end type safety with TypeScript

Server-side authentication & authorization

Handling Prisma in serverless environments
```
Real-time video integration

Clean separation of client & server logic
