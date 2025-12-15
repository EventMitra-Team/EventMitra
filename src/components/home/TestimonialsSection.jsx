import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Wedding Planner",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    content: "EventMitra transformed how I manage weddings. The ticketing system and attendee tracking saved us hours of manual work. Highly recommended!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Corporate Event Manager",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    content: "We hosted our annual tech summit with 3000+ attendees using EventMitra. The real-time analytics and check-in system were game-changers.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "College Festival Coordinator",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    content: "Perfect for college events! Easy to set up, affordable, and the support team is super responsive. Our fest was a huge success thanks to EventMitra.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Loved by Event Organizers
            <span className="text-gradient-gold block">Across India</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied organizers who trust EventMitra for their events.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 bg-card rounded-2xl shadow-elegant hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
