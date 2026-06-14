let secretNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 3;
let finish = false;

const attemptsSpan = document.getElementById('attemptsCount');
const hintText = document.getElementById('hintText');
const newGameBtn = document.getElementById('newGameBtn');
const numberBtns = document.querySelectorAll('.number-btn');

function updateUI() {
    attemptsSpan.textContent = attempts;
    
    if (finish) {
        numberBtns.forEach(btn => {
            btn.classList.add('disabled');
        });
    } else {
        numberBtns.forEach(btn => {
            btn.classList.remove('disabled');
        });
    }
}

function setHint(message, isWin = false, isLose = false) {
    hintText.textContent = message;
    hintText.classList.remove('win-hint', 'lose-hint');
    if (isWin) hintText.classList.add('win-hint');
    if (isLose) hintText.classList.add('lose-hint');
}

function checkNumber(userNumber) {
    if (finish) return;
    
    const num = parseInt(userNumber);
    
    if (num > secretNumber) {
        setHint(getTranslation('hintLess'));
        attempts--;
    } else if (num < secretNumber) {
        setHint(getTranslation('hintMore'));
        attempts--;
    } else {
        setHint(getTranslation('winMessage'), true);
        finish = true;
    }
    
    updateUI();
    
    if (attempts === 0 && !finish) {
        setHint(getTranslation('loseMessage') + secretNumber, false, true);
        finish = true;
        updateUI();
    }
}

function newGame() {
    secretNumber = Math.floor(Math.random() * 10) + 1;
    attempts = 3;
    finish = false;
    setHint(getTranslation('hintStart'));
    updateUI();
}

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const num = btn.getAttribute('data-num');
        checkNumber(num);
    });
});

newGameBtn.addEventListener('click', newGame);

updateUI();

const gameTranslations = {
    ru: {
        gameTitle: "Угадай число",
        newGame: "Новая игра",
        attempts: "Попытки:",
        hintStart: "Чего ждешь? Ткни кнопку!",
        hintLess: "Мимо! Попробуй поменьше",
        hintMore: "Маловато будет...",
        winMessage: "О! Угадал! Ещё?",
        loseMessage: "Все, финиш! Загаданное число было: "
    },
    en: {
        gameTitle: "Guess the Number",
        newGame: "New Game",
        attempts: "Attempts:",
        hintStart: "What are you waiting for? Press a button!",
        hintLess: "Miss! Try a smaller number",
        hintMore: "Too small...",
        winMessage: "Wow! You guessed it! Play again?",
        loseMessage: "Game over! The number was: "
    },
    de: {
        gameTitle: "Zahlen raten",
        newGame: "Neues Spiel",
        attempts: "Versuche:",
        hintStart: "Worauf wartest du? Drück einen Knopf!",
        hintLess: "Daneben! Versuch eine kleinere Zahl",
        hintMore: "Zu klein...",
        winMessage: "Wow! Erraten! Nochmal?",
        loseMessage: "Spiel vorbei! Die Zahl war: "
    }
};

function getTranslation(key) {
    const lang = currentLang || 'ru';
    return gameTranslations[lang]?.[key] || gameTranslations.ru[key];
}

function updateGameLanguage() {
    const gameTitle = document.getElementById('gameTitle');
    if (gameTitle) gameTitle.textContent = getTranslation('gameTitle');
    
    const newGameBtnText = document.getElementById('newGameBtn');
    if (newGameBtnText) newGameBtnText.textContent = getTranslation('newGame');
    
    const attemptsLabel = document.querySelector('[data-key="attempts"]');
    if (attemptsLabel) attemptsLabel.innerHTML = getTranslation('attempts') + ' <span id="attemptsCount">' + attempts + '</span>!';
    
    if (!finish && attempts === 3) {
        hintText.textContent = getTranslation('hintStart');
    }
}

setInterval(() => {
    if (window.currentLang) {
        updateGameLanguage();
    }
}, 100);

Object.defineProperty(window, 'currentLang', {
    set: function(lang) {
        this._currentLang = lang;
        updateGameLanguage();
    },
    get: function() {
        return this._currentLang || 'ru';
    }
});