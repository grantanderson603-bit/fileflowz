import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SectionHeader } from "@/components/ui/section-header";
import { useColors } from "@/hooks/use-colors";

const MUSIC_TOOLS = [
  { title: "Audio Analysis", subtitle: "BPM, genre, chord detection", icon: "waveform", color: "#8B5CF6", route: "/music/analysis" },
  { title: "Transpose", subtitle: "Shift through all 12 keys", icon: "tuningfork", color: "#3B82F6", route: "/music/transpose" },
  { title: "Gibberish to Lyrics", subtitle: "AI matches real words to melody", icon: "text.bubble.fill", color: "#EC4899", route: "/music/gibberish-lyrics" },
  { title: "Hum to Vocal", subtitle: "Convert humming to synth voice", icon: "mic.fill", color: "#10B981", route: "/music/hum-to-vocal" },
  { title: "MIDI Export", subtitle: "Convert vocals to MIDI", icon: "arrow.down.doc.fill", color: "#F59E0B", route: "/music/midi-export" },
];

const RECENT_ANALYSES = [
  { name: "Summer_Beat.mp3", bpm: "128", genre: "Pop", key: "C Major", date: "Today" },
  { name: "Jazz_Improv.wav", bpm: "96", genre: "Jazz", key: "Bb Minor", date: "Yesterday" },
  { name: "Rock_Riff.mp3", bpm: "140", genre: "Rock", key: "E Minor", date: "Mar 20" },
  { name: "Lo-Fi_Chill.wav", bpm: "85", genre: "Lo-Fi", key: "D Major", date: "Mar 18" },
];

export default function MusicScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Music" subtitle="Audio intelligence for creators" />

        {/* Upload Area */}
        <Pressable
          style={({ pressed }) => [
            styles.uploadArea,
            { backgroundColor: "#8B5CF6" + "08", borderColor: "#8B5CF6" + "40" },
            pressed && { opacity: 0.8 },
          ]}
        >
          <View style={[styles.uploadIcon, { backgroundColor: "#8B5CF6" + "20" }]}>
            <IconSymbol name="music.note" size={32} color="#8B5CF6" />
          </View>
          <Text style={[styles.uploadTitle, { color: colors.foreground }]}>Upload Audio File</Text>
          <Text style={[styles.uploadDesc, { color: colors.muted }]}>
            MP3, WAV, FLAC, AAC, OGG supported
          </Text>
          <View style={[styles.uploadBtn, { backgroundColor: "#8B5CF6" }]}>
            <Text style={styles.uploadBtnText}>Select File</Text>
          </View>
        </Pressable>

        {/* Music Tools */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Music Tools" />
          {MUSIC_TOOLS.map((tool) => (
            <Pressable
              key={tool.title}
              onPress={() => router.push(tool.route as any)}
              style={({ pressed }) => [
                styles.toolRow,
                { backgroundColor: colors.surface, borderColor: colors.border },
                pressed && { opacity: 0.7 },
              ]}
            >
              <View style={[styles.toolIcon, { backgroundColor: tool.color + "20" }]}>
                <IconSymbol name={tool.icon as any} size={22} color={tool.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.toolTitle, { color: colors.foreground }]}>{tool.title}</Text>
                <Text style={[styles.toolSub, { color: colors.muted }]}>{tool.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.muted} />
            </Pressable>
          ))}
        </View>

        {/* Recent Analyses */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Recent Analyses" action="See All" />
          <View style={[styles.analysesList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {RECENT_ANALYSES.map((item, index) => (
              <Pressable
                key={item.name}
                style={({ pressed }) => [
                  styles.analysisRow,
                  index < RECENT_ANALYSES.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <View style={[styles.analysisIcon, { backgroundColor: "#8B5CF6" + "15" }]}>
                  <IconSymbol name="waveform" size={18} color="#8B5CF6" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.analysisName, { color: colors.foreground }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.analysisMetaRow}>
                    <View style={[styles.metaBadge, { backgroundColor: "#3B82F6" + "20" }]}>
                      <Text style={{ color: "#3B82F6", fontSize: 10, fontWeight: "700" }}>{item.bpm} BPM</Text>
                    </View>
                    <View style={[styles.metaBadge, { backgroundColor: "#8B5CF6" + "20" }]}>
                      <Text style={{ color: "#8B5CF6", fontSize: 10, fontWeight: "700" }}>{item.genre}</Text>
                    </View>
                    <View style={[styles.metaBadge, { backgroundColor: "#10B981" + "20" }]}>
                      <Text style={{ color: "#10B981", fontSize: 10, fontWeight: "700" }}>{item.key}</Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.analysisDate, { color: colors.muted }]}>{item.date}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  uploadArea: {
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    padding: 28,
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  uploadDesc: {
    fontSize: 13,
  },
  uploadBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 4,
  },
  uploadBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  toolRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    marginBottom: 8,
  },
  toolIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  toolSub: {
    fontSize: 13,
    marginTop: 2,
  },
  analysesList: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  analysisRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  analysisIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  analysisName: {
    fontSize: 14,
    fontWeight: "500",
  },
  analysisMetaRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },
  metaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  analysisDate: {
    fontSize: 12,
  },
});
