import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const API_URL = "https://test--pivnitsa-backend--l8b8kf49s4rf.code.run";

const TOKEN_KEY = "accessToken";

export default function useHomeProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);

        const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);

        if (!accessToken) {
          router.replace("/login");
          return;
        }

        const response = await fetch(`${API_URL}/api/v1/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 401 || response.status === 403) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);

          router.replace("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Не удалось загрузить профиль");
        }

        if (mounted) {
          setUser(data);
        }
      } catch (error) {
        console.error("HOME PROFILE ERROR:", error);

        if (mounted) {
          router.replace("/login");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    user,
    loading,

    headerOpacity: 1,
    contentOpacity: 1,
    contentTranslate: 0,

    reloadProfile: async () => {},
  };
}
