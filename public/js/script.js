// require('dotenv').config();
// const APIKey = process.env.API_KEY; 

let getExercisesBtn = document.getElementById('getExercises');
let getRandomExercisesBtn = document.getElementById('getRandomExercises');
let getAllExercisesBtn = document.getElementById('getAllExercises');
let retrieveBtn = document.getElementById('retrieve');

// TODO: replace placeholder with element
// const selectExerciseCard = document.querySelector('placeholer');

let muscleGroupArray = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"];
// let muscleGroupArray = ["Abdominals", "Abductors", "Adductors", "Biceps", "Calves", "Chest", "Forearms", "Glutes", "Hamstrings", "Lats", "Lower_back", "Middle_back", "Neck", "Quadriceps", "Traps", "Triceps"];

//////////////////////// handlebars test ////////////////////////
// let muscleGroupArray = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"];

// const muscleGroupData = [
//     { value: 'abdominals', id: 'abdominals', label: 'Abdominals' },
//     { value: 'abductors', id: 'abductors', label: 'Abductors' },
//     { value: 'adductors', id: 'adductors', label: 'Adductors' },
//     { value: 'biceps', id: 'biceps', label: 'Biceps' },
//     { value: 'calves', id: 'calves', label: 'Calves' },
//     { value: 'chest', id: 'chest', label: 'Chest' },
//     { value: 'forearms', id: 'forearms', label: 'Forearms' },
//     { value: 'glutes', id: 'glutes', label: 'Glutes' },
//     { value: 'hamstrings', id: 'hamstrings', label: 'Hamstrings' },
//     { value: 'lats', id: 'lats', label: 'Lats' },
//     { value: 'lower_back', id: 'lower_back', label: 'Lower Back' },
//     { value: 'middle_back', id: 'middle_back', label: 'Middle Back' },
//     { value: 'neck', id: 'neck', label: 'Neck' },
//     { value: 'quadriceps', id: 'quadriceps', label: 'Quadriceps' },
//     { value: 'traps', id: 'traps', label: 'Traps' },
//     { value: 'triceps', id: 'triceps', label: 'Triceps' }
// ];
// const muscleGroupTemplate = Handlebars.compile(document.getElementById('muscleGroupTemplate').innerHTML);
// const renderedOptions = muscleGroupTemplate({ muscleGroups: muscleGroupData });
// document.querySelector('#muscleGroup optgroup').innerHTML = renderedOptions;
//////////////////////// handlebars test ////////////////////////

// call the API to get exercises based on the muscle group fed into the function
// function fetchExercises(muscleGroup) {
//     const url = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${muscleGroup}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             // TODO: add API key to .env file and reference it here

//             // API key goes in the back end - API routes. All the script.js will eventually live
//             // in an controllers > api > userRoutes.js (or other appropriate file)

//             'X-RapidAPI-Key': '',
//             'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
// 	}};

//     //await on this fetch maybe
//     // once you get the data, pass it to the render
//     return fetch(url, options)
//         .then(function (response) {
//         return response.json();
//         })
//         .then(function (data) {
//         return data;
//         });
// };

// show exercises based on the muscle group selected by the user
async function getExercises() {
    let selectedMuscleGroup = document.getElementById("muscleGroup").value;

    if (selectedMuscleGroup === "null") {
        alert("Please select a muscle group.");
    } else {
        window.location.href = '/explore?muscleGroup=' + selectedMuscleGroup;
    };
};

// show a random exercise from a random muscle group
async function getRandomMuscleGroup() {
    console.clear();
    const randomMuscleIndex = Math.floor(Math.random() * muscleGroupArray.length);
    const randomMuscleGroup = muscleGroupArray[randomMuscleIndex];

    const exercises = await fetchExercises(randomMuscleGroup);

    const randomExerciseIndex = Math.floor(Math.random() * exercises.length);
    const randomExercise = exercises[randomExerciseIndex];

    console.log(`Your random ${randomMuscleGroup} exercise:\n`);
    console.log(randomExercise);
}

// // show all exercises for all muscle groups (temp - saved to LS as arrays in one big object)
// async function getAllExercises() {
//     console.clear();
//     const allExercises = {}; // Create an empty object to store the exercises

//     for (let i = 0; i < muscleGroupArray.length; i++) {
//       const muscleGroup = muscleGroupArray[i];
//       const exercises = await fetchExercises(muscleGroup);

//       console.log(`Ten ${muscleGroup} exercises:\n`);
//       console.log(exercises);

//       allExercises[muscleGroup] = exercises; // Assign the exercises to the corresponding muscle group key
//     }
//     localStorage.setItem('allExercises', JSON.stringify(allExercises));
// }

