'use strict';

Highcharts.theme = {
    colors: ['#CDD2DC', '#009ee3', '#f15830'],
    chart: {
        backgroundColor: '#f0f1f5',
        plotBorderColor: '#606063',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 75,
        marginBottom: 25,
        style: {
            fontFamily: 'Open Sans, sans-serif'
        }
    },
    title: {
        style: {
            color: '#384252',
            fontSize: '20px',
            display: 'none'
        }
    },
    xAxis: {
        gridLineColor: '#49566B',
        labels: {
            style: {
                fontSize: '10px',
                color: '#384252'
            }
        },
        lineColor: '#49566B',
        minorGridLineColor: '#505053',
        tickColor: '#49566B',
        title: {
            style: {
                color: '#49566B'

            }
        }
    },
    yAxis: {
        gridLineColor: '#49566B',
        labels: {
            style: {
                fontSize: '10px',
                color: '#384252',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },
        lineColor: '#49566B',
        lineWidth: 0,
        minorGridLineColor: '#505053',
        tickColor: '#49566B',
        title: {
            style: {
                color: '#49566B'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderColor: '#2f3b4f',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#FFFFFF'
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: 'rgba(156,156,156,0.4)',
            lineWidth: 0,
            lineColor: '#9C9C9C',
            medianColor: '#F1582D',
            medianWidth: 2,
            stemColor: '#9C9C9C',
            stemDashStyle: 'dot',
            stemWidth: 2,
            whiskerColor: 'rgba(255,153,0,0.7)',
            whiskerLength: '50%',
            whiskerWidth: 2,
            maxPointWidth: 75
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        },
        column: {
            borderColor: '#262D38',
            color: 'rgba(255,153,0,0.7)'
        },
        histogram: {
            zIndex: -1,
            borderColor: '#262D38',
            color: 'rgba(156,156,156,0.2)'
        },
        scatter: {
            color: 'rgba(255,153,0,0.3)',
            marker: {
                radius: 3
            }
        }
    },
    legend: {
        itemStyle: {
            color: '#384252'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#FFFFFF'
        }
    },

    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },

    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },

    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#2f3b4f',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },

    navigator: {
        top: 17,
        height: 16,
        handles: {
            symbols: ['pointer', 'pointer'],
            backgroundColor: "#9c9c9d",
            lineWidth: 2,
            width: 12,
            height: 12,
            borderColor: "#384252"},
        outlineColor: "#526078",
        outlineWidth: 0,
        maskFill: "rgba(0,158,227,0.8)",
        series: {
            color: "#232d3d",
            lineColor: "#A6C7ED",
            lineWidth: 0
        },
        xAxis: {
            gridLineColor: "#49566B",
            lineWidth: 1,
            lineColor: '#49566B',
            labels: {
                style: {
                    color: '#384252'
                },
            }
        }
    },

    scrollbar: {
        barBackgroundColor: "#808083",
        barBorderColor: "#808083",
        buttonArrowColor: "#CCC",
        buttonBackgroundColor: "#606063",
        buttonBorderColor: "#606063",
        rifleColor: "#FFF",
        trackBackgroundColor: "#404043",
        trackBorderColor: "#404043"
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
