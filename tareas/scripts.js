document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const courseContainer = document.getElementById('course-container');
    const careerTabsContainer = document.getElementById('career-tabs');
    const loadingMessage = document.getElementById('loading-message');
    const noResultsMessage = document.getElementById('no-results-message');
    const notificationToast = document.getElementById('notification-toast');

    const passwordOverlay = document.getElementById('password-overlay');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');
    const mainContent = document.getElementById('main-content'); // Get the main content div

    const CORRECT_PASSWORD = 'escuela4232';
    const ACCESS_GRANTED_KEY = 'accessGranted'; // Key for session storage

    // Function to grant access
    function grantAccess() {
        passwordOverlay.classList.add('hidden');
        mainContent.classList.remove('hidden');
        sessionStorage.setItem(ACCESS_GRANTED_KEY, 'true'); // Store access status
        setupTabs(); // Initialize tabs and courses once access is granted
        renderCourses();
    }

    // Check if access was already granted in this session
    if (sessionStorage.getItem(ACCESS_GRANTED_KEY) === 'true') {
        grantAccess();
    } else {
        passwordOverlay.classList.remove('hidden'); // Show password screen
        mainContent.classList.add('hidden'); // Hide main content
    }

    // Event listener for password submission
    passwordSubmit.addEventListener('click', () => {
        if (passwordInput.value === CORRECT_PASSWORD) {
            grantAccess();
            passwordError.classList.add('hidden');
        } else {
            passwordError.classList.remove('hidden');
            passwordInput.value = ''; // Clear input on wrong password
        }
    });

    // Allow pressing Enter key to submit password
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            passwordSubmit.click();
        }
    });

    function setupTabs() {
        // Clear existing tabs before setting them up to prevent duplicates on re-render
        careerTabsContainer.innerHTML = '';
        coursesData.forEach(careerData => {
            const tab = document.createElement('button');
            tab.className = 'career-tab';
            tab.textContent = careerData.career;
            tab.addEventListener('click', () => {
                renderCourses(searchInput.value);
            });
            careerTabsContainer.appendChild(tab);
        });
    }

    function renderCourses(searchTerm = '') {
        courseContainer.innerHTML = '';
        loadingMessage.classList.add('hidden');

        const normalizedSearch = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let resultsFound = false;
        let animationDelay = 0;

        const isSearching = searchTerm.trim().length > 0;
        const careersToSearch = coursesData;

        careersToSearch.forEach(careerData => {
            const careerTitle = document.createElement('h2');
            careerTitle.className = 'text-3xl font-bold text-white mt-10 mb-4 border-b border-cyan-400 pb-2';
            careerTitle.textContent = careerData.career;
            courseContainer.appendChild(careerTitle);

            careerData.courses.forEach(course => {
                const courseSubjects = course.subjects.filter(subject => {
                    const subjectText = `${course.name} ${subject.name}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return subjectText.includes(normalizedSearch);
                });

                if (courseSubjects.length > 0) {
                    resultsFound = true;
                    const courseCard = document.createElement('div');
                    courseCard.className = 'course-card';

                    const availableCount = courseSubjects.filter(s => s.status === 'available').length;
                    const totalCount = courseSubjects.length;

                    let subjectsHTML = courseSubjects.map(subject => {
                        const lastUpdatedDate = subject.lastUpdated ? new Date(subject.lastUpdated + 'T00:00:00-03:00') : null;
                        const isValidDate = lastUpdatedDate && !isNaN(lastUpdatedDate);
                        const isRecent = isValidDate && (new Date() - lastUpdatedDate) / (1000 * 60 * 60 * 24) <= 15;
                        const formattedDate = isValidDate ? lastUpdatedDate.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

                        return `
                        <li class="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b border-gray-500/20 last:border-b-0">
                        <div class="flex-grow mb-3 sm:mb-0 pr-4">
                        <p class="text-lg text-gray-100">${subject.name}</p>
                        ${subject.status === 'available' && formattedDate ? `
                            <p class="text-xs text-gray-400 mt-1">
                            Actualizado: ${formattedDate}
                            ${isRecent ? '<span class="tag-new ml-2">NUEVO</span>' : ''}
                            </p>` : ''}
                            </div>
                            <div class="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
                            ${subject.status === 'available' ? `
                                <a href="${subject.driveLink}" target="_blank" class="action-button go-drive">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                                <span>Ver</span>
                                </a>
                                <button data-link="${subject.driveLink}" class="action-button copy-link">
                                <span class="copy-icon-default">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                </svg>
                                </span>
                                <span class="copy-icon-success hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                </span>
                                </button>` : `<span class="tag-soon">Próximamente</span>`}
                                </div>
                                </li>`;
                    }).join('');

                    courseCard.innerHTML = `
                    <div class="course-header cursor-pointer flex items-center justify-between p-1 hover:bg-white/5 rounded-lg transition-colors duration-200" data-course="${course.name}">
                    <div class="flex items-center gap-4">
                    <h3 class="text-2xl font-bold text-cyan-300">${course.name}</h3>
                    <div class="flex gap-2 flex-wrap">
                    ${availableCount > 0 ? `<span class="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold">${availableCount} disponibles</span>` : ''}
                    <span class="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">${totalCount} materias</span>
                    </div>
                    </div>
                    <div class="expand-icon transform transition-transform duration-300 ${isSearching ? 'rotate-180' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    </div>
                    </div>
                    <div class="course-content overflow-hidden transition-all duration-500 ease-in-out ${isSearching ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}">
                    <div class="border-t border-cyan-300/20 mt-4 pt-4">
                    <ul class="space-y-1">${subjectsHTML}</ul>
                    </div>
                    </div>`;

                    courseContainer.appendChild(courseCard);
                    setTimeout(() => courseCard.classList.add('visible'), animationDelay);
                    animationDelay += 100;
                }
            });
        });

        noResultsMessage.classList.toggle('hidden', resultsFound);
    }

    // --- EVENTOS ---
    searchInput.addEventListener('input', () => renderCourses(searchInput.value));

    courseContainer.addEventListener('click', (e) => {
        const courseHeader = e.target.closest('.course-header');
        if (courseHeader) {
            const courseCard = courseHeader.closest('.course-card');
            const content = courseCard.querySelector('.course-content');
            const icon = courseHeader.querySelector('.expand-icon');
            const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';
            if (isExpanded) {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                icon.style.transform = 'rotate(180deg)';
                setTimeout(() => {
                    if (content.style.opacity === '1') content.style.maxHeight = 'none';
                }, 500);
            }
            return;
        }

        const copyBtn = e.target.closest('.copy-link');
        if (copyBtn) {
            const link = copyBtn.dataset.link;
            navigator.clipboard.writeText(link).then(() => {
                showToast('¡Enlace copiado!');
                const defaultIcon = copyBtn.querySelector('.copy-icon-default');
                const successIcon = copyBtn.querySelector('.copy-icon-success');
                defaultIcon.classList.add('hidden');
                successIcon.classList.remove('hidden');
                setTimeout(() => {
                    defaultIcon.classList.remove('hidden');
                    successIcon.classList.add('hidden');
                }, 2000);
            });
        }
    });

    function showToast() {
        notificationToast.classList.remove('translate-x-[120%]');
        setTimeout(() => {
            notificationToast.classList.add('translate-x-[120%]');
        }, 3000);
    }
});
