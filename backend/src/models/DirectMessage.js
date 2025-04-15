const { DataTypes, Model, Op } = require('sequelize');
const { User } = require('./User');

const sequelize = require('./sequelize')

class DirectMessage extends Model {

    /**
     * Gets all the messages between two users
     * @param { number } userOneID The first userID to find the messages
     * @param { number? } userTwoID The second userID to find the messages
     * @returns { Promise<DirectMessage[]>} A promise that resolves to an array which contain message records 
     */
    static getMessages(userOneID, userTwoID) {
        return new Promise((resolve, reject) => {
            // If only one user was passed, get all the messages the user sent or received
            if (userTwoID == null) {
                DirectMessage.findAll(
                    {
                        attributes: [ 'createdAt', 'senderID', 'receiverID', 'msg'],
                        where: {
                            [Op.or]: [ { receiverID: userOneID }, { senderID: userOneID } ]
                        }
                    })
                    .then(messages => {
                        resolve(messages);
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else {
                DirectMessage.findAll(
                    {
                        attributes: [ 'createdAt', 'senderID', 'receiverID', 'msg'],
                        where: {
                            [Op.or]: [ { receiverID: userOneID }, { receiverID: userTwoID }, { senderID: userOneID }, { senderID: userTwoID } ]
                        }
                    })
                    .then(messages => {
                        resolve(messages);
                    })
                    .catch(err => {
                        reject(err);
                    })
            }
        })
    }

    /**
     * Adds a message to the DirectMessage table
     * @param { number } senderID The userID of the user sending the message
     * @param { number } receiverID The userID of the user receiving the message
     * @param { string } message The message text to add
     * @returns { Promise<DirectMessage> } A promise that resolves if the message was successfully added
     */
    static addMessage(senderID, receiverID, message) {
        return new Promise((resolve, reject) => {
            DirectMessage.create({ msg: message, senderID, receiverID })
                .then(msg => {
                    resolve(msg);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

const directMessageSchema = {
    msgID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    msg: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    senderID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userID'
        }
    },
    receiverID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userID'
        }
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
};

// Define User Model attributes
DirectMessage.init(
    directMessageSchema,
    {
        sequelize,
        modelName: 'DirectMessage'
    }
);

module.exports = {
    directMessageSchema,
    DirectMessage
};