const notesContainer = document.getElementById("app");
const addNoteBtn = notesContainer.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNotesElements(note.id,note.content);

    notesContainer.insertBefore(noteElement,addNoteBtn);
});

addNoteBtn.addEventListener("click", () => addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");

}

function saveNotes(notes){
    //Transforma os dados em um JSON Para serem salvos localment no Browser
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNotesElements(id,content){

    //Cria um elemento do tipo textarea
    const element = document.createElement("textarea");

    //Adiciona a class "note" ao elemento textarea
    element.classList.add("note");

    //Atribui um conteudo ao elemento criado
    element.value = content;

    element.placeholderholder = "Empty Sticky Notes"

    element.addEventListener("change",() => {
        updateNote(id,element.value);
    })

    element.addEventListener("dblclick",()=>{
        const doDelete = confirm("Are you sure you wish yo delete this sticky note");

        if(doDelete){
            deleteNote(id,element);
        }
    })

    return element;

}

function addNote(){

    const existingNotes = getNotes(); 
    const noteObject = {id:Math.floor(Math.random() * 100000),content: ""
};

const noteElement = createNotesElements(noteObject.id,noteObject.content)
notesContainer.insertBefore(noteElement,addNoteBtn);

existingNotes.push(noteObject);
saveNotes(existingNotes);

}

function updateNote(id,newContent){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id,element){
    const notes = getNotes().filter(note => note.id !=id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}