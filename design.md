# FileFlow — Mobile App Interface Design

## Design Philosophy

FileFlow is an all-in-one utility app with a strict dark mode palette (deep blues, blacks, grays). The UI must feel like a premium first-party iOS app — clean, minimal, and information-dense without clutter. Every screen follows Apple HIG principles with portrait-first, one-handed usage in mind.

---

## Color Palette (Dark Mode Only)

| Token | Hex | Usage |
|-------|-----|-------|
| background | #0A0E14 | Main screen background — near-black with blue tint |
| surface | #131A24 | Cards, modals, elevated containers |
| surfaceAlt | #1A2332 | Secondary surfaces, input fields |
| foreground | #E8EDF3 | Primary text |
| muted | #6B7A8D | Secondary/tertiary text |
| primary | #3B82F6 | Accent buttons, active states, links |
| primaryDim | #1E3A5F | Subtle accent backgrounds |
| border | #1E2A3A | Dividers, card borders |
| success | #22C55E | Success states |
| warning | #F59E0B | Warning states |
| error | #EF4444 | Error/destructive states |

---

## Screen List

### Tab Bar (5 tabs)
1. **Home** — Dashboard overview of all modules
2. **Files** — File System & Cloud Sync
3. **Music** — Music & Audio Intelligence
4. **Browse** — Browsing & Tab AI
5. **Tools** — AI, Automation & Utilities

### Home Tab Screens
- **HomeScreen** — Grid of module cards with quick-access actions and storage stats

### Files Tab Screens
- **FilesHomeScreen** — File browser with folder tree, recent files, and cloud accounts
- **CloudConnectScreen** — Connect Dropbox, Google Drive, etc.
- **SmartFolderScreen** — Virtual offline folders (Smart Sync)
- **AIOrganizeScreen** — AI file organization settings and preview
- **DuplicateCleanerScreen** — Scan and remove duplicate files
- **PDFEditorScreen** — PDF viewing, annotation, markup
- **FileConverterScreen** — Multi-format converter (audio, image, PDF)
- **URLSaverScreen** — Save URLs as previewable file cards
- **CameraUploadScreen** — Auto camera upload settings

### Music Tab Screens
- **MusicHomeScreen** — Upload audio, recent analyses, quick actions
- **AudioAnalysisScreen** — BPM, genre, chord progression display
- **TransposeScreen** — Transpose audio through 12 keys
- **GibberishToLyricsScreen** — Record melody → AI suggests real lyrics
- **HumToVocalScreen** — Hum/mumble → synthesized vocal with voice library
- **MIDIExportScreen** — Convert vocal output to MIDI for DAW

### Browse Tab Screens
- **BrowserScreen** — Full built-in browser with address bar
- **VPNScreen** — VPN toggle and server selection
- **DownloadsScreen** — Parallel download manager
- **TabManagerScreen** — AI tab sorting, workspaces, recommendations

### Tools Tab Screens
- **ToolsHomeScreen** — Grid of all tools and AI features
- **AIAgentScreen** — Autonomous AI agent chat interface
- **VoiceTranscriptionScreen** — Real-time voice-to-text
- **MediaEditorScreen** — AI photo/video editing with voice commands
- **FileTransferScreen** — Large wireless file transfer (WeTransfer-style)
- **EmailClientScreen** — Built-in email
- **DesignToolScreen** — Graphic design / wallpaper creator
- **ReverseImageScreen** — Reverse image search
- **SystemRecoveryScreen** — System recovery tools

---

## Primary Content & Functionality Per Screen

### HomeScreen
- Hero stat bar: total files managed, cloud storage used, AI actions today
- 4 large module cards (Files, Music, Browse, Tools) with icon + subtitle
- Quick actions row: "Upload File", "Analyze Audio", "New Tab", "Ask AI"
- Recent activity feed (last 5 actions across all modules)

### FilesHomeScreen
- Segmented control: All / Cloud / Local / Smart Folders
- File/folder list with icons, size, date, cloud badge
- Floating action button: New Folder, Upload, Scan
- Search bar at top

### MusicHomeScreen
- Upload area (drag/drop or tap to select audio)
- Recent analyses list with BPM/genre badges
- Quick action buttons: Analyze, Transpose, Gibberish→Lyrics, Hum→Vocal

### BrowserScreen
- Address bar with lock icon and VPN indicator
- Full-width WebView area
- Bottom toolbar: Back, Forward, Tabs, Downloads, VPN

### ToolsHomeScreen
- 3-column grid of tool cards with icons
- Categories: AI, Transfer, Design, Search, Recovery
- Each card shows tool name + one-line description

---

## Key User Flows

### Flow 1: Connect Cloud & Browse Files
1. User taps Files tab → FilesHomeScreen
2. Taps "Connect Cloud" banner → CloudConnectScreen
3. Selects Dropbox → OAuth flow → returns to FilesHomeScreen
4. Cloud files appear in list with Dropbox badge
5. User taps folder → navigates into folder → taps file → preview

### Flow 2: Analyze Audio
1. User taps Music tab → MusicHomeScreen
2. Taps "Upload Audio" → picks file from device
3. Loading animation → AudioAnalysisScreen
4. Sees BPM (e.g., 120), Genre (e.g., Hip-Hop), Chord progression chart
5. Taps "Transpose" → TransposeScreen → selects key → plays transposed audio

### Flow 3: Gibberish to Lyrics
1. User taps Music tab → GibberishToLyricsScreen
2. Taps record button → records vocal melody with nonsense syllables
3. AI processes → shows suggested real lyrics matched to rhythm
4. User can swap individual words, regenerate, or accept

### Flow 4: AI Agent Task
1. User taps Tools tab → ToolsHomeScreen → AI Agent card
2. AIAgentScreen opens with chat interface
3. User types multi-step request (e.g., "Find all PDFs from last week, merge them, and email to John")
4. Agent shows step-by-step execution with progress indicators
5. Completion confirmation with result preview

### Flow 5: Quick File Transfer
1. User taps Tools → FileTransferScreen
2. Taps "Send Files" → selects files → generates share link/QR code
3. Recipient scans QR or opens link → parallel download begins

---

## Layout Patterns

- **Cards**: Rounded corners (16px), surface background, subtle border, 16px padding
- **Lists**: Full-width rows with 56px height, left icon, title + subtitle, right chevron
- **Action Buttons**: Pill-shaped, primary blue, 48px height, centered text
- **Floating Action Button**: Bottom-right, 56px circle, primary blue, shadow
- **Bottom Sheets**: Rounded top corners (20px), drag handle, surface background
- **Section Headers**: Uppercase muted text, 12px size, 24px top margin

---

## Typography

| Style | Size | Weight | Color |
|-------|------|--------|-------|
| Screen Title | 28px | Bold | foreground |
| Section Header | 13px | Semibold | muted (uppercase) |
| Card Title | 18px | Semibold | foreground |
| Body | 15px | Regular | foreground |
| Caption | 13px | Regular | muted |
| Button | 16px | Semibold | background (on primary) |
