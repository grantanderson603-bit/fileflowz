// Runtime initialization - no longer needed outside of Manus platform
// Kept as a stub to avoid breaking imports

export function initManusRuntime(): void {
  // No-op
}

export function isRunningInPreviewIframe(): boolean {
  return false;
}

export function subscribeSafeAreaInsets(_callback: any): () => void {
  return () => {};
}
