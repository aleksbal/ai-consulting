// layout.js

let currentLang = "en";
let currentTheme = "light";

function setTheme(theme, store = true) {
  currentTheme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
  if (store) {
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }
  const btn = document.getElementById("btn-theme");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

function initTheme() {
  let t = null;
  try { t = localStorage.getItem("theme"); } catch (e) {}
  if (t === "light" || t === "dark") {
    setTheme(t, false);
  } else {
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      false
    );
  }
}

function toggleTheme() {
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem("lang", lang); } catch (e) {}
  document.documentElement.lang = lang;
  const enBtn = document.getElementById("btn-lang-en");
  const deBtn = document.getElementById("btn-lang-de");
  if (enBtn && deBtn) {
    enBtn.classList.toggle("lang-toggle-active", lang === "en");
    deBtn.classList.toggle("lang-toggle-active", lang === "de");
  }
}

function initLang() {
  let stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  if (stored === "en" || stored === "de") {
    setLang(stored);
  } else {
    const navLang = (navigator.language || "").toLowerCase().startsWith("de") ? "de" : "en";
    setLang(navLang);
  }
}

function injectHeader(activeNav) {
  const container = document.getElementById("site-header");
  if (!container) return;

  // activeNav can be "home", "articles", etc. We only highlight "Articles" for now.
  const articlesClasses =
    activeNav === "articles"
      ? "text-emerald-600 dark:text-emerald-300 font-medium"
      : "hover:text-emerald-600 dark:hover:text-emerald-300";

  container.innerHTML = `
    <header class="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-slate-950">
            M
          </div>
          <div>
            <div class="font-semibold tracking-tight">Modest AI Studio</div>
            <div class="text-xs text-slate-500 dark:text-slate-400">
              AI consulting for real-world projects
            </div>
          </div>
        </div>
        <nav class="hidden md:flex gap-6 text-sm text-slate-600 dark:text-slate-300">
          <a href="index.html#services" class="hover:text-emerald-600 dark:hover:text-emerald-300">Services</a>
          <a href="index.html#process" class="hover:text-emerald-600 dark:hover:text-emerald-300">Process</a>
          <a href="index.html#use-cases" class="hover:text-emerald-600 dark:hover:text-emerald-300">Use cases</a>
          <a href="index.html#about" class="hover:text-emerald-600 dark:hover:text-emerald-300">About</a>
          <a href="articles.html" class="${articlesClasses}">Articles</a>
          <a href="index.html#contact" class="hover:text-emerald-600 dark:hover:text-emerald-300">Contact</a>
        </nav>
        <div class="flex items-center gap-3">
          <div class="flex rounded-full border border-slate-300 dark:border-slate-700 text-xs overflow-hidden">
            <button id="btn-lang-en" class="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">EN</button>
            <button id="btn-lang-de" class="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">DE</button>
          </div>
          <button id="btn-theme" class="text-sm rounded-full border px-2 py-1 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"></button>
          <a href="index.html#contact" class="hidden md:inline-flex items-center rounded-full border border-emerald-500/70 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:text-emerald-100 hover:bg-emerald-500/10">
            Free intro call
          </a>
        </div>
      </div>
    </header>
  `;
}

function injectFooter() {
  const container = document.getElementById("site-footer");
  if (!container) return;
  container.innerHTML = `
    <footer class="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950">
      <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div>© <span id="year"></span> Modest AI Studio. Alle Rechte vorbehalten.</div>
        <div class="flex gap-4">
          <a href="impressum.html" class="hover:text-emerald-500">Impressum</a>
          <a href="datenschutz.html" class="hover:text-emerald-500">Datenschutzerklärung</a>
        </div>
      </div>
    </footer>
  `;
}

function setupLayout(options) {
  const opts = options || {};
  injectHeader(opts.activeNav || "home");
  injectFooter();
  initTheme();
  initLang();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hook up button events (elements exist only after injectHeader)
  const btnEn = document.getElementById("btn-lang-en");
  const btnDe = document.getElementById("btn-lang-de");
  if (btnEn) btnEn.onclick = () => setLang("en");
  if (btnDe) btnDe.onclick = () => setLang("de");

  const btnTheme = document.getElementById("btn-theme");
  if (btnTheme) btnTheme.onclick = () => toggleTheme();
}
