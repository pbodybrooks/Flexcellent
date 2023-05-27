// require('dotenv').config();

let getExercisesBtn = document.getElementById('getExercises');
let getRandomExercisesBtn = document.getElementById('getRandomExercises');
let getAllExercisesBtn = document.getElementById('getAllExercises');
let retrieveBtn = document.getElementById('retrieve');

let muscleGroupArray = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"];

function fetchExercises(muscleGroup) {
    const url = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${muscleGroup}`;
    const options = {
        method: 'GET',
        headers: {
            // TODO: add API key to .env file and reference it here
            'X-RapidAPI-Key': '796f6b4699mshefa8dc1aaefb6bdp14d3f6jsn3ee6a9cbc13a',
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
	}};

    return fetch(url, options)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {

        // console.log("Exercise data: ", data);
        return data;
        });
    
}

// show exercises based on the muscle group selected by the user
async function getExercises() {
    let selectedMuscleGroup = document.getElementById("muscleGroup").value;

    // if the user fails to enter any of the required criteria, alert them to which criteria was left blank and must be filled
    if (selectedMuscleGroup === "null") {
        alert("Please select a muscle group.");
    }
    else {
        const exercises = await fetchExercises(selectedMuscleGroup);
        console.log(`Ten ${selectedMuscleGroup} exercises:\n`);
        console.log(exercises);
    }
}

// function getRandomMuscleGroup() {
//     const randomMuscleIndex = Math.floor(Math.random() * muscleGroupArray.length);
//     const randomMuscleGroup = muscleGroupArray[randomMuscleIndex];
//     fetchExercises(randomMuscleGroup);
// }

// needs to be updated to show a random exercise from the random muscle group, rather than a full muscle group
async function getRandomMuscleGroup() {
    const randomMuscleIndex = Math.floor(Math.random() * muscleGroupArray.length);
    const randomMuscleGroup = muscleGroupArray[randomMuscleIndex];

    const exercises = await fetchExercises(randomMuscleGroup);

    const randomExerciseIndex = Math.floor(Math.random() * exercises.length);
    const randomExercise = exercises[randomExerciseIndex];

    console.log(`Your random ${randomMuscleGroup} exercise:\n`);
    console.log(randomExercise);
}


async function getAllExercises() {
    for (let i = 0; i < muscleGroupArray.length; i++) {
        const exercises = await fetchExercises(muscleGroupArray[i]);
        console.log(`Ten ${muscleGroupArray[i]} exercises:\n`);
        console.log(exercises);
        localStorage.setItem("muscleGroup", JSON.stringify(exercises));
    }
}

function retrieveFromLocalStorage() {
    for (let i = 0; i < muscleGroupArray.length; i++) {
        const muscleGroup = muscleGroupArray[i];
        const exercises = JSON.parse(localStorage.getItem(muscleGroup));

        console.log(`Ten ${muscleGroup} exercises:\n`);
        console.log(exercises);
    }
}


getExercisesBtn.addEventListener('click', getExercises);
getRandomExercisesBtn.addEventListener('click', getRandomMuscleGroup);
getAllExercisesBtn.addEventListener('click', getAllExercises);
retrieveBtn.addEventListener('click', retrieveFromLocalStorage);

