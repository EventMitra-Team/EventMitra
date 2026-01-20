import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/context/AdminContext';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const success = await login(email, password); // ✅ await added

  if (success) {
    toast({
      title: "Welcome back!",
      description: "Successfully logged in to admin panel.",
    });
    navigate("/admin/dashboard");
  } else {
    toast({
      title: "Login Failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive",
    });
  }

  setIsLoading(false);
};


  return (
    <div className="min-h-screen gradient-hero pattern-overlay flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float delay-300" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse-glow" />
      </div>

      <div className="w-full max-w-md animate-fade-in-up relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold">
              <span className="text-foreground">Event</span>
              <span className="text-gradient">Mitra</span>
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border/50 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Admin Portal</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass rounded-2xl p-8 shadow-elegant">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to manage your organisers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@eventmitra.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 EventMitra. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
