document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* ── Burger menu ── */
  const burgerBtn = $('#burgerBtn');
  const mainMenu = $('#mainMenu');
  burgerBtn?.setAttribute('aria-controls', 'mainMenu');
  if (mainMenu) mainMenu.setAttribute('aria-label', 'Основная навигация');
  if (burgerBtn && mainMenu) {
    const menuLinks = $$('#mainMenu a');
    const closeMenu = ({ returnFocus = false } = {}) => {
      mainMenu.classList.remove('menu--open');
      burgerBtn.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      if (returnFocus) burgerBtn.focus();
    };
    burgerBtn.addEventListener('click', () => {
      const isOpen = mainMenu.classList.toggle('menu--open');
      burgerBtn.classList.toggle('open', isOpen);
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) menuLinks[0]?.focus();
    });
    menuLinks.forEach((link) => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('click', (event) => {
      if (!mainMenu.contains(event.target) && !burgerBtn.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mainMenu.classList.contains('menu--open')) closeMenu({ returnFocus: true });
    });
  }

  /* ── Myths data ── */
  const myths = [
    { number: 1, title: '«Если начался пожар, ребёнку лучше спрятаться под кроватью или в шкафу»' },
    { number: 2, title: '«Если дыма немного, можно остаться в комнате и посмотреть, что происходит»' },
    { number: 3, title: '«Если огонь маленький, ребёнок может попробовать потушить его сам»' },
    { number: 4, title: '«Можно вернуться в горящую комнату за телефоном, игрушкой или документами»' },
    { number: 5, title: '«Достаточно просто выучить номер 101 или 112 — остальное ребёнок сам сообразит»' },
    { number: 6, title: '«Если ребёнок уже большой, его можно спокойно оставлять одного без подготовки»' },
    { number: 7, title: '«Спички и зажигалки не опасны, если ребёнку один раз объяснили правила»' },
    { number: 8, title: '«Ребёнку можно самому пользоваться плитой, печью или электроприборами, если он аккуратный»' },
    { number: 9, title: '«План эвакуации — это просто картинка на стене, детям его знать не обязательно»' },
    { number: 10, title: '«Если рядом нет взрослых, ребёнок всё равно ничего не сможет сделать»' }
  ];

  /* ── Active nav on scroll ── */
  const menuLinks = $$('#mainMenu a[href^="#"]');
  const sections = $$('main section[id]');
  if (menuLinks.length && sections.length) {
    const setActiveLink = (id) => {
      menuLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    };
    const updateNav = () => {
      const scrollY = window.scrollY;
      const headerOffset = 100;
      let currentId = sections[0].id;
      for (const section of sections) {
        if (scrollY >= section.offsetTop - headerOffset) currentId = section.id;
      }
      if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
        currentId = sections[sections.length - 1].id;
      }
      setActiveLink(currentId);
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        setActiveLink(link.getAttribute('href').slice(1));
      });
    });
  }

  /* ── Scroll reveal ── */
  const revealTargets = $$('.myth-card, .material, .bot-card, .quiz-info, .quiz-box, .hero__content, .notice, .telegram-bot');
  if (revealTargets.length && 'IntersectionObserver' in window) {
    revealTargets.forEach((item) => item.classList.add('reveal'));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    revealTargets.forEach((item) => revealObserver.observe(item));
  }

  /* ── Quiz ── */
  const quizData = {
    highlights: [
      'Знает ли ребёнок, что нельзя прятаться — нужно сразу выходить.',
      'Умеет ли позвонить 101 или 112 и назвать свой адрес.',
      'Обсуждалась ли тема пожарной безопасности дома или в классе.',
      'Знает ли ребёнок план эвакуации и точку сбора семьи.'
    ],
    questions: [
      { question: 'Ребёнок знает, что при пожаре нельзя прятаться под кроватью или в шкафу?', mythNumber: 1, materialTitle: 'Чек-лист для родителей', materialHref: '#material-home-checklist', scenarioTitle: 'Спокойно повторить правило «не прятаться, а выходить на голос».', parentAction: 'Дома ещё раз проговорите с ребёнком, что при пожаре нельзя прятаться под кроватью или в шкафу, а нужно сразу выходить на голос взрослого.', teacherAction: 'На занятии разберите миф №1 и попросите детей вслух повторить короткий алгоритм: не прятаться, выходить по маршруту, звать взрослых.' },
      { question: 'Вы отрабатывали с ребёнком или классом маршрут выхода по плану эвакуации?', mythNumber: 9, materialTitle: 'Плакат для класса', materialHref: '#material-class-poster', scenarioTitle: 'Один раз пройти маршрут вместе и затем регулярно повторять.', parentAction: 'Дома пройдите с ребёнком путь выхода шаг за шагом и покажите, куда двигаться без возвращения за вещами.', teacherAction: 'В классе или группе используйте плакат как опору и повторите порядок действий по плану эвакуации без спешки и паники.' },
      { question: 'Ребёнок считает, что при небольшом дыме можно немного подождать внутри?', correct: 'no', mythNumber: 2, materialTitle: 'Чек-лист для родителей', materialHref: '#material-home-checklist', scenarioTitle: 'Закрепить реакцию на дым: не смотреть, что происходит, а сразу выходить.', parentAction: 'Повторите дома, что при запахе гари, дыме или жаре нельзя ждать внутри комнаты даже несколько секунд.', teacherAction: 'На занятии сопоставьте миф №2 с правильным действием и попросите детей назвать первый шаг при появлении дыма.' },
      { question: 'Ребёнок знает номера 101 и 112?', mythNumber: 5, materialTitle: 'Презентация для учителя', materialHref: '#material-lesson-presentation', scenarioTitle: 'Повторить номера спасения и короткий шаблон сообщения.', parentAction: 'Дома закрепите номера 101 и 112 и потренируйтесь спокойно называть адрес и что именно произошло.', teacherAction: 'На занятии включите короткую речевую тренировку: кто звонит, какой адрес, где пожар и почему сначала нужно выйти в безопасное место.' },
      { question: 'Ребёнку достаточно знать только номер 101 — остальное он сам сообразит?', correct: 'no', mythNumber: 5, materialTitle: 'Чек-лист для родителей', materialHref: '#material-home-checklist', scenarioTitle: 'Отрепетировать сообщение спасателям без длинных объяснений.', parentAction: 'Дома потренируйте с ребёнком короткую фразу с адресом и местом пожара, чтобы в тревоге он не растерялся.', teacherAction: 'В школе или саду проговорите с детьми, какую информацию нужно назвать взрослым и спасателям после выхода из опасной зоны.' },
      { question: 'Дома спички и зажигалки убраны в недоступное для детей место?', mythNumber: 7, materialTitle: 'Чек-лист для родителей', materialHref: '#material-home-checklist', scenarioTitle: 'Убрать источники огня из доступа и напоминать правило регулярно.', parentAction: 'Проверьте хранение спичек и зажигалок дома и уберите их туда, где ребёнок не сможет взять их без взрослого.', teacherAction: 'Для педагогов полезно коротко напоминать, что одной беседы недостаточно: безопасная среда и контроль важнее разового объяснения.' },
      { question: 'Ребёнок может самостоятельно пользоваться плитой или печью, если он аккуратный?', correct: 'no', mythNumber: 8, materialTitle: 'Чек-лист для родителей', materialHref: '#material-home-checklist', scenarioTitle: 'Связать запрет не с наказанием, а с понятным правилом безопасности.', parentAction: 'Дома ещё раз обозначьте, какими приборами ребёнок не пользуется без взрослого, и закрепите это как постоянное правило.', teacherAction: 'На занятии разберите примеры опасных приборов и объясните, что аккуратность не заменяет контроль взрослого.' },
      { question: 'Вы объяснили, что нельзя возвращаться в помещение за телефоном, игрушкой или документами?', mythNumber: 4, materialTitle: 'Презентация для учителя', materialHref: '#material-lesson-presentation', scenarioTitle: 'Повторить, что жизнь важнее вещей.', parentAction: 'Дома проговорите с ребёнком, что при пожаре нельзя возвращаться даже за очень важной или любимой вещью.', teacherAction: 'На занятии используйте пример из мифа №4 и обсудите, почему любые вещи остаются внутри до разрешения спасателей.' },
      { question: 'Ребёнок знает, что нужно позвать взрослых и сообщить о пожаре сразу после выхода?', mythNumber: 10, materialTitle: 'Плакат для класса', materialHref: '#material-class-poster', scenarioTitle: 'Связать выход из опасной зоны с немедленным сообщением взрослым.', parentAction: 'Дома отработайте последовательность: выйти, найти взрослого, сообщить о пожаре, затем звонить по 101 или 112.', teacherAction: 'В классе или группе повторите с детьми базовый алгоритм действий после выхода и попросите их назвать его по шагам.' },
      { question: 'Одного разговора о правилах безопасности достаточно — повторять не нужно?', correct: 'no', mythNumber: 9, materialTitle: 'Плакат для класса', materialHref: '#material-class-poster', scenarioTitle: 'Сделать повторение короткой привычкой, а не разовой акцией.', parentAction: 'Добавьте дома короткое повторение правил в обычный ритм: например, раз в неделю возвращайтесь к одной карточке проекта.', teacherAction: 'Для педагога лучше работает короткое регулярное напоминание по одному мифу, чем редкое большое занятие на всю тему сразу.' }
    ]
  };

  const getMythTitle = (number) => myths.find((m) => m.number === number)?.title || `Миф ${number}`;

  const quizInfoList = $('.quiz-info ul');
  if (quizInfoList) {
    quizInfoList.innerHTML = quizData.highlights.map((item) => `<li>${item}</li>`).join('');
  }

  const progressBar = $('#progressBar');
  const questionMeta = $('#questionMeta');
  const questionText = $('#questionText');
  const quizResult = $('#quizResult');
  const answersWrap = $('.quiz-box__answers');
  const answerButtons = $$('.quiz-box__answers [data-answer]');
  const restartBtn = $('#quizRestart');

  questionText?.setAttribute('tabindex', '-1');
  quizResult?.setAttribute('tabindex', '-1');

  if (progressBar && questionMeta && questionText && quizResult && answersWrap && answerButtons.length && restartBtn) {
    let currentQuestion = 0;
    let positiveAnswers = 0;
    let missedItems = [];

    const renderRecommendation = (item) => `
      <article class="quiz-result__item">
        <div class="quiz-result__eyebrow">Нужно повторить</div>
        <p class="quiz-result__title">${item.question}</p>
        <p><strong>Карточка:</strong> Миф ${item.mythNumber} — ${getMythTitle(item.mythNumber)}</p>
        <p><strong>Материал:</strong> ${item.materialTitle}</p>
        <p><strong>Сценарий:</strong> ${item.scenarioTitle}</p>
        <p><strong>Для родителя:</strong> ${item.parentAction}</p>
        <p><strong>Для педагога:</strong> ${item.teacherAction}</p>
        <div class="quiz-result__links">
          <a class="btn btn--ghost" href="#myth-${item.mythNumber}">Открыть карточку</a>
          <a class="btn btn--ghost" href="${item.materialHref}">Открыть материал</a>
        </div>
      </article>`;

    const renderQuestion = () => {
      if (currentQuestion >= quizData.questions.length) {
        const checklist = missedItems.length
          ? `<p class="quiz-result__lead">Ниже показано, что именно нужно повторить и куда перейти дальше.</p><div class="quiz-result__plan">${missedItems.map(renderRecommendation).join('')}</div>`
          : '<p class="quiz-result__lead">Все ключевые пункты по материалам сайта уже закрыты. Для закрепления можно ещё раз открыть карточки и коротко повторить план эвакуации.</p>';
        questionMeta.textContent = 'Результат';
        questionText.textContent = `Готовность: ${positiveAnswers} из ${quizData.questions.length}`;
        progressBar.style.width = '100%';
        answersWrap.hidden = true;
        quizResult.innerHTML = `<p><strong>${positiveAnswers}</strong> положительных ответов из ${quizData.questions.length}.</p>${checklist}`;
        quizResult.classList.add('show');
        quizResult.focus?.();
        restartBtn.hidden = false;
        return;
      }
      questionMeta.textContent = `Вопрос ${currentQuestion + 1} из ${quizData.questions.length}`;
      questionText.textContent = quizData.questions[currentQuestion].question;
      progressBar.style.width = `${(currentQuestion / quizData.questions.length) * 100}%`;
      answersWrap.hidden = false;
      quizResult.innerHTML = '';
      quizResult.classList.remove('show');
      restartBtn.hidden = true;
    };

    answerButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (currentQuestion >= quizData.questions.length) return;
        const correct = quizData.questions[currentQuestion].correct ?? 'yes';
        if (button.dataset.answer !== correct) missedItems.push(quizData.questions[currentQuestion]);
        else positiveAnswers += 1;
        currentQuestion += 1;
        renderQuestion();
      });
    });

    restartBtn.addEventListener('click', () => {
      currentQuestion = 0;
      positiveAnswers = 0;
      missedItems = [];
      renderQuestion();
      questionText?.focus();
    });

    renderQuestion();
  }

  /* ── Bot answers ── */
  const botAnswers = {
    fear: 'Связано с мягким обсуждением темы. Начните с коротких спокойных разговоров без запугивания, используйте карточки сайта и повторяйте понятный алгоритм: выйти, позвать взрослых, позвонить 101 или 112.',
    plan: 'План эвакуации — это не картинка на стене. Покажите ребёнку маршрут, объясните последовательность действий и повторяйте её регулярно дома, в школе или в детском саду.',
    quiz: 'Квиз лучше использовать после карточек или как быстрый вход в тему. По результату видно, какие пункты ребёнок и взрослые ещё не закрепили.'
  };
  $$('.bot-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.bot;
      const target = $(`#answer-${key}`);
      if (target && botAnswers[key]) { target.hidden = false; target.textContent = botAnswers[key]; }
    });
  });
});
