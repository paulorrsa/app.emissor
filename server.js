const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
    origin: ['https://emissor.eternasoftware.com.br', 'http://localhost:3000'],
    methods: ['POST'],
    credentials: true
}));
app.use(express.json());
app.use(express.static('.')); // Serve arquivos estáticos da pasta atual

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true para porta 465, false para outras portas
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rota para envio do formulário
app.post('/enviar-formulario', async (req, res) => {
    const { nome, email, whatsapp, mensagem } = req.body;

    try {
        // Email para a empresa
        await transporter.sendMail({
            from: `"Landing Page" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Novo Contato - Landing Page',
            html: `
                <h2>Novo contato recebido</h2>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${mensagem}</p>
            `
        });

        // Email de confirmação para o cliente
        await transporter.sendMail({
            from: `"Eterna Software" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Recebemos sua mensagem!',
            html: `
                <h2>Olá ${nome}!</h2>
                <p>Recebemos sua mensagem com sucesso!</p>
                <p>Em breve nossa equipe entrará em contato.</p>
                <br>
                <p>Atenciosamente,</p>
                <p>Equipe Eterna Software</p>
            `
        });

        res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ success: false, message: 'Erro ao enviar mensagem.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
