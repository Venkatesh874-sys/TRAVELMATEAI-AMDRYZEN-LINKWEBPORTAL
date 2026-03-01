/* ============================================================
   TRAVELMATE AI — MAIN APP CONTROLLER
   js/app.js
   ============================================================ */

const App = (() => {

  // ── State ──────────────────────────────────────────────────────
  let currentScreen = 'landing'; // 'landing' | 'auth' | 'app'
  let currentPage   = 'dashboard';
  let currentUser   = null;

  // ── Root Element ───────────────────────────────────────────────
  const root = document.getElementById('app');

  // ── Init ───────────────────────────────────────────────────────
  function init() {
    // Check for returning user in localStorage
    const savedUser = Helpers.store.get('travelmate_user');
    if (savedUser) {
      currentUser = savedUser;
      currentScreen = 'app';
    }

    render();
  }

  // ── Render ─────────────────────────────────────────────────────
  function render() {
    root.innerHTML = '';

    if (currentScreen === 'landing') {
      _renderLanding();
    } else if (currentScreen === 'auth') {
      _renderAuth();
    } else {
      _renderApp();
    }
  }

  // ── Landing ────────────────────────────────────────────────────
  function _renderLanding() {
    const page = LandingPage.render(() => {
      currentScreen = 'auth';
      render();
    });
    root.appendChild(page);
  }

  // ── Auth ───────────────────────────────────────────────────────
  function _renderAuth() {
    const page = AuthPage.render((userData) => {
      currentUser   = userData;
      currentScreen = 'app';
      render();
    });
    root.appendChild(page);
  }

  // ── App Shell ──────────────────────────────────────────────────
  function _renderApp() {
    if (!currentUser) {
      currentScreen = 'auth';
      render();
      return;
    }

    // Topbar
    const topbar = Topbar.render();
    root.appendChild(topbar);

    // Page Content Container
    const content = Helpers.el('div', { id: 'page-content' });
    root.appendChild(content);

    // Bottom Nav
    Nav.onNavigate((pageId) => {
      currentPage = pageId;
      _renderPage(content);
    });

    const navEl = Nav.render();
    root.appendChild(navEl);

    // Render current page
    _renderPage(content);
  }

  // ── Page Router ────────────────────────────────────────────────
  function _renderPage(container) {
    container.innerHTML = '';

    Nav.setActive(currentPage);

    let pageEl;

    switch (currentPage) {
      case 'dashboard':
        pageEl = DashboardPage.render(currentUser, (page) => {
          currentPage = page;
          _renderPage(container);
          Nav.setActive(page);
        });
        break;

      case 'planner':
        pageEl = PlannerPage.render();
        break;

      case 'translator':
        pageEl = TranslatorPage.render();
        break;

      case 'discover':
        pageEl = DiscoverPage.render();
        break;

      case 'payment':
        pageEl = PaymentPage.render();
        break;

      case 'creator':
        pageEl = CreatorPage.render();
        break;

      case 'safety':
        pageEl = SafetyPage.render(currentUser);
        break;

      case 'profile':
        pageEl = ProfilePage.render(currentUser, (updatedUser) => {
          currentUser = updatedUser;
          // Re-render profile with new data
          _renderPage(container);
        });
        break;

      default:
        pageEl = DashboardPage.render(currentUser, (page) => {
          currentPage = page;
          _renderPage(container);
          Nav.setActive(page);
        });
    }

    if (pageEl) {
      container.appendChild(pageEl);
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return { init };

})();

// ── Bootstrap ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
