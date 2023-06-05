// select button to create a new custom workout
const addWorkoutBtn = document.querySelector('#addWorkoutBtn');

// takes the user to a page to create a new custom workout 
// TODO: functionality may need updates to comply with Mckay's stuff
function addWorkout() {
    window.location.href = '/addWorkouts';
}

// custom workout button event listener
addNewWorkoutBtn.addEventListener('click', addWorkout);