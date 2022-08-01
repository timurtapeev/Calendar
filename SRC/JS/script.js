"use strict";

(function(selector) {   

    //Calendar_Draw

    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
          calendar = document.querySelector(selector),
          modalDayForm = document.querySelector('.modal-day__form'),
          modalDayCloseBtn = document.querySelector('[data-close]'),
          modalQuickForm = document.querySelector('.modal-quick__form'),
          modalQuickCloseBtn = document.querySelector('[data-quickClose]');

    let date = new Date(),
        showedYear = date.getFullYear(),
        showedMonth = date.getMonth(),
        showedDate = date.getDate(),
        dates = calendar.querySelector('.calendar-table__wrapper'),
        current = {year: showedYear, 
                  month: showedMonth, 
                  date: showedDate};

    initCalendar(showedYear, showedMonth, current, calendar);

    function initCalendar(showedYear, showedMonth, current, calendar) {
        let info = calendar.querySelector('[data-text]');
        
        drawDates(showedYear, showedMonth, dates);
        showInfo(showedYear, showedMonth, info);
        showCurrentDay(showedYear, showedMonth, current, dates);
    }

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

    //Calendar_Info

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

    //Calendar_Button

    const prev = calendar.querySelector('[data-prev]'),
        next = calendar.querySelector('[data-next]'),
        todayButton = calendar.querySelector('.calendar-header__button-today');

    prev.addEventListener('click', () => {
        showedYear = getPrevYear(showedYear, showedMonth);
        showedMonth = getPrevMonth(showedMonth);

        initCalendar(showedYear, showedMonth, current, calendar);

        closeModalDayForm();
        closeModalQuickForm();
        getData();
    });

    next.addEventListener('click', () => {
        showedYear = getNextYear(showedYear, showedMonth);
        showedMonth = getNextMonth(showedMonth);

        initCalendar(showedYear, showedMonth, current, calendar);

        closeModalDayForm();
        closeModalQuickForm();
        getData();
    });

    todayButton.addEventListener('click', () => {
        showedYear = date.getFullYear();
        showedMonth = date.getMonth();

        initCalendar(showedYear, showedMonth, current, calendar);

        closeModalDayForm();
        closeModalQuickForm();
        getData();
    });

    function getPrevYear(year, month) {
        if (month == 0) {
            return year - 1;
        } else {
            return year;
        }
    }

    function getPrevMonth(month) {
        if (month == 0) {
            return 11;
        } else {
            return month - 1;
        }
    }

    function getNextYear(year, month) {
        if (month == 11) {
            return year + 1;
        } else {
            return year;
        }
    }

    function getNextMonth(month) {
        if (month == 11) {
            return 0;
        } else {
            return month + 1;
        }
    }

    //Show_modal_Day
    
    function showModalDayForm() {
        const modalDayTrigger = document.querySelectorAll('.calendar-table__cell');

        modalDayTrigger.forEach(element => {
            element.addEventListener('click', (event) => {
                let targetX = event.target.getBoundingClientRect().x,
                    targetY = event.target.getBoundingClientRect().y;
                
                modalDayForm.classList.add('show');
                modalDayForm.classList.remove('hide');

                modalDayForm.style.top = `${targetY}px`;
                modalDayForm.style.left = `${targetX + 143}px`;

                modalDayTrigger.forEach(e => {
                    if (event.target !== e.target || modalDayForm.classList.contains('hide')) {
                        e.classList.remove('calendar-table__cell_active');

                        modalDayCloseBtn.addEventListener('click', () => {
                            closeModalDayForm();
                            e.classList.remove('calendar-table__cell_active');
                        });
                    }
                });

                let targetDate = event.target.innerText;
                let cellNum = +targetDate.replace(/\D/g, '');
                
                if (cellNum < 10) {
                    cellNum = `0${cellNum}`;
                }

                const inputDate = document.querySelector('[data-dayInputDate]');

                let targetMonth = showedMonth;

                if (showedMonth < 10) {
                    targetMonth = `0${showedMonth + 1}`;
                } else {
                    targetMonth = showedMonth + 1;
                }
                inputDate.value = `${cellNum}.${targetMonth}.${showedYear}`;
                
                resetActiveClassCell(modalDayTrigger, event);
                
                postData(modalDayForm);
                
                // getData('.calendar-table__row');
            });
        });
    }
    

    function resetActiveClassCell (selector, elem) {
        selector.forEach(e => {
            if (elem.target !== e.target || modalDayForm.classList.contains('hide')) {
                e.classList.remove('calendar-table__cell_active');

                modalDayCloseBtn.addEventListener('click', () => {
                    closeModalDayForm();
                    e.classList.remove('calendar-table__cell_active');
                });
            }
        });
    }
    
    function closeModalDayForm() {
        modalDayForm.classList.remove('show');
        modalDayForm.classList.add('hide');
    }
    dates.addEventListener('click', (e) => {
        getTriggerCell(e);
    });

    function getTriggerCell(element) {
        if (element.target.classList.contains('calendar-table__cell')) {
            element.target.classList.toggle('calendar-table__cell_active');   
        } else {
            let cell = element.target.closest('.calendar-table__cell');
            cell.classList.toggle('calendar-table__cell_active');
            return;
        }
        
    }

    //localStorage

    function postData(form) {
        const modalDayTrigger = document.querySelectorAll('.calendar-table__cell'),
              dayInputEvent = document.querySelector('[data-dayInputEvent]'),
              dayInputDate = document.querySelector('[data-dayInputDate]'),
              dayInputNames = document.querySelector('[data-dayInputNames]'),
              dayInputDescr = document.querySelector('[data-dayInputDescr]');

        let eventNumber = 0;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // if (localStorage.length == 0) {
            //     eventNumber = 0;
            // } else {
            //     eventNumber = +localStorage.eventNumber;
            // }
            // console.log(eventNumber);
            eventNumber++;

            let event = dayInputEvent.value,
                date = dayInputDate.value,
                name = dayInputNames.value,
                descr = dayInputDescr.value;

            let inputData = function(event, date, name, descr) {
                this.dayEvent = event;
                this.dayDate = date;
                this.dayName = name;
                this.dayDescr = descr;
                };
            
            let targetDay = JSON.stringify(new inputData(event, date, name, descr)),
                eventDayNumber = `event ${eventNumber}`;

            localStorage.setItem(eventDayNumber,(localStorage.getItem(`event ${eventNumber-1}`) || '') + targetDay);

            // localStorage.setItem(`event ${eventNumber}`, JSON.stringify(targetDay));
            modalDayTrigger.forEach((e) =>{
                e.classList.remove('calendar-table__cell_active');
            });
            closeModalDayForm();
            getData();
        });
    }

    function getData(selector) {
        for (let i = 1; i < 100; i++){
            let eventDate = JSON.parse(localStorage.getItem(`event ${i}`));
            console.log(eventDate);
            
            let targetDate = eventDate.dayDate,
                targetDayHeader = document.querySelectorAll('.calendar-table__header'),
                allCells = document.querySelectorAll('.calendar-table__cell'),
                lastDateOfMonth = getLastDayOfMonth(showedYear, showedMonth);

            let targetEvent = eventDate.dayEvent,
                targetDescr = eventDate.dayDescr,
                targetName = eventDate.dayName;

            targetDate = targetDate + '';

            let targetDay = +targetDate.slice(0,2),
                targetMonth = +targetDate.slice(3,5),
                targetYear = +targetDate.slice(6);

            if (showedYear == targetYear && showedMonth + 1 == targetMonth) {
               for (let i = 0; i < targetDayHeader.length; i++) {
                    if (i < 7 && i <= lastDateOfMonth) {
                        showEventDay(i, targetDayHeader, targetDay, allCells, targetEvent, targetName);
                    } else if (i <= lastDateOfMonth) {
                        showEventDay(i, targetDayHeader, targetDay, allCells, targetEvent, targetName);
                    }
                }
            } 
            if (localStorage.length > i) {
                break;
            }
        }
    }
    getData();

    function showEventDay(num, targetDayHeader, targetDay, allCells, targetEvent, targetName) {
        if (!targetName) {
            targetName = '';
        }
       
        let cellStr = targetDayHeader[num].innerText,
            cellNum = +cellStr.replace(/\D/g, '');
        if (targetDay == cellNum) {
            allCells[num].classList.add('calendar-table__cell_event');
            const cellTitle = allCells[num].querySelector('.calendar-table__title'),
                  cellName = allCells[num].querySelector('.calendar-table__descr');

            cellTitle.textContent = `${targetEvent}`;
            cellName.textContent = `${targetName}`;
        }

    }

    // showModalQuickForm
    
    const modalQuickTrigger = document.querySelector('[data-addEvent]');
    
    modalQuickTrigger.addEventListener('click', (e) => {
        let targetX = e.target.getBoundingClientRect().x,
            targetY = e.target.getBoundingClientRect().y;
        const quickInput = document.querySelector('[data-quickInputEvent]');
        
        modalQuickForm.classList.add('show');
        modalQuickForm.classList.remove('hide');

        modalQuickForm.style.top = `${targetY + 26}px`;
        modalQuickForm.style.left = `${targetX}px`;
        
        modalQuickForm.addEventListener('submit', () => {
            let targetDayHeader = document.querySelectorAll('.calendar-table__header'),
                lastDateOfMonth = getLastDayOfMonth(showedYear, showedMonth),
                allCells = document.querySelectorAll('.calendar-table__cell');
            let quickInfo = '' + quickInput.value,
                quickDate = +quickInfo.slice(0,2),
                quickMonth = +quickInfo.slice(3,5),
                quickYear = +quickInfo.slice(6,10),
                quickEventName = quickInfo.slice(11);

                if (showedYear == quickYear && showedMonth + 1 == quickMonth) {
                    for (let i = 0; i < targetDayHeader.length; i++) {
                        if (i < 7 && i <= lastDateOfMonth) {
                            showEventDay(i, targetDayHeader, quickDate, allCells, quickEventName);
                        } else if (i <= lastDateOfMonth) {
                            showEventDay(i, targetDayHeader, quickDate, allCells, quickEventName);
                        }
                     }
                } 
            closeModalQuickForm();
            // let inputData = {
            //     dayEvent: quickEventName,
            //     dayDate: quickDate,
            //     };
        });
    });

    modalQuickCloseBtn.addEventListener('click', () => {
        closeModalQuickForm();
    });

    function closeModalQuickForm() {
        modalQuickForm.classList.remove('show');
        modalQuickForm.classList.add('hide');
    }

}('.calendar'));

// 30.08.2022 Др