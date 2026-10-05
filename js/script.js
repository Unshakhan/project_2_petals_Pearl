/* Petals & Pearl — all interactions in plain JavaScript */
document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Sticky navbar: solid background after scrolling ---------- */
  var header = document.getElementById("site-header");
  var SOLID = ["border-b", "border-gold/25", "bg-emerald-deep/95", "shadow-soft", "backdrop-blur"];
  var menuOpen = false;
  function updateHeader() {
    var solid = window.scrollY > 40 || menuOpen;
    SOLID.forEach(function (c) { header.classList.toggle(c, solid); });
    header.classList.toggle("bg-emerald-deep/0", !solid);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var menu = document.getElementById("mobile-menu");
  var ICON_MENU = '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var ICON_X = '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  function setMenu(open) {
    menuOpen = open;
    menu.classList.toggle("max-h-[85vh]", open); menu.classList.toggle("opacity-100", open);
    menu.classList.toggle("max-h-0", !open); menu.classList.toggle("opacity-0", !open);
    menuBtn.innerHTML = open ? ICON_X : ICON_MENU;
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.querySelectorAll("a").forEach(function (a) { a.tabIndex = open ? 0 : -1; });
    document.body.style.overflow = open ? "hidden" : "";
    updateHeader();
  }
  menuBtn.addEventListener("click", function () { setMenu(!menuOpen); });
  menu.querySelectorAll("a[href^='#']").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Smooth scrolling for in-page links ---------- */
  document.querySelectorAll("a[href^='#']").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(a.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); history.replaceState(null, "", a.getAttribute("href")); }
    });
  });

  /* ---------- Hero background slideshow (crossfade every 4.5s) ---------- */
  var slides = document.querySelectorAll("[data-slide]");
  var current = 0;
  if (slides.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(function () {
      slides[current].classList.replace("opacity-100", "opacity-0");
      current = (current + 1) % slides.length;
      slides[current].classList.replace("opacity-0", "opacity-100");
    }, 4500);
  }

  /* ---------- Product filtering ---------- */
  var JEWELLERY = ["Bracelets", "Necklaces", "Earrings"];
  var filterBtns = document.querySelectorAll("#products [role='tab']");
  var cards = document.querySelectorAll("#products article[data-category]");
  var grid = cards.length ? cards[0].parentElement : null;
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.textContent.trim();
      filterBtns.forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-selected", on);
        ["border-emerald", "bg-emerald", "text-ivory"].forEach(function (c) { b.classList.toggle(c, on); });
        ["border-border", "text-emerald-deep", "hover:border-gold"].forEach(function (c) { b.classList.toggle(c, !on); });
      });
      cards.forEach(function (card) {
        var cat = card.dataset.category;
        var show = f === "All" || (f === "Jewellery" ? JEWELLERY.indexOf(cat) > -1 : cat === f);
        card.classList.toggle("hidden", !show);
      });
      if (grid) { grid.classList.remove("animate-in"); void grid.offsetWidth; grid.classList.add("animate-in"); }
    });
  });

  /* ---------- Testimonial carousel ---------- */
  var TESTIMONIALS = [
    { quote: "The bracelet was even prettier in person. You can really feel the care in every bead, and the packaging was beautiful.", label: "Happy Customer" },
    { quote: "I shared a colour idea and they turned it into exactly what I imagined. Communication was so warm and quick.", label: "Custom Order Client" },
    { quote: "Ordered a gift for my sister — elegant, delicate and wrapped so thoughtfully. She loved it.", label: "Gift Order Client" }
  ];
  var tIndex = 0;
  var quoteEl = document.querySelector("blockquote");
  var labelEl = quoteEl ? quoteEl.nextElementSibling : null;
  var dots = document.querySelectorAll("button[aria-label^='Show testimonial']");
  function showTestimonial(i) {
    tIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    quoteEl.textContent = "\u201C" + TESTIMONIALS[tIndex].quote + "\u201D";
    labelEl.textContent = TESTIMONIALS[tIndex].label;
    quoteEl.classList.remove("animate-in"); void quoteEl.offsetWidth; quoteEl.classList.add("animate-in");
    dots.forEach(function (d, k) {
      var on = k === tIndex;
      d.setAttribute("aria-current", on);
      d.classList.toggle("w-8", on); d.classList.toggle("bg-gold", on);
      d.classList.toggle("w-2", !on); d.classList.toggle("bg-gold/35", !on);
    });
  }
  if (quoteEl) {
    document.querySelector("[aria-label='Previous testimonial']").addEventListener("click", function () { showTestimonial(tIndex - 1); });
    document.querySelector("[aria-label='Next testimonial']").addEventListener("click", function () { showTestimonial(tIndex + 1); });
    dots.forEach(function (d, k) { d.addEventListener("click", function () { showTestimonial(k); }); });
  }

  /* ---------- FAQ accordion ---------- */
  var faqBtns = document.querySelectorAll("[id^='faq-q-']");
  function setFaq(btn, open) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded", open);
    btn.querySelector("svg").classList.toggle("rotate-45", open);
    panel.classList.toggle("grid-rows-[1fr]", open); panel.classList.toggle("opacity-100", open);
    panel.classList.toggle("grid-rows-[0fr]", !open); panel.classList.toggle("opacity-0", !open);
  }
  faqBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wasOpen = btn.getAttribute("aria-expanded") === "true";
      faqBtns.forEach(function (b) { setFaq(b, false); });
      if (!wasOpen) setFaq(btn, true);
    });
  });

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById("contact-form");
  var thanks = document.getElementById("contact-thanks");
  function showError(name, msg) {
    var p = form.querySelector("[data-error='" + name + "']");
    p.textContent = msg || ""; p.classList.toggle("hidden", !msg);
    form.elements[name].setAttribute("aria-invalid", !!msg);
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = {
      name: form.elements.name.value.trim(), email: form.elements.email.value.trim(),
      type: form.elements.type.value, message: form.elements.message.value.trim()
    };
    var errors = {};
    if (v.name.length < 2) errors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) errors.email = "Please enter a valid email address.";
    if (!v.type) errors.type = "Please choose an order type.";
    if (v.message.length < 10) errors.message = "Please write a little more (at least 10 characters).";
    ["name", "email", "type", "message"].forEach(function (k) { showError(k, errors[k]); });
    if (Object.keys(errors).length === 0) {
      document.getElementById("thanks-name").textContent = v.name.split(" ")[0];
      form.reset(); form.classList.add("hidden");
      thanks.classList.remove("hidden"); thanks.classList.add("flex");
    }
  });
  document.getElementById("new-inquiry").addEventListener("click", function () {
    thanks.classList.add("hidden"); thanks.classList.remove("flex"); form.classList.remove("hidden");
  });

  /* ---------- Scroll reveal animations ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
});
