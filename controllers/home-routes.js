const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Get homepage
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User
        },
        {
          model: Comment
        },
      ]
    });
    const posts = postData.map((posts) => posts.get({ plain: true }));

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn
    });

    res.status(200);
  } catch (err) {
    res.status(500).json(err)
  }
});

// Get a single post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [
              {
                  model: User
              },
              {
                  model: Comment,
                  include: [{model: User}]
              },

          ]
      })
      const posts = postData.get({ plain: true });
      
      // console.log(posts);

      res.render('post', {
          posts,
          loggedIn: req.session.loggedIn
      });
      
      
  } catch (err) {
      res.status(400).json(err);
  }
})

// Get the login page
router.get('/login', async (req, res) => {
  try {
    res.render('login')
  } catch (err) {
    res.status(500).json(err)
  }
});

// Get the home page
router.get('/', async (req, res) => {
  try {
    res.render('home')
  } catch (err) {
    res.status(500).json(err)
  }
});




module.exports = router;
