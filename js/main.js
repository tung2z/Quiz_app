const users = ['user1', 'user2', 'user3', 'user4']
const button = document.querySelector('.inputForm input[type="button"]')
const input = document.querySelector('.inputForm input[type="text"]')
const warning = document.querySelector('.inputForm .warning')

button.addEventListener('click', () => {
  if (input.value == '') {
    input.setAttribute('id', 'warningInput')
    warning.innerText = 'Please insert your name'
  }
  else {
    
    let isUser = false
    users.map( user => {
      if(input.value === user){
        isUser = true
        sessionStorage.setItem('userName', user)
        location.href = 'quiz.html'
      }
    })

    if (!isUser) {
      warning.innerText = 'Wrong user'
    }
  }

  
  
})

