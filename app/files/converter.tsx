import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const CATEGORIES = [
  {
    title: "Image",
    icon: "photo.fill",
    color: "#8B5CF6",
    formats: ["PNG", "JPG", "WEBP", "SVG", "HEIC", "BMP", "TIFF"],
  },
  {
    title: "Audio",
    icon: "music.note",
    color: "#3B82F6",
    formats: ["MP3", "WAV", "AAC", "FLAC", "OGG", "M4A", "WMA"],
  },
  {
    title: "Document",
    icon: "doc.fill",
    color: "#EF4444",
    formats: ["PDF", "DOCX", "TXT", "RTF", "HTML", "EPUB", "MD"],
  },
  {
    title: "Video",
    icon: "video.fill",
    color: "#10B981",
    formats: ["MP4", "MOV", "AVI", "MKV", "WEBM", "GIF"],
  },
];

export default function FileConverterScreen() {
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [fromFormat, setFromFormat] = useState<string | null>(null);
  const [toFormat, setToFormat] = useState<string | null>(null);

  const category = CATEGORIES[selectedCategory];

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Converter" showBack subtitle="Multi-format file converter" />

        {/* Category Tabs */}
        <View style={styles.catRow}>
          {CATEGORIES.map((cat, i) => (
            <Pressable
              key={cat.title}
              onPress={() => {
                setSelectedCategory(i);
                setFromFormat(null);
                setToFormat(null);
              }}
              style={({ pressed }) => [
                styles.catTab,
                {
                  backgroundColor: selectedCategory === i ? cat.color + "20" : colors.surface,
                  borderColor: selectedCategory === i ? cat.color + "40" : colors.border,
                },
                pressed && { opacity: 0.8 },
              ]}
            >
              <IconSymbol name={cat.icon as any} size={18} color={selectedCategory === i ? cat.color : colors.muted} />
              <Text style={{ color: selectedCategory === i ? cat.color : colors.muted, fontSize: 12, fontWeight: "600" }}>
                {cat.title}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Conversion Setup */}
        <View style={[styles.conversionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.convLabel, { color: colors.muted }]}>FROM</Text>
          <View style={styles.formatGrid}>
            {category.formats.map((fmt) => (
              <Pressable
                key={`from-${fmt}`}
                onPress={() => setFromFormat(fmt)}
                style={({ pressed }) => [
                  styles.formatChip,
                  {
                    backgroundColor: fromFormat === fmt ? category.color + "20" : colors.background,
                    borderColor: fromFormat === fmt ? category.color : colors.border,
                  },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={{ color: fromFormat === fmt ? category.color : colors.foreground, fontSize: 13, fontWeight: "600" }}>
                  {fmt}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={[styles.arrowDivider, { borderTopColor: colors.border }]}>
            <View style={[styles.arrowCircle, { backgroundColor: category.color }]}>
              <IconSymbol name="arrow.right" size={16} color="#fff" />
            </View>
          </View>

          <Text style={[styles.convLabel, { color: colors.muted }]}>TO</Text>
          <View style={styles.formatGrid}>
            {category.formats.filter((f) => f !== fromFormat).map((fmt) => (
              <Pressable
                key={`to-${fmt}`}
                onPress={() => setToFormat(fmt)}
                style={({ pressed }) => [
                  styles.formatChip,
                  {
                    backgroundColor: toFormat === fmt ? category.color + "20" : colors.background,
                    borderColor: toFormat === fmt ? category.color : colors.border,
                  },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={{ color: toFormat === fmt ? category.color : colors.foreground, fontSize: 13, fontWeight: "600" }}>
                  {fmt}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Upload & Convert */}
        <View style={{ marginTop: 20, gap: 12 }}>
          <Pressable
            style={({ pressed }) => [
              styles.uploadArea,
              { borderColor: category.color + "50", backgroundColor: category.color + "08" },
              pressed && { opacity: 0.8 },
            ]}
          >
            <IconSymbol name="arrow.up.doc.fill" size={24} color={category.color} />
            <Text style={[styles.uploadText, { color: colors.foreground }]}>
              Select {category.title} File
            </Text>
          </Pressable>

          <ActionButton
            title={fromFormat && toFormat ? `Convert ${fromFormat} to ${toFormat}` : "Select Formats"}
            icon="arrow.triangle.2.circlepath"
            disabled={!fromFormat || !toFormat}
            fullWidth
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  catRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  catTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  conversionCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginTop: 16,
  },
  convLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 10,
  },
  formatGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  formatChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  arrowDivider: {
    borderTopWidth: 1,
    marginVertical: 16,
    alignItems: "center",
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -16,
  },
  uploadArea: {
    borderRadius: 14,
    borderWidth: 2,
    borderStyle: "dashed",
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  uploadText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
