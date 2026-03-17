const slides = [
  {
    title: 'Миф 1. Дети прячутся под кроватью',
    text: 'Подтверждённый пример проекта: ребёнка нужно учить выходить на голос взрослого и следовать понятному плану.'
  },
  {
    title: 'Миф 2. Карточка ждёт утверждённую формулировку',
    text: 'Слайд оставлен нейтральным, чтобы не подменять проект вымышленным содержанием.'
  },
  {
    title: 'Миф 3. Карточка ждёт утверждённую формулировку',
    text: 'После согласования текста этот слайд можно заполнить без изменения структуры сайта.'
  },
  {
    title: 'Миф 4. Карточка ждёт утверждённую формулировку',
    text: 'Слайдер уже готов для мобильного и настольного просмотра.'
  },
  {
    title: 'Миф 5. Карточка ждёт утверждённую формулировку',
    text: 'Каждый слайд можно связать с полной карточкой «Миф vs Реальность».'
  },
  {
    title: 'Миф 6. Карточка ждёт утверждённую формулировку',
    text: 'Секция сохраняет визуальную логику сайта и готова к редакционному наполнению.'
  },
  {
    title: 'Миф 7. Огонь всегда интересен детям',
    text: 'Подтверждённый пример проекта: ребёнок может не только интересоваться огнём, но и бояться его.'
  },
  {
    title: 'Миф 8. Карточка ждёт утверждённую формулировку',
    text: 'Заполняйте слайд только после утверждения точного текста проекта.'
  },
  {
    title: 'Миф 9. Карточка ждёт утверждённую формулировку',
    text: 'Готовый шаблон помогает быстро собрать финальную версию после согласования материалов.'
  },
  {
    title: 'Миф 10. Карточка ждёт утверждённую формулировку',
    text: 'Последний слайд можно использовать как переход к квизу и полезным материалам.'
  }
];

let currentSlide = 0;
const slideNum = document.getElementById('slideNum');
const slideTitle = document.getElementById('slideTitle');
const slideText = document.getElementById('slideText');
const dotsWrap = document.getElementById('dots');

function renderDots() {
  dotsWrap.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (index === currentSlide ? ' active' : '');
    dot.setAttribute('aria-label', `Перейти к мифу ${index + 1}`);
    dot.addEventListener('click', () => {
      currentSlide = index;
      renderSlide();
    });
    dotsWrap.appendChild(dot);
  });
}

function renderSlide() {
  const item = slides[currentSlide];
  slideNum.textContent = `Миф ${currentSlide + 1} из 10`;
  slideTitle.textContent = item.title;
  slideText.textContent = item.text;
  renderDots();
}

document.getElementById('prevSlide').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  renderSlide();
});

document.getElementById('nextSlide').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  renderSlide();
});

renderSlide();

const questions = [
  'Есть ли у вас понятный семейный или школьный план действий, который ребёнок уже видел?',
  'Обсуждали ли вы с ребёнком, что при пожаре нельзя прятаться?',
  'Знает ли ребёнок, что нужно реагировать на голос взрослого?',
  'Использовали ли вы хотя бы одну карточку сайта вместе с ребёнком?',
  'Есть ли привычка возвращаться к теме спокойно, без запугивания?',
  'Понимают ли взрослые, что страх ребёнка тоже возможен?',
  'Пробовали ли вы пройти квиз всем классом, группой или семьёй?',
  'Есть ли у вас скачанный материал для дома или школы?',
  'Знаете ли вы, что типовые вопросы можно закрывать через Telegram-бот?',
  'Готовы ли вы сегодня применить материалы сайта на практике?'
];

let currentQuestion = 0;
let score = 0;
const progressBar = document.getElementById('progressBar');
const questionMeta = document.getElementById('questionMeta');
const questionText = document.getElementById('questionText');
const resultBox = document.getElementById('quizResult');
const answerButtons = document.querySelectorAll('[data-answer]');

function renderQuestion() {
  const percent = (currentQuestion / questions.length) * 100;
  progressBar.style.width = `${Math.max(percent, 10)}%`;
  questionMeta.textContent = `Вопрос ${currentQuestion + 1} из 10`;
  questionText.textContent = questions[currentQuestion];
}

function showResult() {
  progressBar.style.width = '100%';
  questionMeta.textContent = 'Результат';
  questionText.textContent = 'Готовность оценена';

  let title = 'Хорошая база';
  let text = 'У вас уже есть основа. Возвращайтесь к карточкам, материалам и квизу регулярно.';

  if (score <= 4) {
    title = 'Нужен старт';
    text = 'Начните со слайдера мифов, затем откройте карточки и скачайте материалы для дома или школы.';
  } else if (score <= 7) {
    title = 'Есть база, но видны пробелы';
    text = 'Усилить результат поможет повторение плана, спокойный разговор с ребёнком и использование Telegram-бота.';
  }

  resultBox.classList.add('show');
  resultBox.innerHTML = `<h4>${title}</h4><p>Ваш результат: <strong>${score} из 10</strong>. ${text}</p>`;
  answerButtons.forEach(btn => btn.disabled = true);
}

answerButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentQuestion >= questions.length) return;
    if (btn.dataset.answer === 'yes') score += 1;
    currentQuestion += 1;
    if (currentQuestion >= questions.length) {
      showResult();
    } else {
      renderQuestion();
    }
  });
});

renderQuestion();

const downloads = {
  'checklist-home': `Чек-лист для родителей\n\n1. Спокойно откройте сайт вместе с ребёнком.\n2. Обсудите подтверждённые карточки проекта.\n3. Повторите, что нельзя прятаться и нужно реагировать на голос взрослого.\n4. Пройдите квиз.\n5. Возвращайтесь к теме регулярно без запугивания.`,
  'poster-school': `Плакат для класса\n\n- Разберите мифы.\n- Покажите карточки «Миф vs Реальность».\n- Пройдите квиз.\n- Используйте Telegram-бот для типовых вопросов.`,
  'presentation': `Структура занятия\n\nСлайд 1. Почему мифы опасны.\nСлайд 2. Слайдер мифов.\nСлайд 3. Карточки.\nСлайд 4. Квиз.\nСлайд 5. Материалы.\nСлайд 6. Telegram-бот.`
};

document.querySelectorAll('.download-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.file;
    const blob = new Blob([downloads[key]], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${key}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  });
});

const botAnswers = {
  fear: 'Связано с мифом №7. Важно не усиливать тревогу ребёнка, а использовать спокойные сценарии разговора и чек-лист «Как говорить об огне».',
  plan: 'Сценарий помогает пошагово вернуться к материалам сайта и повторить действия без перегруза.',
  quiz: 'Квиз лучше использовать после карточек или как короткий вход в тему. Он показывает, где есть пробелы в готовности.'
};

document.querySelectorAll('.bot-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.bot;
    const target = document.getElementById(`answer-${key}`);
    target.textContent = botAnswers[key];
  });
});
