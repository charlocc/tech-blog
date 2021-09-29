const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Get homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn
    });
    res.status(200);
  } catch (err) {
    res.status(500).json(err)
  }
});

// Get the login page
router.get('/login', async (req, res) => {
  try {
    res.render('login')
  } catch (err) {
    res.status(500).json(err)
  }
});


// Route to access the dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((posts) => posts.get({ plain: true }));

    res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
