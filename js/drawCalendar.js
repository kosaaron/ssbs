import Month from './month-class.js';


function drawCalendar(_year, _month) {
    const calBody = document.getElementById("cal-body");

    const currentMonth = new Month(_year, _month);
    const prevMonth = new Month(_year, _month-1);
    const nextMonth = new Month(_year, _month+1);

    let dateNum = 1;
    let cellNum = 1;
    let current = true;

    let table = `<table class="calendar-table">`;
    for (let i = 0; i < currentMonth.rowNum; i++) {
        table += `<tr>`;
        for (let j = 0; j < 7; j++) {
            if(cellNum < currentMonth.firstDay) {
                table += `<td id="#${prevMonth.monthId}-${prevMonth.length + cellNum - currentMonth.firstDay + 1}" class="prev-month">
                <span>${prevMonth.length + cellNum - currentMonth.firstDay + 1}</span>
                </td>`;
                if(cellNum == currentMonth.firstDay - 1) dateNum = 0;
            }
            else if(cellNum >= currentMonth.firstDay && dateNum <= currentMonth.length && current) {
                table += `<td id="#${currentMonth.monthId}-${dateNum}" class="current-month">
                <span>${dateNum}</span>
                </td>`;
                if(dateNum == currentMonth.length) {
                    dateNum = 0; 
                    current = false;
                }
            }
            else {
                table += `<td id="#${nextMonth.monthId}-${dateNum}" class="next-month">
                <span>${dateNum}</span>
                </td>`;
            }
            cellNum++;
            dateNum++;
        }
        table += `</tr>`;
    }
    table += `</table>`;

    calBody.innerHTML = table;
}

export default drawCalendar;
drawCalendar(2019, new Date().getMonth());