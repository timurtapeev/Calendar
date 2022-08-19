import {showModalDayForm} from './modal-day-form';
import {dates} from './variables';
const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

function showCurrentDay(showedYear, showedMonth, current, dates) {
    if (showedYear == current.year && showedMonth == current.month) {
        let allCells = dates.querySelectorAll('.calendar-table__cell');

        for (let i = 0; i < 7; i++) {
            let cellStr = allCells[i].innerText,
                cellNum = +cellStr.replace(/\D/g, '');
            if (current.date < 7 && cellNum == current.date ) {
                allCells[i].classList.add('calendar-table__cell_today');
                break;
            }
        }

        for (let i = 7; i < allCells.length; i++) {
            if (allCells[i].innerText == current.date && i <= showedMonth) {
                allCells[i].classList.add('calendar-table__cell_today');
                break;
            }
        } 
    }
}

function drawDates(year, month, dates) {
    let arr = [],
        firstDateOfMonth = 1,
        lastDateOfMonth = getLastDayOfMonth(year, month),
        showLastWeekDay = showLastWeekDays(month),
        lastDateOfPrevMonth = getLastDayOfMonth(year, showLastWeekDay),
        unshiftElemsNum = getUnshiftElemsNum(year, month),
        pushElemsNum = getPushElemsNum(year, month);

    arr = createArr(firstDateOfMonth, lastDateOfMonth);
    arr = unshiftElems(unshiftElemsNum, lastDateOfPrevMonth, arr);
    arr = pushElems(pushElemsNum, 1, arr);
    arr = chunkArr(7, arr);

    createTable(arr, dates);
    showModalDayForm();
}

function createTable(arr, parent) {
    parent.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        let tableRow = document.createElement('div');
        tableRow.classList.add('calendar-table__row');

        if (i === 0) {
            tableRow.classList.add('today_row');
        }

        if (i === 0) {
            for (let j = 0; j < arr[i].length; j++) {
                let tableCell = document.createElement('div');
                tableCell.classList.add('calendar-table__cell');
                tableCell.innerHTML = `
                    <div class="calendar-table__header">
                    ${days[j]}, ${arr[i][j]}
                    </div>
                    <div class="calendar-table__title">
            
                    </div>
                    <div class="calendar-table__descr">
                        
                    </div>
                `;
                tableRow.appendChild(tableCell);
            }
        } else {
            for (let j = 0; j < arr[i].length; j++) {
                let tableCell = document.createElement('div');
                tableCell.classList.add('calendar-table__cell');
                tableCell.innerHTML = `
                    <div class="calendar-table__header">
                    ${arr[i][j]}
                    </div>
                    <div class="calendar-table__title">
            
                    </div>
                    <div class="calendar-table__descr">
                        
                    </div>
                `;
                tableRow.appendChild(tableCell);
            }
        }
        parent.appendChild(tableRow);
    }
    parent.lastChild.classList.add('calendar-table__row_border');
}

function showLastWeekDays(month) {
    if (month == 0) {
        month = 11;
        return month;
    } else {
        return month - 1;
    }
}

function createArr(from, to) {
    let arr = [];
    for (let i = from; i <= to; i++) {
        arr.push(i);
    }

    return arr;
}

function unshiftElems(num, elem, arr) {
    let firstDayNumber = elem;
    for (let i = 0; i < num; i++) {
        arr.unshift(firstDayNumber - i);
    }

    return arr;
}


function pushElems(num, elem, arr) {
    for (let i = 0; i < num; i++) {
        arr.push(elem + i);
    }

    return arr;
}

function getLastDayOfMonth(year, month) {
    if (month == 1) {
        if(isLeap(year)) {
            return 29;
        } else {
            return 28;
        }
    } else {
        let days = [31, undefined, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return days[month];
    }
}

function isLeap(year) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return true;
    } else {
        return false;
}
}

function getUnshiftElemsNum(year, month) {
    let jsDayNum = getFirstWeekDayOfMonthNum(year, month);
    let  realDayNum = getRealDayOfWeekNum(jsDayNum);

    return realDayNum - 1;
}

function getPushElemsNum(year, month) {
    let jsDayNum = getLastWeekDayOfMonthNum(year, month);
    let  realDayNum = getRealDayOfWeekNum(jsDayNum);

    return 7 - realDayNum;
}

function chunkArr(num, arr) {
    let result = [];
    let chunk = [];
    let iterCount = arr.length / num;

    for (let i = 0; i < iterCount; i++) {
        chunk = arr.splice(0, num);
        result.push(chunk);
    }

    return result;
}

function getRealDayOfWeekNum(jsNumberOfDay) {
    if (jsNumberOfDay == 0) {
        return 7;
    } else {
        return jsNumberOfDay;
}
}

function getFirstWeekDayOfMonthNum(year, month) {
    let date = new Date(year, month, 1);
    return date.getDay(); 
}

function getLastWeekDayOfMonthNum(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDay(); 
}

function showInfo(year, month, elem) {
    elem.innerHTML = `${getMonthName(month)} ${year}`;
}

function getMonthName(month) {
    const monthes = [
    'Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    return monthes[month];
}

function initCalendar(showedYear, showedMonth, current, calendar) {
    let info = calendar.querySelector('[data-text]');

    drawDates(showedYear, showedMonth, dates);
    showInfo(showedYear, showedMonth, info);
    showCurrentDay(showedYear, showedMonth, current, dates);
}

export {drawDates, showCurrentDay, showInfo, getLastDayOfMonth, initCalendar};