const Pages = {
    home: () => `
        <header class="hero" style="background: url('assets/hero_bg.png') center/cover no-repeat;">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <h1 class="fade-in-up">Welcome to KUCC</h1>
                <p class="fade-in-up delay-1">Where We Are One Family</p>
                <div class="hero-buttons fade-in-up delay-2">
                    <a href="#events" class="btn btn-primary">Latest News</a>
                    <a href="#about" class="btn btn-outline">Chaplain's Welcome</a>
                </div>
            </div>
        </header>

        <section class="section container">
            <div class="section-header text-center">
                <h2>Our Chaplaincy</h2>
                <p class="subtitle">Guided by the clarion call: #form ni kubelong, na kubelong ni kuparticipate</p>
            </div>
            <div class="mission-grid">
                <div class="mission-card">
                    <div class="icon">🕊️</div>
                    <h3>Spiritual Growth</h3>
                    <p>Fostering faith through daily Mass, SCC meetings, catechism, and confession.</p>
                </div>
                <div class="mission-card">
                    <div class="icon">🤝</div>
                    <h3>Community</h3>
                    <p>A family consisting mainly of KU students, staff, and surrounding residents worshipping together.</p>
                </div>
                <div class="mission-card">
                    <div class="icon">❤️</div>
                    <h3>Service</h3>
                    <p>Engaging in charity work, welfare support, needy students programs, and missionary outreach.</p>
                </div>
            </div>
        </section>

        <section class="section bg-light">
            <div class="container">
                <div class="section-header">
                    <h2>Trending Updates</h2>
                    <a href="#events" class="view-all">View all updates &rarr;</a>
                </div>
                <div class="news-grid">
                    ${window.store.news.slice(0, 3).map(n => `
                        <div class="news-card">
                            <div class="news-date">${n.date} &bull; ${n.type}</div>
                            <h3>${n.title}</h3>
                            <p>${n.excerpt}</p>
                            <a href="#events" class="read-more">Read more</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `,

    about: () => `
        <div class="page-header">
            <div class="container">
                <h1>About Us</h1>
                <p>Christ the Teacher Catholic Chaplaincy – Kenyatta University</p>
            </div>
        </div>
        
        <section class="section container">
            <div class="about-split">
                <div class="about-text">
                    <h2>History & Overview</h2>
                    <p>Christ the Teacher Catholic Chaplaincy was built in the late 1990s through the assistance of the Maryknoll Society. The Chaplaincy has the status of a parish within Ruaraka deanery in the Archdiocese of Nairobi. It is located in Kenyatta University's main campus next to KU primary school.</p>
                    <p>At KUCC, WE ARE ONE FAMILY. Followers of Christ come together in one spirit to worship and for mutual encouragement. We feature several post-modern facilities including the main Church, the Blessed Sacrament Chapel, and Bishop Ndingi Hall.</p>
                    <br>
                    <a href="#policies" class="btn btn-primary">View Church Policies</a>
                </div>
                <div class="about-image">
                    <div style="background:var(--bg-light); padding:20px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.05);">
                        <img src="assets/fr_boniface.png" alt="Fr. Dr. Boniface Kariuki" class="rounded-image shadow-lg" style="margin-bottom:20px; max-height:250px; width:100%; object-fit:cover; object-position:top;">
                        <h3 style="margin-bottom:10px;">Chaplain's Welcome</h3>
                        <p style="font-size:0.9rem; font-style:italic;">"I invite you to explore the various opportunities our chaplaincy offers for your spiritual and personal growth. Our community is here to walk with you, offer support, and help you navigate your university experience with a sense of purpose and belonging."</p>
                        <p style="font-size:0.9rem; margin-top:10px; font-weight:bold;">- Fr. Dr. Boniface Kariuki</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section bg-light">
            <div class="container">
                <div class="section-header text-center">
                    <h2>Leadership (Executive Committee)</h2>
                    <p class="subtitle">The dedicated individuals guiding our parish.</p>
                </div>
                <div class="leadership-grid">
                    ${window.store.leadership.map(l => `
                        <div class="leader-card">
                            <img src="${l.image}" alt="${l.name}" class="leader-img">
                            <div class="leader-info">
                                <h3>${l.name}</h3>
                                <p class="role">${l.role}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `,

    policies: () => `
        <div class="page-header">
            <div class="container">
                <h1>Church Policies</h1>
                <p>Guidelines for Sacraments and Ceremonies at KUCC</p>
            </div>
        </div>
        <section class="section container">
            <div class="policy-wrapper">
                <div class="policy-nav">
                    <ul>
                        <li><a href="#baptism" class="policy-link active" data-target="baptism">Policy on Baptism</a></li>
                        <li><a href="#weddings" class="policy-link" data-target="weddings">Policy on Weddings</a></li>
                        <li><a href="#funerals" class="policy-link" data-target="funerals">Policy on Funerals</a></li>
                    </ul>
                </div>
                <div class="policy-content">
                    <div id="baptism" class="policy-pane active">
                        <h2>Policy on Baptism</h2>
                        <p>Baptism is administered to the following categories:</p>
                        <h3>Babies & Children</h3>
                        <ul>
                            <li>Administered during Christmas and Easter Sunday</li>
                            <li>Parents must be active members of the parish</li>
                            <li>Children must attend catechism classes</li>
                        </ul>
                        <h3>Students / Adults</h3>
                        <ul>
                            <li>Administered during Easter Vigil / Lent period</li>
                            <li>Must be active members of the SCC</li>
                        </ul>
                    </div>
                    <div id="weddings" class="policy-pane">
                        <h2>Policy on Weddings</h2>
                        <p>Governs all weddings taking place in Christ the Teacher Parish.</p>
                        <ul>
                            <li>Weddings must be officially communicated and arranged well in advance.</li>
                            <li>To have a wedding, one must be an active member through SCCs, post-graduate members, or Alumni.</li>
                            <li>One must be approved by their group coordinator as an active member.</li>
                            <li><strong>NB:</strong> Father gives the final approval.</li>
                        </ul>
                    </div>
                    <div id="funerals" class="policy-pane">
                        <h2>Policy on Funerals</h2>
                        <p>In case of death of an active member:</p>
                        <ul>
                            <li>A requiem Mass shall be conducted as arranged by the bereaved family and the chaplaincy.</li>
                            <li>Given the distance of the home, the Father may conduct Mass at the deceased's home, not necessarily the burial Mass.</li>
                            <li>The parish shall send two representatives: a PPC member and a friend who speaks the local language.</li>
                            <li>The parish caters for fare, accommodation (Ksh. 700/day), food (Ksh. 400/day) where applicable.</li>
                            <li>There shall be a condolence fee of Ksh. 5,000.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `,

    community: () => `
        <div class="page-header">
            <div class="container">
                <h1>Community & Groups</h1>
                <p>Find your place in our 23 vibrant parish groups.</p>
            </div>
        </div>
        <section class="section container">
            
            <div class="group-section">
                <h2>Committees (PPC)</h2>
                <div class="grid-3">
                    ${window.store.committees.map(c => `
                        <a href="#group-${c.id}" class="card scc-card" style="text-decoration:none; color:inherit; display:block;">
                            <div class="scc-header" style="padding:15px; border-bottom:1px solid #eee;">
                                <h3 style="margin:0;">${c.name}</h3>
                            </div>
                            <div class="scc-body" style="padding:15px;">
                                <p style="margin:0; font-size:0.9rem; color:#555;">${c.desc}</p>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>

            <div class="group-section mt-5">
                <h2>Small Christian Communities (SCCs)</h2>
                <div class="grid-3">
                    ${window.store.sccs.map(s => `
                        <a href="#group-${s.id}" class="card scc-card" style="text-decoration:none; color:inherit; display:block;">
                            <div class="scc-header" style="padding:15px; border-bottom:1px solid #eee;">
                                <h3 style="margin:0;">${s.name}</h3>
                            </div>
                            <div class="scc-body" style="padding:15px;">
                                <strong style="font-size:0.85rem; color:var(--primary);">Patron:</strong> <span style="font-size:0.85rem;">${s.patron}</span><br>
                                <p style="margin-top:10px; font-size:0.9rem; color:#555;">${s.desc}</p>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>

            <div class="group-section mt-5">
                <h2>Church Groups</h2>
                <div class="tags-container" style="display:flex; flex-wrap:wrap; gap:10px;">
                    ${window.store.groups.map(g => `
                        <a href="#group-${g.id}" class="group-tag" style="text-decoration:none; padding:10px 15px; background:white; border-radius:30px; box-shadow:0 2px 5px rgba(0,0,0,0.05); color:var(--text-color); border:1px solid #eee; transition:all 0.3s ease;">
                            ${g.name} <small style="color:var(--primary); margin-left:5px;">(${g.category})</small>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>
    `,

    events: () => `
        <div class="page-header">
            <div class="container">
                <h1>Updates & Events</h1>
                <p>Stay connected with what's happening at KUCC.</p>
            </div>
        </div>
        <section class="section container">
            <div class="events-layout">
                <div class="events-main">
                    <h2>Latest News & Articles</h2>
                    <div class="news-list">
                        ${window.store.news.map(n => `
                            <div class="news-list-item">
                                <div class="date-badge">
                                    <span class="month">${n.date.split(' ')[0]}</span>
                                    <span class="day">${n.date.split(' ')[1].replace(',', '')}</span>
                                </div>
                                <div class="details">
                                    <span class="badge badge-primary">${n.type}</span>
                                    <h3>${n.title}</h3>
                                    <p>${n.excerpt}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="events-sidebar">
                    <div class="timeline-widget">
                        <h3>Upcoming Events</h3>
                        <div class="sleek-timeline">
                            <div class="timeline-item">
                                <div class="timeline-date">Aug 15</div>
                                <div class="timeline-content">
                                    <h4>Feast of the Assumption</h4>
                                    <p>Special Mass schedule</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-date">Sep 01</div>
                                <div class="timeline-content">
                                    <h4>New Semester Mass</h4>
                                    <p>Welcoming all freshmen starting the 2024/2025 academic year.</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-date">Sep 20</div>
                                <div class="timeline-content">
                                    <h4>SCC General Meeting</h4>
                                    <p>To be held at Ndingi Hall.</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-date">Oct 05</div>
                                <div class="timeline-content">
                                    <h4>Charity Walk</h4>
                                    <p>Organized by the Welfare Committee.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="sidebar-box mt-4">
                        <h3>Connect with Us</h3>
                        <p class="text-muted">Stay tuned for localized announcements from the various groups on our social platforms or the KUCC Beam Blog.</p>
                        <a href="https://www.facebook.com/kuccfamily/" target="_blank" class="btn btn-outline btn-sm mt-3" style="color:var(--primary); border-color:var(--primary);">Facebook Page</a>
                    </div>
                </div>
            </div>
        </section>
    `,

    articles: () => `
        <div class="page-header">
            <div class="container">
                <h1>Featured Articles</h1>
                <p>Read testimonies, reflections, and deep dives from our community.</p>
            </div>
        </div>
        <section class="section container">
            <div class="news-grid">
                ${window.store.articles.map(a => `
                    <div class="card" style="display:flex; flex-direction:column;">
                        <div class="news-date">${a.date} &bull; ${a.category}</div>
                        <h3 style="margin-bottom:10px;">${a.title}</h3>
                        <p class="text-muted" style="margin-bottom:15px; font-size:0.85rem;">By ${a.author}</p>
                        <p style="flex-grow:1;">${a.content}</p>
                        <a href="#articles" class="read-more mt-3">Read full article</a>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    group: (groupData) => `
        <div class="page-header">
            <div class="container">
                <a href="#community" class="btn btn-outline btn-sm mb-3" style="color:white; border-color:white; display:inline-block; margin-bottom:15px;"><i class="fa-solid fa-arrow-left"></i> Back to Community Space</a>
                <h1>${groupData.name}</h1>
                <p>${groupData.patron ? 'Patron: ' + groupData.patron : (groupData.category || 'Group Details')}</p>
            </div>
        </div>
        <section class="section container">
            <div class="card" style="padding: 30px; font-size:1.05rem; line-height:1.7;">
                ${groupData.content || '<p class="text-muted">More details about this group will be updated soon. Stay tuned!</p>'}
            </div>
        </section>
    `
};

window.Pages = Pages;
