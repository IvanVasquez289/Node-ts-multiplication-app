import fs, { mkdirSync } from "fs";
import { SaveFile } from './save-file.use-case';
import { mock } from "node:test";
describe('SaveFileUseCase', ()=>{

    const customOptions = {
        fileContent: 'Desde test',
        destination: 'example/pruebas',
        fileName: 'archivo1'
    }

    const filePath = `${customOptions.destination}/${customOptions.fileName}.txt`

    afterEach(()=>{
        // Clean up

        const outputFolderExists = fs.existsSync('outputs')
        if(outputFolderExists) fs.rmSync('outputs', {recursive:true})

        const customFolderExists = fs.existsSync(customOptions.destination)
        if(customFolderExists) fs.rmSync(customOptions.destination, {recursive: true})
       
    })

    test('should save files with default values',()=>{
        const createFile = new SaveFile()
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'Hola mundo'
        }

        const result = createFile.execute(options)
        const fileExists = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath,{encoding: 'utf-8'})
        
        expect(result).toBe(true)
        expect(fileExists).toBe(true)
        expect(fileContent).toBe(options.fileContent)
    })

    test('should save file with custom values', ()=> {
       
        const result = new SaveFile().execute(customOptions);
        const fileExists = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath,{encoding:'utf-8'})
        
        expect(result).toBe(true)
        expect(fileExists).toBe(true)
        expect(fileContent).toBe(customOptions.fileContent)
    })

    test('should return error if directory could not be created', ()=> {
        const saveFile = new SaveFile()
        const mkdirMock = jest.spyOn(fs,'mkdirSync').mockImplementation(
            () => { throw new Error("This is a custom error message")}
        )
        const result = saveFile.execute(customOptions)
        expect(result).toBe(false)

        mkdirMock.mockRestore()
    })

    test('should return error if file could not be created', ()=> {
        const saveFile = new SaveFile()
        const mkdirMock = jest.spyOn(fs,'writeFileSync').mockImplementation(
            () => { throw new Error("This is a custom error message 2")}
        )
        const result = saveFile.execute(customOptions)
        expect(result).toBe(false)
    })
}) 