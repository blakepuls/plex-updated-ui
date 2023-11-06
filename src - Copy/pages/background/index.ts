// import "./styles.css";

// const addBoxShadow = async (
//   element: HTMLElement,
//   img: string
// ): Promise<void> => {
//   element.classList.add("normalShadow");

//   element.addEventListener("mouseenter", () => {
//     element.classList.remove("normalShadow");
//     element.classList.add("hoverShadow");
//   });

//   element.addEventListener("mouseleave", () => {
//     element.classList.remove("hoverShadow");
//     element.classList.add("normalShadow");
//   });
// };

// type ColorMap = { [oldColor: string]: string };

// const removeInlineStyle = (element: HTMLElement): void => {
//   element.style.borderTopColor = "";
//   element.style.borderLeftColor = "";
// };

// const replaceColors = (colorMap: ColorMap): void => {
//   const styleElement = document.createElement("style");
//   document.head.appendChild(styleElement);
//   const sheet = styleElement.sheet as CSSStyleSheet;

//   // Injecting hardcoded rule for specific classes
//   const hardcodedRule = `
//     .SourceSidebarLink-isSelected-rPGiHo .SourceSidebarLink-iconContainer-xQGX4C,
//     .SourceSidebarLink-isSelected-rPGiHo .SourceSidebarLink-title-C2NvGy {
//       color: ${colorMap["#e5a00d"]} !important;
//     }
//   `;
//   sheet.insertRule(hardcodedRule, sheet.cssRules.length);

//   // Dynamic approach
//   const allStyles: StyleSheetList = document.styleSheets;
//   for (const stylesheet of Array.from(allStyles)) {
//     try {
//       const cssRules: CSSRuleList | null = stylesheet.cssRules;
//       for (const rule of Array.from(cssRules || [])) {
//         if (rule instanceof CSSStyleRule) {
//           Object.entries(colorMap).forEach(([oldColor, newColor]) => {
//             // Iterating over individual style properties
//             for (let i = 0; i < rule.style.length; i++) {
//               const propValue = rule.style.getPropertyValue(rule.style[i]);
//               if (propValue.includes(oldColor)) {
//                 rule.style.setProperty(
//                   rule.style[i],
//                   propValue.replace(oldColor, newColor)
//                 );
//               }
//             }
//           });
//         }
//       }
//     } catch (e) {
//       // Catch any cross-origin errors and move on
//     }
//   }
// };

// const colorsToSwap: ColorMap = {
//   "#e5a00d": "#8423d9",
//   "#cc7b19": "#8423d9",
//   // ... add more colors if needed
// };

// const obs = new MutationObserver((mutationsList) => {
//   console.log("Mutations:", mutationsList); // Log all mutations to see what's happening
//   for (let mutation of mutationsList) {
//     if (mutation.addedNodes.length) {
//       mutation.addedNodes.forEach((node) => {
//         if (node instanceof HTMLElement) {
//           Array.from(node.classList).forEach((className) => {
//             if (className.includes("Spinner-")) {
//               console.log("Target element found:", node); // Log the target element when found
//               removeInlineStyle(node);
//             }
//           });
//           // Let’s also check the children of the added node for our target element
//           const spinners = node.querySelectorAll('[class*="Spinner-"]');
//           spinners.forEach((spinner) => {
//             console.log("Target element found among children:", spinner); // Log the target element when found among children
//             removeInlineStyle(spinner as HTMLElement);
//           });
//         }

//         // Poster cards
//         if (node instanceof HTMLElement) {
//           // Let’s dig through the added node and its children for our target element
//           const targetElements = node.querySelectorAll(
//             ".MetadataSimplePosterCard-image-x27yrl"
//           );
//           targetElements.forEach((targetElement) => {
//             console.log("Target element found:", targetElement); // Log the target element when found
//             // Cast your spell on the target element
//             removeInlineStyle(targetElement as HTMLElement);
//             const imgElement = node.querySelector(
//               ".MetadataSimplePosterCard-image-x27yrl img"
//             ) as HTMLImageElement;
//             // @ts-ignore
//             const imgSrc = imgElement ? imgElement.src : null;
//             console.log("imgSrc", imgSrc);
//             if (imgSrc) addBoxShadow(targetElement as HTMLElement, imgSrc);
//           });
//         }
//       });
//     }
//   }
// });

// // Your existing code to start observing
// obs.observe(document.body, { childList: true, subtree: true });

// replaceColors(colorsToSwap);
