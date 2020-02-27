'use strict';

// Load environmental variables
require('dotenv').config()

const fs = require('fs');
const chokidar = require('chokidar');
require('console-stamp')(console, {pattern: 'dd/mm/yy HH:mm:ss'})

// One-liner for current directory
const watcher = chokidar.watch('./uploads')

watcher.on('all', (event, path) => {
  console.log('Event:', event, 'Path:', path);
});

watcher.on('change', path => {
  console.log ('File changed, Path:', path);

  const file = fs.readFileSync(path, 'utf-8');
  const lines = file.trim().split('\n').reverse();

  let headerLine, lastLine

  for (let line of lines) {

    line = line.trim();

    if (line === '') continue;

    if (!lastLine) {
      lastLine = line;
      continue;
    }
    if (!headerLine && ['"Tiempo inicio"', "[ ]"].includes(line.split(';')[0]) && line.split(';')[1] !== '"Iny"') {
      headerLine = line;
      continue;
    }
  }

  // let lastLine = lines.slice(-1)[0];
  // while (lastLine.trim() === '') {
  //   lastLine = lines.slice(-1)[0];
  // } 
  // console.log('header', headerLine);
  // console.log('data', lastLine);

  const csvType = headerLine.split(';')[0];
  let header = headerLine.split(';').slice(1,-1);
  console.log("TCL: header", header)
  
  let re;

  if (csvType === '"Tiempo inicio"') re = /("Trigger"|\[\w+\]"$)/ig
  if (csvType === "[ ]") re = /^\w+\s/ig

  header = header.map(item => {
    console.log(item)
    console.log(re)
    return item.match(re)[0].replace(/(\[|\]|")/ig, '').trim();
  });
  console.log("TCL: header", header)
  let data = lastLine.split(';').slice(1,-1);
  console.log("TCL: data", data)

  let body = {}

  header.forEach((key, i) => body[key] = data[i])

  console.log(body)

})
