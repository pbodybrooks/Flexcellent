const ctx = document.getElementById('myChart');
const data = []
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

function init() {
    yearElement.value = new Date().getFullYear()
    chart2()
}
init()

trackerBtn.addEventListener('click', () => {
    const weightData = {
        x: weekly.value,
        y: weight.value
    };
    data.push(weightData)
    chart.update();
});
yearElement.addEventListener('change', () => {
    const year = yearElement.value
    chart.options.scales.x.min = `${year}-01`
    chart.options.scales.x.max = `${year}-12`
    chart.update();
});
