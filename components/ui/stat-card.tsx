import { Text, View, StyleSheet } from "react-native";
import { IconSymbol } from "./icon-symbol";
import { useColors } from "@/hooks/use-colors";

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  iconColor?: string;
}

export function StatCard({ label, value, icon, iconColor }: StatCardProps) {
  const colors = useColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: (iconColor || colors.primary) + "15" }]}>
        <IconSymbol name={icon as any} size={18} color={iconColor || colors.primary} />
      </View>
      <Text style={[styles.value, { color: colors.foreground }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.muted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 6,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});
