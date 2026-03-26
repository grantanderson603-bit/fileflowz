import { ScrollView, Text, View, Pressable, StyleSheet, Switch } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

const SETTINGS = [
  { title: "Auto Upload Photos", desc: "Upload new photos automatically", key: "photos", enabled: true },
  { title: "Auto Upload Videos", desc: "Upload new videos automatically", key: "videos", enabled: false },
  { title: "Upload on Wi-Fi Only", desc: "Prevent cellular data usage", key: "wifi", enabled: true },
  { title: "Upload Screenshots", desc: "Include screenshots in upload", key: "screenshots", enabled: false },
  { title: "Keep Originals", desc: "Keep files on device after upload", key: "originals", enabled: true },
];

export default function CameraUploadScreen() {
  const colors = useColors();
  const [settings, setSettings] = useState(SETTINGS);

  const toggleSetting = (index: number) => {
    const updated = [...settings];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    setSettings(updated);
  };

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Camera Upload" showBack subtitle="Auto-upload photos & videos" />

        {/* Status Card */}
        <View style={[styles.statusCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.statusIcon, { backgroundColor: "#EC4899" + "20" }]}>
            <IconSymbol name="camera.fill" size={28} color="#EC4899" />
          </View>
          <Text style={[styles.statusTitle, { color: colors.foreground }]}>Camera Upload Active</Text>
          <Text style={[styles.statusDesc, { color: colors.muted }]}>
            156 photos uploaded · 2 pending
          </Text>
          <View style={styles.statusStats}>
            <View style={styles.statusStat}>
              <Text style={[styles.statValue, { color: colors.foreground }]}>156</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Uploaded</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statusStat}>
              <Text style={[styles.statValue, { color: colors.warning }]}>2</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Pending</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statusStat}>
              <Text style={[styles.statValue, { color: colors.success }]}>1.2 GB</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>Total</Text>
            </View>
          </View>
        </View>

        {/* Destination */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>UPLOAD DESTINATION</Text>
          <Pressable
            style={({ pressed }) => [
              styles.destCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && { opacity: 0.7 },
            ]}
          >
            <View style={[styles.destIcon, { backgroundColor: "#0061FF" + "20" }]}>
              <IconSymbol name="cloud.fill" size={20} color="#0061FF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.destName, { color: colors.foreground }]}>Dropbox</Text>
              <Text style={[styles.destPath, { color: colors.muted }]}>/Camera Uploads</Text>
            </View>
            <IconSymbol name="chevron.right" size={14} color={colors.muted} />
          </Pressable>
        </View>

        {/* Settings */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>SETTINGS</Text>
          <View style={[styles.settingsList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {settings.map((setting, index) => (
              <View
                key={setting.key}
                style={[
                  styles.settingRow,
                  index < settings.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.settingTitle, { color: colors.foreground }]}>{setting.title}</Text>
                  <Text style={[styles.settingDesc, { color: colors.muted }]}>{setting.desc}</Text>
                </View>
                <Switch
                  value={setting.enabled}
                  onValueChange={() => toggleSetting(index)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#fff"
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    alignItems: "center",
    gap: 10,
    marginTop: 16,
  },
  statusIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  statusDesc: {
    fontSize: 13,
  },
  statusStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 8,
  },
  statusStat: {
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 36,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  destCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  destIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  destName: {
    fontSize: 15,
    fontWeight: "600",
  },
  destPath: {
    fontSize: 12,
    marginTop: 2,
  },
  settingsList: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  settingDesc: {
    fontSize: 12,
    marginTop: 2,
  },
});
