export interface IThemeItem {
  label: string;
  value: string;
}

export type MODE = "light" | "dark";

export type DIRECTION = "ltr" | "rtl";

export enum LAYOUT_OPTIONS {
  MODERN = "modern",
  MINIMAL = "minimal",
  RETRO = "retro",
  CLASSIC = "classic",
}

export const LayoutOptions: IThemeItem[] = [
  {
    label: "Modern",
    value: LAYOUT_OPTIONS.MODERN,
  },
  {
    label: "Minimal",
    value: LAYOUT_OPTIONS.MINIMAL,
  },
  {
    label: "Retro",
    value: LAYOUT_OPTIONS.RETRO,
  },
  {
    label: "Classic",
    value: LAYOUT_OPTIONS.CLASSIC,
  },
];

export const ColorPreset: IThemeItem[] = [
  {
    label: "Green",
    value: "#009e60",
  },
  {
    label: "Black",
    value: "#323743",
  },
  {
    label: "Blue",
    value: "#2a52be",
  },
  {
    label: "Red",
    value: "#e34234",
  },
  {
    label: "Purple",
    value: "#9370DB",
  },
  {
    label: "Orange",
    value: "#ffa500",
  },
];

export const Direction: IThemeItem[] = [
  {
    label: "LTR",
    value: "ltr",
  },
  {
    label: "RTL",
    value: "rtl",
  },
];

export const defaultLayout = LAYOUT_OPTIONS.MINIMAL;

export const defaultColorPreset = ColorPreset[0];

export const defaultDirection = "ltr";

export const defaultMode = "dark";
