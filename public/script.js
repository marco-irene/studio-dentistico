const track = document.getElementById('carousel-track');
const slides = document.querySelectorAll('#carousel-track > div');
let currentIndex = 0;

document.getElementById('next').addEventListener('click', () => {
   currentIndex = (currentIndex + 1) % slides.length;
   track.style.transform = `translateX(-${currentIndex * 100}%)`;
});

document.getElementById('prev').addEventListener('click', () => {
   currentIndex = (currentIndex - 1 + slides.length) % slides.length;
   track.style.transform = `translateX(-${currentIndex * 100}%)`;
});

// Gestione del click sui link – chiude il menu dopo lo scroll
document.querySelectorAll('#mobileMenu a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
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
   AOS.init({
      startEvent: 'DOMContentLoaded',
      duration: 800,
      once: false,
      delay: 300,
      mirror: true
   });

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

document.addEventListener('DOMContentLoaded', function () {
   console.log("DOM completamente caricato, listener registrato.");

   const form = document.getElementById('contactForm');
   if (!form) {
      console.error("Elemento con id 'contactForm' non trovato!");
      return;
   }

   // Regex per validare la email e il numero di telefono (10 cifre)
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const phoneRegex = /^\d{10}$/;

   // Funzione helper per la validazione di un campo
   function isFieldValid(field) {
      const value = field.value.trim();
      if (!value) return false;
      if (field.id === 'email') {
         return emailRegex.test(value);
      }
      if (field.id === 'telefono') {
         return phoneRegex.test(value);
      }
      return true;
   }

   // Seleziona tutti i campi obbligatori
   const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');

   // Aggiunge il listener 'blur' per ogni campo per rimuovere il bordo rosso se il dato è valido
   requiredFields.forEach(field => {
      field.addEventListener('blur', function () {
         if (isFieldValid(field)) {
            field.classList.remove('border-red-500');
            if (!field.classList.contains('border-gray-300')) {
               field.classList.add('border-gray-300');
            }
         } else {
            field.classList.remove('border-gray-300');
            field.classList.add('border-red-500');
         }
      });
   });

   form.addEventListener('submit', async function (e) {
      e.preventDefault(); // Blocca il comportamento predefinito
      console.log("Evento submit intercettato.");

      let formValid = true;
      requiredFields.forEach(field => {
         if (!isFieldValid(field)) {
            field.classList.remove('border-gray-300');
            field.classList.add('border-red-500');
            formValid = false;
         } else {
            field.classList.remove('border-red-500');
            if (!field.classList.contains('border-gray-300')) {
               field.classList.add('border-gray-300');
            }
         }
      });

      if (!formValid) {
         console.log("Alcuni campi obbligatori non superano la validazione.");
         return;
      }

      // Aggiunge l'indicatore di caricamento
      const loadingIndicator = document.createElement('div');
      loadingIndicator.id = 'loadingIndicator';
      loadingIndicator.className = 'flex items-center justify-center mt-4';
      loadingIndicator.innerHTML = `
       <svg class="w-8 h-8 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
         <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
         <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
       </svg>
       <span class="ml-2 text-primary font-medium">Caricamento...</span>
     `;
      document.getElementById('formContainer').appendChild(loadingIndicator);

      // Prepara i dati del form
      const formData = {
         nome: form.nome.value.trim(),
         cognome: form.cognome.value.trim(),
         email: form.email.value.trim(),
         telefono: form.telefono.value.trim(),
         servizio: form.servizio.value,
         messaggio: form.messaggio.value.trim()
      };

      try {
         const response = await fetch(form.action, {
            method: form.method,
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
         });

         if (!response.ok) {
            throw new Error('Errore nell\'invio della richiesta');
         }

         // (Opzionale) Processa la risposta JSON
         const result = await response.json();

         // Rimuove l'indicatore di caricamento
         loadingIndicator.remove();

         // Nasconde il form
         form.style.display = 'none';

         // Crea il container per il messaggio di successo
         const successContainer = document.createElement('div');
         successContainer.className = 'flex flex-col items-center mt-6';
         successContainer.innerHTML = `
         <div class="relative">
           <svg class="w-16 h-16 text-green-500 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
           </svg>
         </div>
         <p class="mt-4 text-lg font-medium text-green-600">Richiesta inviata avvenuta con successo</p>
       `;

         document.getElementById('formContainer').appendChild(successContainer);

      } catch (error) {
         // In caso di errore, una volta rimosso l'indicatore, mostra un alert
         loadingIndicator.remove();
         console.error(error);
         alert('Si è verificato un errore durante l\'invio della richiesta.');
      }
   });
});