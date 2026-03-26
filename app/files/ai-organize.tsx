import { ScrollView, Text, View, Pressable, StyleSheet, Switch } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const ORGANIZE_RULES = [
  { title: "Sort by file type", desc: "Group documents, images, audio, video", enabled: true },
  { title: "Date-based folders", desc: "Organize by year/month structure", enabled: true },
  { title: "Smart rename", desc: "AI-powered descriptive file names", enabled: false },
  { title: "Auto-tag photos", desc: "Tag by faces, locations, objects", enabled: true },
  { title: "Archive old files", desc: "Move untouched files after 90 days", enabled: false },
];

const PREVIEW_CHANGES = [
  { from: "IMG_20250301_143022.jpg", to: "Beach_Sunset_March2025.jpg", type: "rename" },
  { from: "document (2).pdf", to: "Tax_Return_2024.pdf", type: "rename" },
  { from: "audio_recording.mp3", to: "Music/Samples/Drum_Loop_128BPM.mp3", type: "move" },
  { from: "screenshot_1.png", to: "Screenshots/2025/March/App_Design.png", type: "move" },
];

export default function AIOrganizeScreen() {
  const colors = useColors();
  const [rules, setRules] = useState(ORGANIZE_RULES);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleRule = (index: number) => {
    const updated = [...rules];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    setRules(updated);
  };

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="AI Organize" showBack subtitle="Smart file organization" />

        {/* Status Card */}
        <View style={[styles.statusCard, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "30" }]}>
          <View style={[styles.statusIcon, { backgroundColor: colors.primary + "25" }]}>
            <IconSymbol name="wand.and.stars" size={24} color={colors.primary} />
          </View>
          <Text style={[styles.statusTitle, { color: colors.foreground }]}>
            AI continuously organizes your files
          </Text>
          <Text style={[styles.statusDesc, { color: colors.muted }]}>
            Files, photos, and videos are automatically renamed, sorted, and restructured to maintain a logical hierarchy.
          </Text>
          <ActionButton
            title={isAnalyzing ? "Analyzing..." : "Run Organization"}
            icon="bolt.fill"
            loading={isAnalyzing}
            onPress={() => {
              setIsAnalyzing(true);
              setTimeout(() => setIsAnalyzing(false), 2000);
            }}
            fullWidth
          />
        </View>

        {/* Organization Rules */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>ORGANIZATION RULES</Text>
          <View style={[styles.rulesList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {rules.map((rule, index) => (
              <View
                key={rule.title}
                style={[
                  styles.ruleRow,
                  index < rules.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.ruleTitle, { color: colors.foreground }]}>{rule.title}</Text>
                  <Text style={[styles.ruleDesc, { color: colors.muted }]}>{rule.desc}</Text>
                </View>
                <Switch
                  value={rule.enabled}
                  onValueChange={() => toggleRule(index)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#fff"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Preview Changes */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>PREVIEW CHANGES</Text>
          <View style={[styles.previewList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {PREVIEW_CHANGES.map((change, index) => (
              <View
                key={index}
                style={[
                  styles.previewRow,
                  index < PREVIEW_CHANGES.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View style={[styles.changeTypeBadge, { backgroundColor: change.type === "rename" ? "#8B5CF6" + "20" : "#3B82F6" + "20" }]}>
                  <Text style={{ color: change.type === "rename" ? "#8B5CF6" : "#3B82F6", fontSize: 10, fontWeight: "700" }}>
                    {change.type.toUpperCase()}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.fromText, { color: colors.muted }]} numberOfLines={1}>{change.from}</Text>
                  <View style={styles.arrowRow}>
                    <IconSymbol name="arrow.right" size={12} color={colors.primary} />
                    <Text style={[styles.toText, { color: colors.foreground }]} numberOfLines={1}>{change.to}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    gap: 12,
    alignItems: "center",
    marginTop: 16,
  },
  statusIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  statusDesc: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  rulesList: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  ruleTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  ruleDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  previewList: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  changeTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  fromText: {
    fontSize: 13,
    textDecorationLine: "line-through",
  },
  arrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  toText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
