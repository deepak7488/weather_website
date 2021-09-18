// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
const Weatherform = document.querySelector('form');
const Search = document.querySelector('input');
const message_1 = document.querySelector("#Message-1")
const message_2 = document.querySelector("#Message-2")
Weatherform.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = Search.value
    message_1.textContent = 'Loading...'
    message_2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
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