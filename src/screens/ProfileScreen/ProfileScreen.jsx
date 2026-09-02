import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";
import { Image } from "expo-image";

import {
  Bell,
  CalendarCheck,
  ChevronRight,
  Clock3,
  Edit3,
  Settings,
} from "lucide-react-native";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import SettingsSidebar from "../../components/Settings/SettingsSidebar";
import EditProfileModal from "../../components/EditProfileModal/EditPorfileModal";

import useProfile from "../../hooks/useProfile";
import useAuthStatus from "../../hooks/useAuthStatus";

import styles from "./ProfileScreen.styles";

const MENU_ITEMS = [
  {
    id: "active",
    title: "Активные брони",
    description: "Ваши текущие бронирования",
    icon: CalendarCheck,
    route: "/bookings",
  },
  {
    id: "history",
    title: "История бронирований",
    description: "Все прошедшие бронирования",
    icon: Clock3,
    route: "/booking-history",
  },
  {
    id: "notifications",
    title: "Уведомления",
    description: "Настройки уведомлений",
    icon: Bell,
    route: "/notifications",
  },
];

export default function ProfileScreen() {
  const { isAuthenticated, loading: authLoading } = useAuthStatus();

  const { user, loading, saving, error, updateProfile, logout, deleteAccount } =
    useProfile();

  const [settingsVisible, setSettingsVisible] = useState(false);

  const [editProfileVisible, setEditProfileVisible] = useState(false);

  /* =========================================================
     AUTH PROTECTION
  ========================================================= */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/auth");
    }
  }, [authLoading, isAuthenticated]);

  /* =========================================================
     SETTINGS
  ========================================================= */

  const handleOpenSettings = () => {
    setSettingsVisible(true);
  };

  const handleCloseSettings = () => {
    if (saving) {
      return;
    }

    setSettingsVisible(false);
  };

  /* =========================================================
     EDIT PROFILE
  ========================================================= */

  const handleOpenEditProfile = () => {
    setEditProfileVisible(true);
  };

  const handleCloseEditProfile = () => {
    if (saving) {
      return;
    }

    setEditProfileVisible(false);
  };

  const handleSaveProfile = async (data) => {
    try {
      await updateProfile(data);

      setEditProfileVisible(false);
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);
    }
  };

  /* =========================================================
     MENU
  ========================================================= */

  const handleMenuPress = (item) => {
    router.push(item.route);
  };

  /* =========================================================
     AUTH LOADING
  ========================================================= */

  if (authLoading) {
    return (
      <View style={styles.loadingScreen}>
        <Image
          source={require("../../assets/logoWhite.png")}
          style={styles.loadingLogo}
          contentFit="contain"
        />

        <ActivityIndicator
          size="small"
          color="#B29259"
          style={styles.loadingIndicator}
        />
      </View>
    );
  }

  /* =========================================================
     GUEST
  ========================================================= */

  if (!isAuthenticated) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="small" color="#B29259" />
      </View>
    );
  }

  /* =========================================================
     PROFILE LOADING
  ========================================================= */

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <Image
          source={require("../../assets/logoWhite.png")}
          style={styles.loadingLogo}
          contentFit="contain"
        />

        <ActivityIndicator
          size="small"
          color="#B29259"
          style={styles.loadingIndicator}
        />
      </View>
    );
  }

  /* =========================================================
     USER DATA
  ========================================================= */

  const firstName = user?.firstName || "";

  const lastName = user?.lastName || "";

  const phone = user?.phone || "Номер не указан";

  const fullName = `${firstName} ${lastName}`.trim();

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>ПИВНИЦА</Text>

            <Text style={styles.headerTitle}>Профиль</Text>
          </View>

          <Pressable
            onPress={handleOpenSettings}
            style={({ pressed }) => [
              styles.settingsButton,
              pressed && styles.pressed,
            ]}
          >
            <Settings size={21} color="#B29259" strokeWidth={1.7} />
          </Pressable>
        </View>

        {/* =================================================
            PROFILE CARD
        ================================================= */}

        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../../assets/panda.png")}
              style={styles.avatar}
              contentFit="cover"
            />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{fullName || "Пользователь"}</Text>

            <Text style={styles.profilePhone}>{phone}</Text>
          </View>

          {/* Карандаш сразу открывает EditProfileModal */}

          <Pressable
            onPress={handleOpenEditProfile}
            hitSlop={10}
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.pressed,
            ]}
          >
            <Edit3 size={18} color="#B29259" strokeWidth={2} />
          </Pressable>
        </View>

        {/* =================================================
            QUICK STATS
        ================================================= */}

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>

            <Text style={styles.statLabel}>АКТИВНЫХ БРОНЕЙ</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>

            <Text style={styles.statLabel}>ВСЕГО БРОНЕЙ</Text>
          </View>
        </View>

        {/* =================================================
            MENU
        ================================================= */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>МОЙ АККАУНТ</Text>

          <View style={styles.menu}>
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => handleMenuPress(item)}
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.menuItemPressed,
                  ]}
                >
                  <View style={styles.menuIcon}>
                    <Icon size={20} color="#B29259" strokeWidth={1.7} />
                  </View>

                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>

                    <Text style={styles.menuDescription}>
                      {item.description}
                    </Text>
                  </View>

                  <ChevronRight
                    size={18}
                    color="rgba(234,227,192,0.35)"
                    strokeWidth={1.7}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* =================================================
            FOOTER
        ================================================= */}

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>ПИВНИЦА</Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <Navbar isAuthenticated={isAuthenticated} />

      {/* ===================================================
          SETTINGS SIDEBAR
      =================================================== */}

      <SettingsSidebar
        visible={settingsVisible}
        onClose={handleCloseSettings}
        user={user}
        saving={saving}
        error={error}
        onSaveProfile={handleSaveProfile}
        onLogout={logout}
        onDeleteAccount={deleteAccount}
      />

      {/* ===================================================
          EDIT PROFILE MODAL
      =================================================== */}

      <EditProfileModal
        visible={editProfileVisible}
        user={user}
        saving={saving}
        error={error}
        onClose={handleCloseEditProfile}
        onSave={handleSaveProfile}
      />
    </View>
  );
}
