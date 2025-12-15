import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 pattern-overlay" />

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground/90">
              Start for Free Today
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up delay-100">
            Ready to Create Your
            <span className="text-gradient-gold block">Next Event?</span>
          </h2>

          <p className="text-lg text-primary-foreground/80 mb-10 animate-fade-in-up delay-200">
            Join 500+ event organizers across India who are using EventMitra to host successful events. No credit card required to get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-primary-foreground/60 text-sm animate-fade-in-up delay-400">
            <span>✓ Free forever for small events</span>
            <span>✓ No credit card required</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
