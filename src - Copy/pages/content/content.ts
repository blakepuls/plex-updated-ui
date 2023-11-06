import { lighten, parseToRgb } from "polished";
import { ColorMap, hexToRgb, hexToRgba } from "../../utils/colors";
import "./style.css";
import "./overrides.css";

// @ts-ignore
var colorMap: ColorMap = {};

const generateColorMap = async () => {
  const { accentColor } = await chrome.storage.sync.get(["accentColor"]);
  const parsedHex = parseToRgb(accentColor);
  const rgb = `${parsedHex.red}, ${parsedHex.green}, ${parsedHex.blue}`;

  // Inject CSS variables into override stylesheet
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `:root {
    --accent-color: ${accentColor};
    --accent-rgb: ${rgb};
    /* ... other variables based on accentColor ... */
  }`;
  document.head.appendChild(styleElement);

  colorMap = {
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

  // Start processing the document
  replaceColors();
};

generateColorMap();

// Function to process inline styles
const processInlineStyles = (element: HTMLElement): void => {
  // RGBA colors
  for (let i = 0; i < element.style.length; i++) {
    const propName = element.style[i];
    const propValue = element.style.getPropertyValue(propName);

    Object.entries(colorMap).forEach(([oldColor, newColor]) => {
      const oldColorRgba = oldColor.startsWith("#")
        ? hexToRgba(oldColor)
        : oldColor;
      const newColorRgba = newColor.startsWith("#")
        ? hexToRgba(newColor)
        : newColor;

      if (propValue.includes(oldColor)) {
        element.style.setProperty(
          propName,
          propValue.replace(oldColor, newColor)
        );
      } else if (propValue.includes(oldColorRgba)) {
        element.style.setProperty(
          propName,
          propValue.replace(oldColorRgba, newColorRgba)
        );
      }
    });
  }

  // RGB colors
  for (let i = 0; i < element.style.length; i++) {
    const propName = element.style[i];
    const propValue = element.style.getPropertyValue(propName);

    Object.entries(colorMap).forEach(([oldColor, newColor]) => {
      const oldColorRgb = oldColor.startsWith("#")
        ? hexToRgb(oldColor)
        : oldColor;
      const newColorRgb = newColor.startsWith("#")
        ? hexToRgb(newColor)
        : newColor;

      if (propValue.includes(oldColor)) {
        element.style.setProperty(
          propName,
          propValue.replace(oldColor, newColor)
        );
      } else if (propValue.includes(oldColorRgb)) {
        element.style.setProperty(
          propName,
          propValue.replace(oldColorRgb, newColorRgb)
        );
      }
    });
  }
};

const processSvgFills = (element: SVGElement): void => {
  if (
    element.tagName.toLowerCase() === "path" &&
    element.hasAttribute("fill")
  ) {
    console.log("hasFill", element);
    let fillValue = element.getAttribute("fill")!;
    Object.entries(colorMap).forEach(([oldColor, newColor]) => {
      const oldColorRgb = oldColor.startsWith("#")
        ? hexToRgb(oldColor)
        : oldColor;
      const newColorRgb = newColor.startsWith("#")
        ? hexToRgb(newColor)
        : newColor;

      if (fillValue === oldColor || fillValue === oldColorRgb) {
        element.setAttribute(
          "fill",
          oldColor.startsWith("#") ? newColor : newColorRgb
        );
      }
    });
  }

  Array.from(element.children).forEach((child) => {
    processSvgFills(child as SVGElement);
  });
};

// Function to add a cool box shadow on hover
const addBoxShadow = async (
  element: HTMLElement,
  img: string
): Promise<void> => {
  element.classList.add("normalShadow");

  element.addEventListener("mouseenter", () => {
    element.classList.replace("normalShadow", "hoverShadow");
  });

  element.addEventListener("mouseleave", () => {
    element.classList.replace("hoverShadow", "normalShadow");
  });
};

// Main function to replace specified colors in the document
export const replaceColors = async (): Promise<void> => {
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);
  const sheet = styleElement.sheet as CSSStyleSheet;

  // Injecting hardcoded rule for specific classes
  // const hardcodedRule = `
  //   .SourceSidebarLink-isSelected-rPGiHo .SourceSidebarLink-iconContainer-xQGX4C,
  //   .SourceSidebarLink-isSelected-rPGiHo .SourceSidebarLink-title-C2NvGy {
  //     color: ${colorMap["#e5a00d"]} !important;
  //   }
  // `;
  // sheet.insertRule(hardcodedRule, sheet.cssRules.length);

  // Dynamic color replacement in stylesheets
  Array.from(document.styleSheets).forEach((stylesheet) => {
    try {
      Array.from(stylesheet.cssRules || []).forEach((rule) => {
        if (!(rule instanceof CSSStyleRule)) return;

        Object.entries(colorMap).forEach(([oldColor, newColor]) => {
          Array.from(rule.style).forEach((styleName) => {
            const propValue = rule.style.getPropertyValue(styleName);
            const oldColorRgb = oldColor.startsWith("#")
              ? hexToRgb(oldColor)
              : oldColor;
            const newColorRgb = newColor.startsWith("#")
              ? hexToRgb(newColor)
              : newColor;
            if (
              !propValue.includes(oldColor) &&
              !propValue.includes(oldColorRgb)
            )
              return;

            if (propValue.includes(oldColor)) {
              rule.style.setProperty(
                styleName,
                propValue.replace(oldColor, newColor)
              );
            } else if (propValue.includes(oldColorRgb)) {
              rule.style.setProperty(
                styleName,
                propValue.replace(oldColorRgb, newColorRgb)
              );
            }
          });
        });
      });
    } catch (e) {
      // Catch any cross-origin errors and move on
    }
  });

  // Process all existing elements for inline styles
  Array.from(document.getElementsByTagName("*")).forEach((element) => {
    processInlineStyles(element as HTMLElement);
  });
};

