import { create } from "zustand";
import {
  defaultColorPreset,
  defaultDirection,
  defaultLayout,
  defaultMode,
  DIRECTION,
  IThemeItem,
  LAYOUT_OPTIONS,
  MODE,
} from "./config";
import { storage } from "@/lib/local-storage";

export interface ITheme {
  preset: IThemeItem;
  direction: DIRECTION;
  layout: LAYOUT_OPTIONS;
  mode: MODE;
  setPreset: (preset: IThemeItem) => void;
  setDirection: (direction: DIRECTION) => void;
  setLayout: (layout: LAYOUT_OPTIONS) => void;
  setMode: (mode: MODE) => void;
}

export const useTheme = create<ITheme>((set) => {
  const settings: ITheme = storage.get("settings") || null;
  return {
    preset: settings?.preset || defaultColorPreset,
    direction: settings?.direction || defaultDirection,
    layout: settings?.layout || defaultLayout,
    mode: settings?.mode || defaultMode,
    setPreset: (preset: IThemeItem) =>
      set((state) => {
        storage.set("settings", { ...state, preset });
        return { preset };
      }),
    setDirection: (direction: DIRECTION) =>
      set((state) => {
        storage.set("settings", { ...state, direction });
        return { direction };
      }),
    setLayout: (layout: LAYOUT_OPTIONS) =>
      set((state) => {
        storage.set("settings", { ...state, layout });
        return { layout };
      }),
    setMode: (mode: MODE) =>
      set((state) => {
        storage.set("settings", { ...state, mode });
        return { mode };
      }),
  };
});
