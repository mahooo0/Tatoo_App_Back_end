const express = require('express');
const router = express.Router();
const {
    CreateMaster,
    GetAllMasters,
    UpdateMaster,
    DEleteMasters,
} = require('../controllers/masters');
const Master = require('../models/Masters.module');
const Tatoo = require('../models/Tatoo.module');

router.post('/', CreateMaster);
router.get('/', GetAllMasters);
router.put('/:id', UpdateMaster);
router.delete('/:id', DEleteMasters);
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const SingleMaster = await Master.findById(id);
        const tatoos = await Tatoo.find({});
        const MastersWorks = tatoos.filter(
            (item) => item.master === SingleMaster.name
        );

        res.status(200).json({ ...SingleMaster._doc, MastersWorks });
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
});
module.exports = router;
