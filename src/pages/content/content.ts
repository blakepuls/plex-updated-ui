import { lighten, parseToRgb } from "polished";
import {
  ColorMap,
  generateColorMap,
  hexToRgb,
  hexToRgba,
} from "../../utils/colors";
import "./overrides.css";

// @ts-ignore
var colorMap: ColorMap = {};

// Function to process inline styles
const processInlineStyles = (element: HTMLElement): void => {
  // Let's combine RGBA and RGB in one loop for efficiency
  Object.entries(colorMap).forEach(([oldColor, newColor]) => {
    const oldColorRgba = oldColor.startsWith("#")
      ? hexToRgba(oldColor)
      : oldColor;
    const newColorRgba = newColor.startsWith("#")
      ? hexToRgba(newColor)
      : newColor;
    const oldColorRgb = oldColor.startsWith("#")
      ? hexToRgb(oldColor)
      : oldColor;
    const newColorRgb = newColor.startsWith("#")
      ? hexToRgb(newColor)
      : newColor;

    // Now we loop through each style property only once
    for (let i = 0; i < element.style.length; i++) {
      const propName = element.style[i];
      let propValue = element.style.getPropertyValue(propName);

      // Check for RGBA, RGB and hex colors
      if (
        propValue.includes(oldColor) ||
        propValue.includes(oldColorRgba) ||
        propValue.includes(oldColorRgb)
      ) {
        propValue = propValue
          .replace(oldColor, newColor)
          .replace(oldColorRgba, newColorRgba)
          .replace(oldColorRgb, newColorRgb);
        element.style.setProperty(propName, propValue);
      }
    }
  });
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

// Main function to replace specified colors in the document
export const replaceColors = async (): Promise<void> => {
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
  console.log("Observed mutations:", mutationsList);
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
        // Remove all the inline styles from the spinner, so that it can be styled.
        spinner.removeAttribute("style");
      });
    });
  }
});

// Start observing the document body for DOM mutations
obs.observe(document.body, { childList: true, subtree: true });

// Initiate color replacement
async function init() {
  colorMap = await generateColorMap();
  replaceColors();
}

init();
