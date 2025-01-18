const vscode = require('vscode');

function activate(context) {
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);

    function updateStatusBar() {
        console.log('Updating status bar');
        const statusConfig = vscode.workspace.getConfiguration().get('statusbartext');

        if (statusConfig && typeof statusConfig === 'object') {
            const text = statusConfig.text || '🚀 Custom Text'; // Texto padrão
            const active = statusConfig.active !== undefined ? statusConfig.active : false; // Ativo padrão

            statusBarItem.text = text;
            if (active) {
                statusBarItem.show();
            } else {
                statusBarItem.hide();
            }
        } else {
            // Configuração inválida ou inexistente, oculta a barra de status
            statusBarItem.hide();
        }
    }

    function updateStatusBarConfig(key, value, scope) {
        const config = vscode.workspace.getConfiguration();
        let currentStatusBarText = config.get('statusbartext');

        // Se a configuração não existir ou estiver mal formada, cria um objeto padrão
        if (!currentStatusBarText || typeof currentStatusBarText !== 'object') {
            currentStatusBarText = {
                active: false,
                text: '🚀 Custom Text',
            };
        }

        // Atualiza a propriedade desejada
        currentStatusBarText[key] = value;

        // Salva a configuração de volta no escopo especificado
        config.update('statusbartext', currentStatusBarText, scope)
            .then(() => {
                console.log(`Settings updated:`, currentStatusBarText);
                updateStatusBar(); // Reflete a atualização na barra de status
            })
            .catch((err) => {
                vscode.window.showErrorMessage(`Error updating configuration: ${err.message}`);
            });
    }

    // Atualiza a barra de status na ativação
    updateStatusBar();

    // Atualiza a barra de status quando a configuração muda
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('statusbartext')) {
            updateStatusBar();
        }
    });

    // Comando para ativar o texto no escopo Global
    const activateGlobalCommand = vscode.commands.registerCommand('statusbartext.activateGlobal', () => {
        updateStatusBarConfig('active', true, vscode.ConfigurationTarget.Global);
    });

    // Comando para desativar o texto no escopo Global
    const deactivateGlobalCommand = vscode.commands.registerCommand('statusbartext.deactivateGlobal', () => {
        updateStatusBarConfig('active', false, vscode.ConfigurationTarget.Global);
    });

    // Comando para ativar o texto no escopo do Workspace
    const activateWorkspaceCommand = vscode.commands.registerCommand('statusbartext.activateWorkspace', () => {
        updateStatusBarConfig('active', true, vscode.ConfigurationTarget.Workspace);
    });

    // Comando para desativar o texto no escopo do Workspace
    const deactivateWorkspaceCommand = vscode.commands.registerCommand('statusbartext.deactivateWorkspace', () => {
        updateStatusBarConfig('active', false, vscode.ConfigurationTarget.Workspace);
    });

    // Comando para definir o texto no escopo Global
    const setTextGlobalCommand = vscode.commands.registerCommand('statusbartext.setTextGlobal', async () => {
        const text = await vscode.window.showInputBox({
            placeHolder: 'Enter text for status bar (Global)',
            prompt: 'Enter the text that will be displayed globally.',
        });
        if (text !== undefined) {
            updateStatusBarConfig('text', text, vscode.ConfigurationTarget.Global);
        }
    });

    // Comando para definir o texto no escopo do Workspace
    const setTextWorkspaceCommand = vscode.commands.registerCommand('statusbartext.setTextWorkspace', async () => {
        const text = await vscode.window.showInputBox({
            placeHolder: 'Enter text for the status bar (Workspace)',
            prompt: 'Enter the text that will be displayed in this workspace.',
        });
        if (text !== undefined) {
            updateStatusBarConfig('text', text, vscode.ConfigurationTarget.Workspace);
        }
    });

    // Registra os comandos e o item da barra de status no contexto
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

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};