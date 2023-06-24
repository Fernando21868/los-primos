import dotenv from "dotenv";
import { Config } from "../interfaces/config";
dotenv.config();

const config: Config = {
  url: process.env.MONGO_URI!,
};

export { config };
