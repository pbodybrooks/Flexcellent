const ctx = document.getElementById('myChart');
let data = []
const trackerBtn = document.getElementById('weightTrackerButton');
const yearElement = document.getElementById("year");
const weight = document.getElementById("barvalue");
const weekly = document.getElementById("trackerDate");
const month = document.getElementById("month");
let chart;

function getMinMax() {
    const monthDate = month.value
    const yearDate = yearElement.value
    const min = `${yearDate}-${(monthDate) < 10 ? "0" + (monthDate) : monthDate}`;
    const lastDate = new Date(yearDate, monthDate, 1)
    const max = `${lastDate.getFullYear()}-${(lastDate.getMonth() + 1) < 10 ? "0" + (lastDate.getMonth() + 1) : lastDate.getMonth()}`
    return { min: min, max: max }

}

function chart2() {
    const minMax = getMinMax()
    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.color || '#292827';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    }
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Weight Tracker',
                data: data,
                borderWidth: 5,
                borderColor: '#9D3FAE',
                backgroundColor: '#00CAB1',
                pointRadius: 8,
            }]
        },
        options: {
            scales: {
                y: {
                    grace: "5%",
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value + "LB";
                        }
                    }
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    },
                    min: minMax.min,
                    max: minMax.max

                }
            }
        }, plugins: [plugin],
    })
};

async function deleteWeight(id) {
    const remove = await fetch('/api/weight/delete', {
        method: "delete", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({ rowId: id })
    })
    userData()
}
async function upWeight(id) {
    const weight = document.querySelector(`.row${id} input.weight`).value
    const date = document.querySelector(`.row${id} input.date`).value
    const remove = await fetch('/api/weight/update', {
        method: "put", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({ rowId: id, weight: weight, date: date })
    })
    userData()
}

async function userData() {
    const response = await fetch('/api/weight/retriever');
    const jsonData = await response.json();
    console.log(jsonData)
    chart.data.datasets[0].data = jsonData.weights.map((value) => { return { x: value.x, y: value.y } })
    chart.update();
    const weightDataElement = document.getElementById("weightdata")
    let html = ""
    for (let i = 0; i < jsonData.weights.length; i++) {
        const date = new Date(jsonData.weights[i].x);

        const formattedDated = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${(date.getDate() < 10 ? "0" + date.getDate() : date.getDate())}`;

        console.log(date, formattedDated)
        html += `<div class= "row${jsonData.weights[i].id}">
        <input class="weight" type="number" value= "${jsonData.weights[i].y}"/>
    <input class="date" type="date" value = "${formattedDated}"/>
    <button class="updateWeightBtn" data-userId="${jsonData.id}" onclick="upWeight(${jsonData.weights[i].id})">
        Update
    </button>
    <button class= "deleteWeightBtn" data-userId="${jsonData.id}" onclick="deleteWeight(${jsonData.weights[i].id})">
    Delete Me </button>
    </div>`
    }
    weightDataElement.innerHTML = html;

}
function init() {
    yearElement.value = new Date().getFullYear()
    chart2()
    userData()

}
init()

trackerBtn.addEventListener('click', async () => {
    const weightData = {
        date: weekly.value,
        weight: weight.value
    };
    const storing = await fetch('/api/weight/add', {
        method: "POST", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify(weightData)
    })
    userData()
    // const jsonData = await storing.json();
    // data.push(weightData)
    // chart.update();
});
yearElement.addEventListener('change', () => {
    const minMax = getMinMax()
    chart.options.scales.x.min = minMax.min
    chart.options.scales.x.max = minMax.max
    chart.update();
});

month.addEventListener('change', () => {
    const minMax = getMinMax()
    chart.options.scales.x.min = minMax.min
    chart.options.scales.x.max = minMax.max
    chart.update();
});
