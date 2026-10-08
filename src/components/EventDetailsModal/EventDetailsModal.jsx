import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { CalendarDays, Clock3, Share2, X } from "lucide-react-native";

import styles from "./EventDetailsModal.styles";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run/";

const MONTH_NAMES = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80";

const formatDate = (value) => {
  if (!value) return "Дата не указана";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Дата не указана";
  }

  return `${date.getDate()} ${
    MONTH_NAMES[date.getMonth()]
  } ${date.getFullYear()}`;
};

const formatTime = (value) => {
  if (!value) return "Время не указано";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Время не указано";
  }

  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatShareDate = (value) => {
  if (!value) return "Скоро";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Скоро";
  }

  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
};

export default function EventDetailsModal({ event, visible, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUri, setImageUri] = useState(FALLBACK_IMAGE);

  useEffect(() => {
    if (!visible || !event?.id) {
      return;
    }

    let cancelled = false;

    const loadDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        setDetails(null);

        setImageUri(event.bannerUrl || FALLBACK_IMAGE);

        const response = await fetch(`${API_URL}/api/v1/events/${event.id}`);

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.message || "Не удалось загрузить мероприятие");
        }

        if (!cancelled) {
          setDetails(data);

          if (data.bannerUrl) {
            setImageUri(data.bannerUrl);
          }
        }
      } catch (err) {
        console.error("EVENT DETAILS ERROR:", err);

        if (!cancelled) {
          setError(err.message || "Не удалось загрузить мероприятие");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [visible, event?.id]);

  if (!event) {
    return null;
  }

  const currentEvent = details || event;

  const handleShare = async () => {
    if (!currentEvent.shareUrl) {
      console.warn("EVENT SHARE URL IS MISSING");
      return;
    }

    try {
      const message =
        `${formatShareDate(
          currentEvent.startsAt,
        )} в Пивнице будет мероприятие «${currentEvent.title}».\n\n` +
        `Давай пойдём вместе! 🍻\n\n` +
        `${currentEvent.shareUrl}`;

      await Share.share({
        message,
      });
    } catch (err) {
      console.error("EVENT SHARE ERROR:", err);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>МЕРОПРИЯТИЕ</Text>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.pressed,
              ]}
            >
              <X size={20} color="#EAE3C0" strokeWidth={1.8} />
            </Pressable>
          </View>

          {loading && !details ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#B29259" />

              <Text style={styles.loadingText}>Загружаем информацию...</Text>
            </View>
          ) : error && !details ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>
                Не удалось загрузить мероприятие
              </Text>

              <Text style={styles.errorText}>{error}</Text>

              <Pressable onPress={onClose} style={styles.errorButton}>
                <Text style={styles.errorButtonText}>ЗАКРЫТЬ</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
              >
                <View style={styles.imageWrapper}>
                  <Image
                    source={{
                      uri: imageUri,
                    }}
                    style={styles.image}
                    contentFit="cover"
                    transition={250}
                    onError={() => {
                      if (imageUri !== FALLBACK_IMAGE) {
                        setImageUri(FALLBACK_IMAGE);
                      }
                    }}
                  />

                  <LinearGradient
                    colors={[
                      "rgba(0,0,0,0)",
                      "rgba(0,0,0,0.15)",
                      "rgba(0,0,0,0.8)",
                    ]}
                    locations={[0, 0.5, 1]}
                    style={styles.imageGradient}
                  />

                  <View style={styles.imageBadge}>
                    <Text style={styles.imageBadgeText}>EVENT</Text>
                  </View>
                </View>

                <View style={styles.info}>
                  <Text style={styles.title}>{currentEvent.title}</Text>

                  <View style={styles.meta}>
                    <View style={styles.metaItem}>
                      <CalendarDays
                        size={17}
                        color="#B29259"
                        strokeWidth={1.8}
                      />

                      <Text style={styles.metaText}>
                        {formatDate(currentEvent.startsAt)}
                      </Text>
                    </View>

                    <View style={styles.metaItem}>
                      <Clock3 size={17} color="#B29259" strokeWidth={1.8} />

                      <Text style={styles.metaText}>
                        {formatTime(currentEvent.startsAt)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <Text style={styles.descriptionTitle}>О мероприятии</Text>

                  <Text style={styles.description}>
                    {currentEvent.description ||
                      "Описание мероприятия пока не добавлено."}
                  </Text>
                </View>
              </ScrollView>

              <View style={styles.bottom}>
                <Pressable
                  onPress={handleShare}
                  disabled={!currentEvent.shareUrl}
                  style={({ pressed }) => [
                    styles.shareButton,

                    !currentEvent.shareUrl && styles.shareButtonDisabled,

                    pressed && currentEvent.shareUrl && styles.sharePressed,
                  ]}
                >
                  <Share2 size={19} color="#211A10" strokeWidth={2} />

                  <Text style={styles.shareText}>ПОДЕЛИТЬСЯ</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
