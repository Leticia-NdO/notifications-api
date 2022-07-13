import { DataTypes } from 'sequelize';
import User from './User';
import db from '../database/index';
import Notification from './Notification';

// [x] atualizar modelo de UserNotification

const UserNotification = db.define('user_notifications', {
    isRead: {
        type: DataTypes.BOOLEAN(),
        allowNull: true
    },
    read_at: {
        type: DataTypes.DATE
    }
})

User.hasMany(UserNotification, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
})

Notification.hasMany(UserNotification, {
    foreignKey: {
        name: 'notification_id',
        allowNull: false
    }
})

UserNotification.sync()

export default UserNotification