'use strict';

import * as vscode from 'vscode';

export function initConfigurationSample(context: vscode.ExtensionContext) {
	const configuredView = vscode.workspace.getConfiguration().get('conf.view.showOnWindowOpen');
	switch (configuredView) {
		case 'explorer':
			vscode.commands.executeCommand('workbench.view.explorer');
			break;
		case 'search':
			vscode.commands.executeCommand('workbench.view.search');
			break;
		case 'scm':
			vscode.commands.executeCommand('workbench.view.scm');
			break;
		case 'debug':
			vscode.commands.executeCommand('workbench.view.debug');
			break;
		case 'extensions':
			vscode.commands.executeCommand('workbench.view.extensions');
			break;
	}
	vscode.commands.registerCommand('config.commands.configureViewOnWindowOpen', async () => {
		const value = await vscode.window.showQuickPick(['explorer', 'search', 'scm', 'debug', 'extensions'], { placeHolder: 'Select the view to show when opening a window.' });
		if (vscode.workspace.workspaceFolders) {
			const target = await vscode.window.showQuickPick(
				[
					{ label: 'User', description: 'User Settings', target: vscode.ConfigurationTarget.Global },
					{ label: 'Workspace', description: 'Workspace Settings', target: vscode.ConfigurationTarget.Workspace }
				],
				{ placeHolder: 'Select the view to show when opening a window.' });

			if (value && target) {
				await vscode.workspace.getConfiguration().update('conf.view.showOnWindowOpen', value, target.target);
			}
		} else {
			await vscode.workspace.getConfiguration().update('conf.view.showOnWindowOpen', value, vscode.ConfigurationTarget.Global);
		}
	});

	context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((e: any) => {
		const value: any = vscode.workspace.getConfiguration('', e.uri).get('conf.resource.insertEmptyLastLine');
		const fileName = e.fileName;
		const matches = value ? value[fileName] : undefined;
		if (matches) {
			vscode.window.showInformationMessage('An empty line will be added to the document ' + e.fileName);
		}

	}));

	vscode.commands.registerCommand('config.commands.configureEmptyLastLineCurrentFile', async () => {
		if (vscode.window.activeTextEditor) {
			const currentDocument = vscode.window.activeTextEditor.document;
			const configuration = vscode.workspace.getConfiguration('', currentDocument.uri);
			const currentValue = configuration.get('conf.resource.insertEmptyLastLine', {});
			const target = vscode.workspace.workspaceFolders ? vscode.ConfigurationTarget.WorkspaceFolder : vscode.ConfigurationTarget.Global;
			const value = { ...currentValue, ...{ [currentDocument.fileName]: true } };
			await configuration.update('conf.resource.insertEmptyLastLine', value, target);
		}
	});

	// Example: Updating Resource scoped Configuration
	vscode.commands.registerCommand('config.commands.configureEmptyLastLineFiles', async () => {

		// 1) Getting the value
		const value = await vscode.window.showInputBox({ prompt: 'Provide glob pattern of files to have empty last line.' });

		if (vscode.workspace.workspaceFolders) {

			// 2) Getting the target
			const target = await vscode.window.showQuickPick(
				[
					{ label: 'Application', description: 'User Settings', target: vscode.ConfigurationTarget.Global },
					{ label: 'Workspace', description: 'Workspace Settings', target: vscode.ConfigurationTarget.Workspace },
					{ label: 'Workspace Folder', description: 'Workspace Folder Settings', target: vscode.ConfigurationTarget.WorkspaceFolder }
				],
				{ placeHolder: 'Select the target to which this setting should be applied' });

			if (value && target) {

				if (target.target === vscode.ConfigurationTarget.WorkspaceFolder) {

					// 3) Getting the workspace folder
					const workspaceFolder = await vscode.window.showWorkspaceFolderPick({ placeHolder: 'Pick Workspace Folder to which this setting should be applied' });
					if (workspaceFolder) {

						// 4) Get the configuration for the workspace folder
						const configuration = vscode.workspace.getConfiguration('', workspaceFolder.uri);

						// 5) Get the current value
						const currentValue = configuration.get<object>('conf.resource.insertEmptyLastLine');

						const newValue = { ...currentValue, ...{ [value]: true } };

						// 6) Update the configuration value
						await configuration.update('conf.resource.insertEmptyLastLine', newValue, target.target);
					}
				} else {

					// 3) Get the configuration
					const configuration = vscode.workspace.getConfiguration();

					// 4) Get the current value
					const currentValue = configuration.get<object>('conf.resource.insertEmptyLastLine');

					const newValue = { ...currentValue, ...(value ? { [value]: true } : {}) };

					// 3) Update the value in the target
					await vscode.workspace.getConfiguration().update('conf.resource.insertEmptyLastLine', newValue, target.target);
				}
			}
		} else {

			// 2) Get the configuration
			const configuration = vscode.workspace.getConfiguration();

			// 3) Get the current value
			const currentValue = configuration.get<object>('conf.resource.insertEmptyLastLine');

			const newValue = { ...currentValue, ...(value ? { [value]: true } : {}) };

			// 4) Update the value in the User Settings
			await vscode.workspace.getConfiguration().update('conf.resource.insertEmptyLastLine', newValue, vscode.ConfigurationTarget.Global);
		}
	});

	let statusSizeDisposable: vscode.Disposable;
	const disposable1 = vscode.workspace.onDidOpenTextDocument((e: any) => {
		if (statusSizeDisposable) {
			statusSizeDisposable.dispose();
		}
		const showSize: any = vscode.workspace.getConfiguration('', e).get('conf.language.showSize');
		if (showSize) {
			statusSizeDisposable = vscode.window.setStatusBarMessage(`language show size: ${e.getText().length}`);
		} else {
			vscode.window.showInformationMessage('language show size is disabled');
		}
	});
	context.subscriptions.push(disposable1);
}