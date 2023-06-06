let getExercisesBtn = document.getElementById('getExercises');
let getRandomExercisesBtn = document.getElementById('getRandomExercises');
let getAllExercisesBtn = document.getElementById('getAllExercises');
let retrieveBtn = document.getElementById('retrieve');

const muscleGroupArray = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"];

// show exercises based on the muscle group selected by the user
async function getExercises(event) {
    event.preventDefault();

    let selectedMuscleGroup = document.getElementById("muscleGroup").value;

    if (selectedMuscleGroup === "null") {
        alert("Please select a muscle group.");
    } else {
        window.location.href = '/explore?muscleGroup=' + selectedMuscleGroup;
    };
};

// queries exercises based on a random muscle group
async function getRandomExercise(event) {
    event.preventDefault();
    const randomMuscleIndex = Math.floor(Math.random() * muscleGroupArray.length);

    const randomMuscleGroup = muscleGroupArray[randomMuscleIndex];

    window.location.href = '/explore?muscleGroup=' + randomMuscleGroup
};

// getExercisesBtn.addEventListener('click', getExercises);
getRandomExercisesBtn.addEventListener('click', getRandomExercise);