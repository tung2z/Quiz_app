const answer = sessionStorage.getItem('answer')
const questionsLength = sessionStorage.getItem('questionsLength')
const scoreText = document.querySelector('.submitted p.score')

let score = answer === ''? 0: answer.split(',').length
console.log(answer.split(','));
scoreText.innerText = `Your score is ${score}/${questionsLength}` 
const quitBtn = document.querySelector('.submitted input[value="Quit"]')
const reviewBtn = document.querySelector('.submitted input[value="Again"]')

sessionStorage.clear()

quitBtn.addEventListener('click', () => {
  
  location.href = 'index.html'
})

reviewBtn.addEventListener('click', () => {
  location.href = 'quiz.html'
})