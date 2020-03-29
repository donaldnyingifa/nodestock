const express = require('express')
const app = express()
const exphbs = require('express-handlebars');

const path = require('path');
const PORT = process.env.PORT || 3000;

//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', (req, res)=> {
    res.render('home', {
        stuff:'this is a stuff'
    })
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, ()=> {
    console.log("Listening on port",PORT)
})