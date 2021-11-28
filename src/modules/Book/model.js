import { DataType, DataTypes, Model} from "sequelize";
import db from "../../config/database";

class Book extends Model {
static init(sequelize) {
    return super.init(
        {
            id: {
                type: DataType.UUID,
                primaryKey: true,
                alllowNull: false,
                autoIncrement: true,
                defaultValue: DataType.UUIDV4

            },
            title: DataTypes.STRING,
            author: DataTypes.STRING,
            collection: DataTypes.STRING,

        },
        { sequelize, modelName: 'Book' }
    );
}

static associate(models) {
    // define association here
    this.belongToMany(models.User, { })
}
    
}

Book.init(db.sequelize);

export default Book;