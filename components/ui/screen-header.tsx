import { Text, View, Pressable, StyleSheet } from "react-native";
import { IconSymbol } from "./icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
}

export function ScreenHeader({
  title,
  subtitle,
  showBack = false,
  rightIcon,
  onRightPress,
}: ScreenHeaderProps) {
  const colors = useColors();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && (
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && { opacity: 0.6 },
            ]}
          >
            <IconSymbol name="arrow.left" size={22} color={colors.foreground} />
          </Pressable>
        )}
        <View>
          <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      {rightIcon && (
        <Pressable
          onPress={onRightPress}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
        >
          <IconSymbol name={rightIcon as any} size={22} color={colors.foreground} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});
