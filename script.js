// Global variables
let currentPage = 'etusivu';
let moduleProgress = {
    moduuli1: { completed: false, timeSpent: 0, score: 0, startTime: null },
    moduuli2: { completed: false, timeSpent: 0, score: 0, startTime: null },
    moduuli3: { completed: false, timeSpent: 0, score: 0, startTime: null },
    moduuli4: { completed: false, timeSpent: 0, score: 0, startTime: null }
};
let currentModule = 'moduuli1';
let timers = {};

// Module 1 variables
const vocabularyItems = [
    'hunaja', 'sokeri', 'juomalasit', 'teepussit', 'kahvitermos',
    'kakkupalat', 'vedenkeitin', 'kahviautomaatti', 'makeutusaine'
];

const imageMapping = {
    vedenkeitin: 'https://drive.google.com/thumbnail?id=1B3LgMYzXRIRIQFDxCcxpz9iYlwDBsPFe&sz=s800',
    juomalasit: 'https://drive.google.com/thumbnail?id=1OPdNo7I7hMqG25CX1yY5reQCZaUxsomW&sz=s800',
    kahvitermos: 'https://drive.google.com/thumbnail?id=1gN9cb_-ro-rIORIy8WQGTmkC0Z6FViZ-&sz=s800',
    kakkupalat: 'https://drive.google.com/thumbnail?id=1hrO1XQy6rrNfdQjMQS11jXbpVRz_aEev&sz=s800',
    hunaja: 'https://drive.google.com/thumbnail?id=1ZhIpu1M1qlTG7IN6XKiHUWZtEnw1lzoc&sz=s800',
    teepussit: 'https://drive.google.com/thumbnail?id=1V6XSqVqH2ukCnZd5iQb206511bt2cPXe&sz=s800',
    kahviautomaatti: 'https://drive.google.com/thumbnail?id=1WVQHdYbr4q31-ROPP4Q8sRyIxycBDHl-&sz=s800',
    sokeri: 'https://drive.google.com/thumbnail?id=1WkZerKWcHYAApCscatfDDCbV_JrZJYxt&sz=s800',
    makeutusaine: 'https://drive.google.com/thumbnail?id=1DfZQ6Vwx1yZ0GIfnePQLSe9MjFMT1IH6&sz=s800'
};

let selectedWord = null;
let matchedWords = [];
let revealedWords = [];

// Module 2 variables
const listeningQuestions = [
    {
        text: "Hei! Tämä on mukava kahvila. Tässä kahvilassa on itsepalvelu. Se tarkoittaa, että sinä voit ottaa kahvia tai teetä itse. Kuvassa on paljon kaikkea sellaista, mitä tarvitset kahvilassa. Etsi minulle kuvasta seuraavat tavarat:",
        type: "intro"
    },
    {
        text: "Ensin helppo sana. Missä on kahviautomaatti?",
        type: "question",
        area: { x: 50, y: 200, width: 120, height: 180 },
        correctFeedback: "Joo, se on kahviautomaatti. Sinä voit valita, millaista kahvia haluat. Otatko maitokahvia, espressoa vai jotain muuta? Minä tykkään tavallisesta mustasta kahvista.",
        incorrectFeedback: "Se ei ole kahviautomaatti. Kahviautomaatti on iso ja musta kone vasemmalla puolella."
    },
    {
        text: "Tiedätkö, missä on vedenkeitin?",
        type: "question",
        area: { x: 420, y: 180, width: 80, height: 100 },
        correctFeedback: "Kyllä, se on valkoinen vedenkeitin. Tämän vedenkeittimen merkki on Smeg. Vedenkeitin on tosi hyödyllinen, koska voit keittää sillä kuumaa vettä nopeasti.",
        incorrectFeedback: "Se ei ole vedenkeitin. Vedenkeitin on valkoinen ja se on pöydällä oikealla puolella."
    },
    {
        text: "Missä on kahvitermos?",
        type: "question",
        area: { x: 300, y: 220, width: 60, height: 120 },
        correctFeedback: "Juu, se on kahvitermos. Tässä kahvilassa onkin kaksi kahvitermosta. Termoksessa on kuumaa kahvia.",
        incorrectFeedback: "Ei, se ei ole kahvitermos. Kahvitermos on pöydän keskellä, metallinen ja pyöreä."
    },
    {
        text: "Missä ovat teepussit? Löydätkö ne?",
        type: "question",
        area: { x: 380, y: 160, width: 40, height: 30 },
        correctFeedback: "Kyllä, siinä ovat teepussit. Minä juon yleensä mustaherukkateetä. Mistä teestä sinä tykkäät?",
        incorrectFeedback: "Nyt meni väärin. Teepussit ovat pienessä laatikossa vedenkeittimen lähellä."
    },
    {
        text: "Missä on hunajaa?",
        type: "question",
        area: { x: 350, y: 200, width: 30, height: 40 },
        correctFeedback: "Hyvä, löysit hunajan! Tässä on kaksi pulloa hunajaa. Minä käytän hunajaa, kun juon teetä.",
        incorrectFeedback: "Se ei ole hunajaa. Hunaja on pienessä lasipurkissa pöydällä."
    },
    {
        text: "Ja vielä lopuksi. Kuvassa on viisi purkkia makeutusainetta. Missä ne ovat?",
        type: "question",
        area: { x: 360, y: 240, width: 50, height: 20 },
        correctFeedback: "Hienoa, ne ovat makeutusainetta. Käytän makeutusainetta joskus kahvissa. Yleensä juon kahvia ilman makeutusainetta tai sokeria.",
        incorrectFeedback: "Se ei ole makeutusainetta. Makeutusaineet ovat pieniä paketteja teen vieressä."
    },
    {
        text: "Hienoa! Löysit kuvasta kaikki tärkeät kahvilan tavarat. Opiskele sanat hyvin, koska tarvitset niitä varmasti myöhemmin!",
        type: "completion"
    }
];

