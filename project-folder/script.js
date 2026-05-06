(function() {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileNavLinks = document.querySelectorAll("#mobileNavLinks a");
    const menuIcon = menuToggle.querySelector("i");

    // Toggle menu open/close
    menuToggle.addEventListener("click", function(e) {
      e.stopPropagation();
      const isActive = mobileMenu.classList.toggle("active");
      
      // Update icon: bars ↔ times
      if (isActive) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
        menuToggle.setAttribute("aria-expanded", "true");
      } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Active class management for mobile links + close menu on click
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        mobileNavLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");

        // Sync with desktop active state
        const desktopLinks = document.querySelectorAll(".desktop-nav-wrapper .nav-links a");
        desktopLinks.forEach(l => l.classList.remove("active"));
        const linkText = this.textContent.trim();
        desktopLinks.forEach(desktopLink => {
          if (desktopLink.textContent.trim() === linkText) {
            desktopLink.classList.add("active");
          }
        });

        // Close mobile menu
        if (mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Desktop link clicks for active state
    const desktopNavLinks = document.querySelectorAll(".desktop-nav-wrapper .nav-links a");
    desktopNavLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        desktopNavLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");

        // Sync mobile active state
        const linkText = this.textContent.trim();
        mobileNavLinks.forEach(mobileLink => {
          mobileLink.classList.remove("active");
          if (mobileLink.textContent.trim() === linkText) {
            mobileLink.classList.add("active");
          }
        });
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
      const isClickInsideNav = event.target.closest('.navbar');
      if (!isClickInsideNav && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close mobile menu on window resize if moving to desktop view
    window.addEventListener("resize", function() {
      if (window.innerWidth > 800 && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  })();