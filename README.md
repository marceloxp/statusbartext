# StatusBarText Extension for VSCode

A simple Visual Studio Code extension that displays custom text in the status bar based on your configuration.

![preview](https://raw.githubusercontent.com/marceloxp/statusbartext/refs/heads/master/images/preview-sm.png)

## Features

- **Customizable Text**: Configure the text (including icons) displayed in the status bar.
- **Activation Control**: Easily enable or disable the status bar item via settings or commands.
- **Global and Workspace Scopes**: Configure the status bar text globally or for specific workspaces.
- **Interactive Text Configuration**: Use commands to set the status bar text interactively.

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
        "text": "🚀 Custom Text"
    }
}
```

### Settings

- **`statusbartext.active`**: (Boolean) Determines whether the status bar item is visible. Set to `true` to show the status bar item, or `false` to hide it.
- **`statusbartext.text`**: (String) The text to display in the status bar. You can include emojis or any text you want directly in this property.

## Commands

The extension provides the following commands to manage the status bar text interactively:

- **`StatusBarText: Activate (Global)`**: Activates the status bar text globally.
- **`StatusBarText: Deactivate (Global)`**: Deactivates the status bar text globally.
- **`StatusBarText: Activate (Workspace)`**: Activates the status bar text for the current workspace.
- **`StatusBarText: Deactivate (Workspace)`**: Deactivates the status bar text for the current workspace.
- **`StatusBarText: Set Text (Global)`**: Opens an input box to set the status bar text globally.
- **`StatusBarText: Set Text (Workspace)`**: Opens an input box to set the status bar text for the current workspace.

To use these commands, open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) and type the command name.

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

Alternatively, you can use the commands to interactively set the text and activation status.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
