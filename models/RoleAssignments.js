const { sequelize, DataTypes } = require('sequelize');
const db = require('./db');
const Users = require('./Users');
const Roles = require('./Roles');

const RoleAssignment = db.sequelize.define('role_assignments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        },
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Roles,
            key: 'id',
        },
    },
});

// Definir associações
RoleAssignment.belongsTo(Users, { foreignKey: 'user_id' });
RoleAssignment.belongsTo(Roles, { foreignKey: 'role_id' });

module.exports = RoleAssignment;
