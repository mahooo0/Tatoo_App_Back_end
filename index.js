const express = require('express');
const mongoose = require('mongoose');
const MAstersRouter = require('./routes/Masters.route.js');
const TatooRouter = require('./routes/Tatoos.route.js');
const StyleRouter = require('./routes/Styles.route.js');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Routers
app.get('/', (req, res) => res.send('Express on Vercel'));
app.use('/api/tatoos', TatooRouter);
app.use('/api/styles', StyleRouter);
app.use('/api/masters', MAstersRouter);

mongoose
    .connect(
        'mongodb+srv://admin:Mehemmed.1@backenddb.fcdil.mongodb.net/Tatoos?retryWrites=true&w=majority&appName=BackendDB'
    )
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}`)
        );
    })
    .catch((err) => {
        console.error('Connection failed', err);
    });
