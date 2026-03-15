import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { useAuthStore } from "@/stores/useAuthStore"

import { z } from 'zod';
import { Loader2 } from "lucide-react"

const signUpSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required').transform((name) => name.trim().replace(/\s+/g, ' ')),
  userName: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match', path: ['confirmPassword'],
});

const SignUpPage = ({ className, ...props }) => {
  const { isSigningUp, signup } = useAuthStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      signUpSchema.parse(formData);
      const { fullName, userName, email, password } = formData;
      const res = await signup({ fullName, userName, email, password });
      if(res.success){
        navigate('/verify-email');
      }
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  return (
<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
  <div className="w-full max-w-lg">

    <Card>
      <CardContent className="p-8">

        <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>

          {/* Logo */}
          <div className="flex flex-col items-center text-center gap-1">
            <h1 className="logo text-xl font-semibold">NoteStack</h1>
            <p className="text-sm text-muted-foreground">
              Create your NoteStack account
            </p>
          </div>

          {/* Google Signup */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="google"
            />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px bg-border flex-1" />
          </div>

          {/* Grid Inputs */}
          <div className="grid gap-4 md:grid-cols-2">

            {/* Full Name */}
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                id="fullName"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Username */}
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input
                id="userName"
                placeholder="username"
                required
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">{errors.userName}</p>
              )}
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="abhi@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                required
                autoComplete="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2 md:col-span-2">
              <Label>Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                autoComplete="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

          </div>

          {/* Submit Button */}
          <Button disabled={isSigningUp}>
            {isSigningUp ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                Please wait
              </div>
            ) : (
              "Create Account"
            )}
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>

        </form>

      </CardContent>
    </Card>

    {/* Terms */}
    <p className="text-center text-xs text-muted-foreground mt-4">
      By continuing you agree to our Terms & Privacy Policy
    </p>

  </div>
</div>
  )
}

export default SignUpPage;
