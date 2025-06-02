import mongoose from "mongoose";
import envConfig from "../../config/env.config";

mongoose.connect(envConfig.URLDB);
const db = mongoose.connection;

export default db;
