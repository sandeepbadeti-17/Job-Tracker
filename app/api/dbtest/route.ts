// app/api/test-db/route.ts
import connectDB from "@/lib/db"

export async function GET() {
  await connectDB()
  console.log("connected")
  return Response.json({ message: "check your terminal" })
}