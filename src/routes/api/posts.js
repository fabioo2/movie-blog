const express = require('express');
const router = express.Router();

// Item Model
const Post = require('../../models/Post');

//@route GET
router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index.ejs', { Posts: posts });
    });
});

router.get('/pages/:title', (req, res) => {
    const title = req.params.title;
    res.render(`${title}.ejs`);
});

router.get('/create', (req, res) => {
    res.render('create.ejs');
});

router.get('/edit/:id', (req, res) => {
    id = req.params.id;
    Post.findById({ _id: id }, (err, posts) => {
        res.render('edit.ejs', { Posts: posts });
    });
});

//@route POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        tag: req.body.tag,
        content: req.body.content,
        director: req.body.director,
    });
    try {
        await post.save();
        res.redirect('/');
    } catch (err) {
        res.redirect('/');
    }
});

router.post('/edit/:id', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        tag: req.body.tag,
        content: req.body.content,
        director: req.body.director,
    });

    console.log(req.body);
    Post.findByIdAndUpdate(
        id,
        {
            title: post.title,
            tag: post.tag,
            content: post.content,
            director: post.director,
        },
        (err) => {
            if (err) return res.send(500, err);
            res.redirect('/');
        }
    );
});

router.route('/delete/:id').get((req, res) => {
    const id = req.params.id;
    Post.findByIdAndRemove(id, (err) => {
        if (err) return res.send(500, err);
        res.redirect('/');
    });
});

module.exports = router;
