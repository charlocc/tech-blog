const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Get homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User
        }
      ]
    });
    const posts = postData.map((posts) => posts.get({ plain: true }));

    res.render('homepage', {
      posts,
      // loggedIn: req.session.loggedIn
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




module.exports = router;
