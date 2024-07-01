const express = require('express');
const path = require('path');

const app= express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./src/routes/mainRoutes'))

app.listen(5000,()=>{
    console.log('servidor corriendo en http://localhost:5000');
});


