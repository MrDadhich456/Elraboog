document.addEventListener("DOMContentLoaded", function () {
    const userResponses = JSON.parse(localStorage.getItem("userResponses")) || {};
    const questions = JSON.parse(localStorage.getItem("questions")) || {};
    let totalScore = 0;
    let attempted = 0;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    
    const resultSummary = document.getElementById("result-summary");
    const detailedResults = document.getElementById("detailed-results");

    function calculateResults() {
        Object.keys(questions).forEach(subject => {
            questions[subject].forEach((q, index) => {
                const userAnswer = userResponses[subject]?.[index] || null;
                const isCorrect = userAnswer === q.answer;

                if (userAnswer) {
                    attempted++;
                    if (isCorrect) {
                        correct++;
                        totalScore += 4;  // +4 for correct
                    } else {
                        incorrect++;
                        totalScore -= 1;  // -1 for incorrect
                    }
                } else {
                    unattempted++;
                }

                detailedResults.innerHTML += `
                    <div class="result-item">
                        <p><strong>${subject.toUpperCase()} Q${index + 1}:</strong> ${q.question}</p>
                        <p>Your Answer: ${userAnswer || "Not Attempted"}</p>
                        <p>Correct Answer: ${q.answer}</p>
                        <hr>
                    </div>
                `;
            });
        });

        resultSummary.innerHTML = `
            <p>Total Questions: 90</p>
            <p>Attempted: ${attempted}</p>
            <p>Correct: ${correct}</p>
            <p>Incorrect: ${incorrect}</p>
            <p>Unattempted: ${unattempted}</p>
            <p><strong>Total Score: ${totalScore} / 300</strong></p>
        `;
    }

    calculateResults();
});

function goToHome() {
    window.location.href = "index.html";
}
