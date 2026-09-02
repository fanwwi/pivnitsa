import { useEffect, useState } from "react";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run";

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/v1/events/banners?limit=3`, {
        method: "GET",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Не удалось загрузить мероприятия");
      }

      setEvents(Array.isArray(data.eventBanners) ? data.eventBanners : []);
    } catch (error) {
      console.error("HOME EVENTS ERROR:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    reloadEvents: loadEvents,
  };
}
