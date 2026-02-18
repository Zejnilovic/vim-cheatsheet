const filterInput = document.getElementById("filter");
const rows = Array.from(document.querySelectorAll("tbody tr"));
const themeToggle = document.getElementById("theme-toggle");
const THEME_KEY = "vim-cheat-sheet-theme";

const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem(THEME_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);

  if (themeToggle) {
    const nextTheme = theme === "dark" ? "light" : "dark";
    themeToggle.textContent = nextTheme === "dark" ? "Dark mode" : "Light mode";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  }
};

applyTheme(getPreferredTheme());

if (filterInput) {
  filterInput.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.classList.toggle("hidden", query.length > 0 && !text.includes(query));
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}
