
const originalText = "Un Párrafo";


function changeParagraph() {
    const paragraph = document.getElementById("demo");
    if (paragraph) {
        paragraph.innerHTML = "El contenido ha cambiado.";
    }
}


function resetParagraph() {
    const paragraph = document.getElementById("demo");
    if (paragraph) {
        paragraph.innerHTML = originalText;
    } else {
        
        const newParagraph = document.createElement("p");
        newParagraph.id = "demo";
        newParagraph.innerHTML = originalText;
        document.body.insertBefore(newParagraph, document.body.children[1]);
    }
}


function deleteParagraph() {
    const paragraph = document.getElementById("demo");
    if (paragraph) {
        paragraph.remove();
    }
}