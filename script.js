const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
let shuffledQuestions, currentQuestionIndex;
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () =>{
  currentQuestionIndex++;
  setNextQuestion();
});
function startGame(){
  console.log('Started');
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  console.log(shuffledQuestions[currentQuestionIndex]);
  setNextQuestion();

}

function setNextQuestion(){
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  clearStatusClass(document.body);
  questionElement.innerHTML = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}
function resetState(){
  nextButton.classList.add('hide');
  while (answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function setStatusClass(element, correct){
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  }else{
    element.classList.add('wrong');
  }
}
function clearStatusClass(element) {
  element.classList.remove('wrong');
  element.classList.remove('correct');
}
function selectAnswer(e){
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex+1){
    nextButton.classList.remove('hide');

  }else{
    startButton.classList.remove('hide')
    startButton.innerText = "Restart";

  }
}
const questions = [
  {
    question: "What is the day today?",
    answers: [
      { text: 'Friday', correct: true },
      { text: 'Monday', correct: false }
    ]
  },
  {
    question: "Who is the president of the USA?",
    answers: [
      { text: 'Donald Trump', correct: false },
      { text: 'Joe Biden', correct: true }
    ]
  }
];
