
/* ==========================================
   Day 3 - QuizQuest Final JavaScript
   Dark Mode, Keyboard Shortcuts and Quiz
========================================== */


/* Day 3: Quiz Questions */

const questions = [

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correctAnswer: 0
    },

    {
        question: "Which HTML tag is used for the largest heading?",
        options: [
            "<h6>",
            "<h1>",
            "<heading>",
            "<head>"
        ],
        correctAnswer: 1
    },

    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "Java",
            "CSS",
            "Python"
        ],
        correctAnswer: 2
    },

    {
        question: "Which language makes a website interactive?",
        options: [
            "CSS",
            "HTML",
            "SQL",
            "JavaScript"
        ],
        correctAnswer: 3
    },

    {
        question: "Which HTML attribute is used to give a unique identity to an element?",
        options: [
            "class",
            "id",
            "style",
            "name"
        ],
        correctAnswer: 1
    },

    {
        question: "What does document.querySelector() return?",
        options: [
            "The first matching element",
            "All matching elements",
            "Only an image",
            "A CSS file"
        ],
        correctAnswer: 0
    },

    {
        question: "Which method is used to attach an event to an HTML element?",
        options: [
            "addStyle()",
            "createEvent()",
            "addEventListener()",
            "changeEvent()"
        ],
        correctAnswer: 2
    },

    {
        question: "Which symbol is used for a class selector in CSS?",
        options: [
            "#",
            ".",
            "@",
            "&"
        ],
        correctAnswer: 1
    },

    {
        question: "Which keyword is used to declare a block-scoped variable that can be reassigned?",
        options: [
            "const",
            "fixed",
            "let",
            "static"
        ],
        correctAnswer: 2
    },

    {
        question: "What does event.preventDefault() do?",
        options: [
            "Deletes an HTML element",
            "Stops the default browser action",
            "Reloads the webpage",
            "Changes the CSS"
        ],
        correctAnswer: 1
    }

];


/* Day 3: HTML Elements */

const quizScreen = document.getElementById("quizScreen");

const resultScreen = document.getElementById("resultScreen");

const questionCount = document.getElementById("questionCount");

const progressBar = document.getElementById("progressBar");

const questionText = document.getElementById("questionText");

const answerOptions = document.getElementById("answerOptions");

const nextBtn = document.getElementById("nextBtn");

const finalScore = document.getElementById("finalScore");

const scorePercentage = document.getElementById("scorePercentage");

const encouragingMessage = document.getElementById("encouragingMessage");

const restartBtn = document.getElementById("restartBtn");

const reviewList = document.getElementById("reviewList");

const themeToggle = document.getElementById("themeToggle");


/* Day 3: Quiz Variables */

let currentQuestionIndex = 0;

let userAnswers = new Array(questions.length).fill(null);


/* ==========================================
   Day 3: Dark Mode and Light Mode
   Persistent Theme using localStorage
========================================== */


/* Day 3: Apply Theme */

function applyTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {

        themeToggle.textContent = "☀️ Light Mode";

    } else {

        themeToggle.textContent = "🌙 Dark Mode";

    }

}


/* Day 3: Load Saved Theme */

function loadSavedTheme() {

    const savedTheme = localStorage.getItem("quizquest-theme");

    if (savedTheme === "dark" || savedTheme === "light") {

        applyTheme(savedTheme);

    } else {

        applyTheme("light");

    }

}


/* Day 3: Theme Toggle Button */

themeToggle.addEventListener("click", function () {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    let newTheme;

    if (currentTheme === "dark") {

        newTheme = "light";

    } else {

        newTheme = "dark";

    }

    applyTheme(newTheme);

    // Day 3: Save Theme Preference

    localStorage.setItem("quizquest-theme", newTheme);

});


/* ==========================================
   Day 3: Load Question
========================================== */


function loadQuestion() {

    const currentQuestion = questions[currentQuestionIndex];

    // Day 3: Question Number

    questionCount.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Day 3: Progress Bar

    const progress =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    // Day 3: Display Question

    questionText.textContent = currentQuestion.question;

    // Day 3: Clear Old Options

    answerOptions.innerHTML = "";

    // Day 3: Create Answer Buttons

    currentQuestion.options.forEach(function (option, index) {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = `${index + 1}. ${option}`;

        button.type = "button";

        button.addEventListener("click", function () {

            selectAnswer(index);

        });

        answerOptions.appendChild(button);

    });

    // Day 3: Disable Next Button

    nextBtn.disabled = true;

    // Day 3: Update Button Text

    if (currentQuestionIndex === questions.length - 1) {

        nextBtn.textContent = "Show Result 🏆";

    } else {

        nextBtn.textContent = "Next Question →";

    }

}


/* ==========================================
   Day 3: Select Answer
========================================== */


function selectAnswer(selectedIndex) {

    // Day 3: Prevent Multiple Answer Selection

    if (userAnswers[currentQuestionIndex] !== null) {

        return;

    }

    // Day 3: Save User Answer

    userAnswers[currentQuestionIndex] = selectedIndex;

    const currentQuestion = questions[currentQuestionIndex];

    const buttons = answerOptions.querySelectorAll(".answer-btn");

    // Day 3: Disable All Buttons

    buttons.forEach(function (button, index) {

        button.disabled = true;

        // Day 3: Highlight Correct Answer

        if (index === currentQuestion.correctAnswer) {

            button.classList.add("correct");

        }

        // Day 3: Highlight Wrong Answer

        if (
            index === selectedIndex &&
            selectedIndex !== currentQuestion.correctAnswer
        ) {

            button.classList.add("wrong");

        }

    });

    // Day 3: Enable Next Button

    nextBtn.disabled = false;

}


