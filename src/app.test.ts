// process.argv = ['node', 'app.ts' ,'-b', '5']
// import './app'
import { ServerApp } from './presentation/server-app'

describe('Test app.ts',()=>{

    test('should call Server.run with values', async ()=>{
        const serverRunMock = jest.fn()
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts','-b', '5', '-l', '3', '-s', '-d' ,'hola']
        await import ('./app')

        expect(serverRunMock).toHaveBeenCalledWith({
            "base": 5, 
            "destination": "hola", 
            "limit": 3, 
            "name": "multiplication-table",
            "showTable": true
        })
    })
})