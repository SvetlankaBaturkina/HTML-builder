const fs = require('fs');
const path = require('path');

// путь к директории
const nameDir = path.dirname(__filename) + "/secret-folder";

// чтение содержимого папки secret-folder
fs.promises.readdir(nameDir).then(files => {
    for (let file of files) {

      // путь к директории c названием файла
      let nameDirFile = __dirname + '/secret-folder/' + file;

      // Получение данных о каждом объекте который содержит папка secret-folder
        fs.stat (nameDirFile, (err,stats) => {
          if (err) throw err;

          // проверка объекта на то, что он является файлом
          if (stats.isFile()) {
            let data = path.parse(nameDirFile).name + ' - ' + path.extname(nameDirFile).slice(1);
            let fileData = data + ' - ' + stats.size / 1024 + ' kb';

            // вывод данных о файле в консоль
            console.log(fileData);
          }

        });

    }
});
