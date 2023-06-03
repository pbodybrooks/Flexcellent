

// function formAppear() {
//     document.getElementById("workForm").style.visibility = "visible";
// }

// document.getElementsById("workbtn").addEventListener("click", formAppear);

function createCard() {
    var cardEle = document.createElement('div');
    cardEle.classList.add('workCard');

    var container = document.querySelector('.workouts');

    console.log("clicked");

    // cardEle.style.width = '250px';
    // cardEle.style.height = '400px';
    // cardEle.style.backgroundColor = 'lightgrey';
    // cardEle.style.boxShadow = '7px 7px 5px grey';
    // cardEle.style.margin = '12px';
    // cardEle.style.borderRadius = '10px';

    container.appendChild(cardEle);

    const nodeList = document.querySelectorAll(".workCard");
    console.log(nodeList);
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerHTML ="<form name='input' action='#' method='get'>" +
        "<label for='exercise'>Exercise</label>" +
        "<input type='text' id='exercise' name='exercise'><br><br>" +
        "<label for='sets'>Sets</label>" +
        "<input type='text' id='sets' name='sets' ><br>" +
        "<label for='reps'>Reps</label>" +
        "<input type='text' id='reps' name='reps'><br>" +
        "<label for='weight'>Weight</label>" +
        "<input type='text' id='weight' name='w eight'><br><br>" +
        "<input type='submit' value='Save'>" +
        "</form>"
        ;
    }

    // document.querySelectorAll(".workCard").innerHTML=
    // "<form name='input' action='#' method='get'>" +
    // "<label for='exercise'>Exercise</label>" +
    // "<input type='text' id='exercise' name='exercise'><br><br>" +
    // "<label for='sets'>Sets</label>" +
    // "<input type='text' id='sets' name='sets' ><br>" +
    // "<label for='reps'>Reps</label>" +
    // "<input type='text' id='reps' name='reps'><br>" +
    // "<label for='weight'>Weight</label>" +
    // "<input type='text' id='weight' name='w eight'><br><br>" +
    // "<input type='submit' value='Save'>" +
    // "</form>"
    // ;

    // $(document).ready
    //     (
    //     function() {
    //             $("<div class='form-holder'>" +
    //         "<form name='input' action='#' method='get'>" +
    //         "<label for='exercise'>Exercise</label>" +
    //         "<input type='text' id='exercise' name='exercise'><br><br>" +
    //         "<label for='sets'>Sets</label>" +
    //         "<input type='text' id='sets' name='sets' ><br>" +
    //         "<label for='reps'>Reps</label>" +
    //         "<input type='text' id='reps' name='reps'><br>" +
    //         "<label for='weight'>Weight</label>" +
    //         "<input type='text' id='weight' name='w eight'><br><br>" +
    //         "<input type='submit' value='Save'>" +
    //         "</form>" +
    //         "</div>").appendTo('.workCard');
    //     }
    // )
}



