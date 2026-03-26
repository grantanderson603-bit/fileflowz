import { Text, View, Pressable, StyleSheet } from "react-native";
import { IconSymbol } from "./icon-symbol";
import { useColors } from "@/hooks/use-colors";

interface FeatureCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  iconColor?: string;
  onPress?: () => void;
  badge?: string;
  compact?: boolean;
}

export function FeatureCard({
  title,
  subtitle,
  icon,
  iconColor,
  onPress,
  badge,
  compact = false,
}: FeatureCardProps) {
  const colors = useColors();
  const bgColor = iconColor || colors.primary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && { opacity: 0.7 },
        compact && styles.cardCompact,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: bgColor + "20" },
          compact && styles.iconContainerCompact,
        ]}
      >
        <IconSymbol name={icon as any} size={compact ? 20 : 24} color={bgColor} />
      </View>
      <Text
        style={[
          styles.title,
          { color: colors.foreground },
          compact && styles.titleCompact,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
      {subtitle && !compact && (
        <Text style={[styles.subtitle, { color: colors.muted }]} numberOfLines={2}>
          {subtitle}
        </Text>
      )}
      {badge && (
        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
          <Text style={[styles.badgeText, { color: "#fff" }]}>{badge}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    gap: 8,
  },
  cardCompact: {
    padding: 12,
    gap: 6,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerCompact: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  titleCompact: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
