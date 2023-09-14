import * as vscode from "vscode";
import * as fs from "fs";

/**
 * 根据文件名创建新js文件并配有默认注释
 * @param {string} fileName 文件名
 * @param {string} author 作者
 * @return {void}
 */
function createFile(fileName: string, author: string): void {
    // 当前工作区路径
    const root = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    const filePath = `${fileName}.js`;
    const content = `// ==UserScript==
// @name         ${fileName}
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ${author}
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();`;
    fs.writeFile(`${root}/${filePath}`, content, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("文件创建并写入成功！");
    });
}

export function createNewScript() {
    // vscode 获取配置
    const config = vscode.workspace.getConfiguration("tampermonkey");
    const author = JSON.parse(JSON.stringify(config.get("author")));
    vscode.window
        .showInputBox({
            prompt: "New Script Name", // 文本输入提示
        })
        .then((value) => {
            if (!value || !value?.trim()) {
                vscode.window.showErrorMessage("It is empty!!!");
                return;
            }
            let fileName = value.trim();
            createFile(fileName, author);
            vscode.window.showInformationMessage(`已创建 ${fileName}.js 文件`);
        });
}
// export { createNewFile };
