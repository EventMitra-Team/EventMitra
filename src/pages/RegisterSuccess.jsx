import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const RegisterSuccess = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-success/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <Card className="glass border-border/50 max-w-md w-full animate-fade-in-up relative z-10">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            Registration Submitted!
          </h1>

          <p className="text-muted-foreground mb-6">
            Thank you for registering as an organiser. Your application has been successfully submitted.
          </p>

          <div className="bg-accent/10 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-left">
              <Clock className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">What happens next?</p>
                <p className="text-sm text-muted-foreground">
                  Our admin team will review your application and approve your account. 
                  You'll receive a notification once approved.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/">
              <Button variant="hero" className="w-full" size="lg">
                Back to Home
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterSuccess;
