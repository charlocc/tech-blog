const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// Add a new comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            note: req.body.note,
            // user_id: req.session.user_id,
            user_id: req.body.user_id,
            // post_id: req.post.id,
            post_id: req.body.post_id,
        });
        // res.status(200).json(newComment);
        res.render('post', {
            newComment,
            // loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// Allow only the user who made the comment to delete it
router.delete('/:id', async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if (!deleteComment) {
            res.status(404).json({ message: "You don't have authorization to delete this review." });
            return;
        }
        res.status(200).json(deleteComment);
        
    } catch (err) {
        res.status(400).json(err);
    }
})


module.exports = router;