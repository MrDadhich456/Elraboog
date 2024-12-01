// Data Structure: List of quizzes (chapters)
const quizzes = [
    {
      chapter: "CHAPTER :1 BINOMIAL",
      questions: [
        {
          questionImage: "https://example.com/animal1.jpg", // Example image URL
          options: ["Lion", "Tiger", "Elephant", "Bear"],
          correctAnswer: 0
        },
        {
          questionImage: "https://example.com/animal2.jpg", // Example image URL
          options: ["Dog", "Cat", "Horse", "Rabbit"],
          correctAnswer: 1
        }
      ]
    },
    {
      chapter: "Chapter 2: Fruit Quiz",
      questions: [
        {
          questionImage: "https://example.com/fruit1.jpg", // Example image URL
          options: ["Apple", "Banana", "Grapes", "Orange"],
          correctAnswer: 0
        },
        {
          questionImage: "https://example.com/fruit2.jpg", // Example image URL
          options: ["Mango", "Pineapple", "Peach", "Cherry"],
          correctAnswer: 2
        }
      ]
    }
    // Add more chapters here...
  ];
  
  // HTML elements
  const chapterSelection = document.getElementById('chapter-selection');
  const chaptersList = document.getElementById('chapters-list');
  const quizSection = document.getElementById('quiz-section');
  const resultSection = document.getElementById('result-section');
  const questionContainer = document.getElementById('question-container');
  const submitButton = document.getElementById('submit');
  const scoreElement = document.getElementById('score');
  const retakeButton = document.getElementById('retake');
  
  let currentChapterIndex = -1;
  let currentQuestionIndex = 0;
  let selectedAnswers = [];
  
  // Function to load chapters (chapter selection page)
  function loadChapters() {
    quizzes.forEach((quiz, index) => {
      const chapterButton = document.createElement('button');
      chapterButton.textContent = quiz.chapter;
      chapterButton.classList.add('chapter-button');
      chapterButton.onclick = () => loadQuiz(index); // When chapter is clicked, load that quiz
      chaptersList.appendChild(chapterButton);
    });
  }
  
  // Function to load the quiz for the selected chapter
  function loadQuiz(chapterIndex) {
    currentChapterIndex = chapterIndex;
    currentQuestionIndex = 0;
    selectedAnswers = [];
  
    chapterSelection.style.display = 'none';  // Hide chapter selection
    quizSection.style.display = 'block';      // Show quiz section
  
    showQuestion(currentQuestionIndex);
  }
  
  // Function to show a question with an image
  function showQuestion(questionIndex) {
    const chapter = quizzes[currentChapterIndex];
    const question = chapter.questions[questionIndex];
  
    questionContainer.innerHTML = `
      <h3>Question ${questionIndex + 1}</h3>
      <div class="image-container">
        <img src="${question.questionImage}" alt="Question Image" />
      </div>
      ${question.options.map((option, index) => `
        <button class="answer-option" data-index="${index}">${String.fromCharCode(65 + index)}. ${option}</button>
      `).join('')}
    `;
  
    // Add event listeners to the options
    document.querySelectorAll('.answer-option').forEach(option => {
      option.addEventListener('click', () => {
        selectedAnswers[questionIndex] = parseInt(option.dataset.index);
      });
    });
  }
  
  // Function to navigate to the next question
  document.getElementById('next').addEventListener('click', () => {
    if (currentQuestionIndex < quizzes[currentChapterIndex].questions.length - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    }
  });
  
  // Function to navigate to the previous question
  document.getElementById('previous').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
  });
  
  // Function to submit the quiz and show the results
  submitButton.addEventListener('click', () => {
    const chapter = quizzes[currentChapterIndex];
    let score = 0;
  
    chapter.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
  
    scoreElement.textContent = `You scored ${score} out of ${chapter.questions.length}`;
    quizSection.style.display = 'none';    // Hide quiz section
    resultSection.style.display = 'block'; // Show result section
  });
  
  // Function to retake the quiz
  retakeButton.addEventListener('click', () => {
    selectedAnswers = [];
    resultSection.style.display = 'none';    // Hide result section
    chapterSelection.style.display = 'block'; // Show chapter selection
  });
  
  // Load chapters when the page loads
  window.onload = loadChapters;
  