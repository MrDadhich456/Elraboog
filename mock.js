document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded");

    // 3 Hours Timer (180 minutes = 10800 seconds)
    let totalTime = 180 * 60; // 3 hours in seconds
    const timerElement = document.getElementById("timer");

    function updateTimer() {
        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        const seconds = totalTime % 60;

        timerElement.innerHTML = `Time Left: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (totalTime > 0) {
            totalTime--;
            setTimeout(updateTimer, 1000);
        } else {
            alert("Time's up! Submitting the test automatically.");
            submitTest();
        }
    }

    updateTimer(); // Start the timer

    // Questions Database
    const questions = {
        physics: [
            { question: "What is the unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], answer: "Newton", image: "/assest/physics/AC/1.png" },
            { question: "Acceleration due to gravity on Earth is?", options: ["9.8 m/s²", "10 m/s²", "5 m/s²", "20 m/s²"], answer: "9.8 m/s²", image: "path/to/image2.jpg" }
        ],
        chemistry: [
            { question: "What is the chemical formula of water?", options: ["H2O", "CO2", "O2", "H2"], answer: "H2O", image: "path/to/image3.jpg" }
        ],
        math: [
            { question: "What is the value of π (pi) up to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14", image: "path/to/image4.jpg" }
        ]
    };

    let currentSubject = "physics";
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let markedForReview = {};
    let viewedQuestions = {};

    function loadQuestion() {
        const questionArea = document.getElementById("question-content");
        const optionsContainer = document.getElementById("options-container");
        const questionText = document.getElementById("question-text");
        const questionImageContainer = document.getElementById("question-image-container");
        const questionImage = document.getElementById("question-image");

        if (!questions[currentSubject] || questions[currentSubject].length === 0) {
            questionArea.innerHTML = "No questions available.";
            return;
        }

        const currentQuestion = questions[currentSubject][currentQuestionIndex];
        questionText.innerHTML = `Question ${currentQuestionIndex + 1}:`;
        questionArea.innerHTML = currentQuestion.question;

        if (currentQuestion.image) {
            questionImageContainer.style.display = "block";
            questionImage.src = currentQuestion.image;
        } else {
            questionImageContainer.style.display = "none";
        }

        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.innerText = option;
            btn.onclick = () => selectAnswer(option, btn);
            optionsContainer.appendChild(btn);

            // Highlight selected option if already answered
            if (userAnswers[`${currentSubject}-${currentQuestionIndex}`] === option) {
                btn.classList.add("selected");
            }
        });

        // Mark question as viewed
        viewedQuestions[`${currentSubject}-${currentQuestionIndex}`] = true;

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
            if (userAnswers[`${currentSubject}-${index}`]) {
                btn.classList.add("answered"); // Mark answered questions
            } else if (viewedQuestions[`${currentSubject}-${index}`]) {
                btn.classList.add("viewed"); // Mark viewed questions
            }
            if (markedForReview[`${currentSubject}-${index}`]) {
                btn.classList.add("marked-for-review"); // Mark questions for review
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

        // Update active tab
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`${subject}-tab`).classList.add('active');
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions[currentSubject].length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert("No more questions in this subject.");
        }
    }

    function selectAnswer(answer, btn) {
        console.log("Selected Answer:", answer);
        userAnswers[`${currentSubject}-${currentQuestionIndex}`] = answer;

        // Update selected option
        const options = document.querySelectorAll('.option-btn');
        options.forEach(option => {
            option.classList.remove('selected');
        });
        btn.classList.add('selected');

        updateQuestionPalette();
    }

    function markForReview() {
        markedForReview[`${currentSubject}-${currentQuestionIndex}`] = true;
        updateQuestionPalette();
    }

    function clearResponse() {
        delete userAnswers[`${currentSubject}-${currentQuestionIndex}`];
        updateQuestionPalette();
        loadQuestion();
    }

    function showSummary() {
        const summaryModal = document.getElementById("summary-modal");
        const summaryContent = document.getElementById("summary-content");

        let summaryHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Total Attempted</th>
                        <th>Total Not Attempted</th>
                        <th>Total Marked for Review</th>
                    </tr>
                </thead>
                <tbody>
        `;

        Object.keys(questions).forEach(subject => {
            let totalAttempted = 0;
            let totalNotAttempted = 0;
            let totalMarkedForReview = 0;

            questions[subject].forEach((_, index) => {
                if (userAnswers[`${subject}-${index}`]) {
                    totalAttempted++;
                } else {
                    totalNotAttempted++;
                }
                if (markedForReview[`${subject}-${index}`]) {
                    totalMarkedForReview++;
                }
            });

            summaryHTML += `
                <tr>
                    <td>${subject.charAt(0).toUpperCase() + subject.slice(1)}</td>
                    <td>${totalAttempted}</td>
                    <td>${totalNotAttempted}</td>
                    <td>${totalMarkedForReview}</td>
                </tr>
            `;
        });

        summaryHTML += `
                </tbody>
            </table>
        `;

        summaryContent.innerHTML = summaryHTML;
        summaryModal.style.display = "block";
    }

    function closeSummary() {
        const summaryModal = document.getElementById("summary-modal");
        summaryModal.style.display = "none";
    }

    function submitTest() {
        localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
        window.location.href = "result.html"; // Redirect to result page
    }

    window.changeSubject = changeSubject;
    window.nextQuestion = nextQuestion;
    window.submitTest = submitTest;
    window.showSummary = showSummary;
    window.closeSummary = closeSummary;
    window.markForReview = markForReview;
    window.clearResponse = clearResponse;

    loadQuestion(); // Load first question
});