//API endpoint route for users

const router = require('express').Router();
let User = require('../models/users.models');//require the User model

//router endpoint to handle get request
router.route('/').get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('There was an error: '+ err))
});

//route endpoint to handle post request
router.route('/add').post((req, res) =>{
    const username = req.body.username;
    const newUser = new User({ username })

    newUser.save()
        .then(() => res.json(`${username} added successfully!`))
        .catch(err => res.status(400).json(`Adding ${username} was denied due to an error: ${err}`))
});

//route to handle delete request
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json(`User has been deleted!`))
        .catch(err => res.status(400).json(`User was NOT deleted because: ${err}`));
});

module.exports = router;