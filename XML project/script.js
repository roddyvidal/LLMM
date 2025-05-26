let currentQuestionIndex = 0;
let timeLeft = 20;
let timerInterval;
let score = 0; // Variable para almacenar la puntuación

// Determina el idioma y el archivo XML a cargar
const lang = localStorage.getItem('lang') || 'es';
const xmlFile = lang === 'en' ? 'question.xml' : 'preguntas.xml';

// Carga el archivo XML
fetch(xmlFile)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo XML');
        }
        return response.text();
    })
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const questions = Array.from(xml.getElementsByTagName('question'));
        startQuiz(questions);
    })
    .catch(error => console.error('Error al cargar el XML:', error));

function startQuiz(questions) {
    if (questions.length === 0) {
        console.error('No hay preguntas en el archivo XML');
        return;
    }
    showQuestion(questions[currentQuestionIndex], questions);
    startTimer(questions);
}

function showQuestion(question, questions) {
    const wording = question.getElementsByTagName('wording')[0].textContent;
    const choices = Array.from(question.getElementsByTagName('choice'));

    document.getElementById('question').textContent = wording;

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';

    choices.forEach((choice) => {
        const button = document.createElement('button');
        button.textContent = choice.textContent;
        button.className = 'answer';
        button.onclick = () => {
            clearInterval(timerInterval);
            if (choice.getAttribute('correct') === 'yes') {
                score += 0.5; // Incrementa la puntuación si la respuesta es correcta
            }
            nextQuestion(questions);
        };
        answersContainer.appendChild(button);
    });
}

function startTimer(questions) {
    timeLeft = 20;
    document.getElementById('time').textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion(questions);
        }
    }, 1000);
}

function nextQuestion(questions) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex], questions);
        startTimer(questions);
    } else {
        showFinalScore(); 
    }
}

function showFinalScore() {
    document.getElementById('quiz-container').innerHTML = `
        <h1>¡Fin del Quiz!</h1>
        <p>Tu puntuación final es: ${score} / ${currentQuestionIndex * 0.5}</p>
    `;
}


document.getElementById('lang-btn').addEventListener('click', function() {
    const current = window.location.search.includes('lang=en');
    window.location.search = current ? '' : '?lang=en';
});