export function isRunningStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches
}
