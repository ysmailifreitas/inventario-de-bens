const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const RoleAssignments = require('../models/RoleAssignments');
const Roles = require('../models/Roles');

router.get("/cadastrarUsuario", (req, res) => {
    res.render("cadastrarUsuario");
});

router.post('/cadastrarUsuario', async (req, res) => {
    const { username, password, company_email, company_name, cnpj, address, fullname, roles } = req.body;

    try {
        const userExists = await User.findOne({ where: { username: username } });

        if (userExists) {
            res.render('login', { errorMessage: 'Nome de usuário já está em uso. Por favor, escolha outro nome de usuário.' });
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

            const user = await User.create({
                username: username,
                password: hashedPassword,
                company_email: company_email,
                company_name: company_name,
                cnpj: cnpj,
                address: address,
                fullname: fullname,
                profile_photo: profilePhotoPath,
            });

            const selectedRole = await Roles.findOne({
                where: {
                    id: roles
                }
            });

            await RoleAssignments.create({
                user_id: user.id,
                role_id: selectedRole.id,
            });

            res.redirect('/login');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.render('login', { errorMessage: 'Ocorreu um erro ao cadastrar o usuário. Tente novamente mais tarde.' });
    }
});

module.exports = router;
