const { DataTypes } = require('sequelize');
const db = require("./db");


const UserRoles = db.sequelize.define('user_roles', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'role_id'
        }
    }
}, {
    timestamps: false, // To disable createdAt and updatedAt columns
    primaryKey: true
});

// Synchronize the table
UserRoles.sync()
    .then(() => {
        console.log('Tabela de user_roles sincronizada com sucesso.');

        // Check if the table is empty
        return UserRoles.count();
    })
    .then((count) => {
        if (count === 0) {
            // Table is empty, add a new entry
            return UserRoles.create({
                user_id: 1,
                role_id: 1
            });
        } else {
            // Table is not empty
            console.log('A tabela já contém registros. Não é necessário adicionar uma nova entrada.');
        }
    })
    .then(() => {
        console.log('Operação concluída com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabela de USER_ROLES:', error);
    });

module.exports = {
    UserRoles
};
