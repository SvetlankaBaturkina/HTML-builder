const fs = require ('fs');
const path = require ('path');

// путь к папке 04-copy-directory
const nameDir = path.dirname(__filename);
// путь к папке files с содержимым для копирования
const nameDirFiles = nameDir + '\\files';
// путь к папке files-copy для сохранения скопированного содержимого папки files
const nameDirFilesCopy = nameDir + '\\files-copy';

// получение данных о папке наличии/отсутствии папки files-copy
fs.stat (nameDirFilesCopy, err => {
    if (err) {
        // создать папку files-copy для сохранения скопированного содержимого папки files
        fs.mkdir (nameDirFilesCopy, err => {
            if (err) throw err;
            console.log("Созданна папка files-copy с точной копией содержимого папки files");
            copyFolder ();
        });
    } else {
        clearFolder ();
        copyFolder ();
        console.log("Содержимое папки files-copy обновлено и соответствует содержимому папки files");
    };
});

// копировать содержимое папки files в папку files-copy
function copyFolder () {
    // чтение содержимого папки files
    fs.readdir(nameDirFiles, (err, files) => {
        if (err) {
            throw err;
        } else {
            // копирование содержимого папки files в папку files-copy
            for (let file of files) {
                fs.copyFile(nameDirFiles + '\\' + file, nameDirFilesCopy + '\\' + file, (err) => {
                    if (err) throw err; 
                });
            };
        };
    });
};

// удалить содержимое папки files-copy
function clearFolder () {
    // чтение содержимого папки files-copy
    fs.readdir(nameDirFilesCopy, (err, files) => {
        if (err) {
            throw err;
        } else {
            // удаление содержимого папки files-copy
            for (let file of files) {
                fs.unlink(nameDirFilesCopy + '\\' + file, (err) => {
                    if (err) throw err;
                });
            };
        };
    });
};