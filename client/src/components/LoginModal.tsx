import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { loginUser } from "@/lib/auth";
import { loginSchema, type LoginRequest } from "@shared/schema";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const { login } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      login(user);
      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-4 fade-in" data-testid="modal-login">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">Sign In</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </Label>
            <Input 
              id="email"
              type="email" 
              {...form.register("email")}
              placeholder="Enter your email"
              className="w-full text-sm sm:text-base"
              data-testid="input-login-email"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1" data-testid="error-login-email">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </Label>
            <Input 
              id="password"
              type="password" 
              {...form.register("password")}
              placeholder="Enter your password"
              className="w-full text-sm sm:text-base"
              data-testid="input-login-password"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive mt-1" data-testid="error-login-password">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-xs sm:text-sm text-gray-600">
                Remember me
              </Label>
            </div>
            <button 
              type="button" 
              className="text-sm text-primary hover:underline"
              data-testid="link-forgot-password"
            >
              Forgot password?
            </button>
          </div>
          
          <Button 
            type="submit" 
            disabled={loginMutation.isPending}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors text-sm sm:text-base"
            data-testid="button-login-submit"
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Don't have an account?{" "}
            <button 
              onClick={onSwitchToSignup}
              className="text-primary hover:underline font-medium"
              data-testid="button-switch-to-signup"
            >
              Sign up
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
