// TODO: replace placeholders
const addWorkout = document.querySelector('placeholder');
const addMeasurements = document.querySelector('placeholder');

const workoutFormHandler = async (event) => {
    event.preventDefault();
    // description, date_created, user_id

    //TODO: replace placeholders
    const description = document.querySelector('placeholder').value.trim();
    const date_created = document.querySelector('placeholder').value.trim();

    if (description && date_created) {
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify({ description, date_created }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log({ response })
            // TODO: success message to user
        } else {
            console.error({ response })
            // TODO: failed message to usesr
        }
    }

    //TODO: do we also add the user id at this point?

};

const measurementFormHandler = async (event) => {
    event.preventDefault();
    // weight, waist_circumference, chest_circumference, arm_circumference, date_created, user_id
    
    //TODO: replace placeholders
    const weight = document.querySelector('placeholder').value.trim();
    const waist_circumference = document.querySelector('placeholder').value.trim();
    const chest_circumference = document.querySelector('placeholder').value.trim();
    const arm_circumference = document.querySelector('placeholder').value.trim();
    const description = document.querySelector('placeholder').value.trim();

    if (weight || waist_circumference || chest_circumference || arm_circumference || description) {
        //TODO: add if null, do '' or something.
        const response = await fetch('/api/measurements', {
            method: 'POST',
            body: JSON.stringify({ weight, waist_circumference, chest_circumference, arm_circumference, description}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log({ response })
            // TODO: success message to user
        } else {
            console.error({ response })
            // TODO: failed message to usesr
        }
    }

    //TODO: do we also add the user id at this point?

};

addWorkout.addEventListener('submit', workoutFormHandler);
addMeasurements.addEventListener('submit', measurementFormHandler);
