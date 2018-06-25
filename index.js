
  
  let questionNum = 0;
  let goalsScored = 0;

//GLOBAL functions

// updates current question counter
  function updateQuestionCount() {
    questionNum++;
      $('.question-current').text(questionNum+1);
  }
  
// updates questions answered correctly count
  function updateGoalsScored() {
    goalsScored++;
    
  }
  
// Posts updated goals scored to DOM
  function postGoalsScored() {
    updateGoalsScored();
    $('.scored').text(goalsScored);
  }
  
  
  // START MENU ITEMS
  
  // Handles on click functions of START Button. 
  // hides Div of Start Quiz Menu
  // unhides div for quiz form
  
  function startQuiz() {
     $('.start-menu').on('click', '.start-button', function (event) {
    $('.start-menu').remove();
    postQuestion();
    $('.question-current').text(questionNum+1);
    });
    console.log('`startQuiz` ran');
  }
  
  
  
 // QUESTION MENU ITEMS
  
  // compiles HTML question form in JQUERY
  function createQuestion() {
    return `<div class="question-menu">
   
   <form id="js-question-form" class="question-form">
    <fieldset role="radiogroup" aria-labelledby="answer" name="question-field">
     <legend>
    <h1 class="question">${STORE[questionNum].question}</h1>
    </legend>
      <label class="answer-option">
      <input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required />
        <span>${STORE[questionNum].answers[0]}</span><br>
     </label>
      <label class="answer-option">
      <input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required />
        <span>${STORE[questionNum].answers[1]}</span><br>
      </label>
       <label class="answer-option">
      <input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required />
        <span>${STORE[questionNum].answers[2]}</span><br>
      </label>
      <label class="answer-option">
      <input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required />
        <span>${STORE[questionNum].answers[3]}</span><br>
      </label>
      </fieldset>
    <button type="submit" class="submit-button">SUBMIT</button>
    </form>
  </div>`;
  }
  
  // post question to DOM
  function postQuestion() {
    $('.question-feedback-target').html(createQuestion());
    console.log('`postQuestion` ran');
  }
  
  //user selects an answer, submits, returns feedback
  function selectAnswer() {
    $('.question-feedback-target').on('submit', '#js-question-form', function(event) {
      event.preventDefault();
      console.log(`yay form submitted`);
      
      let trueAnswer = `${STORE[questionNum].correctAnswer}`;
      let selectedAnswer = $('input[name=answer]:checked', '#js-question-form').val();
      
    if (selectedAnswer === trueAnswer) {
      ifCorrectAnswer(); 
    }
    else {
      ifIncorrectAnswer(); 
    }
    });
    console.log('`selectAnswer` ran');
  }
  
  
  
// FEEDBACK MENU ITEMS
  
  // if correct, invoke correctAnswerFeedback, updateGoalsScored
  function ifCorrectAnswer() {
    postGoalsScored();
    $('.question-menu').remove();
     $('.question-feedback-target').html(correctAnswerFeedback());
  }
  
  // if incorrect, invoke incorrectAnswerFeedback
  function ifIncorrectAnswer() {
    $('.question-menu').remove();
    $('.question-feedback-target').html(incorrectAnswerFeedback());
  }
  
  // generates correctAnswerFeedback
  function correctAnswerFeedback () {
    return `<div class="feedback-menu">
    <img src="http://jingletree.com/minnmixnew/images/siren.gif" alt="hockey-goal-siren">
        <h1>
          Correct!
        </h1>
        <p>The correct answer was "${STORE[questionNum].correctAnswer}"</p>
        <button type="button" class="next-button">NEXT</button>
        </div>`;
  }
  
  // generates incorrectAnswerFeedback
  function incorrectAnswerFeedback () {
    return `<div class="feedback-menu">
        <h1>
          Oops! Better luck next time.
        </h1>
        <p>The correct answer was "${STORE[questionNum].correctAnswer}" </p>
        <button type="button" class="next-button">NEXT</button>
    </div>`;
  }
  
  // will post next question on click of NEXT button 
  function postNextQuestion () {
    $('.question-feedback-target').on('click', '.next-button', function (event) {
      if (questionNum < STORE.length -1) {
      updateQuestionCount();
      createQuestion();
      postQuestion();
    } else {
      postResults();
    }
  });
    console.log('`postNextQuestion` ran');
  }
  
  
// RESULTS MENU ITEMS
  
  // posts results of quiz, score
  function postResults () {
    $('.feedback-menu').remove();
    $('.question-feedback-target').html(`<div class="results-menu">
      <img id="finished-quiz-img" src="https://static.tumblr.com/0ff1d35c32bd472d78be3a4cb5279812/fjhd4ng/pAIn5fyqw/tumblr_static_filename_640_v2.jpg" alt="hockey celly">
        <h1>
          Thanks For Playing!
        </h1>
        <p>You scored ${goalsScored} goals on 10 attempts.</p>
        <button type="button" class="restart-button">Restart Quiz?</button>
    </div>`);
  }
  
 // restart quiz through reload page function
  function restartQuiz () {
    $('.question-feedback-target').on('click', '.restart-button', function (event) {
      location.reload();
    });
  }

  
  
// EXECUTE QUIZ functions
function handleQuiz() {
  startQuiz();
  selectAnswer();
  postNextQuestion();
  restartQuiz();
}
  
$(handleQuiz);
  
  
  
  
  
  