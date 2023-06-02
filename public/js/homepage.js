const ctx = document.getElementById('myChart');
let data = []
const trackerBtn = document.getElementById('weightTrackerButton');
const yearElement = document.getElementById("year");
const weight = document.getElementById("barvalue");
const weekly = document.getElementById("trackerDate");
let chart;

function chart2() {
    const year = yearElement.value
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
                    min: `${year}-01`,
                    max: `${year}-12`

                }
            }
        }, plugins: [plugin],
    })
};
async function userData() {
    const response = await fetch('/api/weight/retriever');
    const jsonData = await response.json();
    chart.data.datasets[0].data = jsonData.weights.map((value) => { return { x: value.x, y: value.y } })
    chart.update();
    const weightDataElement = document.getElementById("weightdata")
    let html = ""
    for (let i = 0; i < jsonData.weights.length; i++) {
        html += `<div>
    
    </div>`}
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
    const year = yearElement.value
    chart.options.scales.x.min = `${year}-01`
    chart.options.scales.x.max = `${year}-12`
    chart.update();
});
