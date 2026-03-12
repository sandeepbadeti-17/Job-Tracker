"use client"

import * as React from "react"
import { Laptop, Moon, Sun } from "lucide-react"

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import {
  applyResolvedTheme,
  getStoredThemePreference,
  resolveTheme,
  setStoredThemePreference,
  type ThemePreference,
} from "@/lib/theme"

const themeLabel: Record<ThemePreference, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
}

export default function ThemeToggle() {
  const [preference, setPreference] = React.useState<ThemePreference>("system")

  React.useEffect(() => {
    const stored = getStoredThemePreference()
    const initial = stored ?? "system"
    setPreference(initial)
    applyResolvedTheme(resolveTheme(initial))
  }, [])

  React.useEffect(() => {
    if (preference !== "system") return
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)")
    if (!mql) return

    const onChange = () => applyResolvedTheme(resolveTheme("system"))
    onChange()

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    }

    // Safari fallback
    mql.addListener(onChange)
    return () => mql.removeListener(onChange)
  }, [preference])

  const onValueChange = (next: string) => {
    if (next !== "light" && next !== "dark" && next !== "system") return
    setPreference(next)
    setStoredThemePreference(next)
    applyResolvedTheme(resolveTheme(next))
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className="flex items-center gap-2">
          {preference === "light" ? (
            <Sun />
          ) : preference === "dark" ? (
            <Moon />
          ) : (
            <Laptop />
          )}
          Theme
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          {themeLabel[preference]}
        </span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={preference} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="light">
            <Sun />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Laptop />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

