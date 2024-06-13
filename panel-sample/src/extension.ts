import * as vscode from 'vscode';  
import { MyWebviewProvider } from './MyWebviewProvider';
  
export function activate(context: vscode.ExtensionContext) {  
    const myDataProvider = new class implements vscode.TreeDataProvider<string> {  
        onDidChangeTreeData?: vscode.Event<string | null | undefined> | undefined;  
        getTreeItem(element: string): vscode.TreeItem | Thenable<vscode.TreeItem> {  
            return new vscode.TreeItem(element, vscode.TreeItemCollapsibleState.None);  
        }  
        getChildren(element?: string | undefined): vscode.ProviderResult<string[]> {  
            return ['Item 1', 'Item 2', 'Item 3'];  
        }  
    };
    vscode.window.createTreeView('myCustomPanelView', { treeDataProvider: myDataProvider });

    const panel = vscode.window.registerWebviewViewProvider("myCustomPanelWebView", new MyWebviewProvider(context.extensionUri));
    context.subscriptions.push(panel);
}