let currentQuestion = 0;
let correctAnswers = 0;

// Module 3 variables
const exerciseAData = {
    left: [
        { id: 1, text: "Haluaisitko", match: 1 },
        { id: 2, text: "Laitatko kahviin", match: 2 },
        { id: 3, text: "Käytätkö teessä", match: 3 },
        { id: 4, text: "Otatko jotain", match: 4 },
        { id: 5, text: "Keitätkö vettä", match: 5 },
        { id: 6, text: "Onko kahvitermoksessa", match: 6 }
    ],
    right: [
        { id: 1, text: "ottaa kahvia vai teetä?", match: 1 },
        { id: 2, text: "makeutusainetta?", match: 2 },
        { id: 3, text: "hunajaa?", match: 3 },
        { id: 4, text: "kahviautomaatista?", match: 4 },
        { id: 5, text: "vedenkeittimellä?", match: 5 },
        { id: 6, text: "vielä kahvia?", match: 6 }
    ]
};

const exerciseBData = {
    left: [
        { id: 1, text: "Kahvitermos", match: 1 },
        { id: 2, text: "Vedenkeitin ei", match: 2 },
        { id: 3, text: "Kahviautomaatti", match: 3 },
        { id: 4, text: "Teepussit ovat", match: 4 },
        { id: 5, text: "Juomalasit", match: 5 },
        { id: 6, text: "Kakkupalat", match: 6 }
    ],
    right: [
        { id: 1, text: "on tyhjä.", match: 1 },
        { id: 2, text: "toimi.", match: 2 },
        { id: 3, text: "on rikki.", match: 3 },
        { id: 4, text: "laatikossa.", match: 4 },
        { id: 5, text: "ovat hyllyllä.", match: 5 },
        { id: 6, text: "maistuvat herkullisilta.", match: 6 }
    ]
};

const exerciseCData = {
    verbs: ["Otatko", "Keitätkö", "Käytätkö", "Laitatko", "Kaadatko", "Sekoitatko"],
    sentences: [
        { text: "sinä kahvia vai teetä?", correct: "Otatko" },
        { text: "vähän teevettä vedenkeittimellä?", correct: "Keitätkö" },
        { text: "sinä kahvissa makeutusainetta?", correct: "Käytätkö" },
        { text: "likaiset astiat tuolle pöydälle?", correct: "Laitatko" },
        { text: "minulle vähän lisää kahvia tähän kuppiin?", correct: "Kaadatko" },
        { text: "sinä teehen hunajaa?", correct: "Sekoitatko" }
    ]
};

