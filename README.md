🎓 Elevate Exam App
A production-ready online exam management platform built with Next.js 14, featuring secure authentication, real-time exam timers, and detailed result analytics.
🔗 [Live Demo](https://www.dinga-code.site/dashboard)

Test Credentials:
Email: test@test.com | Password: Test1234@test.com

✨ Features

🔐 Secure Authentication — Login, Register, Logout via NextAuth
🔑 Full Forgot Password Flow — OTP verification + password reset
📚 Browse Diplomas & Courses — Infinite scroll with lazy loading
📝 Take Exams — Question-by-question navigation with live countdown timer
📊 Detailed Results — Donut chart showing score %, correct vs incorrect answers with review
👤 Account Management — Update profile, change password, delete account
📱 Fully Responsive — Works across all screen sizes


🛠️ Tech Stack
CategoryTechnologyFrameworkNext.js 14 (App Router)LanguageTypeScriptStylingTailwind CSS + Shadcn UIAuthNextAuth.jsFormsReact Hook Form + ZodArchitectureClean Code + Clean ArchitectureDeploymentVercel

🏗️ Project Structure
src/
├── app/                  # Next.js App Router pages
│   ├── auth/             # Login, Register, Forgot Password, OTP
│   ├── (dashboard)/      # Protected routes
│   │   ├── home/         # Diplomas listing
│   │   ├── exams/        # Exam list & questions
│   │   └── account/      # Profile & settings
├── components/           # Reusable UI components
├── lib/                  # Utilities, API helpers
└── types/                # TypeScript interfaces

🚀 Getting Started
bash# Clone the repo
git clone https://github.com/gamalsaed/exam-tech-app-v1.git
cd exam-tech-app-v1

# Install dependencies
yarn install

# Set up environment variables
cp env .env.local
# Fill in your NEXTAUTH_SECRET and API_BASE_URL

# Run development server
yarn dev
Open http://localhost:3000 in your browser.


📋 Key Implementation Details
Authentication Flow:

Session management with NextAuth + JWT strategy
Protected routes using Next.js middleware
OTP-based password reset with expiry validation

Exam Engine:

Real-time countdown timer per exam
Answer state preserved across question navigation
Auto-submit on timer expiry

Results Analytics:

Donut chart with correct/incorrect breakdown
Per-question review with correct answer highlighted
Restart or explore more exams flow
