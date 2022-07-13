import { DataTypes, Sequelize } from 'sequelize';
import db from '../database/index';
import User from './User';

// [x] Atualizar model UserCollection
const UserCollection = db.define('user_collection', {
    media_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    media_type: {
        type: DataTypes.STRING(191),
        allowNull: true
    },
    isFavorite: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    following: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    followingAll : {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
})

User.hasMany(UserCollection, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
})

UserCollection.sync()

export default UserCollection