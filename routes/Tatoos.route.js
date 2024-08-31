const express = require('express');
const router = express.Router();
const {
    GetAllTatoos,
    PostTatoo,
    UpdateTatoo,
    DeleteTatoo,
} = require('../controllers/tatoos');
router.get('/', GetAllTatoos);
router.post('/', PostTatoo);
router.put('/:id', UpdateTatoo);
router.delete('/:id', DeleteTatoo);
module.exports = router;
