
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".mob-nav-trigger");
    const nav = document.querySelector(".mobile-nav-wrapper");
    if (!nav) return;

    let scrollY = 0;

    const getScrollbarComp = () => {
      return window.innerWidth - document.documentElement.clientWidth;
    };

    const lock = () => {
      if (document.body.classList.contains("locked")) return;
      scrollY = window.scrollY || window.pageYOffset || 0;
      const comp = getScrollbarComp();
      // Prevent layout shift when scrollbar disappears
      if (comp > 0) {
        document.documentElement.style.paddingRight = comp + "px";
        document.body.style.paddingRight = comp + "px";
      }
      document.documentElement.classList.add("locked");
      document.body.classList.add("locked");
      // Freeze visual position
      document.body.style.top = `-${scrollY}px`;
    };

    const unlock = () => {
      if (!document.body.classList.contains("locked")) return;
      document.documentElement.classList.remove("locked");
      document.body.classList.remove("locked");
      document.documentElement.style.paddingRight = "";
      document.body.style.paddingRight = "";
      const y = scrollY || 0;
      document.body.style.top = "";
      window.scrollTo(0, y);
    };

    // Decide if nav is "open" based on computed styles
    const isOpen = () => {
      const cs = getComputedStyle(nav);
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      if (parseFloat(cs.opacity) < 0.01) return false;
      const rect = nav.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const syncLock = () => (isOpen() ? lock() : unlock());

    // Observe Webflow interactions or any class/style change
    const mo = new MutationObserver(syncLock);
    mo.observe(nav, { attributes: true, attributeFilter: ["style", "class", "aria-hidden", "hidden"] });

    // Button fallback (if you’re using a single trigger)
    if (btn) {
      btn.addEventListener("click", () => {
        // Defer until Webflow finishes toggling styles
        requestAnimationFrame(() => requestAnimationFrame(syncLock));
      });
    }

    // Safety: ensure unlock on page lifecycle changes
    window.addEventListener("pagehide", unlock);
    window.addEventListener("hashchange", () => setTimeout(syncLock, 0));

    // Initial state
    syncLock();
  });