let currentExercise = 'A';
let selectedLeft = null;
let selectedVerb = '';
let matches = {};
let verbAnswers = {};
let exerciseScores = { A: 0, B: 0, C: 0 };
let completedExercises = new Set();

// Module 4 variables
const trueFalseQuestions = [
    {
        statement: "Kahvilan seinä on vihreä.",
        correct: false,
        correctFeedback: "Oikein! Kahvilan seinä ei ole vihreä, vaan keltainen.",
        incorrectFeedback: "Väärin. Kahvilan seinä ei ole vihreä, vaan keltainen."
    },
    {
        statement: "Pöydällä on keltaista mehua.",
        correct: true,
        correctFeedback: "Oikein! Pöydällä on keltaista mehua. Se on ehkä appelsiinimehua.",
        incorrectFeedback: "Väärin. Pöydällä on keltaista mehua. Se on ehkä appelsiinimehua."
    },
    {
        statement: "Asiakas voi ottaa kahvia kahviautomaatista.",
        correct: false,
        correctFeedback: "Oikein! Kahvi on pöydällä kahvitermoksessa, ei automaatissa.",
        incorrectFeedback: "Väärin. Kahvi on pöydällä kahvitermoksessa, ei automaatissa."
    },
    {
        statement: "Asiakas voi saada kakkua ja keksejä.",
        correct: true,
        correctFeedback: "Oikein! Pöydällä on vaaleita keksejä ja tummaa kakkua. Se on ehkä suklaakakkua.",
        incorrectFeedback: "Väärin. Pöydällä on vaaleita keksejä ja tummaa kakkua. Se on ehkä suklaakakkua."
    },
    {
        statement: "Kaikki lasit ovat pöydällä.",
        correct: false,
        correctFeedback: "Oikein! Lasit ovat hyllyllä, pöydän yläpuolella.",
        incorrectFeedback: "Väärin. Lasit ovat hyllyllä, pöydän yläpuolella."
    },
    {
        statement: "Kahvitermoksen takana on koriste-esine.",
        correct: true,
        correctFeedback: "Oikein! Kahvitermoksen takana on kaunis patsas.",
        incorrectFeedback: "Väärin. Kahvitermoksen takana on kaunis patsas."
    }
];

let currentTestQuestion = 0;
let testCorrectAnswers = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    updateProgressDisplay();
    updateModuleStatus();
    initializeModule1();
    initializeModule2();
    initializeModule3();
    initializeModule4();
});

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (pageId === 'etusivu') {
        document.querySelector('[onclick="showPage(\'etusivu\')"]').classList.add('active');
    } else if (pageId === 'oppimispolku' || pageId.includes('moduuli')) {
        document.querySelector('[onclick="showPage(\'oppimispolku\')"]').classList.add('active');
    } else if (pageId === 'palautetta') {
        document.querySelector('[onclick="showPage(\'palautetta\')"]').classList.add('active');
    }
}

// Module management
function startModule(moduleId) {
    if (!canAccessModule(moduleId)) {
        alert('Sinun täytyy suorittaa edelliset moduulit ensin!');
        return;
    }
    
    moduleProgress[moduleId].startTime = Date.now();
    currentModule = moduleId;
    startTimer(moduleId);
    showPage(moduleId);
    saveProgress();
}

function canAccessModule(moduleId) {
    const moduleOrder = ['moduuli1', 'moduuli2', 'moduuli3', 'moduuli4'];
    const moduleIndex = moduleOrder.indexOf(moduleId);
    
    if (moduleIndex === 0) return true;
    
    for (let i = 0; i < moduleIndex; i++) {
        if (!moduleProgress[moduleOrder[i]].completed) {
            return false;
        }
    }
    return true;
}

function completeModule(moduleId, score) {
    const module = moduleProgress[moduleId];
    if (module.startTime) {
        module.timeSpent = Date.now() - module.startTime;
        module.startTime = null;
    }
    module.completed = true;
    module.score = score;
    
    stopTimer(moduleId);
    updateProgressDisplay();
    updateModuleStatus();
    saveProgress();
    
    // Unlock next module
    const moduleOrder = ['moduuli1', 'moduuli2', 'moduuli3', 'moduuli4'];
    const currentIndex = moduleOrder.indexOf(moduleId);
    if (currentIndex < moduleOrder.length - 1) {
        currentModule = moduleOrder[currentIndex + 1];
    }
}

