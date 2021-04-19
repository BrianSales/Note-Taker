// Dependencies

// Express helps us create a "server" aka the "backend"
// The backend is where all of our data is stored (ex: youtube videos are stored in the database)

// Two main parts to the backend:
// 1. Database (where your data is stored)
// 2. Routes - the directions to your data

// Frontend makes a REQUEST (req) and the Backend sends a RESPONSE (res)

const express = require('express');

// Backend application 
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// MAKE SURE THESE TWO LINES ARE ALWAYS IN YOUR SERVER.JS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

// Create a route that loads our static files
// REQUIRED FOR EACH PROJECT FOR EACH EXPRESS SERVER
app.use(express.static('public'));

// This is a route that allows a user to grab all of their notes that are stored in our backend 
app.get('/notes', (req, res) => {
  // Give the user back the notes.html file
  res.sendFile(path.join(__dirname + '/public/notes.html'));

});


// These two routes below are different because one is a GET route 
// and one is a POST route
app.get('/api/notes', (req, res) => {
  // read a json file
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  res.json(notes)
})

app.post('/api/notes', (req, res) => {
  // This route allows a user to create a note 
  // Grab the note that the user wrote, that information is stored on the user's request
  // User data is stored in the req.body
  const note = req.body
  note.id = uuidv4();
  // Retrive the current notes in the db.json file 
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  // Add the new note to the existing notes
  notes.push(note)
  // Save these notes to the db.json file 

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  // responds with json
  res.json(note)
})


// MAKE SURE ALL OTHER ROUTES ARE ABOVE THIS ONE 
// THIS ROUTE IS THE CATCH-ALL AKA EVERYTHING ELSE 
app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname + '/public/index.html'));
})






// Listener - turning on our server 
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
