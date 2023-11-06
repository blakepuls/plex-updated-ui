interface Settings {
  colorHex: string;
}

export const saveSettings = async (settings: Settings): Promise<void> => {
  await chrome.storage.sync.set({ settings });
};

export const getSettings = async (): Promise<Settings> => {
  return (await chrome.storage.sync.get(["settings"])) as Settings;
};
