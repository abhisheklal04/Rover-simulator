/* eslint no-console: 0 */

const path = require('path');
const express = require('express');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'src/client/index.html'));
});

app.use(express.static('src/client/public'));

app.listen(3000, function () {
  console.log('Example app listening on http://localhost:3000 ');
});
