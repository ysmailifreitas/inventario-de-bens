const express = require('express');
const router = express.Router();

router.get('/userProfile', (req,res) => {
    res.render('userProfile', {username: req.session.username});
});

module.exports = router;