'use strict';

Highcharts.setOptions({
    legend: {
        enabled: false
    },
    exporting: {
        fallbackToExportServer: false,
    },
    credits: {
        enabled: false,
        position: {
            align: "right"
        },
        href: "https://www.symate.de",
        text: "© Symate GmbH 2019"
    },
    navigator: {
        enabled: false
    },
    rangeSelector: {
        enabled: false
    },
    scrollbar: {
        enabled: false,
        liveRedraw: false
    },
    xAxis: {
        crosshair: {
            snap: false
        },
        labels: {
            useHTML: true,
            formatter: function () {
                if (this.axis.userOptions.type === 'datetime')
                    return this.axis.defaultLabelFormatter.call(this);
                else {
                    var text = this.value.toString(), limit = this.axis.type === 'line' ? 6 : 10;
                    if (text.length >= limit) {
                        return '<div style="font-size:10px;overflow:hidden;color: #384252; top: 4px" title="' + text + '">' + text.substring(0, limit) + '...' + '</div>';
                    } else
                        return text;
                }
            }
        },
        showFirstLabel: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            enabled: false
        },
        labels: {
            align: 'left',
            y: 4
        },
        tickPixelInterval: 30,
        showEmpty: false,
        showFirstLabel: true,
        showLastLabel: true,
        startOnTick: false,
        endOnTick: false,
    },
    plotOptions: {
        arearange: {
            fillOpacity: 0.2,
        },
        scatter: {
            color: "#fff",
            regressionSettings: {
                hideInLegend: true,
                dashStyle: "solid",
                color: "#F1582D"
            }
        },
        column: {
            borderRadius: 3,
            pointPadding: 0,
            groupPadding: 0,
            pointPlacement: 'between'
        },
        columnrange: {
            grouping: false,
            dataGrouping: {
                enabled: false
            }
        },
        boxplot: {
            doQuartiles: false,
            stickyTracking: false
        },
        histogram: {
            pointPadding: 0,
            groupPadding: 0,
            pointPlacement: 'between'
        },
        xrange: {
            borderWidth: 0,
            borderRadius: 3,
            minPointWidth: 5,
            maxPointWidth: 8,
            minPointLength: 1,
            pointPadding: 0,
            colorByPoint: false,
            grouping: false,
            dataGrouping: {
                enabled: false
            },
            dataLabels: {
                enabled: false,
            },
            stickyTracking: false
        }
    }
});
