// // TODO: replace placeholders
// const startWorkout = document.querySelector('placeholder');
// const addExercise = document.querySelector('placeholder');
// const completeWorkout = document.querySelector('placeholder');
// const saveExtraInput = document.querySelector('placeholder');


// const workoutHandler = async (event) => {
//     event.preventDefault();
//     // description, date_created, user_id

//     const date_created = new Date();

    
//         const response = await fetch('/api/workouts', {
//             method: 'POST',
//             body: JSON.stringify({ date_created }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             console.log({ response })
//             // TODO: success message to user
//         } else {
//             console.error({ response })
//             // TODO: failed message to usesr
//         }
  

//     //TODO: do we also add the user id at this point?
//     // TODO: create something to render the exercise forms when startWorkout is clicked 
// };



// const exerciseFormHandler = async (event) => {
//     event.preventDefault();
    
//     // TODO: replace placeholders
//     const name = document.querySelector('placeholder').value.trim();
//     const muscle = document.querySelector('placeholder').value.trim();
//     const sets = document.querySelector('placeholder').value.trim();
//     const reps = document.querySelector('placeholder').value.trim();
//     const eqpWeight = document.querySelector('placeholder').value.trim();

//     if (name && sets && reps && eqpWeight) {
//         const response = await fetch('/api/exercises', {
//             method: 'POST',
//             body: JSON.stringify({ name, muscle, sets, reps, eqpWeight}),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             console.log({ response })
//             // TODO: success message to user
//         } else {
//             console.error({ response })
//             // TODO: failed message to usesr
//         }
//     }

// };

// const updateWorkout = async (event) => {
//     event.preventDefault();
    
//     // TODO: replace placeholders
//     const workoutName = document.querySelector('placeholder').value.trim();
//     const workoutDuration = document.querySelector('placeholder').value.trim();

//     if (workoutName || workoutDuration) {
//         //TODO: add if null, do '' or something.
//         const response = await fetch('/api/measurements', {
//             method: 'POST',
//             body: JSON.stringify({ workoutName, workoutDuration}),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             console.log({ response })
//             // TODO: success message to user
//         } else {
//             console.error({ response })
//             // TODO: failed message to usesr
//         }
//     }
// };

// startWorkout.addEventListener('submit', workoutHandler);
// addExercise.addEventListener('submit', exerciseFormHandler);
// completeWorkout.addEventListener('submit', exerciseFormHandler);
// saveExtraInput.addEventListener('submit', updateWorkout);
