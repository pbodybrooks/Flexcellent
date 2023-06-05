
// TODO: replace placeholders
// const startWorkout = document.querySelector('placeholder');
const newExercise = document.querySelector('.newExc');
const saveExercise = document.querySelector('.formbtn');
const saveWorkout = document.querySelector('.savebtn');
// const saveExtraInput = document.querySelector('placeholder');

function createCard() {
    var cardEle = document.createElement('div');
    cardEle.classList.add('workCard');

    var container = document.querySelector('.workouts');
    console.log(container);
    container.appendChild(cardEle);

    const nodeList = document.querySelectorAll(".workCard");
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerHTML ="<form name='input' class='workoutForm' action='#' method='get'>" +
        "<label for='exercise'>Exercise</label>" +
        "<input type='text' id='exercise' name='exercise'><br>" +
        "<label for='sets'>Sets</label>" +
        "<input type='text' id='sets' name='sets' >" +
        "<label for='reps'>Reps</label>" +
        "<input type='text' id='reps' name='reps'>" +
        "<label for='weight'>Weight</label>" +
        "<input type='text' id='weight' name='weight'><br>" +
        // "<input type='button' class='formbtn' value='Save'>" +
        "</form>"
        ;
    }
    // Add in 'preventDefault();' so page is not refreshed and data is lost !!!
}


const exerciseFormHandler = async (event) => {
    event.preventDefault();
    
    // TODO: replace placeholders
    const name = document.querySelector('#exercise').value.trim();
    const sets = document.querySelector('#sets').value.trim();
    const reps = document.querySelector('#reps').value.trim();
    const eqpWeight = document.querySelector('#weight').value.trim();

    if (name && sets && reps && eqpWeight) {
        const response = await fetch('/api/exercises/addWorkouts', {
            method: 'POST',
            body: JSON.stringify({ name, sets, reps, eqpWeight}),
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

};

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
document.addEventListener('DOMContentLoaded', () => {
    saveExercise.addEventListener('submit', exerciseFormHandler);
    // completeWorkout.addEventListener('submit', exerciseFormHandler);
})

// saveExtraInput.addEventListener('submit', updateWorkout);



// function varCheck() {
//     var save_btn = document.querySelectorAll(".formbtn");
//     if (save_btn)
// }

// document.getElementsByClassName('.formbtn').onclick = function() {
//     alert("button has been clicked");
// }