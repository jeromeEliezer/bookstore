import { Model, DataTypes }  from 'sequelize';
import db  from '../../config/database';

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: DataTypes.UUIDV4
                },
                firstName: DataTypes.STRING,
                lastName: DataTypes.STRING,
                email: {
                    type: DataTypes.STRING,
                },
                password: DataTypes.STRING,
            },
            { sequelize, modelName: 'User' }
        );
    }
    static associate(models) {
        return this;
    }
}
User.init(db.sequelize);

export default User;



