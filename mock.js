document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded");

    const questions = {
        physics: [
            { question: "What is the unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], answer: "Newton" },
            { question: "Acceleration due to gravity on Earth is?", options: ["9.8 m/s²", "10 m/s²", "5 m/s²", "20 m/s²"], answer: "9.8 m/s²" }
        ],
        chemistry: [
            { question: "What is the chemical formula of water?", options: ["H2O", "CO2", "O2", "H2"], answer: "H2O" }
        ],
        math: [
            { question: "What is the value of π (pi) up to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" }
        ]
    };

    let currentSubject = "physics";
    let currentQuestionIndex = 0;

    function loadQuestion() {
        const questionArea = document.getElementById("question-content");
        const optionsContainer = document.getElementById("options-container");
        const questionText = document.getElementById("question-text");

        if (!questions[currentSubject] || questions[currentSubject].length === 0) {
            questionArea.innerHTML = "No questions available.";
            return;
        }

        const currentQuestion = questions[currentSubject][currentQuestionIndex];
        questionText.innerHTML = `Question ${currentQuestionIndex + 1}:`;
        questionArea.innerHTML = currentQuestion.question;

        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.innerText = option;
            btn.onclick = () => selectAnswer(option);
            optionsContainer.appendChild(btn);
        });

        updateQuestionPalette();
    }

    function updateQuestionPalette() {
        const palette = document.getElementById("question-palette");
        palette.innerHTML = "";

        questions[currentSubject].forEach((_, index) => {
            const btn = document.createElement("button");
            btn.classList.add("question-btn");
            btn.innerText = index + 1;
            btn.onclick = () => goToQuestion(index);
            if (index === currentQuestionIndex) {
                btn.classList.add("active-question");
            }
            palette.appendChild(btn);
        });
    }

    function goToQuestion(index) {
        currentQuestionIndex = index;
        loadQuestion();
    }

    function changeSubject(subject) {
        console.log("Switching to:", subject);
        currentSubject = subject;
        currentQuestionIndex = 0;
        loadQuestion();
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions[currentSubject].length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert("No more questions in this subject.");
        }
    }

    function selectAnswer(answer) {
        console.log("Selected Answer:", answer);
        alert(`You selected: ${answer}`);
    }

    loadQuestion();

    window.changeSubject = changeSubject;
    window.nextQuestion = nextQuestion;
});
