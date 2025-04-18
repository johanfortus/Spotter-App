const { Sequelize, DataTypes, Model } = require('sequelize');
const TimeSlot = require('../models/TimeSlot');

// Connect to your local DB
const dbPath = process.env.LOCAL_DB_PATH;
if (!dbPath) {
    console.error(`Error: Variable LOCAL_DB_PATH was not found .env file!`);
    process.exit(1);
}
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: this.dbFilePath
});

class Meetup extends Model {}

const meetupSchema = {
    meetupID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    meetupLocation: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    meetupTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TimeSlot,
            key: 'slotID'
        }
    }
};

// Define Meetup Model attributes
Meetup.init(meetupSchema, {
        sequelize: sequelize,
        modelName: 'Meetup'
    }
);

module.exports = {
    meetupSchema,
    Meetup
};