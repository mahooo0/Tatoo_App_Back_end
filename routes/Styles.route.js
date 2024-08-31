const express = require('express');
const {
    CreateStyle,
    GetAllStyles,
    UpdateStyle,
    DeleteStyle,
} = require('../controllers/styles');

const router = express.Router();
router.post('/', CreateStyle);
router.get('/', GetAllStyles);
router.put('/:id', UpdateStyle);
router.delete('/:id', DeleteStyle);

module.exports = router;
