import { yarg } from "./config/plugins/yargs.plugin"
import { ServerApp } from "./presentation/server-app"

// console.log(process.argv)
// console.log(yarg)

// const [tsnode,app,...args] = process.argv
// console.log(args)

(async()=>{
  await main()
  // console.log('hola mundo')
})()

async function main(){
  // console.log('main ejecutado')
  // console.log(yarg)
  const {b:base, l:limit, s:showTable, n:name, d: destination} = yarg;
  ServerApp.run({ base, limit, showTable, name, destination })
}
