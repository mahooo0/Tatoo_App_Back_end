const express = require('express');
const mongoose = require('mongoose');
const MAstersRouter = require('./routes//Masters.route.js');
const TatooRouter = require('./routes/Tatoos.route.js');
const StyleRouter = require('./routes/Styles.route.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/tatoos', TatooRouter);
app.use('/api/styles', StyleRouter);
app.use('/api/masters', MAstersRouter);
// app.post('/api/styles', async (req, res) => {
//     try {
//         const style = await Style.create(req.body);
//         res.status(200).json(style);
//     } catch (error) {
//         res.status(500).json({ massaga: error.massage });
//     }
// });
// app.get('/', (req, res) => {
//     res.send('Hello fronm back');
// });
// app.post('/api/tatoos', async (req, res) => {
//     try {
//         const tatoo = await Tatoo.create(req.body);
//         res.status(200).json(tatoo);
//     } catch (error) {
//         res.status(500).json({ massaga: error.massage });
//     }
// });
// app.get('/api/tatoos', async (req, res) => {
//     try {
//         const tatoos = await Tatoo.find({});
//         res.status(200).json(tatoos);
//     } catch (error) {
//         res.status(500).json({ massaga: error.massage });
//     }
// });
// app.get('/api/tatoos/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const tatoo = await Tatoo.findById(id);
//         // console.log('tatoo:', tatoo);
//         if (!tatoo) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json(tatoo);
//     } catch (error) {
//         res.status(500).json({ massaga: error.massage });
//     }
// });
// app.put('/api/tatoos/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const tatoo = await Tatoo.findByIdAndUpdate(id, req.body);
//         if (!tatoo) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         const updatedTatoo = await Tatoo.findById(id);
//         res.status(200).json(updatedTatoo);
//     } catch (error) {
//         res.status(500).json({ massaga: error.massage });
//     }
// });
// app.delete('/api/tatoos/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Tatoo.findByIdAndDelete(id).then((response) => {
//             console.log(response);
//             res.status(200).json({ message: 'Tatoo is sucsesfully Deleted' });
//         });
//     } catch (error) {
//         res.status(500).json({ massaga: error.massage });
//     }
// });
mongoose
    .connect(
        'mongodb+srv://admin:Mehemmed.1@backenddb.fcdil.mongodb.net/Tatoos?retryWrites=true&w=majority&appName=BackendDB'
    )
    .then(() => {
        console.log('Connected!'),
            app.listen(3000, () => console.log('server Is listening'));
    })
    .catch((err) => {
        console.log('connection is failed');
    });
