import React, { useEffect, useState } from "react";
import logo from "@assets/img/logo.svg";
import { Colorful } from "@uiw/react-color";

export default function Popup(): JSX.Element {
  const [hex, setHex] = useState("#8423d9");

  useEffect(() => {
    chrome.storage.sync.get(["accentColor"], (result) => {
      if (!result.accentColor)
        return chrome.storage.sync.set({ accentColor: "#8423d9" });

      setHex(result.accentColor);
    });
  }, []);

  async function saveAccentColor() {
    await chrome.storage.sync.set({ accentColor: hex });
    chrome.tabs.reload();
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-base-200 ">
      <header className="flex items-center gap-2 text-white">
        <img
          src={logo}
          className="h-8 pointer-events-none animate-spin-slow"
          alt="logo"
        />
        <h1 className="text-xl">Plex Accent</h1>
      </header>
      <section className="flex flex-col gap-3 mt-3">
        <Colorful
          className="m-auto"
          disableAlpha={true}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
          }}
        />

        <div className="w-full flex">
          <input
            className="w-full bg-base-300 text-white rounded-md rounded-r-none transition-colors duration-300 p-2 border-2 outline-none"
            style={{ borderColor: hex }}
            value={hex}
            onChange={(e) => setHex(e.target.value)}
          />

          <button
            className="text-white rounded-md rounded-l-none transition-colors duration-300 p-2 "
            style={{
              backgroundColor: hex,
              borderColor: hex,
            }}
            onClick={saveAccentColor}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
}
