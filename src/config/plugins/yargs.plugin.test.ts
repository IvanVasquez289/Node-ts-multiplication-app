import { yarg } from './yargs.plugin';

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args]
    // console.log(process.argv)
    const {yarg} = await import('./yargs.plugin')
    
    return yarg;
}

describe('Test yargs.plugin.ts',()=>{

    const originalArgv = process.argv;
    beforeEach(()=>{
        process.argv = originalArgv;
        jest.resetModules()
    })

    test('should return default values', async()=>{
        const argv = await runCommand(['-b', '5'])
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs'
        }))
    })

    test('should return configuration with custom values', async ()=>{
        const argv = await runCommand(['-b', '6', '-l', '3', '-s', '-n', 'tabletest', '-d', 'carpeta'])
        expect(argv).toEqual(expect.objectContaining({
            b: 6,
            l: 3,
            s: true,
            n: 'tabletest',
            d: 'carpeta',
        }))
    })
})