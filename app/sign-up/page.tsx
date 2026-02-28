'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"


const SignUp = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
        <Card>
          <CardHeader>
            <CardTitle>
              SignUp
            </CardTitle>
            <CardDescription>
              Create an account to track you application
            </CardDescription>
          </CardHeader>
          <form>
            <CardContent>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Enter Your Name" required/>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter Your Email" required/>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Password" minLength={8} required/>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Sign Up</Button>
              <p>Already have an account? <Link href="/sign-in">Sign In</Link></p>
            </CardFooter>
          </form>
        </Card>
    </div>
  )
}

export default SignUp