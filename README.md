# Plex Updated UI

This Chrome extension allows users to change the default orange accent color in Plex to a color of your choice. It also introduces minor UI adjustments that I found nice.

## Installation

1. Download the extension's source code and unzip it.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable Developer mode.
4. Click 'Load unpacked' and select the extension directory.

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
