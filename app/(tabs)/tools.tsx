import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SectionHeader } from "@/components/ui/section-header";
import { useColors } from "@/hooks/use-colors";

const TOOL_CATEGORIES = [
  {
    title: "AI & Automation",
    icon: "brain",
    color: "#8B5CF6",
    tools: [
      { name: "AI Agents", desc: "Multi-step workflows", route: "/tools/ai-agents" },
      { name: "Voice Transcription", desc: "Real-time speech-to-text", route: "/tools/transcription" },
      { name: "Media Editing", desc: "Voice-commanded edits", route: "/tools/media-editing" },
    ],
  },
  {
    title: "File & Transfer",
    icon: "arrow.left.arrow.right",
    color: "#3B82F6",
    tools: [
      { name: "Large File Transfer", desc: "WeTransfer-style sharing", route: "/tools/file-transfer" },
      { name: "Email Client", desc: "Built-in email manager", route: "/tools/email" },
      { name: "Wireless Transfer", desc: "Send files via Wi-Fi", route: "/tools/wireless" },
    ],
  },
  {
    title: "Design & Creative",
    icon: "paintbrush.fill",
    color: "#EC4899",
    tools: [
      { name: "Graphic Design", desc: "Canva-style editor", route: "/tools/design" },
      { name: "Wallpaper Creator", desc: "Generate custom wallpapers", route: "/tools/wallpaper" },
      { name: "Image Search", desc: "Reverse image lookup", route: "/tools/image-search" },
    ],
  },
  {
    title: "System & Recovery",
    icon: "gear",
    color: "#10B981",
    tools: [
      { name: "System Recovery", desc: "Dr.Fone-style recovery", route: "/tools/recovery" },
      { name: "Device Manager", desc: "Storage & permissions", route: "/tools/device" },
      { name: "Backup & Restore", desc: "Full device backup", route: "/tools/backup" },
    ],
  },
];

export default function ToolsScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Tools" subtitle="AI agents, design, transfer & more" />

        {/* Quick Access */}
        <View style={{ marginTop: 12 }}>
          <SectionHeader title="Quick Access" />
          <View style={styles.quickGrid}>
            <Pressable
              style={({ pressed }) => [
                styles.quickCard,
                { backgroundColor: "#8B5CF6" + "15", borderColor: "#8B5CF6" + "30" },
                pressed && { opacity: 0.7 },
              ]}
            >
              <IconSymbol name="brain" size={24} color="#8B5CF6" />
              <Text style={[styles.quickText, { color: "#8B5CF6" }]}>AI Agents</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.quickCard,
                { backgroundColor: "#3B82F6" + "15", borderColor: "#3B82F6" + "30" },
                pressed && { opacity: 0.7 },
              ]}
            >
              <IconSymbol name="arrow.left.arrow.right" size={24} color="#3B82F6" />
              <Text style={[styles.quickText, { color: "#3B82F6" }]}>Transfer</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.quickCard,
                { backgroundColor: "#EC4899" + "15", borderColor: "#EC4899" + "30" },
                pressed && { opacity: 0.7 },
              ]}
            >
              <IconSymbol name="paintbrush.fill" size={24} color="#EC4899" />
              <Text style={[styles.quickText, { color: "#EC4899" }]}>Design</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.quickCard,
                { backgroundColor: "#10B981" + "15", borderColor: "#10B981" + "30" },
                pressed && { opacity: 0.7 },
              ]}
            >
              <IconSymbol name="gear" size={24} color="#10B981" />
              <Text style={[styles.quickText, { color: "#10B981" }]}>System</Text>
            </Pressable>
          </View>
        </View>

        {/* Tool Categories */}
        {TOOL_CATEGORIES.map((category) => (
          <View key={category.title} style={{ marginTop: 24 }}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: category.color + "20" }]}>
                <IconSymbol name={category.icon as any} size={18} color={category.color} />
              </View>
              <Text style={[styles.categoryTitle, { color: colors.foreground }]}>
                {category.title}
              </Text>
            </View>
            <View style={styles.toolsList}>
              {category.tools.map((tool) => (
                <Pressable
                  key={tool.name}
                  onPress={() => router.push(tool.route as any)}
                  style={({ pressed }) => [
                    styles.toolRow,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.toolName, { color: colors.foreground }]}>{tool.name}</Text>
                    <Text style={[styles.toolDesc, { color: colors.muted }]}>{tool.desc}</Text>
                  </View>
                  <IconSymbol name="chevron.right" size={16} color={colors.muted} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  quickCard: {
    width: "48.5%",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
  },
  quickText: {
    fontSize: 13,
    fontWeight: "600",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  toolsList: {
    gap: 8,
  },
  toolRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  toolName: {
    fontSize: 15,
    fontWeight: "600",
  },
  toolDesc: {
    fontSize: 12,
    marginTop: 2,
  },
});
