import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * OAuth callback page - simplified stub
 * With the new custom auth system (email/password + direct social login),
 * this page is no longer actively used but kept for compatibility.
 * Simply redirects to home after a brief delay.
 */
export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after a short delay
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom", "left", "right"]}>
      <ThemedView className="flex-1 items-center justify-center gap-4 p-5">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-base leading-6 text-center text-foreground">
          Redirecting...
        </Text>
      </ThemedView>
    </SafeAreaView>
  );
}
