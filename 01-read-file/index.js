const fs = require('fs');
const path = require('path'); 

// асинхронное чтение

let name = (path.dirname(__filename)); // найти путь к файлу
  name = path.join(name, 'text.txt');
  
const stream = new fs.ReadStream(name, 'utf-8');
stream.on('readable', function() {
    const data = stream.read();
    if (data != null) {
        console.log(data);
    };
});