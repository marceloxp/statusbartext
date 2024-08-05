const vscode = require('vscode');

function activate(context) {
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);

    function updateStatusBar() {
        console.log('Updating status bar');
        const statusConfig = vscode.workspace.getConfiguration().get('statusbartext');
        
        // Obter texto e status ativo diretamente da configuração
        if (statusConfig && statusConfig.text && statusConfig.active) {
            const text = statusConfig.text || '';
            const active = statusConfig.active || false;
    
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

    // Atualiza a barra de status ao ativar a extensão
    updateStatusBar();

    // Registra um evento para monitorar alterações na configuração 'statusbartext'
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('statusbartext')) {
            updateStatusBar();
        }
    });

    // Atualiza a barra de status quando a configuração inicial é carregada
    context.subscriptions.push(statusBarItem);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
