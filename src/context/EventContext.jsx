import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const adminToken = localStorage.getItem("adminToken");

  // Get all events for admin (pending + approved + rejected)
  const fetchAdminEvents = async () => {
  if (!adminToken) return;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/events/admin/events/all`,
    {
      headers: { Authorization: `Bearer ${adminToken}` },
    }
  );
  if (!res.ok) throw new Error("Unauthorized");
  const data = await res.json();
  // setEvents(Array.isArray(data) ? data : []);
  const formatted = (Array.isArray(data) ? data : []).map((e) => ({
  ...e,
  organiserName: e.organizerId?.name || e.organiserName || "Unknown",
}));

setEvents(formatted);
};


  const approveEvent = async (id) => {
    if (!adminToken) return;
    await fetch(
      `${import.meta.env.VITE_API_URL}/admin/events/${id}/approve`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    await fetchAdminEvents();
  };

  const rejectEvent = async (id) => {
    if (!adminToken) return;
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/admin/events/${id}/reject`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    await fetchAdminEvents();
  };

  useEffect(() => {
    fetchAdminEvents();
  }, [adminToken]);

  return (
    <EventContext.Provider
      value={{ events, fetchAdminEvents, approveEvent, rejectEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
