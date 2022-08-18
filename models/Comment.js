export { Comment };

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js';

class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
      sequelize, 
      freezeTableName: true,
      underscored: true, 
      modelName: 'comment',
    }
);
