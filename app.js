const express = require("express")
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

const port = 8000;
// app.use(express.static('static', options))
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //FOR SERVING STATIC FILES
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') //  set the tamplete ingin as pug
app.set('views', path.join(__dirname, 'views')) // set the view directory

// ENDPOINTS
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res) => {

    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("this item has been send")

    }).catch(() => {
        res.status(400).send("item was not found")
    });
    // res.status(200).render('contact.pug')
})


// START THE SERVER
app.listen(port, () => {
    console.log(`the application started successfully on port in one ${port}`)
})