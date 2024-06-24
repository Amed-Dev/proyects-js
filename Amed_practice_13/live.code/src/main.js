import "./style.css";
import {$,$$} from './utils/dom.js'
import viteLogo from "/vite.svg";
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker: (_, label) => {
    switch (label) {
      case "html":
        return new HtmlWorker();
      case "css":
        return new CssWorker();
      case "javascript":
        return new JsWorker();
    }
  },
};

const HtmlEditor = monaco.editor.create(document.getElementById("html"), {
  value: "<h1>hello world</h1>",
  language: "html",
  theme: "vs"
});

const CssEditor = monaco.editor.create(document.getElementById("css"), {
  value: "css",
  language: "css",
  theme: "vs-dark",
});

const JsEditor = monaco.editor.create(document.getElementById("javascript"), {
  value: "js",
  language: "javascript",
  theme: "vs-dark",
});


HtmlEditor.onDidChangeModelContent(update)
CssEditor.onDidChangeModelContent(update)
JsEditor.onDidChangeModelContent(update)

function update(){
  const html = HtmlEditor.getValue();
  const css = CssEditor.getValue();
  const js = JsEditor.getValue();
  
  const Preview = createHtml({html, css, js})
  $('iframe').setAttribute("srcdoc", Preview)
}

const createHtml = ({html, css, js}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <style>
      ${css}
    </style>
  </head>
    <body>
      ${html}
      <script>
        ${js}
      </script>
    </body>
  </html>
  `;
};