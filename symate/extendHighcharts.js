(function (H) {
    H.wrap(Highcharts.Series.prototype, 'setData', function (proceed, data, redraw, animation, updatePoints) {
        var self = this;
        if (data && this.chart.options.hasOwnProperty('isExpanded') && this.yAxis.userOptions.hasOwnProperty('expandedCategories')) {
            self.yAxis.update({
                categories: self.chart.options.isExpanded ? self.yAxis.userOptions.expandedCategories : [self.yAxis.userOptions.title.text],
                max: self.chart.options.isExpanded ? (self.yAxis.userOptions.expandedCategories.length - 1) : 0
            }, false);
        }

        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    });

    H.wrap(H.Axis.prototype, 'updateNames', function (proceed) {
        var axis = this,
            names = this.names,
            i = names.length;

        if (i > 0 || axis.userOptions.type === 'category') {
            H.each(H.keys(names.keys), function (key) {
                delete names.keys[key];
            });
            names.length = 0;

            this.minRange = this.userMinRange;
            H.each(this.series || [], function (series) {

                // Reset incrementer (#5928)
                series.xIncrement = null;

                // When adding a series, points are not yet generated
                if (!series.points || series.isDirtyData) {
                    series.processData();
                    series.generatePoints();
                }

                if (series.visible) {
                    H.each(series.points, function (point, i) {
                        var x, y;
                        if (point.options) {
                            x = axis.nameToX(point);
                            y = axis.nameToY(point);
                            if (x !== undefined && x !== point.x) {
                                point.x = x;
                                series.xData[i] = x;
                            }
                            if (y !== undefined && y !== point.y) {
                                point.y = y;
                                series.yData[i] = y;
                            }
                        }
                    });
                }
            });
        }
    });

    H.wrap(H.Axis.prototype, 'nameToY', function (proceed, point) {
        var hasExpandedOption = this.chart.options.hasOwnProperty('isExpanded'),
            explicitCategories = H.isArray(this.userOptions.categories),
            expanded = hasExpandedOption ? this.chart.options.isExpanded : undefined,
            names = explicitCategories ? this.userOptions.categories : this.names,
            nameY = point.options.y,
            y;

        point.series.requireSorting = false;

        if (!H.defined(nameY)) {
            if (hasExpandedOption && !expanded) {
                nameY = 0;
            } else {
                nameY = this.options.uniqueNames === false ?
                    point.series.autoIncrement() :
                    (
                        explicitCategories ?
                            H.inArray(point.name, names) :
                            H.pick(names.keys[point.name], -1)

                    );
            }
        }

        if (nameY === -1) {
            y = undefined; //H.inArray(point.name, this.userOptions.originalCategories);
        } else {
            y = nameY;
        }

        if (y !== undefined) {
            this.names[y] = point.name;
            this.names.keys[point.name] = y;
        }

        return y;
    });

    H.wrap(H.Point.prototype, 'applyOptions', function (proceed, options, x) {
        var point = this,
            series = point.series,
            pointValKey = series.options.pointValKey || series.pointValKey;

        options = H.Point.prototype.optionsToObject.call(this, options);

        H.extend(point, options);
        point.options = point.options ?
            H.extend(point.options, options) :
            options;

        if (options.group) {
            delete point.group;
        }

        if (pointValKey) {
            point.y = point[pointValKey];
        } else if (H.defined(options.name) && series.yAxis && series.visible && series.yAxis.hasNames && series.yAxis.nameToY) {
            point.y = series.yAxis.nameToY(point);
        }

        if (series.visible) {
            point.isNull = H.pick(
                point.isValid && !point.isValid(),
                point.x === null || !H.isNumber(point.y, true)
            ); // #3571, check for NaN

            // The point is initially selected by options (#5777)
            if (point.selected) {
                point.state = 'select';
            }

            // If no x is set by now, get auto incremented value. All points must
            // have an x value, however the y value can be null to create a gap in
            // the series
            if (
                'name' in point &&
                x === undefined &&
                series.xAxis &&
                series.xAxis.hasNames
            ) {
                point.x = series.xAxis.nameToX(point);
            }
            if (point.x === undefined && series) {
                if (x === undefined) {
                    point.x = series.autoIncrement(point);
                } else {
                    point.x = x;
                }
            }
        }

        return point;
    });

    Highcharts.SVGRenderer.prototype.symbols.line = function (x, y, w, h) {
        return [
            'M', x - w / 2, y - 4,
            'L', x + w / 2, y - 4,
            x + w / 2, y + 4,
            x - w / 2, y + 4,
            'Z'
        ];
    };

    Highcharts.SVGRenderer.prototype.symbols.alarm = function (x, y, w, h) {
        return [
            'M', x + 2, y - h,
            'L', x + w / 2 + 2, y - h,
            x + w / 2 + 2, y + 2 * h,
            x + 2, y + 2 * h,
            'Z'
        ];
    };

    Highcharts.SVGRenderer.prototype.symbols.star = function (x, y, w, h) {
        return [
            'M', x, y + 0.4 * h,
            'L', x + 0.35 * w, y + 0.35 * h,
            'L', x + 0.5 * w, y,
            'L', x + 0.65 * w, y + 0.35 * h,
            'L', x + w, y + 0.4 * h,
            'L', x + 0.75 * w, y + 0.65 * h,
            'L', x + 0.85 * w, y + h,
            'L', x + 0.5 * w, y + 0.8 * h,
            'L', x + w * 0.15, y + h,
            'L', x + 0.25 * w, y + 0.65 * h,
            'Z'
        ];
    };

    Highcharts.SVGRenderer.prototype.symbols.cross = function (x, y, w, h) {
        return [
            'M', x, y + h * 0.1,
            'L', x + w * 0.1, y,
            'L', x + w * 0.5, y + h * 0.4,
            'L', x + w * 0.9, y,
            'L', x + w * 1, y + h * 0.1,
            'L', x + w * 0.6, y + h * 0.5,
            'L', x + w * 1, y + h * 0.9,
            'L', x + w * 0.9, y + h,
            'L', x + w * 0.5, y + h * 0.6,
            'L', x + w * 0.1, y + h,
            'L', x, y + h * 0.9,
            'L', x + w * 0.4, y + h * 0.5,
            'Z'
        ];
    };

    Highcharts.SVGRenderer.prototype.symbols.plus = function (x, y, w, h) {
        return [
            'M', x + w * 0.4, y,
            'L', x + w * 0.6, y,
            'L', x + w * 0.6, y + h * 0.4,
            'L', x + w, y + h * 0.4,
            'L', x + w, y + h * 0.6,
            'L', x + w * 0.6, y + h * 0.6,
            'L', x + w * 0.6, y + h,
            'L', x + w * 0.4, y + h,
            'L', x + w * 0.4, y + h * 0.6,
            'L', x, y + h * 0.6,
            'L', x, y + h * 0.4,
            'L', x + w * 0.4, y + h * 0.4,
            'Z'
        ];
    };

    Highcharts.SVGRenderer.prototype.symbols.pointer = function (x, y, w, h) {
        return this.circle(x, y + 1, w, h);
    };

    if (Highcharts.VMLRenderer) {
        Highcharts.VMLRenderer.prototype.symbols.line = Highcharts.SVGRenderer.prototype.symbols.line;
        Highcharts.VMLRenderer.prototype.symbols.alarm = Highcharts.SVGRenderer.prototype.symbols.alarm;
        Highcharts.VMLRenderer.prototype.symbols.star = Highcharts.SVGRenderer.prototype.symbols.star;
        Highcharts.VMLRenderer.prototype.symbols.cross = Highcharts.SVGRenderer.prototype.symbols.cross;
        Highcharts.VMLRenderer.prototype.symbols.plus = Highcharts.SVGRenderer.prototype.symbols.plus;
        Highcharts.VMLRenderer.prototype.symbols.pointer = Highcharts.SVGRenderer.prototype.symbols.pointer;
    }

})(Highcharts);
