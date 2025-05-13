require('dotenv').config({
    path: __dirname + '/.env'
});
const PORT = process.env.PORT || 3000;
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Costruisci il percorso assoluto per la cartella "public" che si trova fuori dalla root "server"
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


// Serve i file statici dalla cartella 'public'
app.use(express.static(publicPath));

// Middleware per parsare i dati del form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura il transporter per inviare email
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
    const { nome, cognome, email, telefono, servizio, messaggio } = req.body;

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
       let infoAdmin = await transporter.sendMail({
          from: `"Sito Web" <${process.env.EMAIL_USER}>`,
          replyTo: email,
          to: 'marco.irene96@gmail.com',
          subject: `RICHIESTA APPUNTAMENTO DAL SITO - ${nome} ${cognome}`,
          text: emailContent,
       });
       console.log("Email inviata all'amministratore: " + infoAdmin.response);

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

       res.json({ message: 'Richiesta inviata correttamente' });
    } catch (error) {
       console.error("Errore durante l'invio delle email:", error);
       res.status(500).json({ error: 'Errore durante l\'invio della mail' });
    }
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
