import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  Ticket,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:2511/api/events/${id}`);
        if (!res.ok) throw new Error("Event not found");

        const data = await res.json();
        setEvent(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Event not found",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <Link to="/events">
            <Button>
              <ArrowLeft className="mr-2" /> Back to Events
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const availableTickets = event.totalTickets - event.soldTickets;
  const ticketsPercentage =
    (event.soldTickets / event.totalTickets) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <div className="relative h-[45vh] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          <div className="absolute top-6 left-6">
            <Button variant="secondary" size="sm" asChild>
              <Link to="/events">
                <ArrowLeft className="mr-2" /> Back
              </Link>
            </Button>
          </div>

          <div className="absolute top-6 right-6 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={cn(
                  "w-5 h-5",
                  isLiked && "fill-destructive text-destructive"
                )}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied" });
              }}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="container px-4 py-8 grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold">{event.title}</h1>

            <div className="flex gap-4 text-muted-foreground">
              <span>
                <Calendar className="inline mr-1" />
                {event.date}
              </span>
              <span>
                <Clock className="inline mr-1" />
                {event.time}
              </span>
              <span>
                <Users className="inline mr-1" />
                {event.soldTickets} attending
              </span>
            </div>

            <p>{event.description}</p>

            <div>
              <h3 className="font-semibold mb-2">Venue</h3>
              <MapPin className="inline mr-1" />
              {event.location}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Organizer</h3>
              <p>{event.organizerId?.name}</p>
              <p>{event.organizerId?.email}</p>
              <p>{event.organizerId?.phone}</p>
            </div>
          </div>

          {/* Right */}
          <div className="bg-card p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-center mb-4">
              {event.price === 0 ? "Free" : `₹${event.price}`}
            </h2>

            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>Tickets</span>
                <span>
                  {event.soldTickets}/{event.totalTickets}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full mt-1">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${ticketsPercentage}%` }}
                />
              </div>
            </div>

            <Button className="w-full" disabled={availableTickets === 0}>
              <Ticket className="mr-2" />
              {availableTickets === 0 ? "Sold Out" : "Book Tickets"}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetails;
