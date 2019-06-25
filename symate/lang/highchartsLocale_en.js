'use strict';

Highcharts.setOptions({
    lang: {

        notValid: "No data available or failed to load.",

        tooltip: {
            clickForInfo: 'Select for more information.',
            clickForNavigation: 'Select to get navigation link.',
            timestamp: 'Timestamp',
            parameter: 'Parameter',
            rule: 'Rule',
            value: 'Value',
            category: 'Value',

            boxplot: {
                count: 'Data Sets',
                mean: 'Mean',
                sd: 'Standard Deviation',
                min: 'Minimum',
                max: 'Maximum',
                median: 'Median',
                q1: 'Lower Quartile',
                q3: 'Upper Quartile'
            },

            histogram: {
                from: 'From',
                to: 'To',
                frequency: 'Frequency'
            },

            xyplot: {
                regression: 'Regression'
            },

            range: {
                start: 'Start',
                end: 'End',
                duration: 'Duration'
            },

            blob: {
                blobId: 'Blob Id'
            }
        }
    }
});
