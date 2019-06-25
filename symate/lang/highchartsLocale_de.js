'use strict';

Highcharts.setOptions({
    lang: {
        decimalPoint: ',',
        thousandsSep: '.',
        loading: 'Daten werden geladen...',
        months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        exportButtonTitle: "Exportieren",
        printButtonTitle: "Drucken",
        rangeSelectorFrom: "Von",
        rangeSelectorTo: "Bis",
        rangeSelectorZoom: "",
        downloadPNG: 'Download als PNG-Bild',
        downloadJPEG: 'Download als JPEG-Bild',
        downloadPDF: 'Download als PDF-Dokument',
        downloadSVG: 'Download als SVG-Bild',
        resetZoom: "Zoom zurücksetzen",
        resetZoomTitle: "Zoom zurücksetzen",

        notValid: "Keine Daten vorhanden oder Fehler beim Laden.",

        tooltip: {
            clickForInfo: 'Für mehr Informationen klicken.',
            clickForNavigation: 'Für Navigation klicken.',
            timestamp: 'Zeitpunkt',
            parameter: 'Parameter',
            rule: 'Regel',
            category: 'Ausprägung',
            value: 'Wert',

            boxplot: {
                count: 'Anzahl Datensätze',
                mean: 'Mittelwert',
                sd: 'Standardabweichung',
                min: 'Minimum',
                max: 'Maximum',
                median: 'Median',
                q1: 'Unteres Quartil',
                q3: 'Oberes Quartil'
            },

            histogram: {
                from: 'Von',
                to: 'Bis',
                frequency: 'Häufigkeit'
            },

            xyplot: {
                regression: 'Regression'
            },

            range: {
                start: 'Beginn',
                end: 'Ende',
                duration: 'Dauer'
            },

            blob: {
                blobId: 'Bild Id'
            }
        }
    }
});
