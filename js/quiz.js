const questions = [
  {
    id: 1,
    question: "fsfasdfadfa",
    answer: "option1",
    options: [
      "option1", 
      "option2",
      "option3",
      "option4",
      "option5"
    ]
  },
  {
    id: 2,
    question: "fsfasdffasdfasfadfa",
    answer: "option2",
    options: [
      "option1", 
      "option2",
      "option3",
      "option4"
    ]
  },
  {
    id: 3,
    question: "fsfasdfafasfasdfa",
    answer: "option3",
    options: [
      "option1", 
      "option2",
      "option3",
      "option4"
    ]
  },
  {
    id: 4,
    question: "fsfasdfadffdbcbxca",
    answer: "option2",
    options: [
      "option1", 
      "option2",
      "option3",
      "option4"
    ]
  },
  {
    id: 5,
    question: "fsfasdfarqwerdfa",
    answer: "option4",
    options: [
      "option1", 
      "option2",
      "option3",
      "option4"
    ]
  },
  {
    id: 6,
    question: "fsfdfa",
    answer: "option4",
    options: [
      "option1", 
      "option2",
      "option3",
      "option4",
      "option5"
    ]
  }
]
sessionStorage.setItem('questionsLength', questions.length)
let questionCount = 0;
let answer = [];

window.onload = function() {
  show(0)
  previousBtn.disabled = true
  // endBtn.disabled = true
}

const welcomeText = document.querySelector('.quiz .quiz-header .user')
const userName = sessionStorage.getItem('userName')

welcomeText.innerText = `Good to see you ${userName}. Welcome to my quiz...`

const previousBtn = document.querySelector('.quiz-footer input[value="Previous"]') 
const nextBtn = document.querySelector('.quiz-footer input[value="Next"]') 
const endBtn = document.querySelector('.quiz-footer input[value="End"]') 


function show(count) {
  let content = `<h2>${questions[count].question}</h2><ul class="optionGroup">`
  for (let index = 0; index < questions[count].options.length; index++) {
    content += `<li class="option">${questions[count].options[index]}</li>`
  }
  let question = document.querySelector('.questions')

  question.innerHTML = content
  toggleActive()
}

function toggleActive() {
  let option = document.querySelectorAll("li.option")

  for (let i = 0; i < option.length; i++) {
    option[i].addEventListener('click', () => {
      for (let j = 0; j < option.length; j++) {
        option[j].classList.remove("active")
        option[j].removeAttribute('id')
      }
    option[i].classList.add("active")
    option[i].setAttribute('id', 'active')
      
    })
    
  }
}

function setSessionData(questionCount) {
  let userAnswer = document.querySelector('#active')
  if(userAnswer === null) {
    sessionStorage.setItem(`answer${questionCount}`, 0)
  }
  else {
    sessionStorage.setItem(`answer${questionCount}`, userAnswer.innerText)
  }
}

function getSessionData(questionCount) {
  let option = document.querySelectorAll("li.option")
  for (let i = 0; i < option.length; i++) {
    if(option[i].innerText == sessionStorage.getItem(`answer${questionCount}`)) {
      option[i].classList.add("active")
      option[i].setAttribute('id', 'active')
    }
  }
}

function setAnswersData() {
  for (const key in questions) {
    if (questions[key].answer === sessionStorage.getItem(`answer${key}`)) {
      answer.push(sessionStorage.getItem(`answer${key}`))  
    }
  }
  
  sessionStorage.setItem('answer', answer)
}

//click next
nextBtn.addEventListener('click', () => {
  setSessionData(questionCount)

  if (questionCount === questions.length - 2) {
    nextBtn.disabled = true
    endBtn.disabled = false

  }
  questionCount++
  show(questionCount)
  previousBtn.disabled = false

  getSessionData(questionCount)
})

//click previous
previousBtn.addEventListener('click', () => {
  if (questionCount === 1) {
    previousBtn.disabled = true
  }
  questionCount--
  show(questionCount)
  nextBtn.disabled = false

  getSessionData(questionCount)
})

//click end
endBtn.addEventListener('click', () => {
  setSessionData(questionCount)
  setAnswersData()
  let confirmEnd = confirm("Do you want to end this quiz???")
  if (confirmEnd) {
    location.href = 'submitted.html'
  }
})



let seconds = 0
let minutes = 20
const time = document.querySelector('.quiz .quiz-header .time')
let setTime = setInterval(() => {
  let formatSeconds = seconds < 10? `0${seconds}`: `${seconds}`
  let formatMinutes = minutes < 10? `0${minutes}`: `${minutes}`
  time.innerText = `${formatMinutes}:${formatSeconds}`
  if (seconds === 0) {
    seconds = 60
    minutes--
  }
  seconds--
  
  if(minutes === 0 && seconds === 0) {
    clearInterval(setTime);
    setAnswersData()
    location.href = 'submitted.html'
  }

  
}, 1000);


