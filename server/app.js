const path = require('path');
const express = require('express')
const app = express()
var cors = require('cors')
const router = require('./router/hoteldata');
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)

const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

mongoose.connect('mongodb://myUserAdmin:b83m33pE@140.127.220.67:27017/HotelComments?authSource=admin')
    .then(() =>
        console.log('MongoDB Connected...')
    )
    .catch((err) =>
        console.log(err)
    )

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '/client/public')));

app.use('/api', router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;