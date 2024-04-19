const {DataTypes} = require('sequelize');
const db = require("./db");


const CargoUsuario = db.sequelize.define('cargo_usuario', {
    usr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'usuarios',
            key: 'usr_id'
        }
    },
    cargo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
    }
}, {
    tableName: 'cargo_usuario',
    timestamps: false,
    primaryKey: true
});

CargoUsuario.sync()
    .then(() => {
        console.log('Tabela de user_roles sincronizada com sucesso.');


        return CargoUsuario.count();
    })
    .then((count) => {
        if (count === 0) {

            return CargoUsuario.create({
                usr_id: 1,
                cargo_id: 1
            });
        } else {

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
    CargoUsuario: CargoUsuario
};
