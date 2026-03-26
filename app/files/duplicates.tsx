import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const DUPLICATE_GROUPS = [
  {
    name: "Beach_Photo.jpg",
    count: 3,
    totalSize: "12.4 MB",
    icon: "photo.fill",
    color: "#8B5CF6",
    files: [
      { path: "/Photos/Beach_Photo.jpg", size: "4.2 MB", date: "Mar 15, 2025" },
      { path: "/Downloads/Beach_Photo (1).jpg", size: "4.1 MB", date: "Mar 16, 2025" },
      { path: "/Backup/Beach_Photo_copy.jpg", size: "4.1 MB", date: "Mar 17, 2025" },
    ],
  },
  {
    name: "Report_Q4.pdf",
    count: 2,
    totalSize: "6.8 MB",
    icon: "doc.fill",
    color: "#EF4444",
    files: [
      { path: "/Documents/Report_Q4.pdf", size: "3.4 MB", date: "Feb 20, 2025" },
      { path: "/Downloads/Report_Q4.pdf", size: "3.4 MB", date: "Feb 22, 2025" },
    ],
  },
  {
    name: "Song_Demo.mp3",
    count: 2,
    totalSize: "9.2 MB",
    icon: "music.note",
    color: "#3B82F6",
    files: [
      { path: "/Music/Song_Demo.mp3", size: "4.6 MB", date: "Jan 10, 2025" },
      { path: "/Samples/Song_Demo_backup.mp3", size: "4.6 MB", date: "Jan 12, 2025" },
    ],
  },
];

export default function DuplicateCleanerScreen() {
  const colors = useColors();
  const [scanning, setScanning] = useState(false);
  const [selected, setSelected] = useState<Record<string, number[]>>({});

  const toggleSelect = (groupName: string, fileIndex: number) => {
    setSelected((prev) => {
      const current = prev[groupName] || [];
      if (current.includes(fileIndex)) {
        return { ...prev, [groupName]: current.filter((i) => i !== fileIndex) };
      }
      return { ...prev, [groupName]: [...current, fileIndex] };
    });
  };

  const totalSelected = Object.values(selected).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="Duplicates" showBack subtitle="Find & clean duplicate files" />

        {/* Scan Card */}
        <View style={[styles.scanCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.scanStats}>
            <View style={styles.scanStat}>
              <Text style={[styles.scanValue, { color: colors.error }]}>7</Text>
              <Text style={[styles.scanLabel, { color: colors.muted }]}>Duplicates</Text>
            </View>
            <View style={[styles.scanDivider, { backgroundColor: colors.border }]} />
            <View style={styles.scanStat}>
              <Text style={[styles.scanValue, { color: colors.warning }]}>28.4 MB</Text>
              <Text style={[styles.scanLabel, { color: colors.muted }]}>Wasted Space</Text>
            </View>
            <View style={[styles.scanDivider, { backgroundColor: colors.border }]} />
            <View style={styles.scanStat}>
              <Text style={[styles.scanValue, { color: colors.success }]}>3</Text>
              <Text style={[styles.scanLabel, { color: colors.muted }]}>Groups</Text>
            </View>
          </View>
          <ActionButton
            title={scanning ? "Scanning..." : "Scan for Duplicates"}
            icon="magnifyingglass"
            loading={scanning}
            onPress={() => {
              setScanning(true);
              setTimeout(() => setScanning(false), 2000);
            }}
            fullWidth
          />
        </View>

        {/* Duplicate Groups */}
        {DUPLICATE_GROUPS.map((group) => (
          <View key={group.name} style={[styles.groupCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.groupHeader}>
              <View style={[styles.groupIcon, { backgroundColor: group.color + "20" }]}>
                <IconSymbol name={group.icon as any} size={20} color={group.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.groupName, { color: colors.foreground }]}>{group.name}</Text>
                <Text style={[styles.groupMeta, { color: colors.muted }]}>
                  {group.count} copies · {group.totalSize} total
                </Text>
              </View>
            </View>
            {group.files.map((file, index) => (
              <Pressable
                key={index}
                onPress={() => toggleSelect(group.name, index)}
                style={({ pressed }) => [
                  styles.fileRow,
                  index < group.files.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: (selected[group.name] || []).includes(index) ? colors.error : colors.border,
                      backgroundColor: (selected[group.name] || []).includes(index) ? colors.error : "transparent",
                    },
                  ]}
                >
                  {(selected[group.name] || []).includes(index) && (
                    <IconSymbol name="checkmark.circle.fill" size={14} color="#fff" />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.filePath, { color: colors.foreground }]} numberOfLines={1}>{file.path}</Text>
                  <Text style={[styles.fileMeta, { color: colors.muted }]}>{file.size} · {file.date}</Text>
                </View>
                {index === 0 && (
                  <View style={[styles.keepBadge, { backgroundColor: colors.success + "20" }]}>
                    <Text style={{ color: colors.success, fontSize: 10, fontWeight: "700" }}>KEEP</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        ))}

        {/* Clean Button */}
        {totalSelected > 0 && (
          <View style={{ marginTop: 16 }}>
            <ActionButton
              title={`Delete ${totalSelected} Selected Files`}
              icon="trash.fill"
              variant="primary"
              fullWidth
            />
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scanCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    gap: 16,
    marginTop: 16,
  },
  scanStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  scanStat: {
    alignItems: "center",
    gap: 4,
  },
  scanValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  scanLabel: {
    fontSize: 12,
  },
  scanDivider: {
    width: 1,
    height: 40,
  },
  groupCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginTop: 16,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
    borderBottomWidth: 0.5,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  groupName: {
    fontSize: 15,
    fontWeight: "600",
  },
  groupMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  filePath: {
    fontSize: 13,
    fontWeight: "500",
  },
  fileMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  keepBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
});
