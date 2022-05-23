const fs = require("fs");
const path = require("path"); 

// асинхронное чтение

const name = (path.dirname(__filename)) + '\\text.txt'; // найти путь к файлу

const stream = new fs.ReadStream(name, 'utf-8');
stream.on('readable', function() {
    const data = stream.read();
    if (data != null) {
        console.log(data);
    };
});