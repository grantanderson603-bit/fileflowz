import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";

const MODULE_CARDS = [
  {
    title: "Files",
    subtitle: "Cloud sync, smart folders, AI organize",
    icon: "folder.fill",
    color: "#3B82F6",
    route: "/(tabs)/files",
  },
  {
    title: "Music",
    subtitle: "Audio analysis, transpose, lyrics AI",
    icon: "music.note",
    color: "#8B5CF6",
    route: "/(tabs)/music",
  },
  {
    title: "Browse",
    subtitle: "VPN browser, tab AI, downloads",
    icon: "globe",
    color: "#10B981",
    route: "/(tabs)/browse",
  },
  {
    title: "Tools",
    subtitle: "AI agents, transfer, design, more",
    icon: "wrench.and.screwdriver.fill",
    color: "#F59E0B",
    route: "/(tabs)/tools",
  },
];

const QUICK_ACTIONS = [
  { title: "Upload", icon: "arrow.up.doc.fill", color: "#3B82F6" },
  { title: "Analyze", icon: "waveform", color: "#8B5CF6" },
  { title: "New Tab", icon: "globe", color: "#10B981" },
  { title: "Ask AI", icon: "brain", color: "#F59E0B" },
];

const RECENT_ACTIVITY = [
  { title: "Project_v2.pdf uploaded", time: "2 min ago", icon: "doc.fill", color: "#3B82F6" },
  { title: "Audio analyzed: 128 BPM, Pop", time: "15 min ago", icon: "music.note", color: "#8B5CF6" },
  { title: "3 duplicates cleaned", time: "1 hr ago", icon: "trash.fill", color: "#EF4444" },
  { title: "Tab workspace created", time: "2 hrs ago", icon: "square.grid.2x2.fill", color: "#10B981" },
  { title: "Voice memo transcribed", time: "3 hrs ago", icon: "mic.fill", color: "#F59E0B" },
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.muted }]}>Welcome back</Text>
            <Text style={[styles.appTitle, { color: colors.foreground }]}>FileFlow</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.profileBtn,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && { opacity: 0.7 },
            ]}
          >
            <IconSymbol name="person.fill" size={20} color={colors.primary} />
          </Pressable>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatCard label="Files Managed" value="1,247" icon="doc.fill" iconColor="#3B82F6" />
          <StatCard label="Cloud Storage" value="4.2 GB" icon="cloud.fill" iconColor="#10B981" />
          <StatCard label="AI Actions" value="89" icon="bolt.fill" iconColor="#F59E0B" />
        </View>

        {/* Quick Actions */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Quick Actions" />
          <View style={styles.quickActionsRow}>
            {QUICK_ACTIONS.map((action) => (
              <Pressable
                key={action.title}
                style={({ pressed }) => [
                  styles.quickAction,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + "20" }]}>
                  <IconSymbol name={action.icon as any} size={20} color={action.color} />
                </View>
                <Text style={[styles.quickActionText, { color: colors.foreground }]}>
                  {action.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Module Cards */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Modules" />
          <View style={styles.moduleGrid}>
            {MODULE_CARDS.map((card) => (
              <Pressable
                key={card.title}
                onPress={() => router.push(card.route as any)}
                style={({ pressed }) => [
                  styles.moduleCard,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  pressed && { opacity: 0.7, transform: [{ scale: 0.97 }] },
                ]}
              >
                <View style={[styles.moduleIcon, { backgroundColor: card.color + "20" }]}>
                  <IconSymbol name={card.icon as any} size={24} color={card.color} />
                </View>
                <Text style={[styles.moduleTitle, { color: colors.foreground }]}>
                  {card.title}
                </Text>
                <Text style={[styles.moduleSubtitle, { color: colors.muted }]} numberOfLines={2}>
                  {card.subtitle}
                </Text>
                <View style={styles.moduleArrow}>
                  <IconSymbol name="arrow.right" size={16} color={colors.muted} />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Recent Activity" action="See All" />
          <View style={[styles.activityCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {RECENT_ACTIVITY.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.activityRow,
                  index < RECENT_ACTIVITY.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View style={[styles.activityIcon, { backgroundColor: item.color + "15" }]}>
                  <IconSymbol name={item.icon as any} size={16} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.activityTitle, { color: colors.foreground }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={[styles.activityTime, { color: colors.muted }]}>{item.time}</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    fontWeight: "500",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 2,
  },
  profileBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "600",
  },
  moduleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  moduleCard: {
    width: "48.5%",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    gap: 8,
  },
  moduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  moduleTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  moduleSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  moduleArrow: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  activityCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  activityTime: {
    fontSize: 12,
    marginTop: 2,
  },
});
