import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { registerUser } from "@/lib/auth";
import { insertUserSchema } from "@shared/schema";

const signupSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const { login } = useAuth();
  const { toast } = useToast();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      login(user);
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignupFormData) => {
    const { confirmPassword, ...userData } = data;
    signupMutation.mutate(userData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md fade-in" data-testid="modal-signup">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Sign Up</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </Label>
            <Input 
              id="name"
              type="text" 
              {...form.register("name")}
              placeholder="Enter your full name"
              className="w-full"
              data-testid="input-signup-name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1" data-testid="error-signup-name">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </Label>
            <Input 
              id="email"
              type="email" 
              {...form.register("email")}
              placeholder="Enter your email"
              className="w-full"
              data-testid="input-signup-email"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1" data-testid="error-signup-email">
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
              placeholder="Create a password"
              className="w-full"
              data-testid="input-signup-password"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive mt-1" data-testid="error-signup-password">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </Label>
            <Input 
              id="confirmPassword"
              type="password" 
              {...form.register("confirmPassword")}
              placeholder="Confirm your password"
              className="w-full"
              data-testid="input-signup-confirm-password"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive mt-1" data-testid="error-signup-confirm-password">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>
          
          <Button 
            type="submit" 
            disabled={signupMutation.isPending}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
            data-testid="button-signup-submit"
          >
            {signupMutation.isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={onSwitchToLogin}
              className="text-primary hover:underline font-medium"
              data-testid="button-switch-to-login"
            >
              Sign in
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
