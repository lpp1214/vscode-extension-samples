import * as vscode from 'vscode';

const t = vscode.l10n.t;
const env = vscode.env;

export function activate(context: vscode.ExtensionContext) {  
  const disposable1 = vscode.commands.registerCommand('extension.helloWorld', () => {
    vscode.window.showInformationMessage(env.language);
    vscode.window.showInformationMessage(t("hello"));
  });
  context.subscriptions.push(disposable1);

  const disposable2 = vscode.commands.registerCommand('extension.byeWorld', () => {
    vscode.window.showInformationMessage(env.language);
    vscode.window.showInformationMessage(t("bye"));
  });
  context.subscriptions.push(disposable2);
}
