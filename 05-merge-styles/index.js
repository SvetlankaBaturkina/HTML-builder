const fs = require('fs');
const path = require('path');

// путь к папке 05-merge-styles
const nameDir = path.dirname(__filename);
// путь к папке styles
const nameDirStyles = nameDir + "\\styles";
// путь к папке project-dist
const nameDirProjectDist = nameDir + "\\project-dist";
// путь к файлу bundle.css
const nameFileBundleCss = nameDirProjectDist + "\\bundle.css";

// создать файл bundle.css в папке project-dist
fs.truncate(nameFileBundleCss, err => {
    if (err) {
    fs.open (
        path.join (nameFileBundleCss), "w",
        (err) => {
            if (err) throw err;
        });
    };
});

// чтение содержимого папки styles
fs.readdir(nameDirStyles, (err, files) => {
    if (err) {
        throw err;
    } else {
        for (let file of files) {
            // проверка расширения пути к файлу в папке styles
            if (path.extname (file) === '.css') {
                // путь к файлу в папке styles
                let nameFilesStyles = nameDirStyles + '\\' + file;

                // прочитать содержимое файла в папке styles
                fs.readFile(nameFilesStyles, 'utf-8', (err, data) => {
                    if (err) throw err;
                    // записать содержимое файла в папке styles в созданный файл bundle.css
                    fs.appendFile (nameFileBundleCss, data, (err) => {
                        if (err) throw err;
                    });
                });
            };
        };
    };
    console.log("Внутри папки project-dist создан файл bundle.css,\nобъединяющий в себе содержимое папки styles");
});