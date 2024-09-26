const words = [
  // Example words
  { word: "Hund", article: "der", translation: "собака" },
  { word: "Katze", article: "die", translation: "кошка" },
  { word: "Haus", article: "das", translation: "дом" }
];

let currentScreen = 0;

const wordsContainer = document.getElementById('words-container');
const roundInfo = document.getElementById('round-info');
const gameOverDiv = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

function initGame() {
  currentScreen = 0;
  gameOverDiv.style.display = 'none';
  loadScreen();
}

function loadScreen() {
  if (currentScreen >= 10) {
    endGame();
    return;
  }

  roundInfo.textContent = `Экран: ${currentScreen + 1} из 10`;
  wordsContainer.innerHTML = '';

  words.forEach((wordObj, index) => {
    const container = document.createElement('div');
    container.classList.add('word-container');

    const word = document.createElement('div');
    word.classList.add('word');
    word.textContent = wordObj.word;

    const select = document.createElement('select');
    select.classList.add('dropdown');
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '';
    select.appendChild(emptyOption);

    ['der', 'die', 'das'].forEach(article => {
      const option = document.createElement('option');
      option.value = article;
      option.textContent = article;
      select.appendChild(option);
    });

    select.addEventListener('change', function() {
      if (select.value === wordObj.article) {
        select.classList.remove('incorrect');
        select.classList.add('correct');
        select.disabled = true;
        checkCompletion();
      } else {
        select.classList.remove('correct');
        select.classList.add('incorrect');
      }
    });

    const infoIcon = document.createElement('span');
    infoIcon.classList.add('info-icon');
    infoIcon.innerHTML = 'ℹ️';

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = wordObj.translation;

    infoIcon.addEventListener('mouseover', () => {
      tooltip.style.display = 'block';
    });
    infoIcon.addEventListener('mouseout', () => {
      tooltip.style.display = 'none';
    });

    container.appendChild(word);
    container.appendChild(select);
    container.appendChild(infoIcon);
    container.appendChild(tooltip);

    wordsContainer.appendChild(container);
  });
}

function checkCompletion() {
  const allSelects = wordsContainer.querySelectorAll('select');
  const allCorrect = [...allSelects].every(s => s.disabled);
  if (allCorrect) {
    setTimeout(() => {
      currentScreen++;
      loadScreen();
    }, 1000);
  }
}

function endGame() {
  wordsContainer.innerHTML = '';
  roundInfo.textContent = '';
  gameOverDiv.style.display = 'block';
}

restartButton.addEventListener('click', () => {
  initGame();
});

window.onload = initGame;
