const path = require("path");
const express = require("express");
const app = require("./public/App.js");

const server = express();

server.use(express.static(path.join(__dirname, "public")));

const page = (req, res) => {
  const { html } = app.render({ url: req.url });

  res.write(`
    <!DOCTYPE html>
    <head>
      <link rel='stylesheet' href='/global.css'>
      <link rel='stylesheet' href='/bundle.css'>
      <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"/>
    
    </head>
    <body>
      <div id="app"></div>
      <script src="/bundle.js"></script>
    </body>
  `);

  res.end();
};

server.get("*", page);

const port = 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
