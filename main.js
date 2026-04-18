document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.getElementById('app-root');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // --- Routing ---
    const router = () => {
        let hash = window.location.hash.slice(1) || 'home';
        
        // Handle Policy specific routes (e.g. #policies-baptism)
        let subRoute = null;
        let groupData = null;

        if (hash.startsWith('policies')) {
            const parts = hash.split('-');
            hash = 'policies';
            if (parts.length > 1) subRoute = parts[1];
        } else if (hash.startsWith('group-')) {
            const groupId = hash.substring(6);
            hash = 'group';
            // Find group data
            groupData = window.store.committees.find(c => c.id === groupId) ||
                        window.store.sccs.find(s => s.id === groupId) ||
                        window.store.groups.find(g => g.id === groupId);
            
            if (!groupData) {
                appRoot.innerHTML = `<h2>404 - Group Not Found</h2>`;
                return;
            }
        }

        if (Pages[hash]) {
            appRoot.innerHTML = Pages[hash](groupData);
            updateActiveNav(hash === 'group' ? 'community' : hash);
            
            // Post-render bindings
            bindPageEvents(hash, subRoute);
            window.scrollTo(0, 0);
        } else {
            appRoot.innerHTML = `<h2>404 - Page Not Found</h2>`;
        }
    };

    const updateActiveNav = (hash) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${hash}`) {
                link.classList.add('active');
            }
        });
    };

    const bindPageEvents = (hash, subRoute) => {
        if (hash === 'policies') {
            const policyLinks = document.querySelectorAll('.policy-link');
            const policyPanes = document.querySelectorAll('.policy-pane');

            const activateTab = (targetId) => {
                policyLinks.forEach(l => l.classList.remove('active'));
                policyPanes.forEach(p => p.classList.remove('active'));
                
                const link = document.querySelector(`.policy-link[data-target="${targetId}"]`);
                const pane = document.getElementById(targetId);
                
                if(link && pane) {
                    link.classList.add('active');
                    pane.classList.add('active');
                }
            };

            policyLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = link.getAttribute('data-target');
                    // Avoid full reload, just switch tab visually, optional: update hash softly
                    history.replaceState(null, null, `#policies-${target}`);
                    activateTab(target);
                });
            });

            // If subRoute provided from hash, activate it
            if(subRoute) {
                activateTab(subRoute);
            }
        }
    };

    // Listen to hash changes
    window.addEventListener('hashchange', router);
    // Initial load
    router();


    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navMenu.addEventListener('click', (e) => {
        if(e.target.tagName === 'A' && !e.target.parentElement.classList.contains('dropdown')) {
            navMenu.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });

    // Handle mobile dropdowns
    dropdowns.forEach(drop => {
        drop.addEventListener('click', (e) => {
            if(window.innerWidth <= 768) {
                drop.classList.toggle('active');
            }
        });
    });


    // --- Search Functionality ---
    const searchModal = document.getElementById('search-modal');
    const searchBtn = document.querySelector('.search-btn');
    const closeSearchBtn = document.querySelector('.close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const openSearch = () => {
        searchModal.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    };

    const closeSearch = () => {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        document.body.style.overflow = '';
    };

    searchBtn.addEventListener('click', openSearch);
    closeSearchBtn.addEventListener('click', closeSearch);
    
    // Close on click outside
    searchModal.addEventListener('click', (e) => {
        if(e.target === searchModal) closeSearch();
    });

    // Search Logic
    const allData = [
        ...window.store.committees.map(c => ({ title: c.name, desc: c.desc, type: 'Committee', link: '#community' })),
        ...window.store.sccs.map(s => ({ title: s.name, desc: s.desc, type: 'SCC', link: '#community' })),
        ...window.store.groups.map(g => ({ title: g.name, desc: g.category, type: 'Group', link: '#community' })),
        ...window.store.policies.map(p => ({ title: p.title, desc: 'Church Policy Guidelines', type: 'Policy', link: `#policies-${p.target}` })),
        ...window.store.news.map(n => ({ title: n.title, desc: n.excerpt, type: 'News/Event', link: '#events' }))
    ];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        
        if (query.length < 2) return;

        const results = allData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            searchResults.innerHTML = `<p class="text-muted text-center mt-4">No results found for "${query}"</p>`;
            return;
        }

        results.slice(0, 8).forEach(res => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerHTML = `
                <a href="${res.link}" style="display:block; color:inherit;">
                    <h4>${res.title} <span class="badge badge-secondary" style="float:right; font-size:0.7rem;">${res.type}</span></h4>
                    <p>${res.desc.length > 80 ? res.desc.substring(0, 80) + '...' : res.desc}</p>
                </a>
            `;
            // Add click listener to close modal on result click
            div.querySelector('a').addEventListener('click', closeSearch);
            searchResults.appendChild(div);
        });
    });
});
