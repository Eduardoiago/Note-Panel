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

// Criando um novo post-it
function createNote(text = '', top = '10px', left = '10px') {
    const board = document.getElementById('board');
    const note = document.createElement('div');
    note.className = 'note';
    note.style.top = top;
    note.style.left = left;
    // Input de texto
    const textArea = document.createElement('textarea');
    textArea.value = text;
    note.appendChild(textArea);
    // Botão para excluir post-it
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', function() {
        board.removeChild(note);
        saveNotes(); // Atualizando LocalStorage após exclusão
    });
    note.appendChild(deleteBtn);

    // Movimentando o post-it
    note.addEventListener('mousedown', function(e) {
        const offsetX = e.clientX - note.getBoundingClientRect().left;
        const offsetY = e.clientY - note.getBoundingClientRect().top;

        function mouseMoveHandler(e) {
            note.style.top = `${e.clientY - offsetY}px`;
            note.style.left = `${e.clientX - offsetX}px`;
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
            saveNotes(); // Atualizar LocalStorage após movimentação
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    board.appendChild(note);
    saveNotes(); // Atualizar LocalStorage após criação
}    

// Carregar as notas quando a página é carregada
window.onload = loadNotes;

// Adicionar evento ao botão para criar uma nova nota
document.getElementById('addNote').addEventListener('click', function() {
    createNote();
});
