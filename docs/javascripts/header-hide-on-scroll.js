/* Hide fixed header + tab strip on scroll down (desktop); show on scroll up. */
(function () {
  const mq = window.matchMedia("(min-width: 1220px)");
  let lastY = window.scrollY;
  let ticking = false;

  function measure() {
    const hdr = document.querySelector(".md-header");
    const tabs = document.querySelector(".md-tabs");
    const root = document.documentElement;
    if (hdr) root.style.setProperty("--hdr-h", hdr.offsetHeight + "px");
    if (tabs) root.style.setProperty("--tabs-h", tabs.offsetHeight + "px");
  }

  function onScroll() {
    if (!mq.matches) {
      document.documentElement.classList.remove("hide-top-nav-on-scroll");
      return;
    }
    const y = window.scrollY;
    const delta = y - lastY;
    if (y < 24) {
      document.documentElement.classList.remove("hide-top-nav-on-scroll");
    } else if (delta > 6) {
      document.documentElement.classList.add("hide-top-nav-on-scroll");
    } else if (delta < -6) {
      document.documentElement.classList.remove("hide-top-nav-on-scroll");
    }
    lastY = y;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", function () {
    measure();
    lastY = window.scrollY;
    onScroll();
  });
  mq.addEventListener("change", function () {
    measure();
    lastY = window.scrollY;
    onScroll();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", measure);
  } else {
    measure();
  }
})();
