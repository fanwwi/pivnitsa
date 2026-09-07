import { useCallback, useEffect, useState } from "react";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run";

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState(null);

  const loadEvents = useCallback(async () => {
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
  }, []);

  const loadEventDetails = useCallback(async (eventId) => {
    if (!eventId) {
      return null;
    }

    try {
      setEventLoading(true);
      setEventError(null);

      const response = await fetch(`${API_URL}/api/v1/events/${eventId}`, {
        method: "GET",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Не удалось загрузить информацию о мероприятии",
        );
      }

      setSelectedEvent(data);

      return data;
    } catch (error) {
      console.error("EVENT DETAILS ERROR:", error);

      setEventError(error.message || "Не удалось загрузить мероприятие");

      return null;
    } finally {
      setEventLoading(false);
    }
  }, []);

  const openEvent = useCallback(
    async (event) => {
      if (!event?.id) {
        return;
      }

      // Сразу открываем модалку с базовыми данными баннера.
      setSelectedEvent(event);
      setEventError(null);

      // После этого получаем полную информацию.
      await loadEventDetails(event.id);
    },
    [loadEventDetails],
  );

  const closeEvent = useCallback(() => {
    setSelectedEvent(null);
    setEventError(null);
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    reloadEvents: loadEvents,

    selectedEvent,
    eventLoading,
    eventError,

    openEvent,
    closeEvent,
  };
}
