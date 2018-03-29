const express = require('express');
const app = express();

require('./app/routes/authentication');

app.listen(process.env.PORT || 8003, function () {
    console.log("Server serving on 8003...");
});
