var Messenger = require('../models/messenger')

module.exports.index = async (req, res) => {
    const id_user1 = req.query.id_user1
    const id_user2 = req.query.id_user2

    const messenger = await Messenger.findOne({id_user1: id_user1, id_user2: id_user2})

    res.json(messenger)

}

module.exports.send = async (req, res) => {

    const id_user1 = req.query.id_user1
    const id_user2 = req.query.id_user2

    const data = {
        id: req.query.id,
        message: req.query.message,
        name: req.query.name,
        category: req.query.category,
    }
    const messenger = await Messenger.findOne({id_user1: id_user1, id_user2: id_user2})

    messenger.content.push(data)

    messenger.save()

    res.send("Thành Công!")

}