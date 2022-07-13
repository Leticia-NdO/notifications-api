import { DataTypes, Model, Optional } from 'sequelize';
import db from '../database/index';

const Movies = db.define('movies', {
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
    title: {
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
        type: DataTypes.DOUBLE.UNSIGNED,
        allowNull: true,
        defaultValue: null
    },
    vote_count: {
        type: DataTypes.DOUBLE.UNSIGNED,
        allowNull: true,
        defaultValue: null
    },
    popularity: {
        type: DataTypes.DOUBLE.UNSIGNED,
        allowNull: true,
        defaultValue: null
    },
    runtime: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    views: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    featured: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    premuim: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    release_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
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
    imdb_external_id: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    },
    skiprecap_start_in: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    hasrecap: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    original_name: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: null
    },
    pinned: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    sent: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    trailer_url: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: null
    }
}, {
    timestamps: false
})

Movies.sync()
export default Movies