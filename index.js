var defaultHTML = '<html><head><style type="text/css"><\/style><\/head><body><\/body><\/html>';
function init() {
  document.getElementById('preview').contentWindow.document.write(defaultHTML);            
  document.getElementById('preview').contentWindow.document.close();            
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
  document.getElementById('preview').contentWindow.document.head.querySelector("style").innerHTML = cm.getValue();
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
  document.getElementById('preview').contentWindow.document.body.innerHTML = cm.getValue();
});