// Timer functions
function startTimer(moduleId) {
    if (timers[moduleId]) {
        clearInterval(timers[moduleId]);
    }
    
    timers[moduleId] = setInterval(() => {
        if (moduleProgress[moduleId].startTime) {
            const elapsed = Date.now() - moduleProgress[moduleId].startTime;
            const timerElement = document.getElementById(`timer-${moduleId}`);
            if (timerElement) {
                timerElement.textContent = `Aika: ${formatTime(elapsed)}`;
            }
        }
    }, 1000);
}

function stopTimer(moduleId) {
    if (timers[moduleId]) {
        clearInterval(timers[moduleId]);
        delete timers[moduleId];
    }
}

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Progress management
function updateProgressDisplay() {
    const completedModules = Object.values(moduleProgress).filter(m => m.completed);
    const overallScore = completedModules.length > 0 
        ? Math.round(completedModules.reduce((sum, m) => sum + m.score, 0) / completedModules.length)
        : 0;
    const totalTime = Object.values(moduleProgress).reduce((sum, m) => sum + m.timeSpent, 0);
    
    document.getElementById('overall-score').textContent = `Score: ${overallScore}%`;
    document.getElementById('total-time').textContent = `Time: ${formatTime(totalTime)}`;
    
    // Update feedback page
    document.getElementById('final-score').textContent = `${overallScore}%`;
    document.getElementById('final-time').textContent = formatTime(totalTime);
    
    updateModuleResults();
}

function updateModuleStatus() {
    const moduleNames = {
        moduuli1: 'Perussanasto',
        moduuli2: 'Kuullun ymmärtäminen',
        moduuli3: 'Sana- ja lauseharjoitukset',
        moduuli4: 'Kuullun ymmärtämisen testi'
    };
    
    Object.keys(moduleProgress).forEach(moduleId => {
        const module = moduleProgress[moduleId];
        const statusElement = document.getElementById(`status-${moduleId}`);
        const buttonElement = document.getElementById(`btn-${moduleId}`);
        
        if (module.completed) {
            statusElement.innerHTML = `✓ Valmis <small>${Math.round(module.score)}% | ${formatTime(module.timeSpent)}</small>`;
            statusElement.className = 'status-indicator completed';
            buttonElement.textContent = 'Tee uudelleen →';
            buttonElement.disabled = false;
        } else if (canAccessModule(moduleId)) {
            if (moduleId === currentModule) {
                statusElement.textContent = '→ Nykyinen';
                statusElement.className = 'status-indicator current';
            } else {
                statusElement.textContent = '→ Saatavilla';
                statusElement.className = 'status-indicator available';
            }
            buttonElement.disabled = false;
        } else {
            statusElement.textContent = '🔒 Lukittu';
            statusElement.className = 'status-indicator locked';
            buttonElement.disabled = true;
        }
    });
}

function updateModuleResults() {
    const moduleResults = document.getElementById('module-results');
    if (!moduleResults) return;
    
    const moduleNames = {
        moduuli1: 'Perussanasto',
        moduuli2: 'Kuullun ymmärtäminen',
        moduuli3: 'Sana- ja lauseharjoitukset',
        moduuli4: 'Kuullun ymmärtämisen testi'
    };
    
    moduleResults.innerHTML = '';
    Object.entries(moduleProgress).forEach(([moduleId, progress]) => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'module-result';
        resultDiv.innerHTML = `
            <span class="module-name">${moduleNames[moduleId]}</span>
            <div class="module-score ${progress.completed ? 'completed' : 'incomplete'}">
                <div class="score">${progress.completed ? Math.round(progress.score) + '%' : 'Not completed'}</div>
                <div class="time">${progress.completed ? formatTime(progress.timeSpent) : '-'}</div>
            </div>
        `;
        moduleResults.appendChild(resultDiv);
    });
}

