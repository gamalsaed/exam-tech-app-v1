# 🎓 Elevate Exam App

> A **production-ready online exam management platform** built with Next.js 14 App Router — featuring secure authentication, OTP password reset, real-time exam timers, and detailed score analytics.

🔗 **[Live Demo](https://www.dinga-code.site/dashboard)**

> **Test Credentials:**  
> Email: `test@test.com` | Password: `Test1234@test.com`

---

## ✨ Features

- 🔐 **Secure Authentication** — Login, Register, Logout via NextAuth with JWT session strategy
- 🔑 **Forgot Password Flow** — OTP verification + password reset with expiry validation
- 📚 **Browse Diplomas & Courses** — Infinite scroll with lazy loading
- 📝 **Exam Engine** — Question-by-question navigation with live countdown timer and auto-submit
- 📊 **Results Analytics** — Donut chart with score %, correct vs incorrect breakdown, and per-question review
- 👤 **Account Management** — Update profile info, change password, delete account
- 📱 **Fully Responsive** — Optimized across all screen sizes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Auth | NextAuth.js |
| Forms & Validation | React Hook Form + Zod |
| Architecture | Clean Code + Clean Architecture |
| Deployment | Vercel |

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── auth/                 # Login, Register, Forgot Password, OTP
│   └── (dashboard)/          # Protected routes (middleware-guarded)
│       ├── home/             # Diplomas listing with infinite scroll
│       ├── exams/            # Exam list, questions engine, results
│       └── account/          # Profile settings & password change
├── components/               # Reusable UI components
├── lib/                      # API helpers, utilities, constants
└── types/                    # Shared TypeScript interfaces
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/gamalsaed/exam-tech-app-v1.git
cd exam-tech-app-v1

# Install dependencies
yarn install

# Set up environment variables
cp env .env.local
# Fill in NEXTAUTH_SECRET and NEXT_PUBLIC_API_BASE_URL

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---


## 📋 Key Implementation Details

**Authentication & Security**
- JWT-based session management via NextAuth
- Route protection using Next.js middleware
- OTP password reset with server-side expiry validation

**Exam Engine**
- Real-time countdown timer synced with question state
- Answer state preserved across question navigation
- Auto-submit triggered on timer expiry

**Results & Analytics**
- Donut chart visualization for score breakdown
- Full per-question review with correct answer highlighted
- Restart exam or explore more diplomas post-result

---

## 👨‍💻 Author

**Gamal Saed** — Frontend Developer (React.js & Next.js)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gamal-saed-846506223/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/gamalsaed)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
