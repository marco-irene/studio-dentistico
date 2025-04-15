// Inizializzazione di AOS
AOS.init({
    startEvent: 'DOMContentLoaded',
    duration: 800,
    once: false,
    delay: 300,
    mirror: true
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

  document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("check");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuLinks = document.querySelectorAll("#mobileMenu nav a");
    
    // Gestione apertura/chiusura tramite checkbox
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        mobileMenu.classList.remove("translate-x-full");
        mobileMenu.classList.add("translate-x-0");
      } else {
        mobileMenu.classList.remove("translate-x-0");
        mobileMenu.classList.add("translate-x-full");
      }
    });
    
    // Al click su una voce del menu, resetta lo stato del checkbox
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        // Se è attivo, deseleziona il checkbox per chiudere il menu
        if (checkbox.checked) {
          checkbox.checked = false;
          // Facoltativo: triggeriamo manualmente il change se necessario
          checkbox.dispatchEvent(new Event("change"));
        }
      });
    });
  });
