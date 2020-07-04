const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const router = require('./src/routes/api/posts');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/pages/'),
]);
app.set('view engine', 'ejs');

app.use('/', router);

// DB Config
const db = require('./src/config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
