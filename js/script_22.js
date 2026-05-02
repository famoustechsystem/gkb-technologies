
  document.addEventListener("DOMContentLoaded", function() {
    const desktopHeader = document.querySelector(".c-header-desktop");
    const mobileHeader = document.querySelector(".c-header-mobile");
    const switchWidth = 1200; // change this value to your desired pixel width

    function toggleHeader() {
      if (window.innerWidth <= switchWidth) {
        desktopHeader.style.display = "none";
        mobileHeader.style.display = "flex";
      } else {
        desktopHeader.style.display = "flex";
        mobileHeader.style.display = "none";
      }
    }

    // Run on load
    toggleHeader();
    // Run on resize
    window.addEventListener("resize", toggleHeader);
  });
