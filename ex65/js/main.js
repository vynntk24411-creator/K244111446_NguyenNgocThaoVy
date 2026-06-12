function addNode() {
    var content = document.getElementById("txtContent").value;
    var pos = document.getElementById("txtAddPos").value;
    var ul = document.getElementById("webNode");
    if (content == "") {
        alert("Please enter content!");
        return;
    }
    var li = document.createElement("li");
    li.innerHTML = content;
    if (pos == "" || pos > ul.children.length) {
        ul.appendChild(li);
    } else {
        ul.insertBefore(li, ul.children[pos - 1]);
    }
    clearForm();
}
function removeNode() {
    var pos = document.getElementById("txtRemovePos").value;
    var ul = document.getElementById("webNode");
    if (pos == "" || pos < 1 || pos > ul.children.length) {
        alert("Invalid position!");
        return;
    }
    ul.removeChild(ul.children[pos - 1]);
    clearForm();
}
function modifyNode() {
    var newContent = document.getElementById("txtNewContent").value;
    var pos = document.getElementById("txtModifyPos").value;
    var ul = document.getElementById("webNode");
    if (newContent == "") {
        alert("Please enter new content!");
        return;
    }
    if (pos == "" || pos < 1 || pos > ul.children.length) {
        alert("Invalid position!");
        return;
    }
    var newNode = document.createElement("li");
    newNode.innerHTML = newContent;
    ul.replaceChild(newNode, ul.children[pos - 1]);
    clearForm();
}
function clearForm() {
    document.getElementById("txtContent").value = "";
    document.getElementById("txtAddPos").value = "";
    document.getElementById("txtRemovePos").value = "";
    document.getElementById("txtNewContent").value = "";
    document.getElementById("txtModifyPos").value = "";
    document.getElementById("txtContent").focus();
}