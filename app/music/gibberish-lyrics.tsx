import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const SUGGESTED_LYRICS = [
  {
    original: "duh-duh-duh",
    suggestions: ["Dreaming", "Dancing", "Drifting"],
    selected: "Dreaming",
  },
  {
    original: "la-la-la",
    suggestions: ["Love", "Light", "Laughter"],
    selected: "Love",
  },
  {
    original: "oh-oh-oh",
    suggestions: ["Over", "Open", "Only"],
    selected: "Open",
  },
  {
    original: "sha-sha-sha",
    suggestions: ["Shining", "Sharing", "Soaring"],
    selected: "Shining",
  },
  {
    original: "na-na-na",
    suggestions: ["Never", "Now", "New"],
    selected: "Now",
  },
];

export default function GibberishToLyricsScreen() {
  const colors = useColors();
  const [lyrics, setLyrics] = useState(SUGGESTED_LYRICS);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateLyric = (index: number, newWord: string) => {
    const updated = [...lyrics];
    updated[index] = { ...updated[index], selected: newWord };
    setLyrics(updated);
  };

  const finalLyrics = lyrics.map((l) => l.selected).join(" ");

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Gibberish to Lyrics" showBack subtitle="AI matches real words to melody" />

        {/* Recording Info */}
        <View style={[styles.recordingCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.recordIcon, { backgroundColor: "#EC4899" + "20" }]}>
            <IconSymbol name="mic.fill" size={28} color="#EC4899" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.recordTitle, { color: colors.foreground }]}>Vocal Melody Recorded</Text>
            <Text style={[styles.recordMeta, { color: colors.muted }]}>2:15 · 128 BPM · C Major</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.playBtn,
              { backgroundColor: "#EC4899" },
              pressed && { opacity: 0.8 },
            ]}
          >
            <IconSymbol name="play.fill" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* AI Processing Info */}
        <View style={[styles.infoCard, { backgroundColor: colors.primary + "08", borderColor: colors.primary + "30" }]}>
          <IconSymbol name="wand.and.stars" size={20} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.foreground }]}>
            AI analyzed your melody and matched syllables to real words that preserve the rhythm and flow.
          </Text>
        </View>

        {/* Lyric Suggestions */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>WORD SUGGESTIONS</Text>
          {lyrics.map((lyric, index) => (
            <View key={index} style={[styles.lyricCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.lyricHeader}>
                <View style={[styles.originalBadge, { backgroundColor: colors.muted + "20" }]}>
                  <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "700" }}>
                    {lyric.original}
                  </Text>
                </View>
                <IconSymbol name="arrow.right" size={14} color={colors.primary} />
                <View style={[styles.selectedBadge, { backgroundColor: colors.primary + "20" }]}>
                  <Text style={{ color: colors.primary, fontSize: 12, fontWeight: "700" }}>
                    {lyric.selected}
                  </Text>
                </View>
              </View>
              <View style={styles.suggestionsRow}>
                {lyric.suggestions.map((word) => (
                  <Pressable
                    key={word}
                    onPress={() => updateLyric(index, word)}
                    style={({ pressed }) => [
                      styles.suggestionChip,
                      {
                        backgroundColor:
                          lyric.selected === word ? colors.primary : colors.background,
                        borderColor:
                          lyric.selected === word ? colors.primary : colors.border,
                      },
                      pressed && { opacity: 0.8 },
                    ]}
                  >
                    <Text
                      style={{
                        color: lyric.selected === word ? "#fff" : colors.foreground,
                        fontSize: 13,
                        fontWeight: "600",
                      }}
                    >
                      {word}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Final Lyrics Preview */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>FINAL LYRICS</Text>
          <View style={[styles.lyricsPreview, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.lyricsText, { color: colors.foreground }]}>{finalLyrics}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <ActionButton title="Regenerate" icon="arrow.triangle.2.circlepath" variant="secondary" />
          <ActionButton
            title={isProcessing ? "Processing..." : "Convert to Vocal"}
            icon="mic.fill"
            loading={isProcessing}
            onPress={() => {
              setIsProcessing(true);
              setTimeout(() => setIsProcessing(false), 2000);
            }}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  recordingCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    marginTop: 12,
  },
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  recordMeta: {
    fontSize: 13,
    marginTop: 2,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    marginTop: 16,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  lyricCard: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  lyricHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  originalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  selectedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  suggestionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  suggestionChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  lyricsPreview: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    minHeight: 80,
    justifyContent: "center",
  },
  lyricsText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
});
