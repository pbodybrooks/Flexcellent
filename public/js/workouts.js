function createCard() {
    var cardEle = document.createElement('div');
    cardEle.classList.add('workCard');

    var container = document.querySelector('.workouts');
    console.log(container);
    container.appendChild(cardEle);

    // const nodeList = document.querySelectorAll(".workCard");
    // for (let i = 0; i < nodeList.length; i++) {
    //     nodeList[i].innerHTML
    var formhtml ="<form name='input' class='workoutForm' action='#' method='get'>" +
        "<label for='exercise'>Exercise</label>" +
        "<input type='text' id='exercise' name='exercise'><br>" +
        "<label for='sets'>Sets</label>" +
        "<input type='text' id='sets' name='sets' >" +
        "<label for='reps'>Reps</label>" +
        "<input type='text' id='reps' name='reps'>" +
        "<label for='weight'>Weight</label>" +
        "<input type='text' id='weight' name='weight'><br>" +
        // "<input type='button' class='formbtn' value='Save'>" +
        "<div class='dualbtn'>" +
        "<button class = 'newExc' onclick='createCard()'>New Exercise</button>" +
        // "<button class = 'savebtn'>Save Workout</button>" +
        "</div>" +
        "</form>"
        ;

        cardEle.innerHTML = formhtml;

        var form = cardEle.querySelector('.workoutForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission and page reload
        // Handle form submission logic here if needed
    });
    
    }
    // Add in 'preventDefault();' so page is not refreshed and data is lost !!!
// }

function addEx() {

}
