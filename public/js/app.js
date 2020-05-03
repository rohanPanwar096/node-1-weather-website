const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =document.querySelector('#message-1')

messageOne.textContent = 'From JavaScript'

const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('click',(e) => {
    e.preventDefault()
   
    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json()
        .then((data) => {
            messageOne.textContent = data.location
            messageOne.textContent = data.Minimum
            messageOne.textContent = data.Maximum
         })
        .catch((error) => {
        console.log(error)
        })
    })
})