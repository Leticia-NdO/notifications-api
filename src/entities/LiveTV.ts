import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/index';

const LiveTV = db.define('livetvs', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(191),
        allowNull: false
    },
    overview: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    poster_path: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    backdrop_path: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    link: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    live: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    vip: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    views: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    featured: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    embed: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    hls: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    timestamps: false
})

LiveTV.sync()

export default LiveTV