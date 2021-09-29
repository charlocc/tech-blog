const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        note: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }, 
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id',
            }, 
        }
    },
    {
        sequelize,
        freezeTableName: true,
        undescored: true, 
        modelName: 'comment'
    }
);

module.exports = Comment;