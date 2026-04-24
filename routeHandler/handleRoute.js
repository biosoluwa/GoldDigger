import { getLivePrice } from "../utils/getLivePrice.js";
import { parseJSONBody } from "../utils/parseIncomingBody.js";
import {addNewPurchase} from '../utils/addNewPurchase.js'
import { error } from "node:console";

export function handleLivePrice(res){
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    setInterval(() => {
        const price = getLivePrice()
        res.write(`data:${JSON.stringify({
               event: 'price-updated',
               newPrice : price
            })}\n\n`)
    }, 3000)

}

export async function handlePost(req, res){
try{
    const body = await parseJSONBody(req)
    await addNewPurchase(body)
    res.statusCode = 201
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(body))
}catch(err){
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({error: err}))
}
   
    
}