import { ScrollView, Text, View, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SectionHeader } from "@/components/ui/section-header";
import { ListRow } from "@/components/ui/list-row";
import { useColors } from "@/hooks/use-colors";

const TABS = ["All", "Cloud", "Local", "Smart"];

const CLOUD_SERVICES = [
  { name: "Dropbox", icon: "cloud.fill", color: "#0061FF", connected: true, storage: "2.1 GB" },
  { name: "Google Drive", icon: "cloud.fill", color: "#34A853", connected: true, storage: "1.8 GB" },
  { name: "iCloud", icon: "cloud.fill", color: "#999", connected: false, storage: "" },
  { name: "OneDrive", icon: "cloud.fill", color: "#0078D4", connected: false, storage: "" },
];

const FILES = [
  { name: "Documents", type: "folder", items: "24 items", icon: "folder.fill", color: "#3B82F6", cloud: "Dropbox" },
  { name: "Photos", type: "folder", items: "156 items", icon: "photo.fill", color: "#8B5CF6", cloud: "Google Drive" },
  { name: "Music Samples", type: "folder", items: "42 items", icon: "music.note", color: "#EC4899", cloud: "" },
  { name: "Project_Final.pdf", type: "file", items: "2.4 MB", icon: "doc.fill", color: "#EF4444", cloud: "Dropbox" },
  { name: "Presentation.pptx", type: "file", items: "8.1 MB", icon: "doc.text.fill", color: "#F59E0B", cloud: "" },
  { name: "Budget_2025.xlsx", type: "file", items: "1.2 MB", icon: "doc.text.fill", color: "#22C55E", cloud: "Google Drive" },
  { name: "Recording_03.mp3", type: "file", items: "5.7 MB", icon: "music.note", color: "#8B5CF6", cloud: "" },
  { name: "Screenshot_01.png", type: "file", items: "3.1 MB", icon: "photo.fill", color: "#06B6D4", cloud: "" },
];

const FILE_TOOLS = [
  { title: "AI Organize", subtitle: "Auto-sort files intelligently", icon: "wand.and.stars", color: "#8B5CF6", route: "/files/ai-organize" },
  { title: "Duplicate Cleaner", subtitle: "Find & remove duplicates", icon: "doc.on.doc.fill", color: "#EF4444", route: "/files/duplicates" },
  { title: "PDF Editor", subtitle: "View, annotate, markup", icon: "doc.text.fill", color: "#F59E0B", route: "/files/pdf-editor" },
  { title: "File Converter", subtitle: "Audio, image, PDF formats", icon: "arrow.triangle.2.circlepath", color: "#10B981", route: "/files/converter" },
  { title: "URL Saver", subtitle: "Save URLs as file cards", icon: "link", color: "#3B82F6", route: "/files/url-saver" },
  { title: "Camera Upload", subtitle: "Auto-upload photos", icon: "camera.fill", color: "#EC4899", route: "/files/camera-upload" },
];

export default function FilesScreen() {
  const colors = useColors();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Files" rightIcon="plus" />

        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={18} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="Search files..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="done"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {TABS.map((tab, i) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(i)}
              style={({ pressed }) => [
                styles.tab,
                {
                  backgroundColor: activeTab === i ? colors.primary : colors.surface,
                  borderColor: activeTab === i ? colors.primary : colors.border,
                },
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === i ? "#fff" : colors.muted },
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Cloud Services */}
        <View style={{ marginTop: 20 }}>
          <SectionHeader title="Cloud Storage" action="Manage" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -5 }}>
            <View style={styles.cloudRow}>
              {CLOUD_SERVICES.map((service) => (
                <Pressable
                  key={service.name}
                  style={({ pressed }) => [
                    styles.cloudCard,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <View style={[styles.cloudIcon, { backgroundColor: service.color + "20" }]}>
                    <IconSymbol name={service.icon as any} size={20} color={service.color} />
                  </View>
                  <Text style={[styles.cloudName, { color: colors.foreground }]}>{service.name}</Text>
                  {service.connected ? (
                    <Text style={[styles.cloudStorage, { color: colors.muted }]}>{service.storage}</Text>
                  ) : (
                    <Text style={[styles.cloudConnect, { color: colors.primary }]}>Connect</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Smart Folders Banner */}
        <Pressable
          style={({ pressed }) => [
            styles.smartBanner,
            { backgroundColor: colors.primary + "15", borderColor: colors.primary + "30" },
            pressed && { opacity: 0.8 },
          ]}
        >
          <View style={[styles.smartBannerIcon, { backgroundColor: colors.primary + "25" }]}>
            <IconSymbol name="bolt.fill" size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.smartBannerTitle, { color: colors.foreground }]}>
              Smart Folders
            </Text>
            <Text style={[styles.smartBannerSub, { color: colors.muted }]}>
              Virtual offline folders — zero device storage
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={16} color={colors.muted} />
        </Pressable>

        {/* File Browser */}
        <View style={{ marginTop: 20 }}>
          <SectionHeader title="Recent Files" action="Sort" />
          <View style={[styles.fileList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {FILES.map((file, index) => (
              <View
                key={file.name}
                style={[
                  styles.fileRow,
                  index < FILES.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View style={[styles.fileIcon, { backgroundColor: file.color + "15" }]}>
                  <IconSymbol name={file.icon as any} size={20} color={file.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.fileName, { color: colors.foreground }]} numberOfLines={1}>
                    {file.name}
                  </Text>
                  <View style={styles.fileMeta}>
                    <Text style={[styles.fileSize, { color: colors.muted }]}>{file.items}</Text>
                    {file.cloud ? (
                      <View style={[styles.cloudBadge, { backgroundColor: colors.primary + "20" }]}>
                        <Text style={[styles.cloudBadgeText, { color: colors.primary }]}>
                          {file.cloud}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
                <IconSymbol name="chevron.right" size={14} color={colors.muted} />
              </View>
            ))}
          </View>
        </View>

        {/* File Tools Grid */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="File Tools" />
          <View style={styles.toolsGrid}>
            {FILE_TOOLS.map((tool) => (
              <Pressable
                key={tool.title}
                onPress={() => router.push(tool.route as any)}
                style={({ pressed }) => [
                  styles.toolCard,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <View style={[styles.toolIcon, { backgroundColor: tool.color + "20" }]}>
                  <IconSymbol name={tool.icon as any} size={20} color={tool.color} />
                </View>
                <Text style={[styles.toolTitle, { color: colors.foreground }]}>{tool.title}</Text>
                <Text style={[styles.toolSub, { color: colors.muted }]} numberOfLines={1}>
                  {tool.subtitle}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    height: 44,
  },
  tabRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
  },
  cloudRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 5,
  },
  cloudCard: {
    width: 120,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
  },
  cloudIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cloudName: {
    fontSize: 13,
    fontWeight: "600",
  },
  cloudStorage: {
    fontSize: 12,
  },
  cloudConnect: {
    fontSize: 12,
    fontWeight: "600",
  },
  smartBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    marginTop: 16,
  },
  smartBannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  smartBannerTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  smartBannerSub: {
    fontSize: 12,
    marginTop: 2,
  },
  fileList: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fileName: {
    fontSize: 15,
    fontWeight: "500",
  },
  fileMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 3,
  },
  fileSize: {
    fontSize: 12,
  },
  cloudBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  cloudBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  toolCard: {
    width: "48.5%",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 6,
  },
  toolIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  toolSub: {
    fontSize: 12,
  },
});
