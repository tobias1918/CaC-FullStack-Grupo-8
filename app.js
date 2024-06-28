const express = require('express');
const app= express();

app.set('view engine', 'ejs');

app.use('/',require('./src/routes/mainRoutes'))

app.listen(5000,()=>{
    console.log('servidor corriendo en http://localhost:5000');
});


