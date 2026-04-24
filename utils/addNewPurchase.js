import path from "node:path";
import fs from 'node:fs/promises'

export async function addNewPurchase (body){
    const dataPath = path.join('data', 'data.json')
    const data = JSON.parse(await fs.readFile(dataPath))
    const newData = body
    data.push(newData)

await fs.writeFile(dataPath,
    JSON.stringify(data, null, 2),
    'utf8'
)
}