import * as vscode from 'vscode';

export class MyWebviewProvider implements vscode.WebviewViewProvider {  
    private _view?: vscode.WebviewView;  
  
    constructor(private readonly _extensionUri: vscode.Uri) {}  
  
    resolveWebviewView(  
        webviewView: vscode.WebviewView,  
        context: vscode.WebviewViewResolveContext,  
        _token: vscode.CancellationToken  
    ) {  
        this._view = webviewView;  
        webviewView.webview.options = {  
            enableScripts: true
        };  
        webviewView.webview.html = this._getHtmlForWebview();  
    }  
  
    private _getHtmlForWebview() {  
        return `  
        <!DOCTYPE html>
			<head>
				<meta charset="UTF-8">
				<title>Titleaaaa</title>
			</head>
			<body>  
				<h1>Hello, World!</h1>  
			</body>
        </html>`;  
    }  
}  