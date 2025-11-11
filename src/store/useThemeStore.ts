import { create } from "zustand";
import { persist } from "zustand/middleware";

type theme = "light" | "dark";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const getPreferredTheme = (): theme => {
  if (typeof window !== "undefined" && window.matchMedia) {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    return theme;
  }
  return "light";
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getPreferredTheme(),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    { name: "theme-storage" }
  )
);
