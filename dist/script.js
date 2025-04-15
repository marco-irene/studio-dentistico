// Inizializzazione di AOS
AOS.init({
    startEvent: 'DOMContentLoaded',
    duration: 800,
    once: false,
    delay: 300,
    mirror: true
  });
  
  document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeMobileMenu = document.getElementById("closeMobileMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileMenuBtn || !closeMobileMenu || !mobileMenu) {
    console.error("Errore: elemento del menu mobile non trovato.");
    return;
  }

  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (mobileMenu.classList.contains("translate-x-full")) {
      mobileMenu.classList.remove("translate-x-full");
      console.log("Menu mobile aperto");
    }
  });

  closeMobileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!mobileMenu.classList.contains("translate-x-full")) {
      mobileMenu.classList.add("translate-x-full");
      console.log("Menu mobile chiuso");
    }
  });

  // Gestione del click sui link – chiude il menu dopo lo scroll
  document.querySelectorAll('#mobileMenu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Regola il valore in base all'offset desiderato
          behavior: 'smooth'
        });
        // Chiudiamo il menu mobile
        if (!mobileMenu.classList.contains("translate-x-full")) {
          mobileMenu.classList.add("translate-x-full");
          console.log("Menu mobile chiuso al click sul link");
        }
      }
    });
  });
});

  // Menu mobile
  document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const closeMobileMenu = document.getElementById("closeMobileMenu");
    const mobileMenu = document.getElementById("mobileMenu");
  
    if (!mobileMenuBtn || !closeMobileMenu || !mobileMenu) {
      console.error("Errore: elemento del menu mobile non trovato.");
      return;
    }
  
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (mobileMenu.classList.contains("translate-x-full")) {
        mobileMenu.classList.remove("translate-x-full");
        console.log("Menu mobile aperto");
      }
    });
  
    closeMobileMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!mobileMenu.classList.contains("translate-x-full")) {
        mobileMenu.classList.add("translate-x-full");
        console.log("Menu mobile chiuso");
      }
    });
  
    // Gestione del click sui link – chiude il menu dopo lo scroll
    document.querySelectorAll('#mobileMenu a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80, // Regola il valore in base all'offset desiderato
            behavior: 'smooth'
          });
          // Chiudiamo il menu mobile
          if (!mobileMenu.classList.contains("translate-x-full")) {
            mobileMenu.classList.add("translate-x-full");
            console.log("Menu mobile chiuso al click sul link");
          }
        }
      });
    });
  });  
  
  // Scroll animato per anchor
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  