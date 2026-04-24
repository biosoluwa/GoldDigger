import path from 'node:path'
import fs from 'node:fs/promises'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, base){
const publicDir = path.join(base, 'public')
try{
    const filePath = path.join(
        publicDir, 
        req.url === '/'? 'index.html': req.url
    )
    const content = await fs.readFile(filePath)
    const ext = path.extname(filePath)
    const contentType = getContentType(ext)
        res.statusCode = 200
        res.setHeader('Content-Type', contentType)
        res.end(content)
    }catch(err){
        if(err.code === 'ENOENT'){
            res.statusCode = 404
            res.end('404 Not Found')
        }else{
            const content = await fs.readFile(publicDir, '404.html')
             res.statusCode = 500
            res.setHeader('Content-Type', 'text/html')
            res.end(content)
        }
    }
}
