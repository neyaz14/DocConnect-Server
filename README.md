# 🩺 DocConnect – Server

**DocConnect** হলো একটি backend server application যা Doctor–Patient interaction সহজ করার জন্য তৈরি করা হয়েছে।  
এই repo-তে রয়েছে DocConnect এর **API, Authentication, Database logic এবং Core Business Logic**।

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Zod** (Validation)
- **dotenv**
- **Cloudinary** (File uploads – optional)

---

## 📁 Project Structure

```bash
DocConnect-Server/
├── src/
│   ├── app/
│   │   ├── modules/        # Feature-based modules (auth, user, doctor, appointment)
│   │   ├── middleware/    # Auth, error handler, validation
│   │   ├── routes/        # API routes
│   │   └── helper/         # Helpers & utilities
│   ├── config/            # Environment & app configs
│   ├── app.ts             # Express app config
│   └── server.ts          # Server entry point
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md

