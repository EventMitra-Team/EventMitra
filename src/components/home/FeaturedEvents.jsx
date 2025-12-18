import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedEvents = () => {
  // ✅ hooks MUST be inside component
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:2511/api/events");
        const data = await res.json();
        setEvents(data.slice(0, 6)); // show only featured
      } catch (err) {
        console.error("Failed to fetch featured events", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Featured Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="border rounded-xl overflow-hidden shadow"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500">
                {event.city} • {event.date}
              </p>

              <Link
                to={`/events/${event._id}`}
                className="text-primary mt-3 inline-block"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;
