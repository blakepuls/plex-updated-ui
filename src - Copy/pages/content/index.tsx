import { createRoot } from "react-dom/client";
import "./content";
import "./style.css";
import { getSettings } from "../../utils/storage";
import { sortUserPlugins } from "vite";

// const div = document.createElement("div");
// div.id = "__root";
// document.body.appendChild(div);

// const rootContainer = document.querySelector("#__root");
// if (!rootContainer) throw new Error("Can't find Options root element");
// const root = createRoot(rootContainer);
// root.render(
//   <div className="absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50">
//     content script 7
//     <button
//       onClick={() => {
//         // Log the accent color to the console
//         console.log("Working");
//         async function test() {
//           const hex = await chrome.storage.sync.get(["accentColor"]);

//           console.log(hex);
//         }

//         test();
//       }}
//     >
//       Test
//     </button>
//   </div>
// );

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
