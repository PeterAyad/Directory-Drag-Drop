const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function checkFileType(filePath) {
	try {
		// console.log(filePath);
		let normalizedPath = path.normalize(filePath);
		if (!fs.existsSync(normalizedPath)) {
			// console.error(`Path does not exist: ${normalizedPath}`);
			return "Unknown";
		}

		let stats = fs.statSync(normalizedPath); // Get file/folder metadata
		if (stats.isDirectory()) return "Directory";
		if (stats.isFile()) return "File";
	} catch (error) {
		// console.error("Error checking path:", error);
	}
	return "Unknown"; 
}


function activate() {
	// console.log("Extension Activated!");
	vscode.window.tabGroups.onDidChangeTabs((event) => {
		if (event.opened.length == 0) { return; }
		// console.log(event.opened.length);
		// console.clear()
		// let openTabs = vscode.window.tabGroups.all.flatMap(group => group.tabs);
		event.opened.forEach(tab => {
			let resourceUri = tab.input?.uri?.fsPath;
			if (resourceUri) {
				let type = checkFileType(resourceUri);
				// console.log(type);
				if (type == "Directory") {
					// console.log("I will open " + resourceUri);
					vscode.commands.executeCommand('vscode.openFolder', tab.input?.uri, false);
				}
				// vscode.window.showInformationMessage(`Path: ${resourceUri} ➝ ${type}`);
			}
		});

	});
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};

