let previousPrice = 4300

export function getLivePrice(){
    let change = (Math.random() < 0.5 ? -(Math.random()*5) : +(Math.random()*5));

    let newPrice = previousPrice + change
    previousPrice = newPrice
    return newPrice.toFixed(2)
}