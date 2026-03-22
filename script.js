document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));



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

  const myths = [
    {
      number: 1,
      title: '«Если начался пожар, ребёнку лучше спрятаться под кроватью или в шкафу»',
      myth: 'Взрослые иногда думают, что в укромном месте ребёнок будет в безопасности и его легче найти.',
      reality: 'МЧС прямо предупреждает: нельзя прятаться в задымлённом помещении. Ребёнка нужно учить сразу покидать опасную зону, реагировать на голос взрослого и выходить по понятному плану.',
      text: 'Нельзя прятаться в задымлённом помещении: ребёнка нужно учить сразу выходить и реагировать на голос взрослого.'
    },
    {
      number: 2,
      title: '«Если дыма немного, можно остаться в комнате и посмотреть, что происходит»',
      myth: 'Кажется, что сначала надо разобраться в ситуации и только потом выходить.',
      reality: 'МЧС рекомендует при первых признаках горения, задымления, запаха гари или повышенной температуры немедленно покинуть помещение и не задерживаться внутри.',
      text: 'При первых признаках дыма или гари нужно сразу покидать помещение и не задерживаться внутри.'
    },
    {
      number: 3,
      title: '«Если огонь маленький, ребёнок может попробовать потушить его сам»',
      myth: 'Иногда кажется, что так можно выиграть время и не беспокоить взрослых.',
      reality: 'МЧС учит детей другому: быстро убегать из помещения, звать на помощь взрослых, сообщать о пожаре и не пытаться тушить его самостоятельно.',
      text: 'Ребёнок не должен тушить пожар сам: нужно выйти, позвать взрослых и сообщить о пожаре.'
    },
    {
      number: 4,
      title: '«Можно вернуться в горящую комнату за телефоном, игрушкой или документами»',
      myth: 'Человеку хочется спасти важные вещи, особенно если кажется, что он успеет.',
      reality: 'МЧС предупреждает: нельзя заходить обратно в горящее помещение, пока спасатели не скажут, что опасность миновала. Главная задача — выйти и остаться в безопасности.',
      text: 'Нельзя возвращаться в горящее помещение за вещами: сначала безопасность, а не имущество.'
    },
    {
      number: 5,
      title: '«Достаточно просто выучить номер 101 или 112 — остальное ребёнок сам сообразит»',
      myth: 'Есть ощущение, что одного знания номера службы спасения уже достаточно.',
      reality: 'МЧС советует учить ребёнка не только звонить по номерам 101 или 112, но и называть свой адрес, объяснять, где и что горит, а сначала — выходить из опасной зоны.',
      text: 'Важно не только знать 101 и 112, но и уметь назвать адрес, описать пожар и сначала выйти в безопасное место.'
    },
    {
      number: 6,
      title: '«Если ребёнок уже большой, его можно спокойно оставлять одного без подготовки»',
      myth: 'Взрослые иногда переоценивают готовность ребёнка действовать в опасной ситуации без помощи.',
      reality: 'МЧС напоминает: малолетних детей нельзя оставлять без присмотра. Если взрослые считают, что ребёнок уже может оставаться один, его заранее нужно научить выходить из опасной зоны и вызывать спасателей.',
      text: 'Даже самостоятельного ребёнка нужно заранее учить выходу из опасной зоны и вызову спасателей.'
    },
    {
      number: 7,
      title: '«Спички и зажигалки не опасны, если ребёнку один раз объяснили правила»',
      myth: 'Иногда взрослым кажется, что после короткого разговора риск уже снят.',
      reality: 'МЧС рекомендует хранить спички и зажигалки в недоступных для детей местах и пресекать любые игры с огнём. Одного разговора недостаточно, нужны постоянный контроль и безопасная среда.',
      text: 'Одного разговора недостаточно: спички и зажигалки нужно хранить вне доступа детей и исключать игры с огнём.'
    },
    {
      number: 8,
      title: '«Ребёнку можно самому пользоваться плитой, печью или электроприборами, если он аккуратный»',
      myth: 'Аккуратность кажется достаточной заменой правилам и контролю взрослого.',
      reality: 'МЧС советует не разрешать детям самостоятельно пользоваться газовыми и электрическими приборами, не поручать им разжигать печи и следить, чтобы они не разжигали костры.',
      text: 'Детям нельзя самостоятельно пользоваться плитой, печью и опасными электроприборами.'
    },
    {
      number: 9,
      title: '«План эвакуации — это просто картинка на стене, детям его знать не обязательно»',
      myth: 'Из-за этого плана часто не изучают заранее и не связывают с реальными действиями ребёнка.',
      reality: 'МЧС подчёркивает, что план эвакуации — это не просто картинка, а схема путей выхода и порядок действий при пожаре. Значит, маршрут и последовательность шагов нужно заранее объяснять и повторять.',
      text: 'План эвакуации нужно заранее объяснять и повторять, а не просто вешать на стену.'
    },
    {
      number: 10,
      title: '«Если рядом нет взрослых, ребёнок всё равно ничего не сможет сделать»',
      myth: 'Такое убеждение мешает заранее обучать ребёнка простым и жизненно важным шагам.',
      reality: 'По материалам МЧС ребёнка можно и нужно учить базовому алгоритму: не паниковать, не прятаться, выбежать из помещения, сообщить взрослым и позвонить по телефону 101 или 112.',
      text: 'Ребёнка нужно заранее учить базовому алгоритму: не прятаться, выйти, сообщить взрослым и позвонить 101 или 112.'
    }
  ];

  const mythCards = $$('.cards-grid .myth-card');
  if (mythCards.length) {
    myths.length = 0;
    mythCards.forEach((card, index) => {
      const title = $('h3', card)?.textContent.trim() || `Миф ${index + 1}`;
      const myth = $('.panel--myth p', card)?.textContent.trim() || '';
      const reality = $('.panel--real p', card)?.textContent.trim() || '';
      const numberText = $('.tag--myth', card)?.textContent.trim() || `Миф ${index + 1}`;
      const numberMatch = numberText.match(/(\d+)/);

      myths.push({
        number: numberMatch ? Number(numberMatch[1]) : index + 1,
        title,
        myth,
        reality,
        text: reality || myth
      });
    });
  }

  const slideNum = $('#slideNum');
  const slideTitle = $('#slideTitle');
  const slideText = $('#slideText');
  const dots = $('#dots');
  const prevSlide = $('#prevSlide');
  const nextSlide = $('#nextSlide');
  const slider = $('.slider');
  slider?.setAttribute('tabindex', '0');
  slider?.setAttribute('aria-roledescription', 'карусель');
  let currentSlide = 0;

  const renderDots = () => {
    if (!dots) return;
    dots.innerHTML = '';
    myths.forEach((item, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = index === currentSlide ? 'is-active' : '';
      dot.setAttribute('aria-label', `Перейти к мифу ${item.number}`);
      dot.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
      dot.addEventListener('click', () => {
        currentSlide = index;
        renderSlide();
      });
      dots.appendChild(dot);
    });
  };

  const renderSlide = () => {
    if (!myths.length || !slideNum || !slideTitle || !slideText) return;
    const item = myths[currentSlide];
    slideNum.textContent = `${item.number} / ${myths.length}`;
    slideTitle.textContent = item.title;
    slideText.textContent = item.text;
    
    const slideImg = $('#slideImg');
    const slideImgFallback = $('#slideImgFallback');
    if (slideImg) {
      slideImg.src = `img/myth-${item.number}.svg`;
      slideImg.alt = `Иллюстрация к мифу: ${item.title}`;
      slideImg.style.display = 'block';
      if (slideImgFallback) slideImgFallback.style.display = 'none';
      
      slideImg.onerror = () => {
        slideImg.style.display = 'none';
        if (slideImgFallback) slideImgFallback.style.display = 'block';
      };
      slideImg.onload = () => {
        if (slideImgFallback) slideImgFallback.style.display = 'none';
      };
    }
    
    slider?.setAttribute('aria-label', `Слайдер мифов: показан миф ${item.number} из ${myths.length}`);
    $$('#dots button').forEach((dot, index) => {
      const isActive = index === currentSlide;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  if (myths.length) {
    renderDots();
    renderSlide();

    prevSlide?.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + myths.length) % myths.length;
      renderSlide();
    });

    nextSlide?.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % myths.length;
      renderSlide();
    });

    let touchStartX = 0;
    slider?.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    slider?.addEventListener('touchend', (event) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) < 40) return;
      currentSlide = deltaX < 0
        ? (currentSlide + 1) % myths.length
        : (currentSlide - 1 + myths.length) % myths.length;
      renderSlide();
    }, { passive: true });

    slider?.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        currentSlide = (currentSlide + 1) % myths.length;
        renderSlide();
      } else if (event.key === 'ArrowLeft') {
        currentSlide = (currentSlide - 1 + myths.length) % myths.length;
        renderSlide();
      } else if (event.key === 'Home') {
        currentSlide = 0;
        renderSlide();
      } else if (event.key === 'End') {
        currentSlide = myths.length - 1;
        renderSlide();
      }
    });
  }

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
      const headerOffset = 100; // Account for fixed header

      let currentId = sections[0].id;
      
      for (const section of sections) {
        const sectionTop = section.offsetTop - headerOffset;
        if (scrollY >= sectionTop) {
          currentId = section.id;
        }
      }
      
      // Handle reaching the bottom of the page perfectly
      if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
        currentId = sections[sections.length - 1].id;
      }
      
      setActiveLink(currentId);
    };

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // Initial call
    
    // Ensure correct active state immediately on click
    menuLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        setActiveLink(id);
      });
    });
  }

  const revealTargets = $$('.myth-card, .material, .bot-card, .quiz-info, .quiz-box, .hero__content, .slider, .notice, .telegram-bot');
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

  const quizData = {
    highlights: [
      'Есть ли спокойный разговорный сценарий со взрослым.',
      'Понимает ли ребёнок, что нельзя прятаться.',
      'Знает ли ребёнок, что нужно реагировать на голос.',
      'Используются ли материалы сайта регулярно.'
    ],
    questions: [
      {
        question: 'Ребёнок знает, что при пожаре нельзя прятаться под кроватью или в шкафу?',
        mythNumber: 1,
        materialTitle: 'Чек-лист для родителей',
        materialHref: '#material-home-checklist',
        scenarioTitle: 'Спокойно повторить правило «не прятаться, а выходить на голос».',
        parentAction: 'Дома ещё раз проговорите с ребёнком, что при пожаре нельзя прятаться под кроватью или в шкафу, а нужно сразу выходить на голос взрослого.',
        teacherAction: 'На занятии разберите миф №1 и попросите детей вслух повторить короткий алгоритм: не прятаться, выходить по маршруту, звать взрослых.'
      },
      {
        question: 'Вы отрабатывали с ребёнком или классом маршрут выхода по плану эвакуации?',
        mythNumber: 9,
        materialTitle: 'Плакат для класса',
        materialHref: '#material-class-poster',
        scenarioTitle: 'Один раз пройти маршрут вместе и затем регулярно повторять.',
        parentAction: 'Дома пройдите с ребёнком путь выхода шаг за шагом и покажите, куда двигаться без возвращения за вещами.',
        teacherAction: 'В классе или группе используйте плакат как опору и повторите порядок действий по плану эвакуации без спешки и паники.'
      },
      {
        question: 'Ребёнок понимает, что при дыме нужно сразу выходить, а не ждать внутри?',
        mythNumber: 2,
        materialTitle: 'Чек-лист для родителей',
        materialHref: '#material-home-checklist',
        scenarioTitle: 'Закрепить реакцию на дым: не смотреть, что происходит, а сразу выходить.',
        parentAction: 'Повторите дома, что при запахе гари, дыме или жаре нельзя ждать внутри комнаты даже несколько секунд.',
        teacherAction: 'На занятии сопоставьте миф №2 с правильным действием и попросите детей назвать первый шаг при появлении дыма.'
      },
      {
        question: 'Ребёнок знает номера 101 и 112?',
        mythNumber: 5,
        materialTitle: 'Презентация для учителя',
        materialHref: '#material-lesson-presentation',
        scenarioTitle: 'Повторить номера спасения и короткий шаблон сообщения.',
        parentAction: 'Дома закрепите номера 101 и 112 и потренируйтесь спокойно называть адрес и что именно произошло.',
        teacherAction: 'На занятии включите короткую речевую тренировку: кто звонит, какой адрес, где пожар и почему сначала нужно выйти в безопасное место.'
      },
      {
        question: 'Ребёнок сможет назвать свой адрес или место, где произошёл пожар?',
        mythNumber: 5,
        materialTitle: 'Чек-лист для родителей',
        materialHref: '#material-home-checklist',
        scenarioTitle: 'Отрепетировать сообщение спасателям без длинных объяснений.',
        parentAction: 'Дома потренируйте с ребёнком короткую фразу с адресом и местом пожара, чтобы в тревоге он не растерялся.',
        teacherAction: 'В школе или саду проговорите с детьми, какую информацию нужно назвать взрослым и спасателям после выхода из опасной зоны.'
      },
      {
        question: 'Дома спички и зажигалки убраны в недоступное для детей место?',
        mythNumber: 7,
        materialTitle: 'Чек-лист для родителей',
        materialHref: '#material-home-checklist',
        scenarioTitle: 'Убрать источники огня из доступа и напоминать правило регулярно.',
        parentAction: 'Проверьте хранение спичек и зажигалок дома и уберите их туда, где ребёнок не сможет взять их без взрослого.',
        teacherAction: 'Для педагогов полезно коротко напоминать, что одной беседы недостаточно: безопасная среда и контроль важнее разового объяснения.'
      },
      {
        question: 'Ребёнку запрещено самостоятельно пользоваться плитой, печью и опасными электроприборами?',
        mythNumber: 8,
        materialTitle: 'Чек-лист для родителей',
        materialHref: '#material-home-checklist',
        scenarioTitle: 'Связать запрет не с наказанием, а с понятным правилом безопасности.',
        parentAction: 'Дома ещё раз обозначьте, какими приборами ребёнок не пользуется без взрослого, и закрепите это как постоянное правило.',
        teacherAction: 'На занятии разберите примеры опасных приборов и объясните, что аккуратность не заменяет контроль взрослого.'
      },
      {
        question: 'Вы объяснили, что нельзя возвращаться в помещение за телефоном, игрушкой или документами?',
        mythNumber: 4,
        materialTitle: 'Презентация для учителя',
        materialHref: '#material-lesson-presentation',
        scenarioTitle: 'Повторить, что жизнь важнее вещей.',
        parentAction: 'Дома проговорите с ребёнком, что при пожаре нельзя возвращаться даже за очень важной или любимой вещью.',
        teacherAction: 'На занятии используйте пример из мифа №4 и обсудите, почему любые вещи остаются внутри до разрешения спасателей.'
      },
      {
        question: 'Ребёнок знает, что нужно позвать взрослых и сообщить о пожаре сразу после выхода?',
        mythNumber: 10,
        materialTitle: 'Плакат для класса',
        materialHref: '#material-class-poster',
        scenarioTitle: 'Связать выход из опасной зоны с немедленным сообщением взрослым.',
        parentAction: 'Дома отработайте последовательность: выйти, найти взрослого, сообщить о пожаре, затем звонить по 101 или 112.',
        teacherAction: 'В классе или группе повторите с детьми базовый алгоритм действий после выхода и попросите их назвать его по шагам.'
      },
      {
        question: 'Вы регулярно повторяете эти правила дома, в школе или в детском саду?',
        mythNumber: 9,
        materialTitle: 'Плакат для класса',
        materialHref: '#material-class-poster',
        scenarioTitle: 'Сделать повторение короткой привычкой, а не разовой акцией.',
        parentAction: 'Добавьте дома короткое повторение правил в обычный ритм: например, раз в неделю возвращайтесь к одной карточке проекта.',
        teacherAction: 'Для педагога лучше работает короткое регулярное напоминание по одному мифу, чем редкое большое занятие на всю тему сразу.'
      }
    ]
  };

  const getMythTitle = (number) => myths.find((item) => item.number === number)?.title || `Миф ${number}`;

  const quizInfoList = $('.quiz-info ul');
  if (quizInfoList) {
    quizInfoList.innerHTML = quizData.highlights.map((item) => `<li>${item}</li>`).join('');
  }

  const quizQuestions = quizData.questions;

  const progressBar = $('#progressBar');
  const questionMeta = $('#questionMeta');
  const questionText = $('#questionText');
  const quizResult = $('#quizResult');
  questionText?.setAttribute('tabindex', '-1');
  quizResult?.setAttribute('tabindex', '-1');
  const answersWrap = $('.quiz-box__answers');
  const answerButtons = $$('.quiz-box__answers [data-answer]');
  const restartBtn = $('#quizRestart');

  if (progressBar && questionMeta && questionText && quizResult && answersWrap && answerButtons.length) {
    const ensureRestartButton = () => {
      if (restartBtn) return restartBtn;
      const btn = document.createElement('button');
      btn.id = 'quizRestart';
      btn.type = 'button';
      btn.hidden = true;
      btn.className = 'btn btn--secondary quiz-restart';
      btn.textContent = 'Начать заново';
      quizResult.insertAdjacentElement('afterend', btn);
      return btn;
    };

    const restartControl = ensureRestartButton();
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
      </article>
    `;

    const renderQuestion = () => {
      if (currentQuestion >= quizQuestions.length) {
        const checklist = missedItems.length
          ? `<p class="quiz-result__lead">Ниже показано, что именно нужно повторить и куда перейти дальше.</p><div class="quiz-result__plan">${missedItems.map(renderRecommendation).join('')}</div>`
          : '<p class="quiz-result__lead">Все ключевые пункты по материалам сайта уже закрыты. Для закрепления можно ещё раз открыть карточки и коротко повторить план эвакуации.</p>';

        questionMeta.textContent = 'Результат';
        questionText.textContent = `Готовность: ${positiveAnswers} из ${quizQuestions.length}`;
        progressBar.style.width = '100%';
        answersWrap.hidden = true;
        quizResult.innerHTML = `<p><strong>${positiveAnswers}</strong> положительных ответов из ${quizQuestions.length}.</p>${checklist}`;
        quizResult.focus?.();
        restartControl.hidden = false;
        return;
      }

      questionMeta.textContent = `Вопрос ${currentQuestion + 1} из ${quizQuestions.length}`;
      questionText.textContent = quizQuestions[currentQuestion].question;
      progressBar.style.width = `${(currentQuestion / quizQuestions.length) * 100}%`;
      answersWrap.hidden = false;
      quizResult.innerHTML = '';
      restartControl.hidden = true;
    };

    answerButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.answer === 'yes') {
          positiveAnswers += 1;
        } else {
          missedItems.push(quizQuestions[currentQuestion]);
        }
        currentQuestion += 1;
        renderQuestion();
      });
    });

    restartControl.addEventListener('click', () => {
      currentQuestion = 0;
      positiveAnswers = 0;
      missedItems = [];
      renderQuestion();
      questionText?.focus();
    });

    renderQuestion();
  }

  const botAnswers = {
    fear: 'Связано с мягким обсуждением темы. Начните с коротких спокойных разговоров без запугивания, используйте карточки сайта и повторяйте понятный алгоритм: выйти, позвать взрослых, позвонить 101 или 112.',
    plan: 'План эвакуации — это не картинка на стене. Покажите ребёнку маршрут, объясните последовательность действий и повторяйте её регулярно дома, в школе или в детском саду.',
    quiz: 'Квиз лучше использовать после карточек или как быстрый вход в тему. По результату видно, какие пункты ребёнок и взрослые ещё не закрепили.'
  };

  $$('.bot-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.bot;
      const target = $(`#answer-${key}`);
      if (target && botAnswers[key]) target.textContent = botAnswers[key];
    });
  });

  const localKnowledge = [
    { keys: ['пряч', 'кровать', 'шкаф'], answer: 'Связано с мифом о том, что ребёнок может спрятаться. По материалам сайта нужно учить сразу выходить из опасной зоны, реагировать на голос взрослого и двигаться по понятному маршруту.' },
    { keys: ['дым', 'гар', 'запах'], answer: 'Связано с мифом о небольшом дыме. По карточкам сайта при первых признаках дыма, запаха гари или повышения температуры нельзя ждать внутри — нужно сразу покинуть помещение.' },
    { keys: ['101', '112', 'позвон'], answer: 'По материалам проекта ребёнок должен знать номера 101 и 112, но ещё важно уметь назвать адрес, объяснить, где и что горит, и сначала выйти из опасной зоны.' },
    { keys: ['спич', 'зажиг'], answer: 'Связано с мифом о разовом объяснении. Реальность проекта: спички и зажигалки нужно хранить в недоступном месте и постоянно пресекать игры с огнём.' },
    { keys: ['план', 'эвакуац', 'маршрут'], answer: 'План эвакуации в проекте — не картинка на стене, а понятный маршрут и последовательность действий. Его нужно заранее показать ребёнку и регулярно повторять.' },
    { keys: ['боит', 'страх', 'свеч'], answer: 'Связано с мягким разговором о теме огня. Подойдёт спокойное повторение правил без угроз и опора на короткие сценарии из материалов проекта.' }
  ];

  const outOfScope = 'Это не охвачено нашим материалом — проверьте раздел «Миф vs Реальность» или инструкцию МЧС.';
  const answerFromProject = (question) => {
    const normalized = question.toLowerCase();
    const match = localKnowledge.find((item) => item.keys.some((key) => normalized.includes(key)));
    return match ? match.answer : outOfScope;
  };
});
