/**
 * **Chart design**
 */
let ChartDesign = {
    /**
     * **Create**
     * Generate card container
     * **use**
     * 1. Create html shell
     * 2. Get data from server
     * 3. Create a card structure
     * 4. Create card design
     * 5. Call this function
     * @param {Array} data Object list
     * @param {Array} structure Card data structure
     * @param {String} card Card design
     * @param {String} shellId Shell id
     */
    Line1: function (data1, titleText) {
        return {
            type: 'line',
            data: data1,
            options: {
                title: {
                    display: true,
                    text: titleText
                },
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                },
                elements: {
                    line: {
                        tension: 0 // disables bezier curves
                    }
                },
                showLines: true
            }
        };
    }
};
export default ChartDesign;