// --- ÍCONOS SVG POR MATERIA ---
const SUBJECT_ICONS = {
    calculator: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"/></svg>`,
    book:       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
    globe:      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    building:   `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>`,
    beaker:     `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
    lightning:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    heart:      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
    sun:        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
    chat:       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
    music:      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>`,
    film:       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/></svg>`,
    palette:    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>`,
    fire:       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>`,
    computer:   `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
    scale:      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>`,
    megaphone:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>`,
    currency:   `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    cog:        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    search:     `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
    users:      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    briefcase:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
};

function getSubjectIcon(subjectName) {
    const n = subjectName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (n.includes('matemat'))                                          return SUBJECT_ICONS.calculator;
    if (n.includes('fisica') && !n.includes('educacion'))              return SUBJECT_ICONS.lightning;
    if (n.includes('quimic'))                                          return SUBJECT_ICONS.beaker;
    if (n.includes('biolog'))                                          return SUBJECT_ICONS.heart;
    if (n.includes('ciencias naturales'))                              return SUBJECT_ICONS.sun;
    if (n.includes('historia'))                                        return SUBJECT_ICONS.building;
    if (n.includes('etica') || n.includes('ciudadana'))                return SUBJECT_ICONS.scale;
    if (n.includes('geografia'))                                       return SUBJECT_ICONS.globe;
    if (n.includes('ingles') || n.includes('extranjera'))             return SUBJECT_ICONS.chat;
    if (n.includes('musica'))                                          return SUBJECT_ICONS.music;
    if (n.includes('teatro'))                                          return SUBJECT_ICONS.film;
    if (n.includes('artes') || n.includes('artistica') || n.includes('practicas artis')) return SUBJECT_ICONS.palette;
    if (n.includes('educacion fisica'))                                return SUBJECT_ICONS.fire;
    if (n.includes('tecnologia') || n.includes('informatica') || n.includes('tic')) return SUBJECT_ICONS.computer;
    if (n.includes('comunicacion'))                                    return SUBJECT_ICONS.megaphone;
    if (n.includes('agroecosistema') || n.includes('agricultura') || n.includes('agroambiental') || n.includes('rural')) return SUBJECT_ICONS.sun;
    if (n.includes('economia'))                                        return SUBJECT_ICONS.currency;
    if (n.includes('procesos productivos'))                            return SUBJECT_ICONS.cog;
    if (n.includes('taller') || n.includes('investigacion'))          return SUBJECT_ICONS.search;
    if (n.includes('organizacion') || n.includes('desarrollo regional') || n.includes('ruralidad')) return SUBJECT_ICONS.users;
    if (n.includes('socioambiental') || n.includes('problematic'))    return SUBJECT_ICONS.globe;
    if (n.includes('vida y el trabajo') || n.includes('formacion para la vida')) return SUBJECT_ICONS.briefcase;
    if (n.includes('ciencias sociales'))                               return SUBJECT_ICONS.globe;
    return SUBJECT_ICONS.book;
}

