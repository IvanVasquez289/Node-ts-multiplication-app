import { writeFileSync, readFileSync, mkdirSync } from "fs"
import { yarg } from "./config/plugins/yargs.plugin";

const {b:base, l:limit, s:showTable,} = yarg;

// ?? Mejor forma y no sobreescribe el archivo
let outputMessage = '';


const headerMessage = `
  ==========================
      Tabla del ${base}
  ==========================
`

for (let i = 1; i <= limit ; i++) {
  outputMessage += `${base} * ${i} = ${base*i}\n`;
}

outputMessage = headerMessage + outputMessage

if(showTable){
  console.log(outputMessage);
}
    
const outputPath = 'outputs/folder1/folder2/folder3' 
mkdirSync(outputPath, {recursive: true})

writeFileSync(`${outputPath}/tabla-${base}.txt`,outputMessage )
console.log('File has  been created 🥳')


// ?? MI FORMA
// grabar en el archivo de salida
// console.log('Tabla del 5')
// for (let i = 1; i < 11; i++) {
//     writeFileSync("outputs/tabla-5.txt",
//       "5x" + i + " = " + 5*i + "\n",
//       {
//         encoding: "utf8",
//         flag: "a+",
//         mode: 0o666
//       });
// }


// path: outputs/tabla-5.txt
// const file = readFileSync('./outputs/tabla-5.txt', 'utf-8')
// console.log(file)    