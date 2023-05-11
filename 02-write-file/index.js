const fs = require ("fs");
const path = require ("path"); 
const {
  stdin, 
  stdout } = process;

// путь к создаваемому файлу text.txt
let name = path.dirname(__filename)
  name = path.join(name, 'text.txt');

// создать файл text.txt
fs.writeFile (  
    name,
    "",
    (err) => {
        if (err) throw err;
        writetext ()
    }
);

// вывести текст в консоль и записать в созданный файл text.txt
function writetext () { 
    stdout.write ("Добро пожаловать!\nСоздан файл text.txt для записи введенного Вами текста.\nВведите, пожалуйста, Ваш текст.\n");
    stdin.on ("data", (data) => {
        if (data.toString().trim() === "exit") {
            process.exit(); 
        } else {
            stdout.write("Введенный Вами текст записан. Можете продолжить ввод или выйти.\nЕсли не желаете продолжать ввод, введите exit или нажмите ctrl + c для выхода.\n");  
            fs.appendFile (
                name,
                data.toString(),
                err => {
                    if (err) throw err;
                }
            );
        };
    });
};

// вывести прощальную фразу в консоль
process.on ("exit", () => {
    stdout.write("Введенный Вами текст записан. Всего хорошего!");
}); 

// завершение процесса
process.on ("SIGINT", () => {
    process.exit();
}); 