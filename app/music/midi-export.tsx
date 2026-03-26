import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const MIDI_SETTINGS = [
  { label: "Instrument", value: "Grand Piano" },
  { label: "Tempo", value: "128 BPM" },
  { label: "Key", value: "C Major" },
  { label: "Time Signature", value: "4/4" },
];

const EXPORT_FORMATS = [
  { name: "MIDI (.mid)", desc: "Universal MIDI format", icon: "pianokeys", color: "#3B82F6" },
  { name: "MusicXML", desc: "Notation software compatible", icon: "doc.text.fill", color: "#8B5CF6" },
  { name: "DAW Project", desc: "Logic Pro, Ableton, FL Studio", icon: "waveform", color: "#10B981" },
];

export default function MIDIExportScreen() {
  const colors = useColors();
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="MIDI Export" showBack subtitle="Convert vocal to MIDI for DAW" />

        {/* Source Info */}
        <View style={[styles.sourceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.sourceIcon, { backgroundColor: "#8B5CF6" + "20" }]}>
            <IconSymbol name="music.note" size={28} color="#8B5CF6" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.sourceTitle, { color: colors.foreground }]}>Vocal Melody</Text>
            <Text style={[styles.sourceMeta, { color: colors.muted }]}>2:15 · C Major · 128 BPM</Text>
          </View>
        </View>

        {/* MIDI Settings */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>MIDI SETTINGS</Text>
          <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {MIDI_SETTINGS.map((setting, index) => (
              <View
                key={setting.label}
                style={[
                  styles.settingRow,
                  index < MIDI_SETTINGS.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.settingLabel, { color: colors.muted }]}>{setting.label}</Text>
                <Text style={[styles.settingValue, { color: colors.foreground }]}>{setting.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Note Sequence Preview */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>NOTE SEQUENCE</Text>
          <View style={[styles.sequenceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.pianoRoll}>
              {Array.from({ length: 16 }).map((_, i) => (
                <View key={i} style={styles.noteBar}>
                  <View
                    style={[
                      styles.note,
                      {
                        height: 20 + Math.sin(i * 0.5) * 15,
                        backgroundColor: "#8B5CF6",
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
            <View style={styles.timelineRow}>
              <Text style={[styles.timelineText, { color: colors.muted }]}>0:00</Text>
              <Text style={[styles.timelineText, { color: colors.muted }]}>1:00</Text>
              <Text style={[styles.timelineText, { color: colors.muted }]}>2:00</Text>
            </View>
          </View>
        </View>

        {/* Export Format Selection */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>EXPORT FORMAT</Text>
          {EXPORT_FORMATS.map((format, index) => (
            <Pressable
              key={format.name}
              onPress={() => setSelectedFormat(index)}
              style={({ pressed }) => [
                styles.formatCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: selectedFormat === index ? colors.primary : colors.border,
                  borderWidth: selectedFormat === index ? 2 : 1,
                },
                pressed && { opacity: 0.8 },
              ]}
            >
              <View style={[styles.formatIcon, { backgroundColor: format.color + "20" }]}>
                <IconSymbol name={format.icon as any} size={20} color={format.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.formatName, { color: colors.foreground }]}>{format.name}</Text>
                <Text style={[styles.formatDesc, { color: colors.muted }]}>{format.desc}</Text>
              </View>
              {selectedFormat === index && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <IconSymbol name="checkmark.circle.fill" size={20} color="#fff" />
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {/* Export Info */}
        <View style={[styles.infoBox, { backgroundColor: colors.primary + "08", borderColor: colors.primary + "30" }]}>
          <IconSymbol name="info.circle.fill" size={18} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.foreground }]}>
            MIDI file will be ready to import into your favorite DAW. Timing and velocity data are preserved.
          </Text>
        </View>

        {/* Export Button */}
        <ActionButton
          title={isExporting ? "Exporting..." : "Export as MIDI"}
          icon="arrow.down.doc.fill"
          loading={isExporting}
          onPress={() => {
            setIsExporting(true);
            setTimeout(() => setIsExporting(false), 2000);
          }}
          fullWidth
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sourceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    marginTop: 12,
  },
  sourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sourceTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  sourceMeta: {
    fontSize: 13,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingsCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  settingValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  sequenceCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  pianoRoll: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 60,
    gap: 2,
  },
  noteBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  note: {
    width: "100%",
    borderRadius: 2,
  },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timelineText: {
    fontSize: 11,
  },
  formatCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  formatIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  formatName: {
    fontSize: 15,
    fontWeight: "600",
  },
  formatDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
    marginTop: 20,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
  },
});
