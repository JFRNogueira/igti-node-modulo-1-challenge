const express = require('express');
const bodyParser = require('body-parser')
const app = require('./routes/routes')

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`)
})