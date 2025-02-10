document.addEventListener("DOMContentLoaded", function () {
    const userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};

    const correctAnswers = {
        physics: [
            { question: "What is the unit of force?", answer: "Newton" },
            { question: "Acceleration due to gravity on Earth is?", answer: "9.8 m/s²" }
        ],
        chemistry: [
            { question: "What is the chemical formula of water?", answer: "H2O" }
        ],
        math: [
            { question: "What is the value of π (pi) up to two decimal places?", answer: "3.14" }
        ]
    };

    let totalMarks = 0, totalAttempted = 0, correct = 0, incorrect = 0, unattempted = 0;

    let subjectAnalysis = {
        physics: { correct: 0, incorrect: 0, unattempted: 0, score: 0 },
        chemistry: { correct: 0, incorrect: 0, unattempted: 0, score: 0 },
        math: { correct: 0, incorrect: 0, unattempted: 0, score: 0 }
    };

    Object.keys(correctAnswers).forEach(subject => {
        correctAnswers[subject].forEach((q, index) => {
            let key = `${subject}-${index}`;
            if (userAnswers[key]) {
                totalAttempted++;
                if (userAnswers[key] === q.answer) {
                    correct++;
                    totalMarks += 4;
                    subjectAnalysis[subject].correct++;
                    subjectAnalysis[subject].score += 4;
                } else {
                    incorrect++;
                    totalMarks -= 1;
                    subjectAnalysis[subject].incorrect++;
                    subjectAnalysis[subject].score -= 1;
                }
            } else {
                unattempted++;
                subjectAnalysis[subject].unattempted++;
            }
        });
    });

    document.getElementById("total-marks").innerText = totalMarks;
    document.getElementById("total-attempted").innerText = totalAttempted;
    document.getElementById("correct-answers").innerText = correct;
    document.getElementById("incorrect-answers").innerText = incorrect;
    document.getElementById("unattempted-questions").innerText = unattempted;

    document.getElementById("physics-correct").innerText = subjectAnalysis.physics.correct;
    document.getElementById("physics-incorrect").innerText = subjectAnalysis.physics.incorrect;
    document.getElementById("physics-unattempted").innerText = subjectAnalysis.physics.unattempted;
    document.getElementById("physics-score").innerText = subjectAnalysis.physics.score;

    document.getElementById("chemistry-correct").innerText = subjectAnalysis.chemistry.correct;
    document.getElementById("chemistry-incorrect").innerText = subjectAnalysis.chemistry.incorrect;
    document.getElementById("chemistry-unattempted").innerText = subjectAnalysis.chemistry.unattempted;
    document.getElementById("chemistry-score").innerText = subjectAnalysis.chemistry.score;

    document.getElementById("math-correct").innerText = subjectAnalysis.math.correct;
    document.getElementById("math-incorrect").innerText = subjectAnalysis.math.incorrect;
    document.getElementById("math-unattempted").innerText = subjectAnalysis.math.unattempted;
    document.getElementById("math-score").innerText = subjectAnalysis.math.score;

    // ** Bar Chart (Subject Performance) **
    new Chart(document.getElementById("performanceChart"), {
        type: "bar",
        data: {
            labels: ["Physics", "Chemistry", "Mathematics"],
            datasets: [
                {
                    label: "Correct",
                    data: [subjectAnalysis.physics.correct, subjectAnalysis.chemistry.correct, subjectAnalysis.math.correct],
                    backgroundColor: "green"
                },
                {
                    label: "Incorrect",
                    data: [subjectAnalysis.physics.incorrect, subjectAnalysis.chemistry.incorrect, subjectAnalysis.math.incorrect],
                    backgroundColor: "red"
                },
                {
                    label: "Unattempted",
                    data: [subjectAnalysis.physics.unattempted, subjectAnalysis.chemistry.unattempted, subjectAnalysis.math.unattempted],
                    backgroundColor: "gray"
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Subjects'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Questions'
                    }
                }
            }
        }
    });
});