// Require Libraries
const express = require('express');

// App Setup
const app = express();

const Tenor = require('tenorjs').client({
  // Replace with your own key
  Key: 'AIzaSyD41waA0MNYDeK_B4OS0x-3W72c_WR030M', // https://tenor.com/developer/keyregistration
  Filter: 'high', // "off", "low", "medium", "high", not case sensitive
  Locale: 'en_US', // Your locale here, case-sensitivity depends on input
});

app.use(express.static('public'));

// Middleware
const handlebars = require('express-handlebars');

const hbs = handlebars.create({
  helpers: {
    foo() {
      return 'FOO!';
    },
    bar() {
      return 'BAR!';
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes

app.get('/', (req, res) => {
  term = 'cat';
  if (req.query.term) {
    term = req.query.term;
  }
  // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
  Tenor.Search.Query(term, '10')
    .then((response) => {
      // store the gifs we get back from the search
      const gifs = response;
      // pass the gifs as an object into the home page
      res.render('home', { gifs });
    })
    .catch(console.error);
});

app.get('/:username', (req, res) => {
  res.send('Hello Squirrel');
});

app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
});
// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});
