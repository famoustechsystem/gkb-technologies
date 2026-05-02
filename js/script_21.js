
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Helper: Create ScrollTriggers for each animation
  function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  // ========== Text Animations ==========
  $("[text-wavy]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
      stagger: { amount: 1 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[text-zoom-in]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      stagger: 0.1
    });
    createScrollTrigger($(this), tl);
  });

  $("[text-flip-in]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      rotationY: -90,
      opacity: 0,
      transformOrigin: "50% 50% -50",
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: { amount: 0.6 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[text-fade-slide-left]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      x: 50,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2
    });
    createScrollTrigger($(this), tl);
  });

  $("[text-pop-up]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      scale: 0,
      opacity: 0,
      rotation: 90,
      duration: 0.6,
      ease: "back.out(2.5)",
      stagger: { from: "end", amount: 0.5 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[text-fly-in-left]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      xPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.02
    });
    createScrollTrigger($(this), tl);
  });

  $("[text-tracking-in]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      letterSpacing: "0.5em",
      opacity: 0,
      duration: 0.4,
      ease: "power3.out",
      stagger: 0.03
    });
    createScrollTrigger($(this), tl);
  });

  $("[text-color-flip]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      color: "transparent",
      backgroundColor: "#000000",
      duration: 0.1,
      ease: "ease",
      stagger: 0.05
    });
    createScrollTrigger($(this), tl);
  });

  $("[text-rotate-fade-in]").each(function () {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      rotation: -90,
      opacity: 0,
      transformOrigin: "0% 50%",
      duration: 0.6,
      ease: "back.out(2)",
      stagger: 0.03
    });
    createScrollTrigger($(this), tl);
  });

  // ========== FIXED: Code-Typing Effect ==========
  $("[text-code-typing]").each(function () {
    const chars = $(this).find(".char");
    const tl = gsap.timeline({ paused: true });
    const possibleChars = "+/0._[]-@£$%&*()".split("");

    chars.each(function (index, element) {
      const origText = element.textContent;
      const cycles = gsap.utils.random(8, 16); // random # of cycles per character
      const delay = index * 0.05;

      // store original text for resets
      element.dataset.original = origText;

      tl.add(() => {
        let count = 0;
        const interval = setInterval(() => {
          element.textContent =
            possibleChars[Math.floor(Math.random() * possibleChars.length)];
          count++;
          if (count >= cycles) {
            clearInterval(interval);
            element.textContent = origText;
          }
        }, 25); // interval speed (ms)
      }, delay);
    });

    createScrollTrigger($(this), tl);
  });

  // Reset text to original on leaving the viewport (optional)
  ScrollTrigger.addEventListener("refreshInit", () => {
    $("[text-code-typing] .char").each((_, el) => {
      if (el.dataset.original) el.textContent = el.dataset.original;
    });
  });

  // Ensure initial visibility
  gsap.set("[text-split]", { opacity: 1 });
});
