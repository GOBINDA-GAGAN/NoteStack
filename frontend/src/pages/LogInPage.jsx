import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link } from "react-router-dom";
import { Loader2, Eye, EyeClosed } from "lucide-react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useState } from "react"
import { z } from 'zod';

const loginSchema = z.object({
  userName: z.string().min(1, 'userName is required'),
  password: z.string().min(1, 'password is required')
})

const LoginPage = ({ className, ...props }) => {
  const { isLoggingIn, login } = useAuthStore();
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handFormSubmit = (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      login(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      }
    }
  }

  return (
  <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
  <div className="w-full max-w-md">
    <Card>
      <CardContent className="p-8">

        <form onSubmit={handFormSubmit} className="flex flex-col gap-5">

          {/* Logo */}
          <div className="flex flex-col items-center text-center gap-1">
            <h1 className="logo text-xl font-semibold">NoteStack</h1>
            <p className="text-sm text-muted-foreground">
              Login to your account
            </p>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px bg-border flex-1" />
          </div>

          {/* Username */}
          <div className="grid gap-2">
            <Label>Username</Label>
            <Input
              id="userName"
              placeholder="username"
              value={formData.userName}
              autoComplete="username"
              required
              onChange={handleChange}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label>Password</Label>

            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <Link
              to="/forget-password"
              className="text-xs text-muted-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Please wait
              </>
            ) : (
              "Log in"
            )}
          </Button>

          {/* Signup */}
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>

        </form>
      </CardContent>
    </Card>

    <p className="text-center text-xs text-muted-foreground mt-4">
      By continuing you agree to our Terms & Privacy Policy
    </p>
  </div>
</div>
  )
}

export default LoginPage;
