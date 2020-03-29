const express = require('express')
const app = express()
const exphbs = require('express-handlebars');

const request = require('request');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const path = require('path');
const PORT = process.env.PORT || 3000;

//api key - pk_1e073f092d094f109d2aa9c6299eaaa2

//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//create call api function
function callApi (finishedApi, stock_ticker) {
    request('https://cloud.iexapis.com/stable/stock/'+stock_ticker+'/quote?token=pk_1e073f092d094f109d2aa9c6299eaaa2', { json: true }, (err, res, body) => {
    if (err) return console.log(err);
    if (res.statusCode === 200) {
        finishedApi(body);
    }
});
}

app.get('/', (req, res)=> {
   callApi(function(doneApi){
    res.render('home', {
        stock:doneApi
    })
   }, 'fb')
    
}); 

app.post('/',urlencodedParser, (req, res)=> {
    callApi(function(doneApi){
       // postedStuff = req.body.stock_ticker;
        res.render('home', {
            stock:doneApi
        })
       }, req.body.stock_ticker)
});

app.get('/about',(req, res)=> {
    res.render('about')
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, ()=> {
    console.log("Listening on port",PORT)
})