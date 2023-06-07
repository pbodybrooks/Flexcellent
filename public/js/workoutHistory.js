const addWorkoutBtn = document.querySelector('#addWorkoutBtn');

const redirectToAdd = async () => {
  document.location.replace('/addWorkouts');
};

addWorkoutBtn.addEventListener('click', redirectToAdd);

