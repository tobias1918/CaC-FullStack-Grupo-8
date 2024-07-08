const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app= express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',require('./src/routes/mainRoutes'))


app.listen(5000,()=>{
    console.log('servidor corriendo en http://localhost:5000');
});


