 // Salvando as notas no LocalStorage
 // Erro: Mensagem de texto do último post-it adicionado ao painel não está salvando
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note').forEach(note => {
        const text = note.querySelector('textarea').value;
        const top = note.style.top;
        const left = note.style.left;
        notes.push({ text, top, left });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() { // Carregando notas do LocalStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(savedNote => {
        createNote(savedNote.text, savedNote.top, savedNote.left);
    });
}

// Carregar as notas quando a página é carregada
window.onload = loadNotes;
