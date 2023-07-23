const fs = require('fs');

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        console.log("Getting Notes");
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            res.json(notes);
        });
    });

    app.post("/api/notes", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);

            let newNote = req.body;
            let uniqueId = (notes.length).toString();
            newNote.id = uniqueId;
            console.log(newNote);
            notes.push(newNote);

            fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                if (err) throw err;
                console.log("New note successfully added!");
            });

            res.json(notes);
        });
    });

    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);
           
            let notesId = req.params.id;
            let newNotesId = 0;

            notes = notes.filter(currNote => {
                return currNote.id != notesId;
            });

            for (currNote of notes) {
                currNote.id = newNotesId.toString();
                newNotesId++;
            }

            fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
                if (err) throw err;
                console.log("Success!");
            });

            res.json(notes);
        });
    });
}
