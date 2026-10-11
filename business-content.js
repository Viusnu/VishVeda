const businessPages = [
    {
        id: 'real-estate',
        number: '01',
        name: 'Real Estate',
        heroTitle: 'Exceptional Living Starts Here',
        heroLede: 'Property-led work shaped around thoughtful development, long-term value, and the places people call home.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85',
        imageAlt: 'Contemporary home surrounded by greenery',
        overviewTitle: 'Space for the next chapter.',
        overview: 'Our real estate work begins with a simple question: what would make this place work better for the people who use it? From individual properties to neighborhood-scale thinking, we value clear purpose, thoughtful development, and lasting value.',
        focus: [
            ['Built around place', 'Every property has a context. We consider its surroundings, its use, and the people it serves.'],
            ['Development with purpose', 'Practical decisions and thoughtful design help shape spaces that feel considered and useful.'],
            ['Value over time', 'We take a long view, with care for the durability and relevance of each property.']
        ],
        sections: [
            {
                id: 'services', title: 'Property work, considered from every angle.',
                lede: 'Real estate work can span the life of a property, from understanding its potential to caring for its long-term use. The right mix depends on the place and its purpose.',
                items: [['01 / STRATEGY', 'Property direction', "Clarify a property's role, opportunities, and the needs it can serve."], ['02 / DEVELOPMENT', 'Planning and delivery', 'Shape practical development decisions around context, function, and lasting value.'], ['03 / STEWARDSHIP', 'Long-term care', 'Consider how a property will perform, adapt, and remain useful over time.']]
            },
            {
                id: 'approach', title: 'Start with the place. Plan for the people.',
                lede: 'Every property has a different story and set of needs. A considered process gives those details room to shape the decisions that follow.',
                items: [['01 / UNDERSTAND', 'Listen to the purpose', 'Begin with how a property is used today and what people need from it next.'], ['02 / ASSESS', 'Read the context', 'Look at location, condition, constraints, and the character of the surrounding area.'], ['03 / PLAN', 'Take the long view', 'Bring feasibility, quality, and lasting usefulness into the same conversation.']]
            },
            {
                id: 'sustainability', title: 'Value that lasts beyond the build.',
                lede: 'Long-term property value includes how a place uses resources, serves its occupants, and fits within its neighborhood. These considerations can help guide more thoughtful decisions.',
                items: [['01 / REUSE', 'Make use of what exists', 'Consider adaptable buildings, durable materials, and opportunities to extend the life of existing places.'], ['02 / PERFORMANCE', 'Use resources thoughtfully', "Energy, water, comfort, and maintenance all shape a property's impact over time."], ['03 / COMMUNITY', 'Connect with the neighborhood', 'Access, shared spaces, and local context influence how a development is experienced.']]
            },
            {
                id: 'more-about', title: 'Property shapes how we live and work.',
                lede: 'Real estate is the relationship between a place, the people who use it, and the needs it can meet. From homes and workplaces to shared community spaces, every property is part of a wider story.',
                items: [['01 / HOMES', 'Places to belong', 'Housing influences daily routines, connections, and the character of a neighborhood.'], ['02 / WORK', 'Spaces to create', 'Thoughtful work environments support changing needs, collaboration, and productivity.'], ['03 / COMMUNITY', 'Places we share', 'Public-facing and mixed-use places can bring services and activity closer to people.']]
            }
        ]
    },
    {
        id: 'mining',
        number: '02',
        name: 'Mining',
        heroTitle: 'Resources for a Stronger Future',
        heroLede: 'Resource-sector work shaped by thoughtful operations, long-term value, and respect for the land.',
        image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=2200&q=85',
        imageAlt: 'Industrial equipment at a resource operation',
        overviewTitle: 'Work planned with the long view.',
        overview: 'Resource work exists within a wider landscape of people, places, and changing needs. Our approach starts with careful planning and considers what responsible operations mean over the long term.',
        focus: [
            ['Considered planning', 'Good decisions start with understanding the site, its context, and the work ahead.'],
            ['Operational discipline', 'Clear standards and consistent attention support safe, dependable operations.'],
            ['Lasting outcomes', 'We keep long-term impact in view, from the first plan through the life of an operation.']
        ],
        sections: [
            {
                id: 'services', title: 'Resource work, planned with care.',
                lede: "Mining involves complex decisions across a project's life. These are areas of work that can be considered together, with each site's context guiding the details.",
                items: [['01 / PLANNING', 'Project context', 'Understand the site, its constraints, and the questions that need answers before work begins.'], ['02 / OPERATIONS', 'Clear standards', 'Define practical priorities for safe, consistent, and well-coordinated operations.'], ['03 / LIFECYCLE', 'Long-term thinking', 'Consider closure, rehabilitation, and future land use as part of early planning.']]
            },
            {
                id: 'approach', title: 'Understand first. Plan for the full lifecycle.',
                lede: 'Resource projects call for a clear view of the land, the work, and the responsibilities that continue after operations. A deliberate process keeps those parts connected.',
                items: [['01 / CONTEXT', 'Understand the site', 'Build a grounded picture of the landscape, nearby communities, and operating conditions.'], ['02 / PLAN', 'Set clear priorities', 'Align the work around practical requirements, risks, and measurable responsibilities.'], ['03 / REVIEW', 'Adapt over time', 'Keep plans responsive as conditions, knowledge, and project needs change.']]
            },
            {
                id: 'sustainability', title: 'Resource decisions with a longer horizon.',
                lede: 'The long-term view in mining includes the environment, surrounding communities, and what happens when operations conclude. These considerations belong in planning from the outset.',
                items: [['01 / LAND', 'Site care and rehabilitation', 'Plan for disturbance, monitoring, rehabilitation, and future land use across the project lifecycle.'], ['02 / RESOURCES', 'Use with care', 'Consider material efficiency, water management, and energy needs in operational decisions.'], ['03 / PEOPLE', 'Local context', 'Listen to community concerns and keep local impacts visible as plans develop.']]
            },
            {
                id: 'more-about', title: 'Resources are part of everyday life.',
                lede: 'Mining is a connected process that can include exploration, development, extraction, processing, transport, and rehabilitation. Each stage brings different technical and community considerations.',
                items: [['01 / MATERIALS', 'Essential resources', 'Minerals and materials are used in infrastructure, technology, manufacturing, and daily products.'], ['02 / LIFECYCLE', 'Connected stages', 'Decisions made early can influence operations, closure planning, and the future of a site.'], ['03 / CONTEXT', 'Places and people', 'Resource projects take place within landscapes and communities that deserve careful consideration.']]
            }
        ]
    },
    {
        id: 'agriculture',
        number: '03',
        name: 'Agriculture',
        heroTitle: 'Growing from the Ground Up',
        heroLede: 'Agriculture rooted in cultivation, resilient food systems, and lasting relationships with the land.',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=85',
        imageAlt: 'Cultivated fields stretching across a rural landscape',
        overviewTitle: 'A relationship with the land.',
        overview: 'Agriculture depends on patience, knowledge, and care for the ground beneath us. We look at the whole growing system, balancing productive work today with the health and resilience it needs for tomorrow.',
        focus: [
            ['Care for the land', 'Healthy growing begins with understanding the land and the conditions it needs.'],
            ['Productive growing', 'Thoughtful cultivation connects quality, consistency, and a respect for natural cycles.'],
            ['Resilient operations', 'Strong agricultural work adapts, plans ahead, and builds for changing seasons.']
        ],
        sections: [
            {
                id: 'services', title: 'Support for a resilient growing cycle.',
                lede: 'Agricultural needs change with the land, the season, and the goals of each operation. These areas help frame a practical conversation about growing.',
                items: [['01 / PLANNING', 'Crop and season planning', "Consider conditions, timing, and growing goals when mapping a season's work."], ['02 / CULTIVATION', 'Growing operations', 'Connect day-to-day cultivation decisions with quality, consistency, and care.'], ['03 / LAND', 'Land stewardship', 'Understand how soil, water, and surrounding ecosystems affect long-term productivity.']]
            },
            {
                id: 'approach', title: 'Work with the land and its seasons.',
                lede: 'Growing work is shaped by conditions that change over time. A grounded approach pays attention to the land, plans for seasonal realities, and learns from each cycle.',
                items: [['01 / OBSERVE', 'Understand the ground', 'Learn about soil, water, weather, and the existing growing environment.'], ['02 / PLAN', 'Match goals to conditions', 'Set realistic growing priorities that account for the season and available resources.'], ['03 / ADAPT', 'Learn each season', 'Review what worked, respond to changing conditions, and carry useful knowledge forward.']]
            },
            {
                id: 'sustainability', title: 'Healthy land is part of the harvest.',
                lede: 'A resilient agricultural system depends on the resources and ecosystems around it. Long-term growing plans can keep land health in view alongside productivity.',
                items: [['01 / SOIL', 'Build soil health', 'Consider soil structure, nutrients, and practices that support productive ground over time.'], ['02 / WATER', 'Manage water carefully', 'Plan for water availability, efficient use, and the needs of nearby environments.'], ['03 / RESILIENCE', 'Prepare for change', 'Seasonal variability and changing conditions make flexibility an important part of planning.']]
            },
            {
                id: 'more-about', title: 'Growing connects land, food, and people.',
                lede: 'Agriculture is a living system shaped by land, climate, knowledge, and the people who grow and use food. Its work reaches from the field into local economies and everyday life.',
                items: [['01 / LAND', 'Every field is different', 'Soil, water, topography, and local conditions shape what can grow and how.'], ['02 / FOOD', 'From growing to gathering', 'Food systems connect producers, processors, markets, kitchens, and communities.'], ['03 / TIME', 'Work in seasons', 'Growing follows cycles, requiring preparation, observation, and patience.']]
            }
        ]
    },
    {
        id: 'restaurants',
        number: '04',
        name: 'Restaurants',
        heroTitle: 'A Place at Every Table',
        heroLede: 'Restaurant experiences built around good food, warm hospitality, and bringing people together.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=85',
        imageAlt: 'A welcoming restaurant dining room set for guests',
        overviewTitle: 'Good food. Thoughtfully served.',
        overview: 'A great restaurant makes people feel welcome. We believe the details matter: the food, the setting, and the care that turns a meal into a reason to return.',
        focus: [
            ['Guest experience', 'Warm, attentive service makes every visit feel easy and memorable.'],
            ['A sense of place', 'Distinctive spaces and thoughtful details give each restaurant its own character.'],
            ['Everyday excellence', 'Consistency in the kitchen and the room gives guests confidence in every visit.']
        ],
        sections: [
            {
                id: 'services', title: 'Hospitality, from first welcome to last bite.',
                lede: 'A restaurant brings many moving parts together. These service areas help shape an experience that feels thoughtful to guests and workable for the people behind it.',
                items: [['01 / EXPERIENCE', 'Guest welcome', 'Consider the full visit, from arrival and atmosphere through the final moments at the table.'], ['02 / FOOD', 'Menu and dining', 'Bring flavor, presentation, and a clear point of view together in the dining experience.'], ['03 / OPERATIONS', 'Service flow', 'Thoughtful routines help teams deliver consistent hospitality through busy services.']]
            },
            {
                id: 'approach', title: 'Make every part of the visit count.',
                lede: 'Hospitality is built from details that work together. A clear point of view, considered service, and consistent execution help turn a meal into a memorable experience.',
                items: [['01 / DEFINE', 'Know the experience', 'Decide what guests should feel, remember, and expect from a visit.'], ['02 / DESIGN', 'Connect the details', 'Bring menu, room, service, and pace together around the guest experience.'], ['03 / DELIVER', 'Keep it consistent', 'Clear preparation and teamwork help maintain quality throughout service.']]
            },
            {
                id: 'sustainability', title: 'Hospitality that considers its footprint.',
                lede: 'A thoughtful restaurant considers more than the plate. Ingredients, energy, water, and waste all shape the operation and its relationship with the community around it.',
                items: [['01 / FOOD', 'Plan for less waste', 'Menu planning, preparation, and inventory decisions can help reduce avoidable food waste.'], ['02 / RESOURCES', 'Use energy and water well', 'Kitchen equipment, refrigeration, cleaning, and daily routines affect resource use.'], ['03 / COMMUNITY', 'Know your surroundings', 'Local context and guest expectations can inform responsible hospitality choices.']]
            },
            {
                id: 'more-about', title: 'A restaurant is more than a meal.',
                lede: 'Restaurants are places to gather, celebrate, pause, and connect. Food anchors the experience, while atmosphere and hospitality give a visit its character.',
                items: [['01 / FOOD', 'A reason to return', 'Flavor, craft, and consistency help make a restaurant memorable.'], ['02 / PLACE', 'A room with character', 'Light, sound, layout, and detail shape how a space feels to its guests.'], ['03 / PEOPLE', 'Hospitality is personal', 'Attentive service helps guests feel welcomed and cared for.']]
            }
        ]
    }
];

