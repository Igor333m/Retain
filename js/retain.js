$(function(){

    var model = {

        // Checks for localStorage and add one if none
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            // Parses localStorage JSON string to JS object
            var data = JSON.parse(localStorage.notes);
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

    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr
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

    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});