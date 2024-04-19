const express = require('express');
const router = express.Router();
const {Usuarios} = require('../models/Usuarios');
const bcrypt = require('bcrypt');

router.get("/cadastrarUsuario", (req, res) => {
    res.render("cadastrarUsuario");
});

router.post('/cadastrarUsuario', async (req, res) => {
    const { username, password, confirm_password, company_email, company_name, cnpj, address, fullname, roles } = req.body;
    try {
        const userExists = await Usuarios.findOne({ where: { usr_nome: username } });

        if (userExists) {
            res.render('login', { errorMessage: 'Nome de usuário já está em uso. Por favor, escolha outro nome de usuário.' });
        } if (password !== confirm_password) {
            return res.render('cadastrarUsuario', { errorMessage: 'As senhas não coincidem. Por favor, tente novamente.' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            let profilePhotoPath;

            if (req.files && req.files.profile_photo) {
                const profilePhoto = req.files.profile_photo;
                const uploadPath = path.join(__dirname, '../public/img/uploads', profilePhoto.name);
                await profilePhoto.mv(uploadPath);
                profilePhotoPath = `/img/uploads/${profilePhoto.name}`;
                console.log('Profile photo path:', profilePhotoPath);
            }

            const user = await Usuarios.create({
                usr_nome: username,
                usr_pass: hashedPassword,
                profile_photo: profilePhotoPath,
            });

            res.redirect('/login');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.render('login', { errorMessage: 'Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde.' });
    }
});

module.exports = router;
