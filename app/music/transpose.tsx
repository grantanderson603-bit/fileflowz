import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const ORIGINAL_KEY = 0; // C

export default function TransposeScreen() {
  const colors = useColors();
  const [selectedKey, setSelectedKey] = useState(ORIGINAL_KEY);
  const [isPlaying, setIsPlaying] = useState(false);

  const semitones = selectedKey - ORIGINAL_KEY;
  const displaySemitones = semitones > 0 ? `+${semitones}` : semitones.toString();

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Transpose" showBack subtitle="Shift audio through 12 keys" />

        {/* Now Playing */}
        <View style={[styles.playerCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.playerIcon, { backgroundColor: "#8B5CF6" + "20" }]}>
            <IconSymbol name="music.note" size={28} color="#8B5CF6" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.trackName, { color: colors.foreground }]}>Summer_Beat.mp3</Text>
            <Text style={[styles.trackMeta, { color: colors.muted }]}>Original Key: C Major</Text>
          </View>
          <Pressable
            onPress={() => setIsPlaying(!isPlaying)}
            style={({ pressed }) => [
              styles.playBtn,
              { backgroundColor: "#8B5CF6" },
              pressed && { opacity: 0.8 },
            ]}
          >
            <IconSymbol name={isPlaying ? "pause.fill" : "play.fill"} size={20} color="#fff" />
          </Pressable>
        </View>

        {/* Current Transposition */}
        <View style={[styles.transposeCard, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "30" }]}>
          <Text style={[styles.transposeLabel, { color: colors.muted }]}>TRANSPOSED TO</Text>
          <View style={styles.transposeDisplay}>
            <Text style={[styles.transposeKey, { color: colors.primary }]}>{NOTES[selectedKey]}</Text>
            <Text style={[styles.transposeSemitones, { color: colors.muted }]}>
              {displaySemitones} semitones
            </Text>
          </View>
          <Text style={[styles.transposeDesc, { color: colors.muted }]}>
            Audio quality preserved · No warping or artifacts
          </Text>
        </View>

        {/* Key Selector */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>SELECT KEY</Text>
          <View style={styles.keyGrid}>
            {NOTES.map((note, index) => (
              <Pressable
                key={note}
                onPress={() => setSelectedKey(index)}
                style={({ pressed }) => [
                  styles.keyButton,
                  {
                    backgroundColor:
                      selectedKey === index ? colors.primary : colors.surface,
                    borderColor:
                      selectedKey === index ? colors.primary : colors.border,
                  },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text
                  style={[
                    styles.keyText,
                    { color: selectedKey === index ? "#fff" : colors.foreground },
                  ]}
                >
                  {note}
                </Text>
                {selectedKey === index && (
                  <Text style={styles.keyOffset}>
                    {index === ORIGINAL_KEY ? "Original" : `${index - ORIGINAL_KEY > 0 ? "+" : ""}${index - ORIGINAL_KEY}`}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Comparison */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>COMPARISON</Text>
          <View style={[styles.comparisonCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.comparisonRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.compLabel, { color: colors.muted }]}>ORIGINAL</Text>
                <Text style={[styles.compValue, { color: colors.foreground }]}>C Major</Text>
                <Text style={[styles.compDesc, { color: colors.muted }]}>128 BPM · Pop</Text>
              </View>
              <View style={[styles.compArrow, { backgroundColor: colors.primary }]}>
                <IconSymbol name="arrow.right" size={16} color="#fff" />
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={[styles.compLabel, { color: colors.muted }]}>TRANSPOSED</Text>
                <Text style={[styles.compValue, { color: colors.primary }]}>{NOTES[selectedKey]} Major</Text>
                <Text style={[styles.compDesc, { color: colors.muted }]}>128 BPM · Pop</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <ActionButton title="Preview" icon="play.fill" variant="secondary" />
          <ActionButton title="Export" icon="arrow.down.doc.fill" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  playerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    marginTop: 12,
  },
  playerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  trackName: {
    fontSize: 16,
    fontWeight: "600",
  },
  trackMeta: {
    fontSize: 13,
    marginTop: 2,
  },
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  transposeCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  transposeLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },
  transposeDisplay: {
    alignItems: "center",
    gap: 4,
  },
  transposeKey: {
    fontSize: 48,
    fontWeight: "700",
  },
  transposeSemitones: {
    fontSize: 14,
  },
  transposeDesc: {
    fontSize: 13,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  keyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  keyButton: {
    width: "23%",
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    alignItems: "center",
    gap: 4,
  },
  keyText: {
    fontSize: 18,
    fontWeight: "700",
  },
  keyOffset: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
  },
  comparisonCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  comparisonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  compLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  compValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  compDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  compArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
});
