# Plex Updated UI

This Chrome extension allows you to change the default orange accent color in Plex to a color of your choice. It also introduces minor UI adjustments that I found nice.

## Installation

To use the latest version of Plex Updated UI:

1. Go to the [Releases](https://github.com/blakepuls/plex-updated-ui/releases) page of this repo.
2. Download the latest `plex-updated-ui.zip` from the assets.
3. Unzip the downloaded file into it's own folder
4. In Chrome, navigate to `chrome://extensions/`.
5. Enable Developer Mode by toggling the switch in the top right corner.
6. Click on "Load unpacked" and select the unzipped folder.

## Build Instructions

To build the project yourself:

```bash
# Clone the repository
git clone https://github.com/your-username/plex-updated-ui.git

# Navigate to the repo directory
cd plex-updated-ui

# Install dependencies
yarn

# Build the project
yarn build
```

## Usage

After installation, the extension will automatically replace Plex's default orange with the new accent color set by the user. To choose a different color, interact with the extension's options in the Chrome toolbar.

## Development

The extension works by iterating over the DOM to identify elements with Plex's orange color palette and replaces them with a user-defined accent color. It also applies CSS overrides for specific UI tweaks.

## Contributing

Contributions to the project are welcome. Please ensure that any pull requests are concise and well-documented.

## Acknowledgments

- This project utilizes [https://github.com/JohnBra/vite-web-extension](#) as a starting point for development.

## License

This extension is open-source under the MIT License.
