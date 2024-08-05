# StatusBarText Extension for VSCode

A simple Visual Studio Code extension that displays custom text in the status bar based on your configuration.

![preview](https://github.com/marceloxp/statusbartext/raw/main/images/preview.png)

## Features

- **Customizable Text**: Configure the text (including icons) displayed in the status bar.
- **Activation Control**: Easily enable or disable the status bar item via settings.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for `StatusBarText`.
4. Click `Install` to install the extension.

## Configuration

You can configure the extension by adding the following settings to your `.vscode/settings.json` file in your project (local configuration) or to your global VSCode settings:

```json
{
    "statusbartext": {
        "active": true,
        "text": " 🚀 Custom Text "
    }
}
```

### Settings

- **`statusbartext.active`**: (Boolean) Determines whether the status bar item is visible. Set to `true` to show the status bar item, or `false` to hide it.
- **`statusbartext.text`**: (String) The text to display in the status bar. You can include emojis or any text you want directly in this property.

## Example

To show "🚀 Custom Text" in the status bar, use the following configuration:

```json
{
    "statusbartext": {
        "active": true,
        "text": "🚀 Custom Text"
    }
}
```

If you want to hide the status bar item, set `active` to `false`:

```json
{
    "statusbartext": {
        "active": false,
        "text": "🚀 Custom Text"
    }
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.