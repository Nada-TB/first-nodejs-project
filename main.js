#!/usr/bin/env node
const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const port = process.env.PORT || 3000;
const pages = ["/home", "/about", "/projects", "/contact"];

const server = http.createServer((req, res) => {
  if (pages.includes(req.url) == true) {
    const file = __dirname + url.parse(req.url).path + ".html";
    fs.readFile(file, (err, data) => {
      if (err) throw err;
      res.statusCode = 200;
      res.setHeader("content-type", "text/html");
      res.write(data);
      res.end();
    });
  } else if(req.url=="/") {
    fs.readFile("home.html", (err, data) => {
        if (err) throw err;
        res.statusCode = 404;
        res.setHeader("content-type", "text/html");
        res.end(data);
      });
  }else{
    fs.readFile("notFound.html", (err, data) => {
        if (err) throw err;
        res.statusCode = 404;
        res.setHeader("content-type", "text/html");
        res.end(data);
      });
  }
  // if(req.url="style.css"){
  //     fs.readFile('style.css', (err, data)=>{
  //         if(err) throw err;
  //         res.statusCode=200;
  //         res.setHeader('content-type','text/css');
  //         res.end(data);
  //     })
  // }
});

server.listen(port, () => {
  console.log("we are on air!");
});
