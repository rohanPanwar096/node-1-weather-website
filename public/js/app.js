const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =document.querySelector('#message-1')

messageOne.textContent = 'From JavaScript'

const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')



weatherForm.addEventListener('click',(e) => {
    e.preventDefault()
   
    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json()
        .then((data) => {
            messageOne.textContent = data.Location
            messageTwo.textContent = data.Condition
            messageThree.textContent = data.Description
            messageFour.textContent = data.Minimum
            messageFive.textContent = data.Maximum
        })
        .catch((error) => {
            messageOne.textContent = data.error
        })
    })
})