// show all exercises for all muscle groups (temp - saved to LS as individual arrays)
async function getAllExercises() {
    console.clear();
    localStorage.clear();

    for (let i = 0; i < muscleGroupArray.length; i++) {
        let muscleGroup = muscleGroupArray[i];
        let exercises = await fetchExercises(muscleGroup);
        for (let i = 0; i < exercises.length; i++) {
            renderExercise(exercises[i]);
        }

        console.log(`Ten ${muscleGroup} exercises:\n`);
        console.log(exercises);
        localStorage.setItem(muscleGroup, JSON.stringify(exercises));
    }
}

// retrive the big allExercises object from LS and log it to the console
// function retrieveFromLocalStorage() {
//     console.clear();
//     const allExercises = JSON.parse(localStorage.getItem('allExercises'));
//     console.log(allExercises);
// }

// retrive each muscle group array from LS and log it to the console
function retrieveFromLocalStorage() {
    console.clear();

    for (let i = 0; i < muscleGroupArray.length; i++) {
        let muscleGroup = muscleGroupArray[i];
        let exercises = JSON.parse(localStorage.getItem(muscleGroup));
        console.log(`Ten ${muscleGroup} exercises:\n`);
        console.log(exercises);
        for (let i = 0; i < exercises.length; i++) {
            renderExercise(exercises[i]);
        }
    }
}

// function renderExercise(exercise) {
//     let exerciseName = toTitleCase(exercise.name);
//     let targetedMuscleGroup = toTitleCase(exercise.muscle);
//     let equipment = toTitleCase(exercise.equipment);
//     let difficulty = toTitleCase(exercise.difficulty);
//     let instructions = toTitleCase(exercise.instructions);

//     let exerciseTemplate = `
//         <div class="exercise m-4">
//             <h3>${exerciseName}</h3>
//             <p><strong>Targeted Muscle Group:</strong> ${targetedMuscleGroup}</p>
//             <p><strong>Equipment:</strong> ${equipment}</p>
//             <p><strong>Difficulty:</strong> ${difficulty}</p>
//             <p><strong>Instructions:</strong> ${instructions}</p>
//         </div>`;

//     exerciseContainer.innerHTML += exerciseTemplate;
// };

// remove underscores from the string and capitalize the first letter of each word for purtiness
function toTitleCase(str) {
    let words = str.replace("_", " ").split(" ");
    let titleCaseWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    let titleCaseStr = titleCaseWords.join(" ");
    return titleCaseStr;
};

// // TODO: add suggested exercises to card
// function exerciseCard() {

// };

// TODO: add selected exercises to DB
const storeExercise = async (event) => {
    event.preventDefault();

    // TODO: add some sort of unique identifier here like in 28-Stu_Mini-Project/Main/public/js/profile.js line: 26
    if (event.target.hasAttribute('card')) {
        const card = event.target.getAttribute('card');

        // TODO: grab info from selected card; no need to call api again -- just from text
        const name = document.querySelector('#exerciseName');
        const muscle = document.querySelector('#exerciseMuscle');
        const equipment = document.querySelector('#exerciseEquipment');
        const difficulty = document.querySelector('#exerciseDifficulty');
        const instructions = document.querySelector('#exerciseInstructions');

        const response = await fetch('/api/exercises', {
            method: 'POST',
            body: JSON.stringify({ name, muscle, equipment, difficulty, instructions }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // TODO: display a message saying it was saved to the user on the UI
        } else {
            // TODO: display an error to user
        }
    } else {
        // TODO: display different error to user
    }
};

// TODO: add event listener for exercise card
// selectExerciseCard.addEventListener('click', storeExercise);
getExercisesBtn.addEventListener('click', getExercises);
getRandomExercisesBtn.addEventListener('click', getRandomMuscleGroup);
getAllExercisesBtn.addEventListener('click', getAllExercises);
retrieveBtn.addEventListener('click', retrieveFromLocalStorage);



/////////////////////////////////////// GRAVEYARD ///////////////////////////////////////
// async function getAllExercises() {
//     const allExercises = [];
//     for (let i = 0; i < muscleGroupArray.length; i++) {
//         const exercises = await fetchExercises(muscleGroupArray[i]);
//         console.log(`Ten ${muscleGroupArray[i]} exercises:\n`);
//         console.log(exercises);
//         allExercises.push(exercises);
//         // localStorage.setItem(muscleGroupArray[i], JSON.stringify(exercises));
//     }
//     localStorage.setItem('allExercises', JSON.stringify(allExercises));
// }

// function retrieveFromLocalStorage() {
//     console.clear();
//     // for (let i = 0; i < muscleGroupArray.length; i++) {
//     //     const muscleGroup = muscleGroupArray[i];
//     //     const exercises = JSON.parse(localStorage.getItem(muscleGroupArray[i]));

//     //     console.log(`Ten ${muscleGroup} exercises:\n`);
//     //     console.log(exercises);
//     // }
//     const allExercises = JSON.parse(localStorage.getItem('allExercises'));
//     console.log(allExercises);
// }
/////////////////////////////////////// GRAVEYARD ///////////////////////////////////////