// --- SVGs reutilizables para los botones de acción ---
const ICON_EXTERNAL = `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>`;
const ICON_COPY    = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/></svg>`;

// -------------------------------------------------------

function debounce(fn, delay) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput        = document.getElementById('search-input');
    const courseContainer    = document.getElementById('course-container');
    const careerTabsContainer= document.getElementById('career-tabs');
    const loadingMessage     = document.getElementById('loading-message');
    const noResultsMessage   = document.getElementById('no-results-message');
    const notificationToast  = document.getElementById('notification-toast');

    // Recuperar el año guardado (null = "Todos", "null" = string cuando se eligió Todos)
    const _saved = localStorage.getItem('selectedYear');
    let activeYear = (_saved === null || _saved === 'null') ? null : parseInt(_saved);

    const YEAR_FILTERS = [
        { year: null, label: 'Todos' },
        { year: 1,    label: '1°'   },
        { year: 2,    label: '2°'   },
        { year: 3,    label: '3°'   },
        { year: 4,    label: '4°'   },
        { year: 5,    label: '5°'   },
    ];

    // Si el año guardado ya no existe en los filtros, resetear
    const _validYears = YEAR_FILTERS.map(f => f.year);
    if (!_validYears.includes(activeYear)) activeYear = null;

    function getYearFromCourse(courseName) {
        return parseInt(courseName);
    }

    function updateYearButtons() {
        document.querySelectorAll('.year-btn').forEach(btn => {
            const btnYear = btn.dataset.year === 'null' ? null : parseInt(btn.dataset.year);
            const isActive = btnYear === activeYear;
            btn.className = isActive
                ? 'year-btn px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 bg-cyan-400 text-gray-900 shadow-lg shadow-cyan-400/30 scale-105'
                : 'year-btn px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 bg-gray-800/60 text-gray-400 border border-gray-600/40 hover:border-cyan-400/50 hover:text-white hover:bg-gray-700/60 cursor-pointer';
        });
    }

    function setupTabs() {
        careerTabsContainer.innerHTML = '';
        YEAR_FILTERS.forEach(({ year, label }) => {
            const btn = document.createElement('button');
            btn.dataset.year = year;
            btn.textContent = label;
            btn.addEventListener('click', () => {
                activeYear = year;
                localStorage.setItem('selectedYear', year);
                updateYearButtons();
                renderCourses(searchInput.value);
                if (year !== null) {
                    courseContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            careerTabsContainer.appendChild(btn);
        });
        updateYearButtons();
    }

    function buildSubjectCard(subject) {
        const lastUpdatedDate = subject.lastUpdated ? new Date(subject.lastUpdated + 'T00:00:00-03:00') : null;
        const isValidDate     = lastUpdatedDate && !isNaN(lastUpdatedDate);
        const isRecent        = isValidDate && (new Date() - lastUpdatedDate) / (1000 * 60 * 60 * 24) <= 15;
        const formattedDate   = isValidDate
            ? lastUpdatedDate.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
            : '';
        const isAvailable = subject.status === 'available';

        return `
        <div class="subject-card ${isAvailable ? 'available' : 'coming-soon'}">
            <div class="subject-icon">${getSubjectIcon(subject.name)}</div>
            <p class="subject-name">${subject.name}</p>
            ${isAvailable && formattedDate ? `
                <p class="subject-date">
                    ${formattedDate}
                    ${isRecent ? '<span class="tag-new">NUEVO</span>' : ''}
                </p>` : ''}
            ${isAvailable ? `
                <div class="subject-actions">
                    <a href="${subject.driveLink}" target="_blank" rel="noopener noreferrer" class="subject-btn-ver">
                        ${ICON_EXTERNAL} Ver
                    </a>
                    <button data-link="${subject.driveLink}" class="subject-btn-copy copy-link" title="Copiar enlace">
                        ${ICON_COPY}
                    </button>
                </div>` : `
                <span class="coming-soon-label">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Próximamente
                </span>`}
        </div>`;
    }

    function renderCourses(searchTerm = '') {
        courseContainer.innerHTML = '';
        loadingMessage.classList.add('hidden');

        const normalizedSearch = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let resultsFound  = false;
        let animationDelay = 0;

        const isSearching     = searchTerm.trim().length > 0;
        const shouldAutoExpand = isSearching || activeYear !== null;

        coursesData.forEach(careerData => {
            let careerTitleAdded = false;

            careerData.courses.forEach(course => {
                if (activeYear !== null && getYearFromCourse(course.name) !== activeYear) return;

                const courseSubjects = course.subjects.filter(subject => {
                    const subjectText = `${course.name} ${subject.name}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return subjectText.includes(normalizedSearch);
                });

                if (courseSubjects.length === 0) return;

                resultsFound = true;

                if (!careerTitleAdded) {
                    const careerTitle = document.createElement('h2');
                    careerTitle.className = 'text-3xl font-bold text-white mt-10 mb-4 border-b border-cyan-400 pb-2';
                    careerTitle.textContent = careerData.career;
                    courseContainer.appendChild(careerTitle);
                    careerTitleAdded = true;
                }

                const availableCount  = courseSubjects.filter(s => s.status === 'available').length;
                const comingSoonCount = courseSubjects.filter(s => s.status !== 'available').length;
                const totalCount      = courseSubjects.length;
                const subjectsGrid   = `<div class="subject-grid">${courseSubjects.map(buildSubjectCard).join('')}</div>`;

                const courseCard = document.createElement('div');
                courseCard.className = 'course-card';
                courseCard.innerHTML = `
                    <div class="course-header cursor-pointer flex items-center justify-between p-1 hover:bg-white/5 rounded-lg transition-colors duration-200" data-course="${course.name}">
                        <div class="flex items-center gap-4">
                            <h3 class="text-2xl font-bold text-cyan-300">${course.name}</h3>
                            <div class="flex gap-2 flex-wrap">
                                ${availableCount > 0 ? `<span class="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold">${availableCount} disponibles</span>` : ''}
                                ${comingSoonCount > 0 ? `<span class="px-2 py-1 bg-gray-700/40 text-gray-500 rounded-full text-xs">${comingSoonCount} próximamente</span>` : ''}
                                <span class="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">${totalCount} materias</span>
                            </div>
                        </div>
                        <div class="expand-icon transform transition-transform duration-300 ${shouldAutoExpand ? 'rotate-180' : ''}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </div>
                    </div>
                    <div class="course-content overflow-hidden transition-all duration-500 ease-in-out" style="${shouldAutoExpand ? 'max-height: none; opacity: 1;' : 'max-height: 0; opacity: 0;'}">
                        ${subjectsGrid}
                    </div>`;

                courseContainer.appendChild(courseCard);
                setTimeout(() => courseCard.classList.add('visible'), animationDelay);
                animationDelay += 100;
            });
        });

        noResultsMessage.classList.toggle('hidden', resultsFound);
    }

    // --- EVENTOS ---
    searchInput.addEventListener('input', debounce(() => renderCourses(searchInput.value), 200));

    courseContainer.addEventListener('click', (e) => {
        const courseHeader = e.target.closest('.course-header');
        if (courseHeader) {
            const courseCard = courseHeader.closest('.course-card');
            const content    = courseCard.querySelector('.course-content');
            const icon       = courseHeader.querySelector('.expand-icon');
            const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';
            if (isExpanded) {
                content.style.maxHeight = '0px';
                content.style.opacity   = '0';
                icon.style.transform    = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity   = '1';
                icon.style.transform    = 'rotate(180deg)';
                setTimeout(() => {
                    if (content.style.opacity === '1') content.style.maxHeight = 'none';
                }, 500);
            }
            return;
        }

        const copyBtn = e.target.closest('.copy-link');
        if (copyBtn) {
            const onCopied = () => {
                showToast();
                copyBtn.style.color       = '#4ade80';
                copyBtn.style.borderColor = 'rgba(74,222,128,0.4)';
                setTimeout(() => { copyBtn.style.color = ''; copyBtn.style.borderColor = ''; }, 1500);
            };
            navigator.clipboard.writeText(copyBtn.dataset.link)
                .then(onCopied)
                .catch(() => {
                    // Fallback para HTTP o navegadores sin Clipboard API
                    const tmp = document.createElement('input');
                    tmp.value = copyBtn.dataset.link;
                    tmp.style.cssText = 'position:fixed;opacity:0';
                    document.body.appendChild(tmp);
                    tmp.focus(); tmp.select();
                    document.execCommand('copy');
                    document.body.removeChild(tmp);
                    onCopied();
                });
        }
    });

    function showToast() {
        notificationToast.classList.remove('translate-x-[120%]');
        setTimeout(() => notificationToast.classList.add('translate-x-[120%]'), 3000);
    }

    setupTabs();
    renderCourses();
});
