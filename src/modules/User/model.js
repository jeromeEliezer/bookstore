import { Model, DataType } from "sequelize";
import db from "../../config/database";

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          defaultValue: DataTypes.UUIDV4
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        image: {
          type: DataTypes.TEXT('long'),
        },
      },
      { sequelize, modelName: 'User' }
    );
  }

  static associate(models) {
    // define association here
    this.hasMany(models.Book, { as: 'books' });
    return this;
  }
}

User.init(db.sequelize);

export default User;