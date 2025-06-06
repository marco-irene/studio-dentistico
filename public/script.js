document.addEventListener("DOMContentLoaded", function () {
  /* === Slider Fade (con opacità) === */
  const fadeSlides = document.querySelectorAll(".slide");
  let currentFadeSlide = 0;
  const showFadeSlide = (index) => {
    fadeSlides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0";
    });
  };

  const fadePrevBtn = document.getElementById("prevBtn");
  const fadeNextBtn = document.getElementById("nextBtn");
  if (fadePrevBtn && fadeNextBtn && fadeSlides.length > 0) {
    fadePrevBtn.addEventListener("click", function () {
      currentFadeSlide =
        currentFadeSlide === 0 ? fadeSlides.length - 1 : currentFadeSlide - 1;
      showFadeSlide(currentFadeSlide);
    });

    fadeNextBtn.addEventListener("click", function () {
      currentFadeSlide = (currentFadeSlide + 1) % fadeSlides.length;
      showFadeSlide(currentFadeSlide);
    });
  }

  /* === Carousel Slider (con translateX) === */
  const carouselTrack = document.getElementById("carousel-track");
  let carouselSlides = [];
  let currentCarouselIndex = 0;
  if (carouselTrack) {
    carouselSlides = carouselTrack.querySelectorAll("div");
    const carouselNextBtn = document.getElementById("next");
    const carouselPrevBtn = document.getElementById("prev");
    if (carouselNextBtn && carouselPrevBtn && carouselSlides.length > 0) {
      carouselNextBtn.addEventListener("click", function () {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselSlides.length;
        carouselTrack.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
      });
      carouselPrevBtn.addEventListener("click", function () {
        currentCarouselIndex =
          (currentCarouselIndex - 1 + carouselSlides.length) % carouselSlides.length;
        carouselTrack.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
      });
    }
  }

  /* === Smooth Scroll per Anchor e gestione mobileMenu === */
  const mobileMenu = document.getElementById("mobileMenu");
  const checkbox = document.getElementById("check");

  // Gestione di tutti i link che puntano a un anchor
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // regola l'offset se necessario
          behavior: "smooth",
        });
      }
      // Se il link appartiene al mobileMenu, chiudilo
      if (mobileMenu && mobileMenu.contains(this)) {
        mobileMenu.classList.add("translate-x-full");
        if (checkbox) {
          checkbox.checked = false;
          checkbox.dispatchEvent(new Event("change"));
        }
      }
    });
  });

  /* === Menu Mobile - Apertura/Chiusura tramite checkbox === */
  if (checkbox && mobileMenu) {
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        mobileMenu.classList.remove("translate-x-full");
        mobileMenu.classList.add("translate-x-0");
      } else {
        mobileMenu.classList.remove("translate-x-0");
        mobileMenu.classList.add("translate-x-full");
      }
    });
    // Eventuali link all'interno di <nav> del mobileMenu: chiudiamo il menu al click
    const menuLinks = mobileMenu.querySelectorAll("nav a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (checkbox.checked) {
          checkbox.checked = false;
          checkbox.dispatchEvent(new Event("change"));
        }
      });
    });
  }

  /* === Inizializzazione di AOS se presente === */
  if (typeof AOS !== "undefined") {
    AOS.init({
      startEvent: "DOMContentLoaded",
      duration: 800,
      once: false,
      delay: 300,
      mirror: true,
    });
  }

  /* === Gestione del form (contactForm) === */
  const form = document.getElementById("contactForm");
  if (form) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    const isFieldValid = (field) => {
      const value = field.value.trim();
      if (!value) return false;
      if (field.id === "email") {
        return emailRegex.test(value);
      }
      if (field.id === "telefono") {
        return phoneRegex.test(value);
      }
      return true;
    };

    const requiredFields = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );

    requiredFields.forEach((field) => {
      field.addEventListener("blur", function () {
        if (isFieldValid(field)) {
          field.classList.remove("border-red-500");
          if (!field.classList.contains("border-gray-300")) {
            field.classList.add("border-gray-300");
          }
        } else {
          field.classList.remove("border-gray-300");
          field.classList.add("border-red-500");
        }
      });
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      let formValid = true;
      requiredFields.forEach((field) => {
        if (!isFieldValid(field)) {
          field.classList.remove("border-gray-300");
          field.classList.add("border-red-500");
          formValid = false;
        } else {
          field.classList.remove("border-red-500");
          if (!field.classList.contains("border-gray-300")) {
            field.classList.add("border-gray-300");
          }
        }
      });
      if (!formValid) {
        console.log("Alcuni campi obbligatori non superano la validazione.");
        return;
      }

      // Mostra indicatore di caricamento
      const loadingIndicator = document.createElement("div");
      loadingIndicator.id = "loadingIndicator";
      loadingIndicator.className = "flex items-center justify-center mt-4";
      loadingIndicator.innerHTML = `
       <svg class="w-8 h-8 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
         <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
         <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
       </svg>
       <span class="ml-2 text-primary font-medium">Caricamento...</span>
     `;
      const formContainer = document.getElementById("formContainer");
      if (formContainer) {
        formContainer.appendChild(loadingIndicator);
      }

      const formData = {
        nome: form.nome.value.trim(),
        cognome: form.cognome.value.trim(),
        email: form.email.value.trim(),
        telefono: form.telefono.value.trim(),
        servizio: form.servizio.value,
        messaggio: form.messaggio.value.trim(),
      };

      try {
        const response = await fetch(form.action, {
          method: form.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Errore nell'invio della richiesta");
        }
        const result = await response.json();
        loadingIndicator.remove();
        form.style.display = "none";

        const successContainer = document.createElement("div");
        successContainer.className = "flex flex-col items-center mt-6";
        successContainer.innerHTML = `
         <div class="relative">
           <svg class="w-16 h-16 text-green-500 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
           </svg>
         </div>
         <p class="mt-4 text-lg font-medium text-green-600">Richiesta inviata avvenuta con successo</p>
       `;
        formContainer.appendChild(successContainer);
      } catch (error) {
        loadingIndicator.remove();
        console.error(error);
        alert("Si è verificato un errore durante l'invio della richiesta.");
      }
    });
  }

  /* === Bottone "Scroll to Top" === */
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      scrollToTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
