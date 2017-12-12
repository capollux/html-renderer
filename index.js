var defaultHTML = '<html><head><style type="text/css"><\/style><\/head><body><\/body><\/html>';
var previewDocument;
function init() {
  previewDocument = document.getElementById('preview').contentWindow.document;
  previewDocument.write(defaultHTML);            
  previewDocument.close();            
}
// Tab to 2 spaces
function betterTab(cm) {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs")? "\t":
    Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
}
styleTextarea = document.querySelector("#css");
var styleEditor = CodeMirror.fromTextArea(styleTextarea, {
  lineNumbers: true,
  mode: "css",
  extraKeys: {Tab: betterTab},
  theme: "monokai",
});
styleEditor.on("change", function(cm) {
  previewDocument.head.querySelector("style").innerHTML = cm.getValue();
});
bodyTextarea = document.querySelector("#body");
var bodyEditor = CodeMirror.fromTextArea(bodyTextarea, {
  lineNumbers: true,
  mode : "xml",
  htmlMode: true,
  extraKeys: {Tab: betterTab},
  theme: "monokai",
});
bodyEditor.on("change", function(cm) {
  previewDocument.body.innerHTML = cm.getValue();
});
