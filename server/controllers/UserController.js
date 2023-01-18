const User = require('../models/User')

const login = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    User.findOne({username: username, password:password})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}


const index = (req, res, next) => {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const show = (req, res, next) => {
    // let userID = req.body.userID
    // User.findById(userID)
    // .then(response => {
    //     res.json({
    //         response
    //     })
    // })

    let username = req.body.username

    User.findOne({username: username})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const store = (req, res, next) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        score: req.body.score
    })
    user.save()
    .then(response => {
        res.json({
            // message: 'User successfully added'
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const update = (req, res, next) => {
    let userID = req.body.userID
    // let updatedData = {
    //     username: req.body.username,
    //     password: req.body.password,
    //     score: req.body.score
    // }

    let updatedData = {
        score: req.body.score
    }

    let updatedScore = req.body.score

    User.findByIdAndUpdate(userID, {$set: updatedData}, {new: true})
    .then(response => {
        res.json({
            message: 'User successfully updated',
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })

}

const destroy = (req, res, next) => {
    let userID = req.body.userID

    User.findOneAndRemove(userID)
    .then(response => {
        res.json({
            message: 'User successfully deleted'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy, login
}