const path = require('path');
const fs = require('fs');

// путь к папке 06-build-page
const nameDir = path.dirname(__filename);
// путь к файлу template.html
const nameFileTemplateHtml = nameDir + "\\template.html";
// путь к папке components
const nameDirComponents = nameDir + "\\components";
// путь к папке project-dist
const nameDirProjectDist = nameDir + "\\project-dist";
// путь к файлу index.html
const nameFileHtml = nameDirProjectDist + "\\index.html";
// путь к папке styles (по условию задания)
const styles = nameDir + "\\styles";
// путь к файлу style.css (созданн в папке project-dist)
const styleCss = nameDirProjectDist + "\\style.css";
// путь к папке assets (по условию задания)
const assets = nameDir + "\\assets";
// путь к папке assets (созданна в папке project-dist)
const assetsCopy = nameDirProjectDist + "\\assets";

// удалить содержимое папки project-dist, если папка имеется
fs.rm (nameDirProjectDist, { recursive: true, force: true }, err => {
    if (err) throw err;

    // создать папку project-dist
    fs.mkdir(nameDirProjectDist, err => {
        if (err) throw err;
        addFileIndexHtml ();
        addFileCss ();
        addFolderAssets ();
        console.log ("Cоздана папка project-dist, содержащая в себе файлы index.html и style.css, а так же папку assets");
    });
});

// создать файл index.html
function addFileIndexHtml () {
    // прочитать содержимое файла template.html
    fs.readFile(nameFileTemplateHtml, err => {
        if (err) throw err;

        let newString;
        const example = fs.createReadStream(nameFileTemplateHtml, 'utf8');
        const writeExample = fs.createWriteStream(nameFileHtml);

        example.on('data', chunk => {
            newString = chunk;

            // прочитать содержимое папки components
            fs.readdir(nameDirComponents, (err, files) => {
                if (err) throw err;

                // создать пустые массивы
                let textFile = [];
                let nameFile = [];

                for (let file of files) {
                    // создать поток чтения папки 
                    const fileFolderComponents = fs.createReadStream(nameDirComponents + '\\' + file);

                    // добавить в массивы название и содержание файлов папки
                    textFile.push(fileFolderComponents);
                    nameFile.push(path.parse(file).name);

                    // перебрать полученные массивы 
                    for (let i = 0; i < textFile.length; i++) {
                        textFile[i].on('data', (data) => {
                            newString = newString.replace(`{{${nameFile[i]}}}`, data);
                            if (i === textFile.length - 1)
                            writeExample.write(newString);
                        });
                    };
                };
            });
        });
    });
};

// создать папку assets в папке project-dist
function addFolderAssets () {
    fs.mkdir(assetsCopy, err => {
        if (err) throw err;
        copyFilesAssets (assets, assetsCopy);
    });
};

// копировать файлы папки assets в папку assets папки project-dist
function copyFilesAssets (nameFolder, nameFileFolder) {
    // прочитать содержимое папки assets
    fs.readdir(nameFolder, { withFileTypes: true }, (err, items) => {
        if (err) throw err;
        // создать папку 
        fs.mkdir(nameFileFolder, { recursive: true }, function(err) {
            if (err) throw err;
        });
        // копировать файлы папок папки assets
        for (let item of items) {
            // проверить является ли папкой, скопировать папки/файлы 
            if (item.isDirectory()) {
                const nextNameFolder = path.join(nameFolder, item.name);
                const nextNameFileFolder = path.join(nameFileFolder, item.name);
                copyFilesAssets (nextNameFolder, nextNameFileFolder);
            } else {
                fs.copyFile(path.join(nameFolder, item.name), path.join(nameFileFolder, item.name), err => {
                    if (err) throw err;
                });
            };
        };
    });
};

// создать файл style.css в папке project-dist
function addFileCss () {
    fs.open(styleCss, 'w', err => {
        if (err) throw err;
    });

    // прочитать содержимое папки styles
    fs.readdir(styles, (err, files) => {
        if (err) throw err;

        for (let file of files) {
            // путь к файлам папки styles 
            const fileFolderStyles = styles + '\\' + file;

            // проверить расширение пути файла в папке styles
            if (path.parse(file).ext === '.css') {

                // прочитать файл в папке styles
                fs.readFile(fileFolderStyles, (err, data) => {

                    if (err) throw err;
                    // записать содержимое файла в папке styles в созданный файл style.css
                    fs.appendFile(styleCss, data, err => {
                        if (err) throw err;
                    });
                });
            };
        };
    });
}; 