const mainContent = document.querySelector('.main-content');
const businessLinks = document.querySelectorAll('.business-tabs a');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
mainContent.replaceChildren();

function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
}

function createFocusArticle(number, title, description) {
    const article = document.createElement('article');
    article.append(
        createTextElement('span', '', number),
        createTextElement('h3', '', title),
        createTextElement('p', '', description)
    );
    return article;
}

function createBusinessPanel(business) {
    const panel = document.createElement('section');
    panel.className = 'page-panel business-panel';
    panel.id = business.id;
    panel.hidden = true;

    const hero = document.createElement('div');
    hero.className = 'hero';
    const image = document.createElement('img');
    image.className = 'hero-image';
    image.src = business.image;
    image.alt = business.imageAlt;
    image.loading = 'lazy';

    const heroCopy = document.createElement('div');
    heroCopy.className = 'hero-copy';
    heroCopy.append(
        createTextElement('h1', '', business.heroTitle),
        createTextElement('p', 'hero-lede', business.heroLede)
    );
    hero.append(image, heroCopy);

    const overview = document.createElement('section');
    overview.className = 'business-details';
    overview.setAttribute('aria-labelledby', `${business.id}-overview-title`);
    const overviewIntro = document.createElement('div');
    overviewIntro.className = 'business-details-intro';
    overviewIntro.append(
        createTextElement('p', 'business-eyebrow', `${business.number} / ${business.name.toUpperCase()}`),
        createTextElement('h2', '', business.overviewTitle),
        createTextElement('p', '', business.overview)
    );
    overviewIntro.querySelector('h2').id = `${business.id}-overview-title`;
    const focus = document.createElement('div');
    focus.className = 'business-focus';
    business.focus.forEach(([title, description], index) => {
        focus.append(createFocusArticle(String(index + 1).padStart(2, '0'), title, description));
    });
    overview.append(overviewIntro, focus);
    panel.append(hero, overview);

    business.sections.forEach((section) => {
        const sectionElement = document.createElement('section');
        sectionElement.className = 'business-scroll-section';
        sectionElement.id = `${business.id}-${section.id}`;
        sectionElement.setAttribute('aria-labelledby', `${sectionElement.id}-title`);
        sectionElement.append(
            createTextElement('p', 'business-subpage-eyebrow', `${business.name.toUpperCase()} / ${section.id.replace('-', ' ').toUpperCase()}`),
            createTextElement('h2', '', section.title),
            createTextElement('p', 'business-subpage-lede', section.lede)
        );
        sectionElement.querySelector('h2').id = `${sectionElement.id}-title`;
        const items = document.createElement('div');
        items.className = 'business-subpage-grid';
        section.items.forEach(([eyebrow, title, description]) => {
            const article = document.createElement('article');
            article.append(
                createTextElement('span', '', eyebrow),
                createTextElement('h3', '', title),
                createTextElement('p', '', description)
            );
            items.append(article);
        });
        sectionElement.append(items);
        panel.append(sectionElement);
    });

    return panel;
}

