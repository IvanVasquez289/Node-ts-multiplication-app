import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('Server app',()=>{
    
    const options = {
        base: 9, 
        limit: 3, 
        showTable: false, 
        name:'filename-test', 
        destination: 'folder-test'
    }

    beforeEach( () => {
        jest.clearAllMocks()
    });
    
    test('should create ServerApp instance',()=>{
        const server = new ServerApp();
        expect(server).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run).toBe("function")
    })

    test('should run ServerApp with options',()=>{
        // const logSpy = jest.spyOn(console,'log')
        // const createTableSpy = jest.spyOn(CreateTable.prototype,'execute')
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')

        // ServerApp.run(options)

        // expect(logSpy).toHaveBeenCalledTimes(2)
        // expect(logSpy).toHaveBeenCalledWith('server running')
        // expect(logSpy).toHaveBeenLastCalledWith('File Created')

        // expect(createTableSpy).toHaveBeenCalledTimes(1)
        // expect(createTableSpy).toHaveBeenCalledWith({"base": 9, "limit": 3})

        // expect(saveFileSpy).toHaveBeenCalledTimes(1)
        // expect(saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String),
        //     fileName: options.name,
        //     destination: `${options.destination}`
        // })
    })

    test('should run ServerApp with custom values mocked',()=>{
        const logMock = jest.fn()
        const logErrorMock = jest.fn()
        const createTableMock = jest.fn().mockReturnValue('1 x 2 = 2')
        const saveFileMock = jest.fn().mockReturnValue(true)

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options)

        expect(logMock).toHaveBeenCalledWith('server running')
        expect(createTableMock).toHaveBeenCalledWith({"base": options.base, "limit": options.limit})
        expect(saveFileMock).toHaveBeenCalledWith({
            "destination": options.destination, 
            "fileName": options.name,
            "fileContent": "1 x 2 = 2", 
        })
        expect(logMock).toHaveBeenCalledWith('File Created')
        expect(logErrorMock).not.toHaveBeenCalled()
    })
})