import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const VOICE_LIBRARY = [
  { name: "Aria", type: "Female", style: "Warm & Smooth", color: "#EC4899" },
  { name: "Luna", type: "Female", style: "Bright & Clear", color: "#8B5CF6" },
  { name: "Nova", type: "Female", style: "Modern & Crisp", color: "#3B82F6" },
  { name: "Alex", type: "Male", style: "Deep & Rich", color: "#10B981" },
  { name: "Jordan", type: "Male", style: "Neutral & Natural", color: "#F59E0B" },
  { name: "River", type: "Male", style: "Soft & Gentle", color: "#06B6D4" },
];

export default function HumToVocalScreen() {
  const colors = useColors();
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const voice = VOICE_LIBRARY[selectedVoice];

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Hum to Vocal" showBack subtitle="Convert humming to synthesized voice" />

        {/* Recording Area */}
        <Pressable
          onPress={() => setIsRecording(!isRecording)}
          style={({ pressed }) => [
            styles.recordingArea,
            {
              backgroundColor: isRecording ? colors.error + "15" : colors.surface,
              borderColor: isRecording ? colors.error + "40" : colors.border,
            },
            pressed && { opacity: 0.8 },
          ]}
        >
          <View
            style={[
              styles.recordingPulse,
              {
                backgroundColor: isRecording ? colors.error : colors.muted,
              },
            ]}
          >
            <IconSymbol name="mic.fill" size={28} color="#fff" />
          </View>
          <Text style={[styles.recordingText, { color: colors.foreground }]}>
            {isRecording ? "Recording..." : "Tap to Record Melody"}
          </Text>
          <Text style={[styles.recordingDesc, { color: colors.muted }]}>
            {isRecording ? "Hum or sing your melody" : "Minimum 5 seconds"}
          </Text>
        </Pressable>

        {/* Voice Selection */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>SELECT VOICE</Text>
          <View style={styles.voiceGrid}>
            {VOICE_LIBRARY.map((v, index) => (
              <Pressable
                key={v.name}
                onPress={() => setSelectedVoice(index)}
                style={({ pressed }) => [
                  styles.voiceCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: selectedVoice === index ? v.color : colors.border,
                    borderWidth: selectedVoice === index ? 2 : 1,
                  },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <View style={[styles.voiceIcon, { backgroundColor: v.color + "20" }]}>
                  <IconSymbol name={v.type === "Female" ? "person.fill" : "person.fill"} size={20} color={v.color} />
                </View>
                <Text style={[styles.voiceName, { color: colors.foreground }]}>{v.name}</Text>
                <Text style={[styles.voiceType, { color: colors.muted }]}>{v.type}</Text>
                <Text style={[styles.voiceStyle, { color: v.color }]}>{v.style}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Voice Preview */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>VOICE PREVIEW</Text>
          <View style={[styles.previewCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.previewIcon, { backgroundColor: voice.color + "20" }]}>
              <IconSymbol name="speaker.wave.2.fill" size={24} color={voice.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.previewTitle, { color: colors.foreground }]}>{voice.name}</Text>
              <Text style={[styles.previewDesc, { color: colors.muted }]}>{voice.style}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.previewPlayBtn,
                { backgroundColor: voice.color },
                pressed && { opacity: 0.8 },
              ]}
            >
              <IconSymbol name="play.fill" size={16} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* Voice Settings */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>VOICE SETTINGS</Text>
          <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.foreground }]}>Pitch</Text>
              <View style={styles.sliderPlaceholder} />
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.foreground }]}>Vibrato</Text>
              <View style={styles.sliderPlaceholder} />
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.foreground }]}>Emotion</Text>
              <View style={styles.sliderPlaceholder} />
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <ActionButton title="Clear" icon="xmark" variant="secondary" />
          <ActionButton
            title={isProcessing ? "Processing..." : "Generate Vocal"}
            icon="waveform"
            loading={isProcessing}
            onPress={() => {
              setIsProcessing(true);
              setTimeout(() => setIsProcessing(false), 3000);
            }}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  recordingArea: {
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    padding: 32,
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  recordingPulse: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  recordingText: {
    fontSize: 18,
    fontWeight: "600",
  },
  recordingDesc: {
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  voiceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  voiceCard: {
    width: "31%",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    gap: 6,
  },
  voiceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  voiceName: {
    fontSize: 15,
    fontWeight: "600",
  },
  voiceType: {
    fontSize: 11,
  },
  voiceStyle: {
    fontSize: 10,
    fontWeight: "600",
  },
  previewCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  previewIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  previewDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  previewPlayBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "500",
    width: 80,
  },
  sliderPlaceholder: {
    flex: 1,
    height: 4,
    backgroundColor: "#3B82F6" + "40",
    borderRadius: 2,
  },
  divider: {
    height: 1,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
});