const homePanel = document.createElement('section');
homePanel.className = 'page-panel home-panel';
homePanel.id = 'home';
homePanel.hidden = true;
homePanel.setAttribute('aria-label', 'Home');

const homeHero = document.createElement('section');
homeHero.className = 'hero home-hero';
const homeImage = document.createElement('img');
homeImage.className = 'hero-image';
homeImage.src = businessPages[0].image;
homeImage.alt = 'Contemporary home surrounded by greenery';
homeImage.fetchPriority = 'high';
const homeCopy = document.createElement('div');
homeCopy.className = 'hero-copy home-hero-copy';
const exploreLink = createTextElement('a', 'home-hero-link', 'Explore our businesses');
exploreLink.href = '#home-industries';
homeCopy.append(
    createTextElement('p', 'home-eyebrow', 'A GROUP OF DISTINCT BUSINESSES'),
    createTextElement('h1', '', 'VishVeda'),
    createTextElement('p', 'hero-lede', 'Rooted in place. Open to what’s next. We bring together work across real estate, mining, agriculture, and restaurants, with thoughtful decisions shaped by context and long-term value.'),
    exploreLink
);
homeHero.append(homeImage, homeCopy);

const homeOverview = document.createElement('section');
homeOverview.className = 'home-overview';
homeOverview.id = 'home-industries';
const homeIntro = document.createElement('div');
homeIntro.className = 'home-intro';
homeIntro.append(
    createTextElement('p', 'business-subpage-eyebrow', 'VISHVEDA / OUR BUSINESSES'),
    createTextElement('h2', '', 'Four areas of focus. One long view.'),
    createTextElement('p', '', 'Explore the industries where we work, from the places we build and resources we steward to the food we grow and the tables where people gather.')
);
const homeGrid = document.createElement('div');
homeGrid.className = 'home-industries-grid';
businessPages.forEach((business) => {
    const link = document.createElement('a');
    link.className = 'home-industry';
    link.href = `#${business.id}`;
    const image = document.createElement('img');
    image.src = business.image;
    image.alt = business.imageAlt;
    image.loading = 'lazy';
    const copy = document.createElement('div');
    copy.className = 'home-industry-copy';
    copy.append(
        createTextElement('span', '', `${business.number} / VISHVEDA`),
        createTextElement('h3', '', business.name),
        createTextElement('p', '', business.overviewTitle)
    );
    link.append(image, copy);
    homeGrid.append(link);
});
homeOverview.append(homeIntro, homeGrid);
homePanel.append(homeHero, homeOverview);
mainContent.append(homePanel);
businessPages.forEach((business) => mainContent.append(createBusinessPanel(business)));

