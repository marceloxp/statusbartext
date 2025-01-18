const vscode = require('vscode');

/**
 * Activates the extension. This function is called when the extension is loaded.
 * It sets up the status bar item, registers commands, and listens for configuration changes.
 * @param {vscode.ExtensionContext} context - The extension context provided by VSCode.
 */
function activate(context) {
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);

    /**
     * Updates the status bar based on the current configuration.
     * If the configuration is valid, it sets the text and visibility of the status bar item.
     * If the configuration is invalid or missing, it hides the status bar item.
     */
    function updateStatusBar() {
        console.log('Updating status bar');
        const statusConfig = vscode.workspace.getConfiguration().get('statusbartext');

        if (statusConfig && typeof statusConfig === 'object') {
            const text = statusConfig.text || '🚀 Custom Text';
            const active = statusConfig.active !== undefined ? statusConfig.active : false;

            statusBarItem.text = text;
            if (active) {
                statusBarItem.show();
            } else {
                statusBarItem.hide();
            }
        } else {
            statusBarItem.hide();
        }
    }

    /**
     * Updates the configuration for the status bar text.
     * If the configuration does not exist or is malformed, it creates a default configuration.
     * @param {string} key - The key to update in the configuration (e.g., 'active' or 'text').
     * @param {any} value - The value to set for the specified key.
     * @param {vscode.ConfigurationTarget} scope - The scope of the configuration (Global or Workspace).
     */
    function updateStatusBarConfig(key, value, scope) {
        const config = vscode.workspace.getConfiguration();
        let currentStatusBarText = config.get('statusbartext');

        if (!currentStatusBarText || typeof currentStatusBarText !== 'object') {
            currentStatusBarText = {
                active: false,
                text: '🚀 Custom Text',
            };
        }

        currentStatusBarText[key] = value;

        config.update('statusbartext', currentStatusBarText, scope)
            .then(() => {
                console.log(`Settings updated:`, currentStatusBarText);
                updateStatusBar();
            })
            .catch((err) => {
                vscode.window.showErrorMessage(`Error updating configuration: ${err.message}`);
            });
    }

    // Update the status bar when the extension is activated
    updateStatusBar();

    // Listen for configuration changes and update the status bar if 'statusbartext' is affected
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('statusbartext')) {
            updateStatusBar();
        }
    });

    // Command to activate the status bar text globally
    const activateGlobalCommand = vscode.commands.registerCommand('statusbartext.activateGlobal', () => {
        updateStatusBarConfig('active', true, vscode.ConfigurationTarget.Global);
    });

    // Command to deactivate the status bar text globally
    const deactivateGlobalCommand = vscode.commands.registerCommand('statusbartext.deactivateGlobal', () => {
        updateStatusBarConfig('active', false, vscode.ConfigurationTarget.Global);
    });

    // Command to activate the status bar text in the current workspace
    const activateWorkspaceCommand = vscode.commands.registerCommand('statusbartext.activateWorkspace', () => {
        updateStatusBarConfig('active', true, vscode.ConfigurationTarget.Workspace);
    });

    // Command to deactivate the status bar text in the current workspace
    const deactivateWorkspaceCommand = vscode.commands.registerCommand('statusbartext.deactivateWorkspace', () => {
        updateStatusBarConfig('active', false, vscode.ConfigurationTarget.Workspace);
    });

    // Command to set the status bar text globally
    const setTextGlobalCommand = vscode.commands.registerCommand('statusbartext.setTextGlobal', async () => {
        const text = await vscode.window.showInputBox({
            placeHolder: 'Enter text for status bar (Global)',
            prompt: 'Enter the text that will be displayed globally.',
        });
        if (text !== undefined) {
            updateStatusBarConfig('text', text, vscode.ConfigurationTarget.Global);
        }
    });

    // Command to set the status bar text in the current workspace
    const setTextWorkspaceCommand = vscode.commands.registerCommand('statusbartext.setTextWorkspace', async () => {
        const text = await vscode.window.showInputBox({
            placeHolder: 'Enter text for the status bar (Workspace)',
            prompt: 'Enter the text that will be displayed in this workspace.',
        });
        if (text !== undefined) {
            updateStatusBarConfig('text', text, vscode.ConfigurationTarget.Workspace);
        }
    });

    // Register all commands and the status bar item with the extension context
    context.subscriptions.push(
        statusBarItem,
        activateGlobalCommand,
        deactivateGlobalCommand,
        activateWorkspaceCommand,
        deactivateWorkspaceCommand,
        setTextGlobalCommand,
        setTextWorkspaceCommand
    );
}

/**
 * Deactivates the extension. This function is called when the extension is deactivated.
 * Currently, it does nothing, but it can be used for cleanup if needed.
 */
function deactivate() {}

// Export the activate and deactivate functions for VSCode to use
module.exports = {
    activate,
    deactivate,
};