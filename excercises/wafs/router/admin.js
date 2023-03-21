const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('from admin')
})

router.get('/detail', (req, res) => {
    res.send('route is /admin/detail')
})

module.exports = router;