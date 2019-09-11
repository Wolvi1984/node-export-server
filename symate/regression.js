(function (factory) {
    "use strict";

    if (typeof module === "object" && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function (H) {
    var processSerie = function (s, method, chart) {
        if (s.regression && (s.data.length > 0 || (method === 'update' || method === 'updateRegression'))) {
            s.regressionSettings = s.regressionSettings || {};
            s.regressionSettings.tooltip = s.regressionSettings.tooltip || {};
            s.regressionSettings.dashStyle = s.regressionSettings.dashStyle || 'solid';

            var regressionType = s.regressionSettings.type || "none";
            var regressionData = [];
            var extraSerie = {
                data: [],
                color: s.regressionSettings.color || '',
                xAxis: s.xAxis,
                yAxis: s.yAxis,
                lineWidth: s.regressionSettings.lineWidth || 2,
                marker: {enabled: false},
                visible: s.regressionSettings.visible,
                type: s.regressionSettings.linetype || 'spline',
                id: s.regressionSettings.id,
                dashStyle: s.regressionSettings.dashStyle || 'solid',
                showInLegend: false,
                enableMouseTracking: false,
                tooltip: {
                    valueSuffix: s.regressionSettings.tooltip.valueSuffix || ' '
                }
            };

            if (regressionType === "none" || regressionType === "keine") {
                extraSerie.visible = false;
                return extraSerie;
            }

            if (s.regressionSettings.coefficients && s.regressionSettings.axisRange) {
                if (regressionType === "linear") {
                    regressionData = _linear(s.regressionSettings.coefficients, s.regressionSettings.axisRange);
                    extraSerie.type = "line";
                } else if (regressionType === "poly2" || regressionType === "poly3") {
                    regressionData = _polynomial(s.regressionSettings.coefficients, s.regressionSettings.axisRange);
                } else if (regressionType === "exponential") {
                    regressionData = _exponential(s.regressionSettings.coefficients, s.regressionSettings.axisRange);
                } else {
                    console.error("Invalid regression type: ", regressionType);
                    return;
                }
            }

            extraSerie.data = regressionData;
            extraSerie.visible = regressionData.length > 0;

            return extraSerie;
        }
    };

    H.wrap(H.Chart.prototype, 'init', function (proceed) {
        var series = arguments[1].series,
            extraSeries = [],
            i, s, extraSerie;
        for (i = 0; i < series.length; i++) {
            s = series[i];
            if (s.regression) {
                extraSerie = processSerie(s, 'init', this);
                extraSeries.push(extraSerie);
                arguments[1].series[i].rendered = true;
            }
        }

        if (extraSerie)
            arguments[1].series = series.concat(extraSeries);

        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    });

    H.wrap(H.Chart.prototype, 'addSeries', function (proceed) {
        var s = arguments[1], extraSerie = processSerie(s, 'addSeries', this);
        arguments[1].rendered = true;
        if (extraSerie) {
            this.addSeries(extraSerie);
        }
        return proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    });

    H.wrap(H.Series.prototype, 'updateRegressionType', function (proceed, regressionData) {
        this.userOptions.regressionSettings.type = regressionData.regressionType.toLowerCase();
        this.userOptions.regressionSettings.coefficients = regressionData.coefficients;
        this.userOptions.regressionSettings.axisRange = regressionData.axisRange;

        var oldRegression = this.chart.get(this.userOptions.id + ":Regression");

        if (this.userOptions.regressionSettings.type !== 'none') {
            var extraSerie = processSerie(this.userOptions, 'updateRegression', this.chart);

            if (extraSerie && oldRegression) {
                oldRegression.update(extraSerie, false);
                oldRegression.show();
            }
        } else if (oldRegression)
            oldRegression.hide();

        this.createRegressionFormula();
    });

    H.wrap(H.Series.prototype, 'createRegressionFormula', function (proceed) {
        console.log("Regression loaded");

        // Regression
        switch (this.userOptions.regressionSettings.type) {
            case 'none':
                break;
            case 'linear':
                this.userOptions.regressionSettings.formula
                    = "y = " + this.userOptions.regressionSettings.coefficients[1] + "*x + " + this.userOptions.regressionSettings.coefficients[0];
                break;
            case 'exponential':
                this.userOptions.regressionSettings.formula
                    = "y = exp(" + this.userOptions.regressionSettings.coefficients[1] + "*x + " + this.userOptions.regressionSettings.coefficients[0] + ")";
                break;
            case 'poly2':
                this.userOptions.regressionSettings.formula
                    = "y = " + this.userOptions.regressionSettings.coefficients[2] + "*x² + " + this.userOptions.regressionSettings.coefficients[1] + "*x + " + this.userOptions.regressionSettings.coefficients[0];
                break;
            case 'poly3':
                this.userOptions.regressionSettings.formula
                    = "y = " + this.userOptions.regressionSettings.coefficients[3] + "*x³ + " + this.userOptions.regressionSettings.coefficients[2] + "*x² + " + this.userOptions.regressionSettings.coefficients[1] + "*x + " + this.userOptions.regressionSettings.coefficients[0];
                break;
            default:
                break;
        }
    });

    H.wrap(H.Series.prototype, 'updateRegressionSerie', function (proceed) {
        this.update.apply(this, Array.prototype.slice.call(arguments, 1));

        var extraSerie = processSerie(this.userOptions, 'update', this.chart),
            oldRegression = this.chart.get(this.userOptions.id + ":Regression");

        if (extraSerie) {
            extraSerie.visible = this.visible;
            if (oldRegression !== undefined) {
                oldRegression.update(extraSerie, false);
            } else
                this.chart.addSeries(extraSerie, false);
        }

        this.createRegressionFormula();
    });

    function _linear(coefficients, axisRange) {
        var resultLength = 500,
            step = parseFloat(((axisRange[1] - axisRange[0]) / resultLength).toFixed(5)),
            x = axisRange[0] - step,
            results = [], i;

        for (i = 0; i < resultLength + 2; i++) {
            results.push([x, (x * coefficients[1] + coefficients[0])]);

            x += step;
        }

        return results;
    }

    /**
     * Code extracted from https://github.com/Tom-Alexander/regression-js/
     */
    function _polynomial(coefficients, axisRange) {
        var resultLength = 500, step = parseFloat(((axisRange[1] - axisRange[0]) / resultLength).toFixed(5));
        var results = [], x = axisRange[0] - step, y;
        for (var i = 0; i < resultLength + 2; i++) {
            y = 0;

            for (var c = 0; c < coefficients.length; c++) {
                y += coefficients[c] * Math.pow(x, c);
            }
            results.push([x, y]);

            x += step;
        }

        return results;
    }

    /**
     * Code extracted from https://github.com/Tom-Alexander/regression-js/
     */
    function _exponential(coefficients, axisRange) {
        var resultLength = 500, step = parseFloat(((axisRange[1] - axisRange[0]) / resultLength).toFixed(5));
        var results = [], x = axisRange[0] - step;
        for (var i = 0; i < resultLength + 2; i++) {
            results.push([x, coefficients[0] * Math.pow(Math.E, coefficients[1] * x)]);

            x += step;
        }

        return results;
    }
}));