function activatePanel(panel, animate = true) {
    if (!panel) return;
    const update = () => {
        mainContent.querySelectorAll('.page-panel').forEach((candidate) => {
            candidate.hidden = candidate !== panel;
            candidate.classList.toggle('is-active', candidate === panel);
        });
        businessLinks.forEach((link) => {
            if (link.hash === `#${panel.id}`) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
        const business = businessPages.find((item) => item.id === panel.id);
        document.title = business ? `${business.name} | VishVeda` : 'VishVeda';
    };

    if (animate && !prefersReducedMotion && typeof document.startViewTransition === 'function') {
        document.startViewTransition(update);
    } else {
        update();
        if (animate && !prefersReducedMotion) {
            panel.classList.remove('business-panel-enter');
            void panel.offsetWidth;
            panel.classList.add('business-panel-enter');
        }
    }
}

function showBusinessPage(id, animate = true) {
    activatePanel(mainContent.querySelector(`#${CSS.escape(id)}`) || homePanel, animate);
}

window.showBusinessPage = showBusinessPage;
window.showBusinessSearchResults = (results) => {
    let panel = document.getElementById('search-results-panel');
    if (!panel) {
        panel = document.createElement('section');
        panel.id = 'search-results-panel';
        panel.className = 'page-panel search-results-panel';
        panel.hidden = true;
        mainContent.append(panel);
    }
    panel.replaceChildren(results);
    activatePanel(panel, true);
    businessLinks.forEach((link) => link.removeAttribute('aria-current'));
};

function pageIdFromLocation() {
    return window.location.hash.slice(1) || document.body.dataset.business || 'home';
}

document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('.logo[href^="#"], .business-tabs a[href^="#"], .footer-link-group a[href^="#"], .search-result[href^="#"], .home-industry[href^="#"]') : null;
    if (!link) return;

    const id = link.hash.slice(1);
    const panel = mainContent.querySelector(`#${CSS.escape(id)}`);
    if (!panel) return;

    event.preventDefault();
    const nextURL = new URL(window.location.href);
    nextURL.search = '';
    nextURL.hash = id;
    window.history.pushState({}, '', `${nextURL.pathname}${nextURL.hash}`);
    showBusinessPage(id);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
});

window.addEventListener('popstate', () => showBusinessPage(pageIdFromLocation(), true));
showBusinessPage(pageIdFromLocation(), false);