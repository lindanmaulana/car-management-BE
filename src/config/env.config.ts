import dotenv from "dotenv"

dotenv.config()


if (!process.env.URL_MONGODB_DEV || !process.env.JWT_SECRET_KEY || !process.env.JWT_EXPIRATION) {
  throw new Error("Missing required environment variables");
}

export default {
    URLDB: process.env.URL_MONGODB_DEV,
    JWTEXPIRATION: process.env.JWT_EXPIRATION,
    JWTSECRETKEY: process.env.JWT_SECRET_KEY
}