const router = require('express').Router();
const auth = require('../config/verify_token');


// private
router.get('/get_all', async (req, res) => {

});

router.post('/create', auth, async (req, res) => {

});

router.put('/update', auth, async (req, res) => {

});

router.delete('/delete/:id', auth, async (req, res) => {

});

module.exports = router;