import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/index';

const Animes = db.define('animes', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tmdb_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: null
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
    preview_path: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    vote_average: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null
    },
    vote_count: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null
    },
    popularity: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    is_anime: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    premuim: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    featured: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
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
    last_upload_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    imdb_external_id: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    original_name: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: null
    },
    pinned: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    trailer_url: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    }
}, {
    timestamps: false
})

Animes.sync()

export default Animes