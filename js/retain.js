$(function(){

    let model = {

        // Checks for localStorage and add one if none
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            // Parses localStorage JSON string to JS object
            let data = JSON.parse(localStorage.notes);
            // Adds new note to the object
            data.push(obj);
            // Converts JS object to JSON string and stores it to localStorage
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            // Return all notes from localStorage
            return JSON.parse(localStorage.notes);
        }
    };

    let octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                dateSubmitted: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            console.log(model.getAllNotes());
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };

    let view = {
        init: function() {
            this.noteList = $('#notes');
            let newNoteForm = $('#new-note-form');
            let newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            let htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += `<li class="note">${note.content}<span class="note-date">
                            ${new Date(note.dateSubmitted).toString()}<span>
                    </li>`;
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});