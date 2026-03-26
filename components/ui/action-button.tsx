import { Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { IconSymbol } from "./icon-symbol";
import { useColors } from "@/hooks/use-colors";

interface ActionButtonProps {
  title: string;
  icon?: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function ActionButton({
  title,
  icon,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
}: ActionButtonProps) {
  const colors = useColors();

  const bgColor =
    variant === "primary"
      ? colors.primary
      : variant === "secondary"
        ? colors.surface
        : "transparent";

  const textColor =
    variant === "primary" ? "#fff" : colors.foreground;

  const borderColor =
    variant === "secondary" ? colors.border : "transparent";

  const height = size === "sm" ? 36 : size === "lg" ? 52 : 44;
  const fontSize = size === "sm" ? 13 : size === "lg" ? 17 : 15;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bgColor,
          borderColor,
          height,
          borderWidth: variant === "secondary" ? 1 : 0,
          opacity: disabled ? 0.5 : 1,
        },
        fullWidth && { alignSelf: "stretch" },
        pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {icon && (
            <IconSymbol name={icon as any} size={size === "sm" ? 16 : 20} color={textColor} />
          )}
          <Text style={[styles.text, { color: textColor, fontSize }]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 22,
    gap: 8,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "600",
  },
});
