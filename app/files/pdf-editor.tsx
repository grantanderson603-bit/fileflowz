import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { ScreenHeader } from "@/components/ui/screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ActionButton } from "@/components/ui/action-button";
import { useColors } from "@/hooks/use-colors";

const PDF_TOOLS = [
  { title: "Annotate", icon: "paintbrush.fill", color: "#3B82F6", desc: "Highlight, underline, draw" },
  { title: "Sign", icon: "paintbrush.fill", color: "#8B5CF6", desc: "Add digital signatures" },
  { title: "Merge", icon: "doc.on.doc.fill", color: "#10B981", desc: "Combine multiple PDFs" },
  { title: "Split", icon: "doc.fill", color: "#F59E0B", desc: "Extract pages from PDF" },
  { title: "Compress", icon: "arrow.down.doc.fill", color: "#EC4899", desc: "Reduce file size" },
  { title: "Convert", icon: "arrow.triangle.2.circlepath", color: "#06B6D4", desc: "PDF to Word, Image, etc." },
];

const RECENT_PDFS = [
  { name: "Contract_2025.pdf", pages: 12, size: "2.4 MB", date: "Today" },
  { name: "Invoice_March.pdf", pages: 1, size: "340 KB", date: "Yesterday" },
  { name: "Research_Paper.pdf", pages: 28, size: "5.1 MB", date: "Mar 20" },
];

export default function PDFEditorScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="px-5 pt-2">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <ScreenHeader title="PDF Editor" showBack subtitle="View, annotate & edit PDFs" />

        {/* Upload Area */}
        <Pressable
          style={({ pressed }) => [
            styles.uploadArea,
            { borderColor: colors.primary + "50", backgroundColor: colors.primary + "08" },
            pressed && { opacity: 0.8 },
          ]}
        >
          <View style={[styles.uploadIcon, { backgroundColor: colors.primary + "20" }]}>
            <IconSymbol name="arrow.up.doc.fill" size={28} color={colors.primary} />
          </View>
          <Text style={[styles.uploadTitle, { color: colors.foreground }]}>Open PDF File</Text>
          <Text style={[styles.uploadDesc, { color: colors.muted }]}>
            Tap to select a PDF from your files
          </Text>
        </Pressable>

        {/* PDF Tools Grid */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>PDF TOOLS</Text>
          <View style={styles.toolsGrid}>
            {PDF_TOOLS.map((tool) => (
              <Pressable
                key={tool.title}
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
                <Text style={[styles.toolDesc, { color: colors.muted }]}>{tool.desc}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recent PDFs */}
        <View style={{ marginTop: 24 }}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>RECENT PDFS</Text>
          <View style={[styles.recentList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {RECENT_PDFS.map((pdf, index) => (
              <Pressable
                key={pdf.name}
                style={({ pressed }) => [
                  styles.pdfRow,
                  index < RECENT_PDFS.length - 1 && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.border,
                  },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <View style={[styles.pdfIcon, { backgroundColor: "#EF4444" + "15" }]}>
                  <IconSymbol name="doc.fill" size={20} color="#EF4444" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.pdfName, { color: colors.foreground }]} numberOfLines={1}>{pdf.name}</Text>
                  <Text style={[styles.pdfMeta, { color: colors.muted }]}>
                    {pdf.pages} pages · {pdf.size} · {pdf.date}
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={14} color={colors.muted} />
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
    padding: 32,
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  uploadDesc: {
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  toolCard: {
    width: "31%",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    alignItems: "center",
    gap: 6,
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  toolTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  toolDesc: {
    fontSize: 10,
    textAlign: "center",
  },
  recentList: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  pdfRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  pdfIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pdfName: {
    fontSize: 15,
    fontWeight: "500",
  },
  pdfMeta: {
    fontSize: 12,
    marginTop: 2,
  },
});