// Observer to monitor DOM mutations
const obs = new MutationObserver(async (mutationsList) => {
  for (let mutation of mutationsList) {
    if (!mutation.addedNodes.length) return;

    mutation.addedNodes.forEach(async (node) => {
      if (!(node instanceof HTMLElement)) return;

      processInlineStyles(node); // Process the added node
      Array.from(node.getElementsByTagName("*")).forEach(async (child) => {
        // If it's an SVG element, process its fills
        if (child instanceof SVGElement) {
          processSvgFills(child as SVGElement); // Process the added node
        }
        processInlineStyles(child as HTMLElement); // Process all descendants
      });

      // Process all descendants
      if (node instanceof SVGElement) {
        processSvgFills(node); // Process the added node
        Array.from(node.getElementsByTagName("*")).forEach(async (child) => {
          processSvgFills(child as SVGElement); // Process all descendants
        });
      }

      // Let’s also check the children of the added node for our target element
      const spinners = node.querySelectorAll('[class*="Spinner-"]');
      spinners.forEach((spinner) => {
        console.log("spinner", spinner);
        console.log("Target element found among children:", spinner); // Log the target element when found among children
        // removeInlineStyle(spinner as HTMLElement);
      });

      // Poster cards
      if (node instanceof HTMLElement) {
        const targetElements = node.querySelectorAll(
          ".MetadataSimplePosterCard-image-x27yrl"
        );
        targetElements.forEach((targetElement) => {
          console.log("Target element found:", targetElement); // Log the target element when found
          const imgElement = node.querySelector(
            ".MetadataSimplePosterCard-image-x27yrl img"
          ) as HTMLImageElement;
          // @ts-ignore
          const imgSrc = imgElement ? imgElement.src : null;
          console.log("imgSrc", imgSrc);
          if (imgSrc) addBoxShadow(targetElement as HTMLElement, imgSrc);
        });
      }
    });
  }
});

// Start observing the document body for DOM mutations
obs.observe(document.body, { childList: true, subtree: true });

// Initiate color replacement
replaceColors();
