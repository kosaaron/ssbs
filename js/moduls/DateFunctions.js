/** 
 * Date functions
*/
let DateFunctions = {
    /**
     * Simple date formatter
     * @param {Date} date 
     */
    formatDate: function (date) {
        var monthNames = [
            "január", "február", "március",
            "április", "május", "június", "július",
            "augusztus", "szeptember", "október",
            "november", "december"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return year + '. ' + monthNames[monthIndex] + ' ' + day + '.';
    },

    /**
     * Get full month name
     * @param {Date} date 
     */
    fullMonthDate: function (date) {
        var monthNames = [
            "január", "február", "március",
            "április", "május", "június", "július",
            "augusztus", "szeptember", "október",
            "november", "december"
        ];

        var monthIndex = date.getMonth();

        return monthNames[monthIndex];
    },

    /**
     * Get week number of year
     * @param {Date} d 
     */
    getWeekNumber: function (d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return weekNo;
    },

    /**
     * Returns the correct amount of days
     * @param {Integer} month 
     * @param {Integer} year 
     */
    daysInMonth: function (month, year) {
        return new Date(year, month, 0).getDate();
    },

    /**
     * Get day of the week
     * @param {Date} date 
     */
    getWeekDay: function (date) {
        //Create an array containing each day, starting with Sunday.
        var weekdays = new Array(
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        );
        //Use the getDay() method to get the day.
        var day = date.getDay();
        //Return the element that corresponds to that index.
        return weekdays[day];
    },

    mondayIsFirthDay: function (day) {
        if (day == 0) {
            return 6;
        } else {
            return day - 1;
        }
    }
};
export default DateFunctions;