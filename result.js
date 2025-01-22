document.addEventListener("DOMContentLoaded", function () {
    const resultList = document.getElementById('result-list');
    const totalAttempted = document.getElementById('total-attempted');
    const totalCorrect = document.getElementById('total-correct');
    const totalIncorrect = document.getElementById('total-incorrect');
    
    // Sample data structure for results
    // Store this object when the quiz ends, here it's just a sample
    const quizResults = {
        attempted: [
            { question: "What is the unit of force?", userAnswer: "Newton", correctAnswer: "Newton" },
            { question: "What is the chemical formula of water?", userAnswer: "CO2", correctAnswer: "H2O" },
            { question: "What is the value of π?", userAnswer: "3.14", correctAnswer: "3.14" }
        ]
    };

    let correctCount = 0;
    let incorrectCount = 0;

    quizResults.attempted.forEach((attempt, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Question ${index + 1}: </strong> 
            ${attempt.question}<br> 
            <strong>Your Answer:</strong> ${attempt.userAnswer} 
            <br><strong>Correct Answer:</strong> ${attempt.correctAnswer}`;

        resultList.appendChild(listItem);

        // Count correct and incorrect answers
        if (attempt.userAnswer === attempt.correctAnswer) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    });

    // Update total counts
    totalAttempted.innerHTML = `Total Attempted Questions: ${quizResults.attempted.length}`;
    totalCorrect.innerHTML = `Total Correct Answers: ${correctCount}`;
    totalIncorrect.innerHTML = `Total Incorrect Answers: ${incorrectCount}`;
});
