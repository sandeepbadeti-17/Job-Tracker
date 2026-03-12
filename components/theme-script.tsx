import { THEME_STORAGE_KEY } from "@/lib/theme"

const themeScript = `(function () {
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var pref = localStorage.getItem(key);
    if (pref !== "light" && pref !== "dark" && pref !== "system") pref = null;

    var systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var resolved = pref === "dark" ? "dark" : pref === "light" ? "light" : (systemDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", resolved === "dark");
  } catch (e) {}
})();`

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}

