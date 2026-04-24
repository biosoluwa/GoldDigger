const priceDisplay = document.getElementById('price-display')
const form = document.querySelector('form')
const dialog = document.querySelector('dialog')
const investmentSummary = document.getElementById('investment-summary')



const eventSource = new EventSource('/price/live')

eventSource.onmessage = event => {
    const data = JSON.parse(event.data)
    const price = data.newPrice
    priceDisplay.textContent = price
}


eventSource.onerror = () => {
    console.log('connection failed')
}

form.addEventListener('submit', async function(e){
e.preventDefault()

const amount = document.getElementById('investment-amount').value
const price = priceDisplay.textContent
const weight = amount/price

investmentSummary.textContent = `You just bought ${(weight).toFixed(2)}ounces (ozt) for £${amount}. \n You will receive documentation shortly.`

const goldData = {
        date: new Date(),
        "amount paid": `£${amount}`,
        "price per Oz": `£${price}`,
        "gold sold": `${weight} Oz`
}

try{
const res = await fetch('./api', {
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify(goldData)
})
}catch(err){
    console.log(err)
}


dialog.showModal()
})

document.getElementById('dialog-button').addEventListener('click', function(){
    dialog.close()
})

