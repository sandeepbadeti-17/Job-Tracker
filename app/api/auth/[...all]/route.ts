import { auth } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);


// force it to run immediately
connectDB()
  .then(() => console.log("🟢 Connected"))
  .catch((err) => console.error("🔴 Failed:", err.message))