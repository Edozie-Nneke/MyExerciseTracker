const router = require('express').Router();
let Exercise = require('../models/exercise.models');

//route endpoint to handle "GET" requests
router.route('/').get((req, res) =>{
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json(`Unable to get exercises due to: ${err}`));
});

//route to handle exercise "GET" requests BY ID
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json(`Unable to find user because: ${err}`))
});

//route to handle exercise "POST" requests
router.route('/add').post((req, res) =>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json(`${username}'s exercise added successfully!`))
        .catch(err => res.status(400).json(`Unable to add ${username}'s exercise due to: ${err}`))

});

//route to handle "DELETE" BY ID 
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json(`Selected Exercise Deleted.`))
        .catch(err => res.status(400).json(`Unable to delete selected user because: ${err}`))
});

//route to handle "UPDATE" (obviously by ID)
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json(`Selected Exercise Updated!`))
                .catch(err => res.status(400).json(`Unable to update. Why? ${err}`));
        })
        .catch(err => res.status(400).json(`Unable to update, because: ${err}`));
});



module.exports = router;