import dotenv from "dotenv"
import path from "path"
import AppError from "../app/errorHelpers/errorHelpers"

dotenv.config({ path: path.join(process.cwd(), ".env") })

/**
 * Shape of all environment variables
 */
interface EnvConfigVars {
  PORT: string
  NODE_ENV: string
  DATABASE_URL: string

  JWT: {
    ACCESS_SECRET: string
    REFRESH_SECRET: string
    ACCESS_SALT: string
    REFRESH_SALT: string
  }

  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
  },
  OPENROUTER_API_KEY:  string
}

/**
 * Load & validate environment variables
 */
const loadVariables = (): EnvConfigVars => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "NODE_ENV",
    "DATABASE_URL",

    // JWT
    "JWT_ACCESS_SECRECT",
    "JWT_REFRESH_SECRECT",
    "JWT_ACCESS_SALT",
    "JWT_REFRESH_SALT",

    // Cloudinary
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",

    "OPENROUTER_API_KEY"
  ]

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new AppError(401,`❌ Missing required environment variable: ${key}`)
    }
  })

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as string,
    DATABASE_URL: process.env.DATABASE_URL as string,

    JWT: {
      ACCESS_SECRET: process.env.JWT_ACCESS_SECRECT as string,
      REFRESH_SECRET: process.env.JWT_REFRESH_SECRECT as string,
      ACCESS_SALT: process.env.JWT_ACCESS_SALT as string,
      REFRESH_SALT: process.env.JWT_REFRESH_SALT as string,
    },

    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY as string,

  }
}

export const envVars = loadVariables()
