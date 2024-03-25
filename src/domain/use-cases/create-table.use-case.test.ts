import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase',()=>{
    const table = new CreateTable()

    test('should create table with default values', ()=>{
        const createTable = new CreateTable()
        const table = createTable.execute({base:7})
        const rows = table.split('\n').length
       
        expect(createTable).toBeInstanceOf(CreateTable)
        expect(table).toContain('7 * 1 = 7')
        expect(table).toContain('7 * 10 = 70')
        expect(rows).toEqual(10)
        
    })

    test('should create table with custom values', () => {
        const options = { 
            base: 5, 
            limit: 13
        }
        const createTable = new CreateTable()
        const table = createTable.execute(options)
        const rows = table.split('\n').length
        
        
        expect(rows).toBe(13)
        expect(table).toContain('5 * 1 = 5')
        expect(table).toContain('5 * 13 = 65')
    })
})