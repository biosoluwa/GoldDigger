const eventSource = new EventSource('/price/live')

eventSource.onmessage( event => {
    const data = JSON.parse(event.data)
    const price = data.newPrice
}
)

eventSource.onerror = () => {
    console.log('connection failed')
}