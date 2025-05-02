require('dotenv').config({
    path: __dirname + '/.env'
 });
 const PORT = process.env.PORT || 3000;
 const express = require('express');
 const nodemailer = require('nodemailer');
 
 const app = express();

 const path = require('path');

// Aggiungi questa route prima di app.listen()
app.get('/', (req, res) => {
  // Se hai un file index.html in public, lo invia
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
 
 // Serve i file statici dalla cartella 'public'
 app.use(express.static('public'));
 
 // Middleware per parsare i dati del form
 app.use(express.urlencoded({
    extended: true
 }));
 app.use(express.json());
 
 // Configura il transporter (definito una sola volta)
 const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS,
    },
    tls: {
       rejectUnauthorized: false,
    },
    debug: process.env.NODE_ENV !== 'production',
 });
 
 // Verifica della configurazione SMTP
 transporter.verify((error, success) => {
    if (error) {
       console.error('Errore nella configurazione del transporter:', error);
    } else {
       console.log('Server SMTP pronto per l\'invio delle email');
    }
 });
 
 // Rotta per gestire l'invio della mail
 app.post('/send-email', async (req, res) => {
    const {
       nome,
       cognome,
       email,
       telefono,
       servizio,
       messaggio
    } = req.body;
 
    // Componi il corpo dell'email per l'admin
    const emailContent = `
 Nuova richiesta dal form:
 --------------------------
 Nome: ${nome}
 Cognome: ${cognome}
 Email: ${email}
 Telefono: ${telefono}
 Servizio richiesto: ${servizio}
 
 ${messaggio || '(nessun messaggio)'}
 
 --------------------------
   `;
 
    try {
       // Invia la mail all'amministratore
       let infoAdmin = await transporter.sendMail({
          from: `"Sito Web" <${process.env.EMAIL_USER}>`, // L'indirizzo autenticato
          replyTo: email, // Risposta indirizzata all'email dell'utente
          to: 'marco.irene96@gmail.com',
          subject: `RICHIESTA APPUNTAMENTO DAL SITO - ${nome} ${cognome}`,
          text: emailContent,
       });
       console.log("Email inviata all'amministratore: " + infoAdmin.response);
 
       // Invia la mail di conferma all'utente
       let infoUser = await transporter.sendMail({
          from: `"No Reply" <${process.env.EMAIL_FROM}>`,
          to: email,
          subject: "Conferma richiesta appuntamento",
          text: `Ciao ${nome},
 
 Grazie per averci contattato. Abbiamo ricevuto la tua richiesta di appuntamento e ti contatteremo al più presto per confermare.
 
 Cordiali saluti,
 Centro Dentistico Terracorta`,
       });
       console.log("Email di conferma inviata all'utente: " + infoUser.response);
 
       // Rispondi con un messaggio di successo (eventualmente potresti inoltrare ulteriori dettagli in JSON)
       res.json({
          message: 'Richiesta inviata correttamente'
       });
    } catch (error) {
       console.error("Errore durante l'invio delle email:", error);
       res.status(500).json({
          error: 'Errore durante l\'invio della mail'
       });
    }
 });
 
 
 // Avvia il server
 app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
 });
