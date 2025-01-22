let timeLeft = 60 * 60; // 60 minutes
let currentQuestionIndex = 0;
let questions = [
    { question: "What is 2 + 2?", options: ["2", "3", "4", "5"], answer: 2, type: "mcq" },
    { question: "Solve for x: 5x = 25", options: [], answer: "5", type: "numerical" }
];

// Start timer countdown
function startTimer() {
    const timer = document.getElementById("timer");
    setInterval(() => {
        if (timeLeft <= 0) {
            submitTest();
            return;
        }
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timer.innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;
    }, 1000);
}

// Load question
function loadQuestion(index) {
    let q = questions[index];
    document.getElementById("question-text").innerText = `Question ${index + 1}:`;
    document.getElementById("question-content").innerText = q.question;
    
    const optionsContainer = document.getElementById("options-container");
    const numericalContainer = document.getElementById("numerical-container");
    optionsContainer.innerHTML = "";

    if (q.type === "mcq") {
        q.options.forEach((opt, i) => {
            let btn = document.createElement("button");
            btn.innerText = opt;
            btn.onclick = () => selectAnswer(index, i);
            optionsContainer.appendChild(btn);
        });
        numericalContainer.style.display = "none";
    } else {
        numericalContainer.style.display = "block";
    }
}

// Mark as answered
function selectAnswer(qIndex, option) {
    document.querySelectorAll(".question-palette button")[qIndex].classList.add("answered");
}

// Mark for review
function markForReview() {
    document.querySelectorAll(".question-palette button")[currentQuestionIndex].classList.add("review");
}

// Clear Response
function clearResponse() {
    document.querySelectorAll(".question-palette button")[currentQuestionIndex].classList.remove("answered", "review");
}

// Load next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

// Generate question palette
function generatePalette() {
    let palette = document.getElementById("question-palette");
    palette.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
        let btn = document.createElement("button");
        btn.innerText = i + 1;
        btn.onclick = () => {
            currentQuestionIndex = i;
            loadQuestion(i);
        };
        palette.appendChild(btn);
    }
}

// Submit test
function submitTest() {
    alert("Test submitted!");
}

// Change subject
function changeSubject(subject) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    document.querySelector(`[onclick="changeSubject('${subject}')"]`).classList.add("active");
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    startTimer();
    generatePalette();
    loadQuestion(0);
});
