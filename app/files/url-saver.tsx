import { ScrollView, Text, View, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const SAVED_URLS = [
  { title: "React Native Docs", url: "reactnative.dev", domain: "reactnative.dev", date: "Today", color: "#3B82F6" },
  { title: "Figma Design System", url: "figma.com/design-systems", domain: "figma.com", date: "Yesterday", color: "#8B5CF6" },
  { title: "GitHub Repository", url: "github.com/project", domain: "github.com", date: "Mar 20", color: "#10B981" },
  { title: "Stack Overflow Answer", url: "stackoverflow.com/q/12345", domain: "stackoverflow.com", date: "Mar 18", color: "#F59E0B" },
  { title: "Medium Article", url: "medium.com/@author/article", domain: "medium.com", date: "Mar 15", color: "#EC4899" },
];

export default function URLSaverScreen() {
  const colors = useColors();
  const [url, setUrl] = useState("");

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="URL Saver" showBack subtitle="Save URLs as previewable files" />

        {/* URL Input */}
        <View style={[styles.inputCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.inputRow, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <IconSymbol name="link" size={18} color={colors.muted} />
            <TextInput
              style={[styles.input, { color: colors.foreground }]}
              placeholder="Paste URL here..."
              placeholderTextColor={colors.muted}
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              keyboardType="url"
              returnKeyType="done"
            />
          </View>
          <ActionButton title="Save URL" icon="arrow.down.doc.fill" fullWidth disabled={!url} />
        </View>

        {/* Saved URLs */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>SAVED URLS</Text>
          {SAVED_URLS.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.urlCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
                pressed && { opacity: 0.7 },
              ]}
            >
              <View style={styles.urlHeader}>
                <View style={[styles.urlIcon, { backgroundColor: item.color + "20" }]}>
                  <IconSymbol name="link" size={18} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.urlTitle, { color: colors.foreground }]} numberOfLines={1}>{item.title}</Text>
                  <Text style={[styles.urlDomain, { color: colors.muted }]}>{item.domain}</Text>
                </View>
                <Text style={[styles.urlDate, { color: colors.muted }]}>{item.date}</Text>
              </View>
              <View style={[styles.urlPreview, { backgroundColor: colors.background }]}>
                <IconSymbol name="globe" size={32} color={colors.border} />
                <Text style={[styles.previewText, { color: colors.muted }]}>Preview available</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  inputCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    gap: 12,
    marginTop: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: 48,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  urlCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 10,
  },
  urlHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  urlIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  urlTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  urlDomain: {
    fontSize: 12,
    marginTop: 2,
  },
  urlDate: {
    fontSize: 12,
  },
  urlPreview: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  previewText: {
    fontSize: 12,
  },
});