/* ==========================================
   Day 3: Next Question
========================================== */


nextBtn.addEventListener("click", function () {

    if (currentQuestionIndex < questions.length - 1) {

        currentQuestionIndex++;

        loadQuestion();

    } else {

        showResults();

    }

});


/* ==========================================
   Day 3: Keyboard Shortcuts
   Keys 1-4: Select Answer
   Enter: Next Question
========================================== */


document.addEventListener("keydown", function (event) {

    // Day 3: Shortcuts Only During Quiz

    if (quizScreen.hidden) {

        return;

    }

    // Day 3: Number Keys 1-4

    if (["1", "2", "3", "4"].includes(event.key)) {

        if (userAnswers[currentQuestionIndex] !== null) {

            return;

        }

        const selectedIndex = Number(event.key) - 1;

        if (selectedIndex < questions[currentQuestionIndex].options.length) {

            selectAnswer(selectedIndex);

        }

    }

    // Day 3: Enter Key

    if (event.key === "Enter") {

        event.preventDefault();

        if (!nextBtn.disabled) {

            nextBtn.click();

        }

    }

});


/* ==========================================
   Day 3: Show Final Results
========================================== */


function showResults() {

    // Day 3: Calculate Score

    let score = 0;

    questions.forEach(function (question, index) {

        if (userAnswers[index] === question.correctAnswer) {

            score++;

        }

    });

    // Day 3: Calculate Percentage

    const percentage =
        Math.round((score / questions.length) * 100);

    // Day 3: Display Final Score

    finalScore.textContent =
        `${score} / ${questions.length}`;

    scorePercentage.textContent =
        `${percentage}%`;

    // Day 3: Encouraging Messages

    if (percentage >= 90) {

        encouragingMessage.textContent =
            "Excellent! 🌟 You are a Web Development Superstar!";

    } else if (percentage >= 70) {

        encouragingMessage.textContent =
            "Great Job! 🎉 You have a strong understanding!";

    } else if (percentage >= 40) {

        encouragingMessage.textContent =
            "Nice Try! 💪 Keep practicing and improving!";

    } else {

        encouragingMessage.textContent =
            "Good Start! ❤️ Practice makes you better!";

    }

    // Day 3: Answer Review

    showAnswerReview();

    // Day 3: Hide Quiz

    quizScreen.hidden = true;

    // Day 3: Show Result

    resultScreen.hidden = false;

}


/* ==========================================
   Day 3: Answer Review
========================================== */


function showAnswerReview() {

    // Day 3: Clear Review List

    reviewList.innerHTML = "";

    questions.forEach(function (question, index) {

        const reviewItem = document.createElement("article");

        const isAnswered = userAnswers[index] !== null;

        const isCorrect =
            userAnswers[index] === question.correctAnswer;

        // Day 3: Review Card Style

        if (!isAnswered) {

            reviewItem.className =
                "review-item review-unanswered";

        } else if (isCorrect) {

            reviewItem.className =
                "review-item review-correct";

        } else {

            reviewItem.className =
                "review-item review-wrong";

        }

        // Day 3: Question Heading

        const heading = document.createElement("h3");

        heading.textContent =
            `Q${index + 1}. ${question.question}`;

        // Day 3: Status

        const status = document.createElement("span");

        status.className = "review-status";

        if (!isAnswered) {

            status.textContent = "Not Answered";

        } else if (isCorrect) {

            status.textContent = "Correct";

        } else {

            status.textContent = "Incorrect";

        }

        // Day 3: User Answer

        const userAnswerText = document.createElement("p");

        if (isAnswered) {

            userAnswerText.textContent =
                `Your Answer: ${question.options[userAnswers[index]]}`;

        } else {

            userAnswerText.textContent =
                "Your Answer: Not Answered";

        }

        // Day 3: Correct Answer

        const correctAnswerText = document.createElement("p");

        correctAnswerText.textContent =
            `Correct Answer: ${question.options[question.correctAnswer]}`;

        // Day 3: Add Elements

        reviewItem.appendChild(status);

        reviewItem.appendChild(heading);

        reviewItem.appendChild(userAnswerText);

        reviewItem.appendChild(correctAnswerText);

        // Day 3: Add Review Card

        reviewList.appendChild(reviewItem);

    });

}


/* ==========================================
   Day 3: Restart Quiz
========================================== */


restartBtn.addEventListener("click", function () {

    // Day 3: Reset Question Index

    currentQuestionIndex = 0;

    // Day 3: Reset Answers

    userAnswers = new Array(questions.length).fill(null);

    // Day 3: Clear Review

    reviewList.innerHTML = "";

    // Day 3: Hide Result Screen

    resultScreen.hidden = true;

    // Day 3: Show Quiz Screen

    quizScreen.hidden = false;

    // Day 3: Load First Question

    loadQuestion();

});


/* ==========================================
   Day 3: Start Quiz
========================================== */


// Day 3: Load Saved Theme

loadSavedTheme();

// Day 3: Load First Question

loadQuestion();

// Day 3: Console Message

console.log("QuizQuest Day 3 JavaScript Connected!");