// Speech synthesis
function speakFinnish(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fi-FI';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Utility functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Local storage
function saveProgress() {
    localStorage.setItem('finnishLearningProgress', JSON.stringify({
        moduleProgress,
        currentModule
    }));
}

function loadProgress() {
    const saved = localStorage.getItem('finnishLearningProgress');
    if (saved) {
        const data = JSON.parse(saved);
        moduleProgress = { ...moduleProgress, ...data.moduleProgress };
        currentModule = data.currentModule || 'moduuli1';
    }
}

// MODULE 1 FUNCTIONS
function initializeModule1() {
    generateWordBubbles();
    generateImageGrid();
    updateProgress();
}

function generateWordBubbles() {
    const container = document.getElementById('word-bubbles');
    if (!container) return;
    
    container.innerHTML = '';
    
    // First 6 words
    const firstRow = document.createElement('div');
    firstRow.className = 'word-row';
    vocabularyItems.slice(0, 6).forEach(word => {
        const bubble = createWordBubble(word);
        firstRow.appendChild(bubble);
    });
    container.appendChild(firstRow);
    
    // Last 3 words
    const secondRow = document.createElement('div');
    secondRow.className = 'word-row';
    vocabularyItems.slice(6).forEach(word => {
        const bubble = createWordBubble(word);
        secondRow.appendChild(bubble);
    });
    container.appendChild(secondRow);
}

function createWordBubble(word) {
    const bubble = document.createElement('div');
    bubble.className = 'word-bubble';
    bubble.onclick = () => handleWordClick(word);
    
    if (!revealedWords.includes(word)) {
        bubble.innerHTML = `
            <button class="play-icon">▶</button>
            <span class="sound-icon">🔊</span>
            <span class="question-mark">?</span>
        `;
    } else {
        bubble.innerHTML = `<span class="word-text">${word}</span>`;
        if (selectedWord === word) {
            bubble.classList.add('selected');
        }
    }
    
    return bubble;
}

function generateImageGrid() {
    const container = document.getElementById('image-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    // First 5 images
    const firstRow = document.createElement('div');
    firstRow.className = 'image-row';
    ['vedenkeitin', 'juomalasit', 'kahvitermos', 'kakkupalat', 'hunaja'].forEach(word => {
        const imageDiv = createImageDiv(word);
        firstRow.appendChild(imageDiv);
    });
    container.appendChild(firstRow);
    
    // Last 4 images
    const secondRow = document.createElement('div');
    secondRow.className = 'image-row';
    ['teepussit', 'kahviautomaatti', 'sokeri', 'makeutusaine'].forEach(word => {
        const imageDiv = createImageDiv(word);
        secondRow.appendChild(imageDiv);
    });
    container.appendChild(secondRow);
}

function createImageDiv(word) {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'image-item';
    imageDiv.onclick = () => handleImageClick(word);
    
    const img = document.createElement('img');
    img.src = imageMapping[word] || '/placeholder.svg';
    img.alt = word;
    
    imageDiv.appendChild(img);
    
    if (matchedWords.includes(word)) {
        imageDiv.classList.add('matched');
        const label = document.createElement('div');
        label.className = 'image-label';
        label.textContent = word;
        imageDiv.appendChild(label);
    }
    
    return imageDiv;
}

function handleWordClick(word) {
    speakFinnish(word);
    selectedWord = word;
    if (!revealedWords.includes(word)) {
        revealedWords.push(word);
    }
    generateWordBubbles();
}

function handleImageClick(word) {
    if (selectedWord) {
        if (selectedWord === word) {
            if (!matchedWords.includes(word)) {
                matchedWords.push(word);
                selectedWord = null;
                generateWordBubbles();
                generateImageGrid();
                updateProgress();
                
                if (matchedWords.length === vocabularyItems.length) {
                    setTimeout(() => {
                        completeModule('moduuli1', 100);
                        alert('Moduuli 1 valmis! Pisteesi: 100%');
                        showPage('oppimispolku');
                    }, 1000);
                }
            }
        } else {
            alert('Väärin. Yritä uudelleen.');
        }
    } else {
        alert('Valitse ensin sana klikkaamalla puhekuplaa.');
    }
}

function updateProgress() {
    const matchedCount = document.getElementById('matched-count');
    const progressFill = document.getElementById('progress-fill');
    
    if (matchedCount) {
        matchedCount.textContent = matchedWords.length;
    }
    
    if (progressFill) {
        const percentage = (matchedWords.length / vocabularyItems.length) * 100;
        progressFill.style.width = percentage + '%';
    }
}

// MODULE 2 FUNCTIONS
function initializeModule2() {
    currentQuestion = 0;
    correctAnswers = 0;
    loadQuestion();
    
    document.getElementById('play-question').onclick = playCurrentQuestion;
    document.getElementById('next-question').onclick = nextQuestion;
    document.getElementById('listening-image').onclick = handleImageClick2;
}

function loadQuestion() {
    const question = listeningQuestions[currentQuestion];
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('question-progress').textContent = `${currentQuestion + 1}/${listeningQuestions.length}`;
    
    const progress = ((currentQuestion + 1) / listeningQuestions.length) * 100;
    document.getElementById('listening-progress').style.width = progress + '%';
    
    document.getElementById('feedback-box').style.display = 'none';
    
    if (question.type === 'intro') {
        document.getElementById('next-question').textContent = 'seuraava >';
        document.getElementById('feedback-box').style.display = 'block';
        document.getElementById('feedback-box').querySelector('p').textContent = '';
    }
}

function playCurrentQuestion() {
    speakFinnish(listeningQuestions[currentQuestion].text);
}

function handleImageClick2(event) {
    const question = listeningQuestions[currentQuestion];
    if (question.type !== 'question' || !question.area) return;
    
    const rect = event.target.getBoundingClientRect();
    const scaleX = rect.width / 600;
    const scaleY = rect.height / 400;
    
    const clickX = (event.clientX - rect.left) / scaleX;
    const clickY = (event.clientY - rect.top) / scaleY;
    
    const { x, y, width, height } = question.area;
    
    if (clickX >= x && clickX <= x + width && clickY >= y && clickY <= y + height) {
        // Correct answer
        correctAnswers++;
        showFeedback(question.correctFeedback, true);
        speakFinnish(question.correctFeedback);
    } else {
        // Incorrect answer
        showFeedback(question.incorrectFeedback, false);
        speakFinnish(question.incorrectFeedback);
    }
}

function showFeedback(message, isCorrect) {
    const feedbackBox = document.getElementById('feedback-box');
    const feedbackText = document.getElementById('feedback-text');
    
    feedbackText.textContent = message;
    feedbackBox.style.display = 'block';
    feedbackBox.className = isCorrect ? 'feedback-box correct' : 'feedback-box incorrect';
    
    document.getElementById('next-question').textContent = 
        currentQuestion < listeningQuestions.length - 1 ? 'Seuraava kysymys' : 'Lopeta moduuli';
}

function nextQuestion() {
    if (currentQuestion < listeningQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        const finalScore = Math.round((correctAnswers / 6) * 100);
        completeModule('moduuli2', finalScore);
        alert(`Moduuli 2 valmis! Pisteesi: ${finalScore}%`);
        showPage('oppimispolku');
    }
}

// MODULE 3 FUNCTIONS
function initializeModule3() {
    currentExercise = 'A';
    selectedLeft = null;
    selectedVerb = '';
    matches = {};
    verbAnswers = {};
    completedExercises = new Set();
    
    setupExerciseA();
    setupExerciseB();
    setupExerciseC();
    updateExerciseProgress();
}

function switchExercise(exercise) {
    currentExercise = exercise;
    
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="switchExercise('${exercise}')"]`).classList.add('active');
    
    document.querySelectorAll('.exercise').forEach(ex => ex.classList.remove('active'));
    document.getElementById(`exercise-${exercise}`).classList.add('active');
}

function setupExerciseA() {
    const leftContainer = document.getElementById('left-sentences-A');
    const rightContainer = document.getElementById('right-sentences-A');
    
    if (!leftContainer || !rightContainer) return;
    
    leftContainer.innerHTML = '';
    rightContainer.innerHTML = '';
    
    // Left sentences (in order)
    exerciseAData.left.forEach(item => {
        const div = document.createElement('div');
        div.className = 'sentence-item';
        div.textContent = item.text;
        div.onclick = () => selectLeft(item.id);
        leftContainer.appendChild(div);
    });
    
    // Right sentences (shuffled)
    const shuffledRight = shuffleArray(exerciseAData.right);
    shuffledRight.forEach(item => {
        const div = document.createElement('div');
        div.className = 'sentence-item';
        div.textContent = item.text;
        div.onclick = () => selectRight(item.id, item.match);
        rightContainer.appendChild(div);
    });
}

function setupExerciseB() {
    const leftContainer = document.getElementById('left-sentences-B');
    const rightContainer = document.getElementById('right-sentences-B');
    
    if (!leftContainer || !rightContainer) return;
    
    leftContainer.innerHTML = '';
    rightContainer.innerHTML = '';
    
    // Left sentences (in order)
    exerciseBData.left.forEach(item => {
        const div = document.createElement('div');
        div.className = 'sentence-item';
        div.textContent = item.text;
        div.onclick = () => selectLeft(item.id);
        leftContainer.appendChild(div);
    });
    
    // Right sentences (shuffled)
    const shuffledRight = shuffleArray(exerciseBData.right);
    shuffledRight.forEach(item => {
        const div = document.createElement('div');
        div.className = 'sentence-item';
        div.textContent = item.text;
        div.onclick = () => selectRight(item.id, item.match);
        rightContainer.appendChild(div);
    });
}

function setupExerciseC() {
    const verbContainer = document.getElementById('verb-buttons');
    const sentenceContainer = document.getElementById('sentence-completion');
    
    if (!verbContainer || !sentenceContainer) return;
    
    verbContainer.innerHTML = '';
    sentenceContainer.innerHTML = '';
    
    // Verb buttons
    exerciseCData.verbs.forEach(verb => {
        const button = document.createElement('button');
        button.className = 'verb-button';
        button.textContent = verb;
        button.onclick = () => selectVerb(verb);
        verbContainer.appendChild(button);
    });
    
    // Sentences
    exerciseCData.sentences.forEach((sentence, index) => {
        const div = document.createElement('div');
        div.className = 'sentence-item';
        div.innerHTML = `
            <span class="verb-slot" onclick="fillVerb(${index})">[___________]</span>
            <span class="sentence-text">${sentence.text}</span>
        `;
        sentenceContainer.appendChild(div);
    });
}

function selectLeft(id) {
    selectedLeft = id;
    updateSentenceStyles();
}

function selectRight(id, matchId) {
    if (selectedLeft !== null) {
        matches[selectedLeft] = matchId;
        selectedLeft = null;
        updateSentenceStyles();
    }
}

function selectVerb(verb) {
    selectedVerb = verb;
    document.querySelectorAll('.verb-button').forEach(btn => {
        btn.classList.toggle('selected', btn.textContent === verb);
    });
}

function fillVerb(index) {
    if (selectedVerb) {
        verbAnswers[index] = selectedVerb;
        selectedVerb = '';
        document.querySelectorAll('.verb-button').forEach(btn => btn.classList.remove('selected'));
        updateVerbDisplay();
    }
}

function updateSentenceStyles() {
    // Update left sentences
    document.querySelectorAll('#left-sentences-A .sentence-item, #left-sentences-B .sentence-item').forEach((item, index) => {
        const id = index + 1;
        item.classList.toggle('selected', selectedLeft === id);
        item.classList.toggle('matched', matches[id] !== undefined);
    });
    
    // Update right sentences
    document.querySelectorAll('#right-sentences-A .sentence-item, #right-sentences-B .sentence-item').forEach(item => {
        const matchId = parseInt(item.getAttribute('data-match') || '0');
        item.classList.toggle('matched', Object.values(matches).includes(matchId));
    });
}

function updateVerbDisplay() {
    document.querySelectorAll('.verb-slot').forEach((slot, index) => {
        if (verbAnswers[index]) {
            slot.textContent = verbAnswers[index];
            slot.classList.add('filled');
            
            const correct = verbAnswers[index] === exerciseCData.sentences[index].correct;
            slot.classList.toggle('correct', correct);
            slot.classList.toggle('incorrect', !correct);
        }
    });
}

function checkAnswers(exercise) {
    const data = exercise === 'A' ? exerciseAData : exerciseBData;
    let correct = 0;
    
    data.left.forEach(item => {
        if (matches[item.id] === item.match) {
            correct++;
        }
    });
    
    const score = Math.round((correct / data.left.length) * 100);
    exerciseScores[exercise] = score;
    completedExercises.add(exercise);
    
    updateExerciseProgress();
    alert(`Harjoitus ${exercise}: ${correct}/${data.left.length} oikein (${score}%)`);
    
    // Update tab to show completion
    const tabButton = document.querySelector(`[onclick="switchExercise('${exercise}')"]`);
    if (!tabButton.textContent.includes('✓')) {
        tabButton.innerHTML += ' <span class="completed-mark">✓</span>';
    }
}

function checkVerbAnswers() {
    let correct = 0;
    
    exerciseCData.sentences.forEach((sentence, index) => {
        if (verbAnswers[index] === sentence.correct) {
            correct++;
        }
    });
    
    const score = Math.round((correct / exerciseCData.sentences.length) * 100);
    exerciseScores.C = score;
    completedExercises.add('C');
    
    updateVerbDisplay();
    updateExerciseProgress();
    alert(`Harjoitus C: ${correct}/${exerciseCData.sentences.length} oikein (${score}%)`);
    
    // Update tab to show completion
    const tabButton = document.querySelector(`[onclick="switchExercise('C')"]`);
    if (!tabButton.textContent.includes('✓')) {
        tabButton.innerHTML += ' <span class="completed-mark">✓</span>';
    }
    
    // Check if all exercises completed
    if (completedExercises.size === 3) {
        const overallScore = Math.round((exerciseScores.A + exerciseScores.B + exerciseScores.C) / 3);
        setTimeout(() => {
            completeModule('moduuli3', overallScore);
            alert(`Moduuli 3 valmis! Kokonaispistemäärä: ${overallScore}%`);
            showPage('oppimispolku');
        }, 1000);
    }
}

function updateExerciseProgress() {
    document.getElementById('completed-exercises').textContent = completedExercises.size;
    const progress = (completedExercises.size / 3) * 100;
    document.getElementById('exercise-progress').style.width = progress + '%';
}

// MODULE 4 FUNCTIONS
function initializeModule4() {
    currentTestQuestion = 0;
    testCorrectAnswers = 0;
    loadTestQuestion();
    
    document.getElementById('play-test-question').onclick = playCurrentTestQuestion;
    document.getElementById('next-test-question').onclick = nextTestQuestion;
}

function loadTestQuestion() {
    const question = trueFalseQuestions[currentTestQuestion];
    document.getElementById('test-question-text').textContent = question.statement;
    document.getElementById('test-progress-text').textContent = `${currentTestQuestion + 1}/${trueFalseQuestions.length}`;
    
    const progress = ((currentTestQuestion + 1) / trueFalseQuestions.length) * 100;
    document.getElementById('test-progress').style.width = progress + '%';
    
    document.getElementById('test-feedback-box').style.display = 'none';
    document.getElementById('answer-buttons').style.display = 'flex';
}

function playCurrentTestQuestion() {
    speakFinnish(trueFalseQuestions[currentTestQuestion].statement);
}

function answerTrueFalse(answer) {
    const question = trueFalseQuestions[currentTestQuestion];
    const isCorrect = (answer === true && question.correct) || (answer === false && !question.correct);
    
    if (isCorrect) {
        testCorrectAnswers++;
        showTestFeedback(question.correctFeedback, true);
        speakFinnish(question.correctFeedback);
    } else {
        showTestFeedback(question.incorrectFeedback, false);
        speakFinnish(question.incorrectFeedback);
    }
}

function showTestFeedback(message, isCorrect) {
    const feedbackBox = document.getElementById('test-feedback-box');
    const feedbackText = document.getElementById('test-feedback-text');
    
    feedbackText.textContent = message;
    feedbackBox.style.display = 'block';
    feedbackBox.className = isCorrect ? 'feedback-box correct' : 'feedback-box incorrect';
    
    document.getElementById('answer-buttons').style.display = 'none';
    document.getElementById('next-test-question').textContent = 
        currentTestQuestion < trueFalseQuestions.length - 1 ? 'Seuraava kysymys' : 'Lopeta testi';
}

function nextTestQuestion() {
    if (currentTestQuestion < trueFalseQuestions.length - 1) {
        currentTestQuestion++;
        loadTestQuestion();
    } else {
        const finalScore = Math.round((testCorrectAnswers / trueFalseQuestions.length) * 100);
        completeModule('moduuli4', finalScore);
        alert(`Kaikki moduulit suoritettu! Moduuli 4 pistemäärä: ${finalScore}%`);
        showPage('oppimispolku');
    }
}

// FEEDBACK PAGE FUNCTIONS
function toggleLanguage(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Update text content based on language
    // This is a simplified version - you could expand this for full translation
}

function submitFeedback(event) {
    event.preventDefault();
    alert('Kiitos palautteestasi!');
}
