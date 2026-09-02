import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "accessToken";

export default function useAuthStatus() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);
      setToken(accessToken);
    } catch (error) {
      console.error("AUTH CHECK ERROR:", error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated: Boolean(token),
    token,
    loading,
    refreshAuth: checkAuth,
  };
}
