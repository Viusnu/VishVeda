const searchToggle = document.querySelector('.search-toggle');
const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('input');
const searchClose = document.querySelector('.search-close');
const accountPopover = document.querySelector('.account-popover');
const accountToggle = document.querySelector('.account-toggle');
const sidebar = document.querySelector('.site-sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebarBackdrop = document.querySelector('.sidebar-backdrop');
const initialTitle = document.title;

const searchDocuments = [
    {
        title: 'Real Estate',
        url: '#real-estate',
        description: 'Exceptional living starts here. Property-led work shaped around thoughtful development, long-term value, and the places people call home.',
        content: 'Space for the next chapter. Built around place. Development with purpose. Value over time. Property strategy planning delivery stewardship homes work neighborhood.'
    },
    {
        title: 'Mining',
        url: '#mining',
        description: 'Resources for a stronger future. Resource-sector work shaped by thoughtful operations, long-term value, and respect for the land.',
        content: 'Work planned with the long view. Considered planning. Operational discipline. Lasting outcomes. Project context lifecycle rehabilitation materials minerals community environment.'
    },
    {
        title: 'Agriculture',
        url: '#agriculture',
        description: 'Growing from the ground up. Agriculture rooted in cultivation, resilient food systems, and lasting relationships with the land.',
        content: 'A relationship with the land. Care for the land. Productive growing. Resilient operations. Soil water crop season food growing cultivation sustainability.'
    },
    {
        title: 'Restaurants',
        url: '#restaurants',
        description: 'A place at every table. Restaurant experiences built around good food, warm hospitality, and bringing people together.',
        content: 'Good food thoughtfully served. Guest experience. A sense of place. Everyday excellence. Menu dining service hospitality restaurant kitchen sustainability food waste.'
    },
    {
        title: 'Services',
        url: 'services.html',
        description: 'Explore the business areas that make up VishVeda: real estate, mining, agriculture, and restaurants.',
        content: 'Our businesses real estate mining agriculture restaurants hospitality property resource land food growing.'
    },
    {
        title: 'Privacy Policy',
        url: 'privacy.html',
        description: 'Learn how VishVeda handles account information and privacy when you use this website.',
        content: 'Google Firebase authentication account information profile photo data search query privacy choices retention safety.'
    }
];

function closeSearch(restoreFocus = false) {
    searchForm.hidden = true;
    searchToggle.hidden = false;
    searchToggle.setAttribute('aria-expanded', 'false');

    if (restoreFocus) {
        searchToggle.focus();
    }
}

function closeSidebar() {
    sidebar.classList.remove('is-open');
    sidebar.hidden = true;
    sidebarBackdrop.hidden = true;
    sidebarToggle.setAttribute('aria-expanded', 'false');
    sidebarToggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('sidebar-open');
}

function renderSearchResults(query) {
    const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const results = searchDocuments.filter((document) => {
        const searchableText = `${document.title} ${document.description} ${document.content}`.toLocaleLowerCase();
        return terms.every((term) => searchableText.includes(term));
    });

    const section = document.createElement('section');
    section.className = 'search-results';
    section.setAttribute('aria-labelledby', 'search-results-title');

    const kicker = document.createElement('p');
    kicker.className = 'business-subpage-eyebrow';
    kicker.textContent = 'VISHVEDA / SEARCH';
    section.append(kicker);

    const heading = document.createElement('h1');
    heading.id = 'search-results-title';
    heading.textContent = results.length
        ? `Results for “${query}”`
        : `No results for “${query}”`;
    section.append(heading);

    if (results.length) {
        const list = document.createElement('div');
        list.className = 'search-result-list';

        results.forEach((result) => {
            const link = document.createElement('a');
            link.className = 'search-result';
            link.href = result.url;

            const title = document.createElement('h2');
            title.textContent = result.title;
            const description = document.createElement('p');
            description.textContent = result.description;

            link.append(title, description);
            list.append(link);
        });

        section.append(list);
    } else {
        const emptyState = document.createElement('p');
        emptyState.className = 'search-empty-state';
        emptyState.textContent = 'Try another phrase, or browse one of the business pages above.';
        section.append(emptyState);
    }

    window.showBusinessSearchResults(section);
    document.title = `${results.length} results for ${query} | VishVeda`;
}

searchToggle.addEventListener('click', () => {
    closeSidebar();
    accountPopover.hidden = true;
    accountToggle.setAttribute('aria-expanded', 'false');
    searchForm.hidden = false;
    searchToggle.hidden = true;
    searchToggle.setAttribute('aria-expanded', 'true');
    searchInput.focus();
});

searchClose.addEventListener('click', () => closeSearch(true));

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSearch(true);
    }
});

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    const nextURL = new URL(window.location.href);
    nextURL.searchParams.set('q', query);
    nextURL.hash = '';
    window.history.pushState({}, '', `${nextURL.pathname}${nextURL.search}`);
    closeSearch();
    renderSearchResults(query);
});

window.addEventListener('popstate', () => {
    const query = new URLSearchParams(window.location.search).get('q');
    if (query) {
        renderSearchResults(query);
    } else {
        window.showBusinessPage(window.location.hash.slice(1) || 'home');
        document.title = initialTitle;
    }
});

const initialQuery = new URLSearchParams(window.location.search).get('q');
if (initialQuery) {
    searchInput.value = initialQuery;
    renderSearchResults(initialQuery);
}