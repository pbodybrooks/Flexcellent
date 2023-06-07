const saveWorkout = document.querySelector('.savebtn');
const newExercise = document.querySelector('.newExc');
let cardNum = 0;

// create an exercise that serves as the sub-cards for the "Create a Workout" functionality 

function createCard() {
    var cardEle = document.createElement('div');
    cardEle.classList.add('workCard');
    var container = document.querySelector('.workouts');
    // console.log(container);
    container.appendChild(cardEle);

    var formhtml =`<form name='input' class='workoutForm workoutForm-${cardNum}' action='#' method='get'> 
        <label for='exercise'>Exercise</label>
        <input type='text' class='exercise-input-${cardNum}' name='exercise'><br>
        <label for='sets'>Sets</label>
        <input type='text' class='sets-input-${cardNum}' name='sets' >
        <label for='reps'>Reps</label>
        <input type='text' class='reps-input-${cardNum}' name='reps'>
        <label for='weight'>Weight</label>
        <input type='text' class='weight-input-${cardNum}' name='weight'><br>
        
        <div class='dualbtn'>

        </div>
        </form>`
        ;

        cardEle.innerHTML = formhtml;
        var form = cardEle.querySelector('.workoutForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        });

    cardNum++;
};

const saveAllExercises = async (event) => {
    event.preventDefault();

    const allForms = document.querySelectorAll('.workoutForm');
    for (let i = 0; i < allForms.length; i++) {
        exerciseFormHandler(i);
    }
};

const exerciseFormHandler = async (index) => {
    const muscle = document.getElementById("muscleGroup").value.trim();
    const name = document.querySelector(`.exercise-input-${index}`).value.trim();
    const sets = document.querySelector(`.sets-input-${index}`).value.trim();
    const reps = document.querySelector(`.reps-input-${index}`).value.trim();
    const eqpWeight = document.querySelector(`.weight-input-${index}`).value.trim();

    if (name && sets && reps && eqpWeight) {
        const response = await fetch('/api/exercises/addWorkouts', {
            method: 'POST',
            body: JSON.stringify({ muscle, name, sets, reps, eqpWeight}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log({ response })
            document.location.replace('/myWorkouts');
        } else {
            console.error({ response })
        }
    }

};

saveWorkout.addEventListener('click', saveAllExercises);
