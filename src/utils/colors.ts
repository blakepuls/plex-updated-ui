import { lighten, parseToRgb } from "polished";

export type ColorMap = { [oldColor: string]: string };

export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )})`
    : "";
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, ${alpha})`
    : "";
};

export const generateColorMap = async (oldHex?: string) => {
  const { accentColor } = await chrome.storage.sync.get(["accentColor"]);
  const parsedHex = parseToRgb(accentColor);
  const rgb = `${parsedHex.red}, ${parsedHex.green}, ${parsedHex.blue}`;

  // Inject CSS variables into override stylesheet
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `:root {
    --accent-hex: ${accentColor};
    --accent-hex-secondary: ${lighten(0.05, accentColor)};
    --accent-rgb: ${rgb};
    /* ... other variables based on accentColor ... */
  }`;
  document.head.appendChild(styleElement);

  const defaultMap: ColorMap = {
    // Mix of orange and yellows
    "#e5a00d": accentColor,
    "#cc7b19": accentColor,
    "#f3b125": accentColor,
    "#f7c600": accentColor,
    "#b7800a": lighten(0.05, accentColor),
    "#C69E00": lighten(0.05, accentColor),
    "#FFD31F": accentColor,
    "rgb(204, 123, 25)": accentColor,
    // Playback buffer
    "rgba(204, 123, 25, 0.3)": `rgba(${rgb}, 0.3)`,
    "rgba(204,123,25,.4)": `rgba(${rgb}, 0.4)`,
    // SVG Logo
    "rgb(235, 175, 0)": accentColor,
  };

  return defaultMap;
};
