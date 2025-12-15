import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const events = [
  {
    id: 1,
    title: "Bangalore Tech Summit 2025",
    category: "Conference",
    date: "Jan 15, 2025",
    location: "Bangalore",
    attendees: 2500,
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    featured: true,
  },
  {
    id: 2,
    title: "Diwali Cultural Night",
    category: "Festival",
    date: "Nov 12, 2025",
    location: "Mumbai",
    attendees: 5000,
    price: "₹499",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800",
    featured: false,
  },
  {
    id: 3,
    title: "Wedding Expo 2025",
    category: "Exhibition",
    date: "Feb 20, 2025",
    location: "Delhi",
    attendees: 3000,
    price: "Free",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    featured: false,
  },
  {
    id: 4,
    title: "Startup Pitch Night",
    category: "Networking",
    date: "Dec 28, 2024",
    location: "Hyderabad",
    attendees: 500,
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    featured: false,
  },
  {
    id: 5,
    title: "Classical Music Festival",
    category: "Concert",
    date: "Jan 5, 2025",
    location: "Chennai",
    attendees: 1500,
    price: "₹799",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    featured: false,
  },
  {
    id: 6,
    title: "Yoga & Wellness Retreat",
    category: "Workshop",
    date: "Mar 10, 2025",
    location: "Rishikesh",
    attendees: 200,
    price: "₹5,999",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
    featured: false,
  },
];

const categories = ["All", "Conference", "Festival", "Workshop", "Concert", "Networking"];

const FeaturedEvents = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedEvents, setLikedEvents] = useState([]);

  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(event => event.category === activeCategory);

  const toggleLike = (id) => {
    setLikedEvents(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Discover Events
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Upcoming Events Near You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through thousands of events happening across India. Find the perfect event for you.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <article
              key={event.id}
              className={cn(
                "group bg-card rounded-2xl overflow-hidden shadow-elegant hover-lift animate-fade-in-up",
                `delay-${(index % 3) * 100}`
              )}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(event.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-colors",
                      likedEvents.includes(event.id)
                        ? "fill-destructive text-destructive"
                        : "text-foreground"
                    )}
                  />
                </button>

                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {event.category}
                </span>

                {/* Price */}
                <span className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-card font-semibold text-foreground">
                  {event.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    {event.attendees.toLocaleString()}
                  </span>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/events/${event.id}`}>
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/events">
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
