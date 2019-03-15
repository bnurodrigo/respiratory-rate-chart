Chart.defaults.multicolorLine = Chart.defaults.line;
Chart.controllers.multicolorLine = Chart.controllers.line.extend({
    draw: function (ease) {
        var
            startIndex = 0,
            meta = this.getMeta(),
            points = meta.data || [],
            colors = this.getDataset().colors,
            area = this.chart.chartArea,
            originalDatasets = meta.dataset._children
                .filter(function (data) {
                    return !isNaN(data._view.y);
                });

        function _setColor(newColor, meta) {
            meta.dataset._view.borderColor = newColor;
        }

        if (!colors) {
            Chart.controllers.line.prototype.draw.call(this, ease);
            return;
        }

        for (var i = 2; i <= colors.length; i++) {
            if (colors[i - 1] !== colors[i]) {
                _setColor(colors[i - 1], meta);
                meta.dataset._children = originalDatasets.slice(startIndex, i);
                meta.dataset.draw();
                startIndex = i - 1;
            }
        }

        meta.dataset._children = originalDatasets.slice(startIndex);
        meta.dataset.draw();
        meta.dataset._children = originalDatasets;

        points.forEach(function (point) {
            point.draw(area);
        });
    }
});

window.onload = function () {
    var ctx = document.getElementById('respiratory-rate-chart').getContext('2d');
    var data = generateData();
    var labels = generateXLabels();
    var colors = generateColors(data);

    var chart = new Chart(ctx, {
        type: 'multicolorLine',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                colors: colors,
                pointBackgroundColor: colors,
                pointBorderColor: colors,
                pointRadius: 5,
                pointHoverRadius: 10,
                borderWidth: 2,
                backgroundColor: 'transparent'
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: ['Respiratory Rate', '(breath / min)'],
                fontColor: '#000',
                fontStyle: 'bold',
                fontSize: 18,
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            color: '#f2f2f2'
                        },
                        ticks: {
                            min: 0,
                            max: 6,
                            stepSize: 1,
                            userCallback: function (item) {
                                switch (item) {
                                    case 0: return '≤ 4';
                                    case 1: return '5-8';
                                    case 2: return  '9-20';
                                    case 3: return '21-30';
                                    case 4: return '31-35';
                                    case 5: return '36';
                                    default: return '≥ 37';
                                }
                            }
                        }
                    }],
                xAxes: [{
                    gridLines: {
                        color: '#f2f2f2'
                    },
                    ticks: {
                        userCallback: function (item, index) {
                            if (index !== 23 && (index % 4) !== 0) return '';
                            return item;
                        }
                    }
                }]
            },
        }
    });
}