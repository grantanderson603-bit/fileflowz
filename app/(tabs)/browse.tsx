import { ScrollView, Text, View, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SectionHeader } from "@/components/ui/section-header";
import { useColors } from "@/hooks/use-colors";

const BROWSER_FEATURES = [
  { title: "VPN Protection", subtitle: "Integrated Proton VPN", icon: "lock.shield.fill", color: "#10B981", route: "/browse/vpn" },
  { title: "Parallel Downloads", subtitle: "Multi-connection speed boost", icon: "arrow.down.circle.fill", color: "#3B82F6", route: "/browse/downloads" },
  { title: "Smart Autofill", subtitle: "Secure password manager", icon: "doc.fill", color: "#8B5CF6", route: "/browse/autofill" },
  { title: "Tab Manager", subtitle: "AI-powered tab organization", icon: "square.grid.2x2.fill", color: "#F59E0B", route: "/browse/tabs" },
];

const OPEN_TABS = [
  { title: "React Native Docs", url: "reactnative.dev", favicon: "📚", color: "#3B82F6" },
  { title: "GitHub - FileFlow", url: "github.com/fileflow", favicon: "🐙", color: "#10B981" },
  { title: "Figma Design", url: "figma.com/design", favicon: "🎨", color: "#8B5CF6" },
  { title: "Stack Overflow", url: "stackoverflow.com", favicon: "🔗", color: "#F59E0B" },
  { title: "YouTube", url: "youtube.com", favicon: "▶️", color: "#EF4444" },
];

const DOWNLOADS = [
  { name: "Design_System_v2.pdf", size: "2.4 MB", progress: 100, speed: "Complete", icon: "doc.fill", color: "#EF4444" },
  { name: "Audio_Sample.wav", size: "5.1 MB", progress: 75, speed: "1.2 MB/s", icon: "music.note", color: "#8B5CF6" },
  { name: "Project_Archive.zip", size: "18.7 MB", progress: 45, speed: "2.1 MB/s", icon: "doc.on.doc.fill", color: "#3B82F6" },
];

export default function BrowseScreen() {
  const colors = useColors();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [vpnActive, setVpnActive] = useState(true);

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Browse" subtitle="VPN browser with AI tab management" />

        {/* Address Bar */}
        <View style={[styles.addressBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <IconSymbol name={vpnActive ? "lock.shield.fill" : "globe"} size={18} color={vpnActive ? colors.success : colors.muted} />
          <TextInput
            style={[styles.addressInput, { color: colors.foreground }]}
            placeholder="Enter URL or search..."
            placeholderTextColor={colors.muted}
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            keyboardType="url"
            returnKeyType="go"
          />
          <Pressable
            onPress={() => setVpnActive(!vpnActive)}
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          >
            <IconSymbol name="antenna.radiowaves.left.and.right" size={18} color={vpnActive ? colors.success : colors.muted} />
          </Pressable>
        </View>

        {/* VPN Status */}
        <View
          style={[
            styles.vpnStatus,
            {
              backgroundColor: vpnActive ? colors.success + "15" : colors.warning + "15",
              borderColor: vpnActive ? colors.success + "30" : colors.warning + "30",
            },
          ]}
        >
          <View
            style={[
              styles.vpnIndicator,
              { backgroundColor: vpnActive ? colors.success : colors.warning },
            ]}
          />
          <Text style={[styles.vpnText, { color: vpnActive ? colors.success : colors.warning }]}>
            {vpnActive ? "VPN Connected · Proton VPN · US Server" : "VPN Disconnected"}
          </Text>
        </View>

        {/* Browser Features */}
        <View style={{ marginTop: 20 }}>
          <SectionHeader title="Browser Features" />
          {BROWSER_FEATURES.map((feature) => (
            <Pressable
              key={feature.title}
              onPress={() => router.push(feature.route as any)}
              style={({ pressed }) => [
                styles.featureRow,
                { backgroundColor: colors.surface, borderColor: colors.border },
                pressed && { opacity: 0.7 },
              ]}
            >
              <View style={[styles.featureIcon, { backgroundColor: feature.color + "20" }]}>
                <IconSymbol name={feature.icon as any} size={20} color={feature.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.featureTitle, { color: colors.foreground }]}>{feature.title}</Text>
                <Text style={[styles.featureSub, { color: colors.muted }]}>{feature.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.muted} />
            </Pressable>
          ))}
        </View>

        {/* Open Tabs */}
        <View style={{ marginTop: 20 }}>
          <SectionHeader title="Open Tabs" action={`${OPEN_TABS.length}`} />
          <View style={styles.tabsList}>
            {OPEN_TABS.map((tab, index) => (
              <Pressable
                key={tab.title}
                style={({ pressed }) => [
                  styles.tabItem,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <View style={[styles.tabFavicon, { backgroundColor: tab.color + "20" }]}>
                  <Text style={styles.faviconText}>{tab.favicon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.tabTitle, { color: colors.foreground }]} numberOfLines={1}>
                    {tab.title}
                  </Text>
                  <Text style={[styles.tabUrl, { color: colors.muted }]}>{tab.url}</Text>
                </View>
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.6 }]}>
                  <IconSymbol name="xmark" size={16} color={colors.muted} />
                </Pressable>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Downloads */}
        <View style={{ marginTop: 20 }}>
          <SectionHeader title="Downloads" action="Clear" />
          <View style={[styles.downloadsList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {DOWNLOADS.map((download, index) => (
              <View
                key={download.name}
                style={[
                  styles.downloadRow,
                  index < DOWNLOADS.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View style={[styles.downloadIcon, { backgroundColor: download.color + "15" }]}>
                  <IconSymbol name={download.icon as any} size={18} color={download.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.downloadName, { color: colors.foreground }]} numberOfLines={1}>
                    {download.name}
                  </Text>
                  <View style={styles.downloadMeta}>
                    <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                      <View
                        style={[
                          styles.progressFill,
                          { backgroundColor: download.color, width: `${download.progress}%` },
                        ]}
                      />
                    </View>
                    <Text style={[styles.downloadSpeed, { color: colors.muted }]}>{download.speed}</Text>
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
  addressBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
    marginTop: 12,
  },
  addressInput: {
    flex: 1,
    fontSize: 15,
    height: 48,
  },
  vpnStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    marginTop: 12,
  },
  vpnIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  vpnText: {
    fontSize: 12,
    fontWeight: "500",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    marginBottom: 8,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  featureSub: {
    fontSize: 12,
    marginTop: 2,
  },
  tabsList: {
    gap: 8,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  tabFavicon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  faviconText: {
    fontSize: 18,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabUrl: {
    fontSize: 11,
    marginTop: 2,
  },
  downloadsList: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  downloadRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  downloadIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadName: {
    fontSize: 14,
    fontWeight: "500",
  },
  downloadMeta: {
    gap: 4,
    marginTop: 6,
  },
  progressBar: {
    height: 3,
    borderRadius: 1.5,
    overflow: "hidden",
  },
  progressFill: {
    height: 3,
    borderRadius: 1.5,
  },
  downloadSpeed: {
    fontSize: 11,
  },
});
