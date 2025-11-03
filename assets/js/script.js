document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const basePath = body.dataset.root || '.';
    const currentPage = body.dataset.page || '';
    const navRoutes = {
        home: 'index.html',
        about: 'about/index.html',
        departments: 'departments/index.html',
        courses: 'courses/index.html',
        administration: 'administration/index.html',
        gallery: 'gallery/index.html',
        contact: 'contact/index.html'
    };

    const sanitizedBase = (!basePath || basePath === '.')
        ? ''
        : basePath.replace(/[\\\/]+$/, '');

    document.querySelectorAll('[data-nav]')
        .forEach(link => {
            const target = link.dataset.nav;
            if (!navRoutes[target]) return;
            const resolved = `${sanitizedBase ? `${sanitizedBase}/` : ''}${navRoutes[target]}`;
            link.setAttribute('href', resolved);
            if (target === currentPage && link.classList.contains('nav-link')) {
                link.classList.add('active');
            }
        });

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    if (currentPage === 'home') {
        const newsFeed = document.querySelector('#newsFeed');
        if (newsFeed) {
            const newsItems = [
                {
                    title: 'AI Research Lab Inauguration',
                    date: 'October 21, 2025',
                    type: 'Event',
                    description: 'Ribbon-cutting ceremony celebrates the opening of the Horizon AI Research Lab focusing on sustainable innovations.'
                },
                {
                    title: 'Global Accreditations Earned',
                    date: 'September 12, 2025',
                    type: 'Announcement',
                    description: 'The School of Engineering and School of Business both earned internationally recognized ABET accreditations.'
                },
                {
                    title: 'Winter Admissions Open',
                    date: 'August 30, 2025',
                    type: 'Notice',
                    description: 'Applications for undergraduate and postgraduate programs are now open for the Winter 2026 intake.'
                }
            ];

            const fragment = document.createDocumentFragment();
            newsItems.forEach(item => {
                const article = document.createElement('article');
                article.className = 'news-item';
                article.innerHTML = `
                    <div class="news-meta">${item.type} • ${item.date}</div>
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                `;
                fragment.appendChild(article);
            });
            newsFeed.appendChild(fragment);
        }
    }
});
