import { DataTypes } from 'sequelize';
import db from '../database/index';

// [x] atualizar model de Notification

const Notification = db.define('notifications', {
    notification_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    notification_image_url: {
        type: DataTypes.STRING(191),
        allowNull: false
    },
    notification_backdrop_path: {
        type: DataTypes.STRING(191),
        allowNull: false
    },
    media_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
    },
}, {
    timestamps: true,
    createdAt: true, // don't add createdAt attribute
    updatedAt: false,
})

Notification.sync()

export default Notification;
