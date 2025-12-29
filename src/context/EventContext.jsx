import React, { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext(undefined);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const adminToken = localStorage.getItem("adminToken");

  // FETCH PENDING EVENTS FOR ADMIN
  const fetchPendingEvents = async () => {
    try {
      const res = await fetch("http://localhost:2511/api/events/admin/events/pending", {
  headers: {
    Authorization: `Bearer ${adminToken}`,
  },
});


      const data = await res.json();

      // Convert backend data → UI expected format
      const formatted = data.map((e) => ({
        id: e._id,
        title: e.title,
        description: e.description,
        date: e.date,
        time: e.time,
        venue: e.location,
        category: e.category,
        organiserId: e.organizerId?._id,
        organiserName: e.organizerId?.name || "Unknown",
        status: e.status, // pending | published
        createdAt: e.createdAt,
      }));

      setEvents(formatted);
    } catch (err) {
      console.error("Failed to fetch admin events", err);
    }
  };

  // APPROVE EVENT
  const approveEvent = async (id) => {
    await fetch(
  `http://localhost:2511/api/events/admin/events/${id}/approve`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  }
);


    fetchPendingEvents();
  };

  // REJECT EVENT

  const rejectEvent = async (id) => {
  await fetch(
  `http://localhost:2511/api/events/admin/events/${id}/reject`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  }
);


  fetchPendingEvents();
};

  
  
  useEffect(() => {
    if (adminToken) {
      fetchPendingEvents();
    }
  }, [adminToken]);

  return (
    <EventContext.Provider
      value={{
        events,
        approveEvent,
        rejectEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within EventProvider");
  }
  return context;
};
