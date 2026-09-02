import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="date"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="time"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="guests"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="table"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="bookingScreen"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="auth"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
