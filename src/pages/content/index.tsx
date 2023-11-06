import "./content";
import "./style.css";

// ? Was going to render something but decided against it, but I'm keeping this here for now.

// const div = document.createElement("div");
// div.id = "__root";
// document.body.appendChild(div);
// const rootContainer = document.querySelector("#__root");
// if (!rootContainer) throw new Error("Can't find Options root element");
// const root = createRoot(rootContainer);
// root.render(
//   <div className="absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50">
//   </div>
// );

try {
  console.log("Content script loaded");
} catch (e) {
  console.error(e);
}
