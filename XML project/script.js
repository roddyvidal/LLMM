let currentQuestionIndex = 0; // Reinicia el índice de preguntas aquí
let timeLeft = 20;
let timerInterval;
let score = 0; // Variable para almacenar la puntuación

// Determina el idioma y el archivo XML a cargar
const lang = localStorage.getItem('lang') || 'es';
const xmlFile = lang === 'en' ? 'question.xml' : 'preguntas.xml';

// Carga el archivo XML y comienza el quiz
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

/**
 * Inicia el quiz mostrando la primera pregunta y arrancando el temporizador.
 * Si no hay preguntas, muestra un mensaje de error.
 */
function startQuiz(questions) {
    currentQuestionIndex = 0; // Reinicia el índice cada vez que empieza el quiz
    if (questions.length === 0) {
        document.getElementById('quiz-container').innerHTML = '<h2>No hay preguntas disponibles en este idioma.</h2>';
        return;
    }
    showQuestion(questions[currentQuestionIndex], questions);
    startTimer(questions);
}

/**
 * Muestra la pregunta actual y sus posibles respuestas en pantalla.
 * @param {Element} question - Elemento XML de la pregunta actual.
 * @param {Array} questions - Array de todas las preguntas.
 */
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

/**
 * Inicia y actualiza el temporizador para cada pregunta.
 * Si el tiempo se agota, pasa a la siguiente pregunta.
 * @param {Array} questions - Array de todas las preguntas.
 */
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

/**
 * Pasa a la siguiente pregunta o muestra la puntuación final si no quedan más preguntas.
 * @param {Array} questions - Array de todas las preguntas.
 */
function nextQuestion(questions) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex], questions);
        startTimer(questions);
    } else {
        showFinalScore(); 
    }
}

/**
 * Muestra la puntuación final al terminar el quiz.
 */
function showFinalScore() {
    document.getElementById('quiz-container').innerHTML = `
        <h1>¡Fin del Quiz!</h1>
        <p>Tu puntuación final es: ${score} / ${currentQuestionIndex * 0.5}</p>
    `;
}

// Cambia el idioma y recarga la página al pulsar el botón de cambiar idioma
document.getElementById('lang-btn').onclick = function() {
    const lang = localStorage.getItem('lang') === 'en' ? 'es' : 'en';
    localStorage.setItem('lang', lang);
    window.location.reload();
}