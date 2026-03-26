import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const CHORD_PROGRESSION = [
  { chord: "C", type: "Major", bar: 1, color: "#3B82F6" },
  { chord: "Am", type: "Minor", bar: 2, color: "#8B5CF6" },
  { chord: "F", type: "Major", bar: 3, color: "#10B981" },
  { chord: "G", type: "Major", bar: 4, color: "#F59E0B" },
  { chord: "C", type: "Major", bar: 5, color: "#3B82F6" },
  { chord: "Am", type: "Minor", bar: 6, color: "#8B5CF6" },
  { chord: "Dm", type: "Minor", bar: 7, color: "#EC4899" },
  { chord: "G7", type: "Dom7", bar: 8, color: "#F59E0B" },
];

const SECTIONS = [
  { name: "Intro", start: "0:00", end: "0:15", bars: "1-4", color: "#3B82F6" },
  { name: "Verse 1", start: "0:15", end: "0:45", bars: "5-12", color: "#8B5CF6" },
  { name: "Chorus", start: "0:45", end: "1:15", bars: "13-20", color: "#EC4899" },
  { name: "Verse 2", start: "1:15", end: "1:45", bars: "21-28", color: "#8B5CF6" },
  { name: "Chorus", start: "1:45", end: "2:15", bars: "29-36", color: "#EC4899" },
  { name: "Outro", start: "2:15", end: "2:40", bars: "37-42", color: "#10B981" },
];

export default function AudioAnalysisScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Analysis" showBack subtitle="Audio intelligence results" />

        {/* Now Playing */}
        <View style={[styles.playerCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.albumArt, { backgroundColor: "#8B5CF6" + "20" }]}>
            <IconSymbol name="music.note" size={32} color="#8B5CF6" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.trackName, { color: colors.foreground }]}>Summer_Beat.mp3</Text>
            <Text style={[styles.trackMeta, { color: colors.muted }]}>2:40 · 4.2 MB · WAV</Text>
          </View>
          <Pressable style={({ pressed }) => [styles.playBtn, { backgroundColor: "#8B5CF6" }, pressed && { opacity: 0.8 }]}>
            <IconSymbol name="play.fill" size={20} color="#fff" />
          </Pressable>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.metricValue, { color: "#3B82F6" }]}>128</Text>
            <Text style={[styles.metricLabel, { color: colors.muted }]}>BPM</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.metricValue, { color: "#8B5CF6" }]}>Pop</Text>
            <Text style={[styles.metricLabel, { color: colors.muted }]}>Genre</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.metricValue, { color: "#10B981" }]}>C Maj</Text>
            <Text style={[styles.metricLabel, { color: colors.muted }]}>Key</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.metricValue, { color: "#F59E0B" }]}>4/4</Text>
            <Text style={[styles.metricLabel, { color: colors.muted }]}>Time</Text>
          </View>
        </View>

        {/* Waveform Placeholder */}
        <View style={[styles.waveformCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>WAVEFORM</Text>
          <View style={styles.waveformBars}>
            {Array.from({ length: 40 }).map((_, i) => {
              const height = 10 + Math.sin(i * 0.5) * 20 + Math.random() * 15;
              return (
                <View
                  key={i}
                  style={[
                    styles.waveBar,
                    {
                      height,
                      backgroundColor: i < 20 ? "#8B5CF6" : "#8B5CF6" + "40",
                    },
                  ]}
                />
              );
            })}
          </View>
          <View style={styles.timeRow}>
            <Text style={[styles.timeText, { color: colors.muted }]}>0:00</Text>
            <Text style={[styles.timeText, { color: colors.muted }]}>1:20</Text>
            <Text style={[styles.timeText, { color: colors.muted }]}>2:40</Text>
          </View>
        </View>

        {/* Chord Progression */}
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>CHORD PROGRESSION</Text>
          <View style={styles.chordGrid}>
            {CHORD_PROGRESSION.map((chord, i) => (
              <View
                key={i}
                style={[
                  styles.chordCard,
                  { backgroundColor: chord.color + "15", borderColor: chord.color + "30" },
                ]}
              >
                <Text style={[styles.chordName, { color: chord.color }]}>{chord.chord}</Text>
                <Text style={[styles.chordType, { color: colors.muted }]}>{chord.type}</Text>
                <Text style={[styles.chordBar, { color: colors.muted }]}>Bar {chord.bar}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Song Structure */}
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>SONG STRUCTURE</Text>
          <View style={[styles.structureCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {SECTIONS.map((section, index) => (
              <View
                key={index}
                style={[
                  styles.sectionRow,
                  index < SECTIONS.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View style={[styles.sectionBadge, { backgroundColor: section.color + "20" }]}>
                  <Text style={{ color: section.color, fontSize: 12, fontWeight: "700" }}>{section.name}</Text>
                </View>
                <Text style={[styles.sectionTime, { color: colors.foreground }]}>
                  {section.start} - {section.end}
                </Text>
                <Text style={[styles.sectionBars, { color: colors.muted }]}>Bars {section.bars}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <ActionButton title="Transpose" icon="tuningfork" variant="secondary" />
          <ActionButton title="Export" icon="arrow.down.doc.fill" variant="secondary" />
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
  albumArt: {
    width: 52,
    height: 52,
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
  metricsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    alignItems: "center",
    gap: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  waveformCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  waveformBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 50,
    gap: 2,
  },
  waveBar: {
    flex: 1,
    borderRadius: 2,
    minWidth: 3,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontSize: 11,
  },
  chordGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chordCard: {
    width: "23%",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    alignItems: "center",
    gap: 2,
  },
  chordName: {
    fontSize: 20,
    fontWeight: "700",
  },
  chordType: {
    fontSize: 10,
  },
  chordBar: {
    fontSize: 10,
    marginTop: 2,
  },
  structureCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  sectionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 70,
    alignItems: "center",
  },
  sectionTime: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  sectionBars: {
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
});
