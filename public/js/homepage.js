const ctx = document.getElementById('myChart');

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
};

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7',
            'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
        datasets: [{
            label: 'Weight Tracker',
            data: [250, 246, 266, 255, 245, 240],
            borderWidth: 5,
            borderColor: '#9D3FAE',
            backgroundColor: '#00CAB1',
            pointRadius: 8,
        }]
    },
    options: {
        scales: {
            y: {
                textStrokeColor: "#FFEB00",
                // min: "140",
                ticks: {
                    color: "#FFEB00",
                    callback: function (value, index, ticks) {
                        return value + "LB";
                    }
                },
                grid: {
                    color: "#FFEB00"
                },
                beginAtZero: true
            },
            x: {
                ticks: {
                    color: "#FFEB00",
                },
                grid: {
                    color: "#FFEB00"
                },
            },
        }
    }, plugins: [plugin],
});