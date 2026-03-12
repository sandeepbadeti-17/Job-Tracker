export type ThemePreference = "light" | "dark" | "system"

export const THEME_STORAGE_KEY = "theme"

export function getSystemTheme(): Exclude<ThemePreference, "system"> {
  if (typeof window === "undefined") return "light"
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function resolveTheme(preference: ThemePreference): Exclude<ThemePreference, "system"> {
  return preference === "system" ? getSystemTheme() : preference
}

export function getStoredThemePreference(): ThemePreference | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (raw === "light" || raw === "dark" || raw === "system") return raw
    return null
  } catch {
    return null
  }
}

export function setStoredThemePreference(preference: ThemePreference) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference)
  } catch {
    // ignore write errors (private mode, blocked storage, etc.)
  }
}

export function applyResolvedTheme(resolved: Exclude<ThemePreference, "system">) {
  document.documentElement.classList.toggle("dark", resolved === "dark")
}

