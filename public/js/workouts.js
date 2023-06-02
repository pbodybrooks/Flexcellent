

// function formAppear() {
//     document.getElementById("workForm").style.visibility = "visible";
// }

// document.getElementsById("workbtn").addEventListener("click", formAppear);

function createCard() {
    var cardEle = document.createElement('div');
    var container = document.querySelector('.workouts');
    cardEle.style.width = '250px';
    cardEle.style.height = '400px';
    cardEle.style.backgroundColor = 'lightgrey';
    container.appendChild(cardEle);
}