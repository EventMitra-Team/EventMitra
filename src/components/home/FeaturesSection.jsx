import { 
  Calendar, 
  Ticket, 
  Bell, 
  CreditCard, 
  Users, 
  Shield,
  BarChart3,
  Smartphone
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Event Creation",
    description: "Create and customize events in minutes with our intuitive event builder.",
  },
  {
    icon: Ticket,
    title: "Smart Ticketing",
    description: "Generate QR-coded tickets, manage capacity, and track sales in real-time.",
  },
  {
    icon: Bell,
    title: "Automated Notifications",
    description: "Keep attendees informed with automated email and SMS reminders.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Accept payments via UPI, cards, and net banking with full security.",
  },
  {
    icon: Users,
    title: "Attendee Management",
    description: "Track registrations, check-ins, and manage attendee lists effortlessly.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Control who can view, edit, or manage your events with custom permissions.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Get insights on ticket sales, attendance, and event performance.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Manage events on-the-go with our responsive mobile-first design.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="text-gradient block">Host Amazing Events</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed for Indian event organizers. From small gatherings to large conferences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl shadow-elegant hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
