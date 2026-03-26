// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  // Tab bar icons
  "house.fill": "home",
  "folder.fill": "folder",
  "music.note": "music-note",
  "globe": "language",
  "wrench.and.screwdriver.fill": "build",
  // Navigation
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "xmark": "close",
  "arrow.left": "arrow-back",
  // File system
  "cloud.fill": "cloud",
  "arrow.up.doc.fill": "upload-file",
  "doc.fill": "description",
  "photo.fill": "photo",
  "video.fill": "videocam",
  "trash.fill": "delete",
  "magnifyingglass": "search",
  "plus": "add",
  "square.and.arrow.up": "share",
  "doc.on.doc.fill": "file-copy",
  "camera.fill": "camera-alt",
  "link": "link",
  "arrow.triangle.2.circlepath": "sync",
  "externaldrive.fill": "storage",
  "doc.text.fill": "article",
  "paintbrush.fill": "edit",
  // Music & Audio
  "waveform": "graphic-eq",
  "tuningfork": "tune",
  "mic.fill": "mic",
  "pianokeys": "piano",
  "music.mic": "mic-external-on",
  "arrow.down.doc.fill": "download",
  "play.fill": "play-arrow",
  "pause.fill": "pause",
  "stop.fill": "stop",
  // Browse
  "lock.shield.fill": "security",
  "arrow.down.circle.fill": "download",
  "square.grid.2x2.fill": "grid-view",
  "safari.fill": "public",
  // AI & Tools
  "brain": "psychology",
  "text.bubble.fill": "chat",
  "wand.and.stars": "auto-fix-high",
  "paperplane.fill": "send",
  "envelope.fill": "email",
  "paintpalette.fill": "palette",
  "photo.on.rectangle": "image-search",
  "wrench.fill": "build",
  "bolt.fill": "flash-on",
  "gear": "settings",
  "info.circle.fill": "info",
  "checkmark.circle.fill": "check-circle",
  "exclamationmark.triangle.fill": "warning",
  "arrow.right": "arrow-forward",
  "person.fill": "person",
  "star.fill": "star",
  "heart.fill": "favorite",
  "bell.fill": "notifications",
  "qrcode": "qr-code",
  "wifi": "wifi",
  "antenna.radiowaves.left.and.right": "cell-tower",
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
