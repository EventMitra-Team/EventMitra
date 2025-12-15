import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  Filter,
  ArrowRight,
  Heart,
  SlidersHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

const allEvents = [
  {
    id: 1,
    title: "Bangalore Tech Summit 2025",
    category: "Conference",
    date: "Jan 15, 2025",
    time: "9:00 AM",
    location: "Bangalore International Exhibition Centre",
    city: "Bangalore",
    attendees: 2500,
    price: 2999,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    description: "India's largest technology conference featuring industry leaders and innovators.",
  },
  {
    id: 2,
    title: "Diwali Cultural Night",
    category: "Festival",
    date: "Nov 12, 2025",
    time: "6:00 PM",
    location: "Gateway of India Grounds",
    city: "Mumbai",
    attendees: 5000,
    price: 499,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800",
    description: "Celebrate the festival of lights with music, dance, and fireworks.",
  },
  {
    id: 3,
    title: "Wedding Expo 2025",
    category: "Exhibition",
    date: "Feb 20, 2025",
    time: "10:00 AM",
    location: "Pragati Maidan",
    city: "Delhi",
    attendees: 3000,
    price: 0,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    description: "Discover the latest wedding trends, vendors, and inspirations.",
  },
  {
    id: 4,
    title: "Startup Pitch Night",
    category: "Networking",
    date: "Dec 28, 2024",
    time: "5:00 PM",
    location: "T-Hub",
    city: "Hyderabad",
    attendees: 500,
    price: 1499,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    description: "Watch startups pitch to investors and network with entrepreneurs.",
  },
  {
    id: 5,
    title: "Classical Music Festival",
    category: "Concert",
    date: "Jan 5, 2025",
    time: "7:00 PM",
    location: "Music Academy",
    city: "Chennai",
    attendees: 1500,
    price: 799,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    description: "An evening of soulful carnatic and hindustani classical performances.",
  },
  {
    id: 6,
    title: "Yoga & Wellness Retreat",
    category: "Workshop",
    date: "Mar 10, 2025",
    time: "6:00 AM",
    location: "Parmarth Niketan Ashram",
    city: "Rishikesh",
    attendees: 200,
    price: 5999,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
    description: "A transformative 3-day wellness retreat by the Ganges.",
  },
  {
    id: 7,
    title: "Food & Wine Festival",
    category: "Festival",
    date: "Feb 14, 2025",
    time: "12:00 PM",
    location: "Sula Vineyards",
    city: "Nashik",
    attendees: 2000,
    price: 1999,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    description: "Sample premium wines and gourmet food from top chefs.",
  },
  {
    id: 8,
    title: "Photography Masterclass",
    category: "Workshop",
    date: "Jan 25, 2025",
    time: "10:00 AM",
    location: "India Habitat Centre",
    city: "Delhi",
    attendees: 100,
    price: 3499,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
    description: "Learn from award-winning photographers in this intensive workshop.",
  },
];

const categories = ["All", "Conference", "Festival", "Workshop", "Concert", "Networking", "Exhibition"];
const cities = ["All Cities", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata"];
const priceRanges = ["Any Price", "Free", "Under ₹1000", "₹1000 - ₹5000", "Above ₹5000"];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [showFilters, setShowFilters] = useState(false);
  const [likedEvents, setLikedEvents] = useState([]);

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const matchesCity = selectedCity === "All Cities" || event.city === selectedCity;
    
    let matchesPrice = true;
    if (selectedPrice === "Free") matchesPrice = event.price === 0;
    else if (selectedPrice === "Under ₹1000") matchesPrice = event.price < 1000;
    else if (selectedPrice === "₹1000 - ₹5000") matchesPrice = event.price >= 1000 && event.price <= 5000;
    else if (selectedPrice === "Above ₹5000") matchesPrice = event.price > 5000;

    return matchesSearch && matchesCategory && matchesCity && matchesPrice;
  });

  const toggleLike = (id) => {
    setLikedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="bg-secondary/5 py-12 md:py-16">
          <div className="container px-4">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Browse thousands of events happening across India. Find conferences, festivals, workshops, and more.
            </p>

            {/* Search Bar */}
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search events by name, keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>
              <Button
                variant="outline"
                className="h-12 px-6"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-6 p-6 bg-card rounded-2xl shadow-elegant animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
                    <select
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                    >
                      {priceRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedCity("All Cities");
                        setSelectedPrice("Any Price");
                        setActiveCategory("All");
                        setSearchQuery("");
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="container px-4 py-6">
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Events Grid */}
        <div className="container px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredEvents.length}</span> events
            </p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event, index) => (
                <article
                  key={event.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-elegant hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${(index % 4) * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

                    <button
                      onClick={() => toggleLike(event.id)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
                    >
                      <Heart
                        className={cn(
                          "w-4 h-4 transition-colors",
                          likedEvents.includes(event.id)
                            ? "fill-destructive text-destructive"
                            : "text-foreground"
                        )}
                      />
                    </button>

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {event.category}
                    </span>

                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-card font-semibold text-sm text-foreground">
                      {event.price === 0 ? "Free" : `₹${event.price.toLocaleString()}`}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>

                    <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        {event.date} • {event.time}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        {event.city}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-primary" />
                        {event.attendees.toLocaleString()} attending
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/events/${event.id}`}>
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCity("All Cities");
                  setSelectedPrice("Any Price");
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
