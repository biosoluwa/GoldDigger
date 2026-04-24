import http from 'node:http'
import {serveStatic} from './utils/serveStatic.js'
import { handleLivePrice, handlePost } from './routeHandler/handleRoute.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async function(req, res){
    if(req.url === '/price/live'){
        handleLivePrice(res)
    }else if(req.url === '/api'){
       await handlePost(req, res)
    }else{
        await serveStatic(req, res, __dirname)
    }
})


server.listen(PORT, function(){
    console.log('server running')
})