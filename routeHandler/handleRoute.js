import { getLivePrice } from "../utils/getLivePrice.js";
import { parseJSONBody } from "../utils/parseIncomingBody.js";


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
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
  const body = await  parseJSONBody(req)
  console.log(body)
}