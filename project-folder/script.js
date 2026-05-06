(function () {
      const menuToggle = document.getElementById("menuToggle");
      const mobileMenu = document.getElementById("mobileMenu");
      const mobileNavLinks = document.querySelectorAll("#mobileNavLinks a");
      const menuIcon = menuToggle.querySelector("i");

      menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        const isActive = mobileMenu.classList.toggle("active");
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

      mobileNavLinks.forEach(link => {
        link.addEventListener("click", function (e) {
          mobileNavLinks.forEach(l => l.classList.remove("active"));
          this.classList.add("active");
          const desktopLinks = document.querySelectorAll(".desktop-nav-wrapper .nav-links a");
          desktopLinks.forEach(l => l.classList.remove("active"));
          const linkText = this.textContent.trim();
          desktopLinks.forEach(desktopLink => {
            if (desktopLink.textContent.trim() === linkText) {
              desktopLink.classList.add("active");
            }
          });
          if (mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
            menuToggle.setAttribute("aria-expanded", "false");
          }
        });
      });

      const desktopNavLinks = document.querySelectorAll(".desktop-nav-wrapper .nav-links a");
      desktopNavLinks.forEach(link => {
        link.addEventListener("click", function (e) {
          desktopNavLinks.forEach(l => l.classList.remove("active"));
          this.classList.add("active");
          const linkText = this.textContent.trim();
          mobileNavLinks.forEach(mobileLink => {
            mobileLink.classList.remove("active");
            if (mobileLink.textContent.trim() === linkText) {
              mobileLink.classList.add("active");
            }
          });
        });
      });

      document.addEventListener("click", function (event) {
        const isClickInsideNav = event.target.closest('.navbar');
        if (!isClickInsideNav && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth > 800 && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    })();