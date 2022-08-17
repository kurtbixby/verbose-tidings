export { Post };

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js';

class Post extends Model {};

Post.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
      sequelize, 
      timestamps: false, 
      freezeTableName: true,
      underscored: true, 
      modelName: 'post',
    }
);
