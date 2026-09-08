const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

const closeMenu = () => {
  toggle?.setAttribute("aria-expanded", "false");
  mobileNav?.classList.remove("is-open");
  mobileNav?.setAttribute("hidden", "");
};

toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  mobileNav?.classList.toggle("is-open", !open);
  mobileNav?.toggleAttribute("hidden", open);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

window.setTimeout(() => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}, 1200);
