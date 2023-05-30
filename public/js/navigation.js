function navHome(event) {
    event.preventDefault();
    
    // TODO: add in auth checks

    window.location.href = '/home';
};

function navMyWorkouts(event) {
    event.preventDefault();
    
    // TODO: add in auth checks

    window.location.href = '/myWorkouts';
};

function navExplore(event) {
    event.preventDefault();
    
    // TODO: add in auth checks

    window.location.href = '/explore';
};


document
    .querySelector('.home-nav')
    .addEventListener('click', navHome);

document
    .querySelector('.my-workouts-nav')
    .addEventListener('click', navMyWorkouts);

document
    .querySelector('.explore-nav')
    .addEventListener('click', navExplore);