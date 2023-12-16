const express = require('express');
const morgan = require('morgan'); // third-party middleware
const mongoose = require('mongoose'); // third-party middleware
const blogRoutes = require('./routes/blogRoutes');

// set up express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://newuser:test1234@nodetuts.cd1ivwj.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs'); 

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev')); 

// routes
app.get('/', (req, res) => { 
  res.redirect('/blogs'); 
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes); 

app.use((req, res) => { 
  res.status(404).render('404', { title: '404' });
});