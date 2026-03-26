import { Text, View, Pressable, StyleSheet } from "react-native";
import { IconSymbol } from "./icon-symbol";
import { useColors } from "@/hooks/use-colors";

interface ListRowProps {
  title: string;
  subtitle?: string;
  icon?: string;
  iconColor?: string;
  rightText?: string;
  onPress?: () => void;
  showChevron?: boolean;
  badge?: string;
}

export function ListRow({
  title,
  subtitle,
  icon,
  iconColor,
  rightText,
  onPress,
  showChevron = true,
  badge,
}: ListRowProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { borderBottomColor: colors.border },
        pressed && { opacity: 0.7, backgroundColor: colors.surface },
      ]}
    >
      {icon && (
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: (iconColor || colors.primary) + "20" },
          ]}
        >
          <IconSymbol
            name={icon as any}
            size={20}
            color={iconColor || colors.primary}
          />
        </View>
      )}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.muted }]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {badge && (
        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      {rightText && (
        <Text style={[styles.rightText, { color: colors.muted }]}>{rightText}</Text>
      )}
      {showChevron && (
        <IconSymbol name="chevron.right" size={16} color={colors.muted} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 13,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  rightText: {
    fontSize: 13,
  },
});
