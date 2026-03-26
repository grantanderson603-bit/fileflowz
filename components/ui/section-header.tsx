import { Text, View, Pressable, StyleSheet } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.muted }]}>
        {title.toUpperCase()}
      </Text>
      {action && (
        <Pressable onPress={onAction} style={({ pressed }) => [pressed && { opacity: 0.6 }]}>
          <Text style={[styles.action, { color: colors.primary }]}>{action}</Text>
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
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
  },
  action: {
    fontSize: 14,
    fontWeight: "500",
  },
});
