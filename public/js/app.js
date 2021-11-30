fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
const Weatherform = document.querySelector('form');
const $search = document.querySelector('#search');
const $search_curr = document.querySelector('#search_curr');
const Search = document.querySelector('input');
const message_1 = document.querySelector("#Message-1")
const message_2 = document.querySelector("#Message-2")
Weatherform.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = Search.value
    message_1.textContent = 'Loading...'
    message_2.textContent = ''
        // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        //         response.json().then((data) => {
        //             if (data.error) {
        //                 message_1.textContent = data.error
        //             } else {
        //                 message_2.textContent = data.forcast
        //                 message_1.textContent = data.location
        //             }
        //         })
        //     })

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message_1.textContent = data.error
            } else {
                message_2.textContent = data.forcast
                message_1.textContent = data.location
            }
        })
    })
})
$search_curr.addEventListener('click', (e) => {

    e.preventDefault()

    //const location = Search.value
    message_1.textContent = 'Loading...'
    message_2.textContent = ''
        // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        //         response.json().then((data) => {
        //             if (data.error) {
        //                 message_1.textContent = data.error
        //             } else {
        //                 message_2.textContent = data.forcast
        //                 message_1.textContent = data.location
        //             }
        //         })
        //     })
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported in your browser!')
    }
    navigator.geolocation.getCurrentPosition((postion) => {
        // console.log(postion)
        fetch(`/weather?latitude=${postion.coords.latitude}&longitude=${postion.coords.longitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message_1.textContent = data.error
                } else {
                    message_2.textContent = data.forcast
                    message_1.textContent = data.location
                    Search.value = data.location
                }
            })
        })

    })


})