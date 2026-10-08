/**
 * Portfolio Interactive Scripts
 * Clean & Modern Aesthetic
 * Features:
 * - Theme Switcher (Media query detection & localStorage persistence)
 * - Vertical Sidebar Mobile Drawer & ESC key accessibility
 * - Dynamic Scroll Spy for Navigation Highlighting
 * - Technical Skills Category Filters
 * - Projects Category Filters & Dynamic "+ Add Project" Handler
 * - Interactive Terminal Chat Assistant
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================================
     1. THEME SWITCHER (CSS MEDIA QUERY DETECTION & OVERRIDE)
     =================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  const getSavedTheme = () => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved;
    return prefersDarkScheme.matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to night mode');
      const label = themeToggleBtn.querySelector('.theme-toggle-label');
      if (label) label.textContent = isDark ? 'Light Mode' : 'Night Mode';
    }

    if (mobileThemeToggleBtn) {
      mobileThemeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      mobileThemeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to night mode');
      const sun = mobileThemeToggleBtn.querySelector('.icon-sun');
      const moon = mobileThemeToggleBtn.querySelector('.icon-moon');
      if (sun && moon) {
        sun.style.display = isDark ? 'none' : 'inline-block';
        moon.style.display = isDark ? 'inline-block' : 'none';
      }
    }
  };

  // Initialize Theme
  applyTheme(getSavedTheme());

  // Listen to system changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', next);
    applyTheme(next);
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);


  /* ===================================================================
     2. VERTICAL SIDEBAR DRAWER (MOBILE)
     =================================================================== */
  const sidebar = document.getElementById('sidebar-nav');
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const navLinks = document.querySelectorAll('.sidebar-menu .nav-item');

  const openSidebar = () => {
    if (sidebar && sidebarBackdrop) {
      sidebar.classList.add('open');
      sidebarBackdrop.classList.add('active');
      if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeSidebar = () => {
    if (sidebar && sidebarBackdrop) {
      sidebar.classList.remove('open');
      sidebarBackdrop.classList.remove('active');
      if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
      closeSidebar();
      if (menuToggleBtn) menuToggleBtn.focus();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        closeSidebar();
      }
    });
  });


  /* ===================================================================
     3. DYNAMIC SCROLL SPY FOR NAVIGATION
     =================================================================== */
  const sectionIds = ['hero', 'about', 'skills', 'timeline', 'projects', 'testimonials', 'chat', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const isMatch = link.getAttribute('data-section') === id || link.getAttribute('href') === `#${id}`;
          if (isMatch) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));


  /* ===================================================================
     4. SKILLS CATEGORY FILTER (TECHNICAL & SOFT SKILLS)
     =================================================================== */
  const techFilterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn:not(.project-filter-btn)');
  const techSkillCards = document.querySelectorAll('#tech-skills-grid .skill-category-card');
  const softSkillsGrid = document.getElementById('soft-skills-grid');
  const softSkillsDivider = document.getElementById('soft-skills-divider');

  techFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      techFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      if (filter === 'all') {
        techSkillCards.forEach(card => card.style.display = 'block');
        if (softSkillsGrid) softSkillsGrid.style.display = 'grid';
        if (softSkillsDivider) softSkillsDivider.style.display = 'block';
      } else if (filter === 'tech') {
        techSkillCards.forEach(card => card.style.display = 'block');
        if (softSkillsGrid) softSkillsGrid.style.display = 'none';
        if (softSkillsDivider) softSkillsDivider.style.display = 'none';
      } else if (filter === 'soft') {
        techSkillCards.forEach(card => card.style.display = 'none');
        if (softSkillsGrid) softSkillsGrid.style.display = 'grid';
        if (softSkillsDivider) softSkillsDivider.style.display = 'block';
      } else {
        // Specific technical categories: languages, core, tools, web, emerging
        techSkillCards.forEach(card => {
          if (card.getAttribute('data-cat') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        if (softSkillsGrid) softSkillsGrid.style.display = 'none';
        if (softSkillsDivider) softSkillsDivider.style.display = 'none';
      }
    });
  });


  /* ===================================================================
     5. PROJECTS FILTER & DYNAMIC ADD PROJECT FORM
     =================================================================== */
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      const allCards = document.querySelectorAll('#projects-grid .project-card');
      allCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filter === 'all' || cardCategory.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Handle Add Project Form Submission
  const addProjectForm = document.getElementById('add-project-form');
  const projectsGrid = document.getElementById('projects-grid');
  const addSuccessMsg = document.getElementById('add-proj-success');

  if (addProjectForm && projectsGrid) {
    addProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('new-proj-title')?.value.trim();
      const category = document.getElementById('new-proj-category')?.value || 'iot';
      const tech = document.getElementById('new-proj-tech')?.value.trim();
      const impact = document.getElementById('new-proj-impact')?.value.trim();
      const desc = document.getElementById('new-proj-desc')?.value.trim();
      const demo = document.getElementById('new-proj-demo')?.value.trim() || '#';
      const github = document.getElementById('new-proj-github')?.value.trim() || 'RESUME.pdf';

      if (!title || !desc || !tech) return;

      const techList = tech.split(',').map(t => t.trim()).filter(Boolean);
      let categoryLabel = 'IoT & Hardware';
      if (category === 'ai') categoryLabel = 'AI & Environmental';
      if (category === 'web') categoryLabel = 'Web & Dashboard';

      const newCard = document.createElement('article');
      newCard.className = 'project-card';
      newCard.setAttribute('data-category', category);

      newCard.innerHTML = `
        <div>
          <div class="project-top-row">
            <span class="project-badge">${escapeHTML(categoryLabel)}</span>
            <span class="project-status">● Newly Added</span>
          </div>
          <h3 class="project-title">${escapeHTML(title)}</h3>
          <p class="project-category">${escapeHTML(categoryLabel)} &bull; Software Project</p>
          <p class="project-desc">${escapeHTML(desc)}</p>
          ${impact ? `<div class="project-impact-line"><strong>Key Implementation:</strong> ${escapeHTML(impact)}</div>` : ''}
          <div class="skills-applied-box">
            <span class="skills-applied-title">Skills Applied From Resume:</span>
            <ul class="project-tags">
              ${techList.map(tag => `<li>${escapeHTML(tag)}</li>`).join('')}
            </ul>
          </div>
        </div>
        <footer class="project-card-footer">
          <a href="${escapeHTML(demo)}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
          <a href="${escapeHTML(github)}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View Repo / Resume</a>
        </footer>
      `;

      projectsGrid.prepend(newCard);
      addProjectForm.reset();

      if (addSuccessMsg) {
        addSuccessMsg.textContent = `✓ Project "${title}" added successfully!`;
        setTimeout(() => { addSuccessMsg.textContent = ''; }, 4000);
      }
    });
  }


  /* ===================================================================
     6. TERMINAL CHAT ASSISTANT
     =================================================================== */
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user-bubble';
      userBubble.textContent = text;
      chatMessages.appendChild(userBubble);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot-bubble';
        botBubble.textContent = getBotReply(text.toLowerCase());
        chatMessages.appendChild(botBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 350);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function getBotReply(query) {
    if (query.includes('project') || query.includes('work')) {
      return "Samanvi has built 3 key engineering projects from her resume: 1) IoT-Based Smart Dustbin (ultrasonic sensors & real-time fill alerts), 2) CropShield AI (soil moisture/temperature telemetry & AI agents), and 3) Smart Parking System (ESP32 microcontrollers & live dashboard). Check the Projects section above!";
    } else if (query.includes('skill') || query.includes('stack')) {
      return "Samanvi's resume technical toolkit includes Java, C, Python, Object-Oriented Programming (OOP), Data Structures, MySQL, Git, GitHub, Git Bash, HTML5, CSS3, JavaScript, AI Agents, GIS, and Satellite Data Analysis, along with soft skills like Problem Solving and Leadership.";
    } else if (query.includes('education') || query.includes('college') || query.includes('degree')) {
      return "Samanvi is pursuing a Bachelor of Engineering (B.E.) at Adichunchanagiri Institute of Technology (2025–2029), with earlier distinctions in Pre-University (70%) and SSLC (72%).";
    } else if (query.includes('resume') || query.includes('cv')) {
      return "You can download the official resume directly using the 'Download Resume' button in the hero section or view RESUME.pdf directly!";
    } else if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('phone')) {
      return "You can reach Samanvi directly via email at njsamanvi@gmail.com or by phone at +91 6362149577.";
    } else {
      return "Thanks for your message! Samanvi specializes in software engineering, embedded IoT, and AI systems. Feel free to explore her skills and projects, or reach out at njsamanvi@gmail.com!";
    }
  }

});
