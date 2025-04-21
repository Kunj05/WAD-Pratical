const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/music', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const songSchema = new mongoose.Schema({
  songname: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String,
});

const Song = mongoose.model('Song', songSchema);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Route: Insert Initial 5 Songs
app.get('/insert', async (req, res) => {
  const songs = [
    { songname: "Tum Hi Ho", film: "Aashiqui 2", music_director: "Mithoon", singer: "Arijit Singh" },
    { songname: "Kal Ho Naa Ho", film: "Kal Ho Naa Ho", music_director: "Shankar-Ehsaan-Loy", singer: "Sonu Nigam" },
    { songname: "Chaiyya Chaiyya", film: "Dil Se", music_director: "A.R. Rahman", singer: "Sukhwinder Singh" },
    { songname: "Tera Ban Jaunga", film: "Kabir Singh", music_director: "Akhil Sachdeva", singer: "Tulsi Kumar" },
    { songname: "Jai Ho", film: "Slumdog Millionaire", music_director: "A.R. Rahman", singer: "Sukhwinder Singh" },
  ];
  await Song.insertMany(songs);
  res.send('Inserted 5 songs into DB.');
});

// Route: Display all songs + total count
app.get('/', async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();
  res.render('songs', { songs, count });
});

// Route: Songs by Music Director
app.get('/music-director/:name', async (req, res) => {
  const songs = await Song.find({ music_director: req.params.name });
  res.render('songs', { songs, count: songs.length });
});

// Route: Songs by Music Director and Singer
app.get('/music-director/:md/singer/:singer', async (req, res) => {
  const songs = await Song.find({ music_director: req.params.md, singer: req.params.singer });
  res.render('songs', { songs, count: songs.length });
});

// Route: Delete a Song
app.get('/delete/:songname', async (req, res) => {
  await Song.deleteOne({ songname: req.params.songname });
  res.redirect('/');
});

// Route: Add a New Song
app.post('/add', async (req, res) => {
  await Song.create(req.body);
  res.redirect('/');
});

// Route: Songs by Singer from Film
app.get('/film/:film/singer/:singer', async (req, res) => {
  const songs = await Song.find({ film: req.params.film, singer: req.params.singer });
  res.render('songs', { songs, count: songs.length });
});

// Route: Update song (add actor & actress)
app.get('/update/:songname', async (req, res) => {
  await Song.updateOne(
    { songname: req.params.songname },
    { actor: "Ranbir Kapoor", actress: "Alia Bhatt" }
  );
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`🎵 Server running on http://localhost:${PORT}`);
});
