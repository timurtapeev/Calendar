"use strict";
window.addEventListener('DOMContentLoaded', () => {
    (function(selector) {   

        //Calendar_Draw

        const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            monthes = ['января', 'февраля', 'марта', 
                        'апреля', 'мая', 'июня', 'июля', 
                        'августа', 'сентября', 'октября', 
                        'ноября', 'декабря'],
            calendar = document.querySelector(selector),
            modalDayForm = document.querySelector('.modal-day__form'),
            modalDayCloseBtn = document.querySelector('[data-close]'),
            modalInfoCloseBtn = document.querySelector('[data-modalInfoClose]'),
            modalQuickForm = document.querySelector('.modal-quick__form'),
            modalQuickCloseBtn = document.querySelector('[data-quickClose]'),
            modalQuickTrigger = document.querySelector('[data-addQuickEvent]'),
            modalInfoForm = document.querySelector('.modal-info__form');

        let date = new Date(),
            showedYear = date.getFullYear(),
            showedMonth = date.getMonth(),
            showedDate = date.getDate(),
            dates = calendar.querySelector('.calendar-table__wrapper'),
            current = {year: showedYear, 
                    month: showedMonth, 
                    date: showedDate},
            localArray;

        if (localStorage.getItem('events')) {
            localArray = JSON.parse(localStorage.getItem('events'));
        } else {
            localArray = [];
        }

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

            closeModalForm(modalDayForm);
            closeModalForm(modalInfoForm);
            closeModalQuickForm();
            try {
                getData();
            } catch(e) {
                
            }
        });

        next.addEventListener('click', () => {
            showedYear = getNextYear(showedYear, showedMonth);
            showedMonth = getNextMonth(showedMonth);

            initCalendar(showedYear, showedMonth, current, calendar);

            closeModalForm(modalDayForm);
            closeModalForm(modalInfoForm);
            closeModalQuickForm();
            try {
                getData();
            } catch(e) {
                
            }
        });

        todayButton.addEventListener('click', () => {
            showedYear = date.getFullYear();
            showedMonth = date.getMonth();

            initCalendar(showedYear, showedMonth, current, calendar);

            closeModalForm(modalDayForm);
            closeModalForm(modalInfoForm);
            closeModalQuickForm();
            try {
                getData();
            } catch(e) {
                
            }
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
            const modalDayTrigger = document.querySelectorAll('.calendar-table__cell'),
                  inputDate = document.querySelector('[data-dayInputDate]');

            modalDayTrigger.forEach(element => {
                element.addEventListener('click', (event) => {
                    let targetCell = event.target.closest('.calendar-table__cell');

                    if (targetCell.classList.contains('calendar-table__cell_event')) {
                        let infoDate = document.querySelector('.modal-info__date'),
                            infoDoneBtn = document.querySelector('[data-done]');

                        placeModalDayForm(event, modalDayTrigger, modalInfoForm);
                        closeModalForm(modalDayForm);
                        showEventDate(event, infoDate);
                        showEvent(event, targetCell);
                        showPeople(event, targetCell);

                        let deleteTitle,
                            deleteNames;
                        if (event.target.classList.contains('calendar-table__cell_event')) {
                            deleteTitle = event.target.querySelector('.calendar-table__title');
                            deleteNames = event.target.querySelector('.calendar-table__descr');
                        } else {
                            deleteTitle = targetCell.querySelector('.calendar-table__title');
                            deleteNames = targetCell.querySelector('.calendar-table__descr');
                        }

                        let eventDate,
                            targetDescr;
                        try{
                            eventDate = JSON.parse(localStorage.getItem(`event ${1}`));
                            targetDescr = modalInfoForm.querySelector('[data-infoInputDescr]');
                            let savedDescr = eventDate.dayDescr;

                            targetDescr.value = savedDescr;
                        } catch(e) {}

                        modalInfoCloseBtn.addEventListener('click', () => {
                            closeModalForm(modalInfoForm);
                            if (event.target.classList.contains('calendar-table__cell_event')) {
                                event.target.classList.remove('calendar-table__cell_active');
                            } else {
                                targetCell.classList.remove('calendar-table__cell_active');
                            }
                            
                        });

                        let deleteEventBtn = document.querySelector('[data-deleteEvent]');
                        deleteEventBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            deleteTitle.textContent = '';
                            deleteNames.textContent = '';
                            if (event.target.classList.contains('calendar-table__cell_event')) {
                                event.target.classList.remove('calendar-table__cell_event');
                            } else {
                                targetCell.classList.remove('calendar-table__cell_event');
                            }
                            
                            closeModalForm(modalInfoForm);
                            resetActiveClassCell(modalDayTrigger, e);

                            let targetDay;
                            
                            if (event.target.classList.contains('calendar-table__cell_event')) {
                                targetDay = event.target.querySelector('.calendar-table__header');
                            } else {
                                targetDay = targetCell.querySelector('.calendar-table__header');
                            }
                            
                            targetDay = targetDay.innerText;
                            let cellNum = +targetDay.replace(/\D/g, '');
                            
                            let targetMonth;
                            
                            if (cellNum < 10) {
                                cellNum = `0${cellNum}`;
                            }
                            
                            if (showedMonth < 9) {
                                targetMonth = `0${showedMonth + 1}`;
                            } else {
                                targetMonth = showedMonth + 1;
                            }
                            let targetDates = `${cellNum}.${targetMonth}.${showedYear}`;

                            for (let i = 0; i < localArray.length; i++) {
                                console.log(localArray[i].dayDate);
                                console.log(targetDates);
                                if (localArray[i].dayDate == targetDates) {
                                    localArray.splice(i, 1);
                                }
                                localStorage.setItem('events', JSON.stringify(localArray));
                            }
                        });
                        infoDoneBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            closeModalForm(modalInfoForm);
                            resetActiveClassCell(modalDayTrigger, e);
                        });

                        const refreshBtn = document.querySelector('[data-refreshEvent]');

                        refreshBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            placeModalDayForm(event, modalDayTrigger, modalDayForm);
                            closeModalForm(modalInfoForm);
                            postData(modalDayForm);

                            let targetDate;
                            
                            if (event.target.classList.contains('calendar-table__cell_event')) {
                                targetDate = event.target.querySelector('.calendar-table__header').innerText;
                            } else {
                                targetDate = targetCell.querySelector('.calendar-table__header').innerText;
                            }
                            
                            let cellNum = +targetDate.replace(/\D/g, '');
                            
                            if (cellNum < 10) {
                                cellNum = `0${cellNum}`;
                            }

                            let targetMonth = showedMonth;

                            if (showedMonth < 9) {
                                targetMonth = `0${showedMonth + 1}`;
                            } else {
                                targetMonth = showedMonth + 1;
                            }
                            let targetDates =`${cellNum}.${targetMonth}.${showedYear}`;
                            inputDate.value = targetDates;
                            

                            let deleteTitle,
                                deleteNames;
                            if (event.target.classList.contains('calendar-table__cell_event')) {
                                deleteTitle = event.target.querySelector('.calendar-table__title');
                                deleteNames = event.target.querySelector('.calendar-table__descr');
                            } else {
                                deleteTitle = targetCell.querySelector('.calendar-table__title');
                                deleteNames = targetCell.querySelector('.calendar-table__descr');
                            }
                            let deleteEventBtn = document.querySelector('[data-delete]');
                            deleteEventBtn.addEventListener('click', (e) => {
                                e.preventDefault();
                                deleteTitle.textContent = '';
                                deleteNames.textContent = '';
                                if (event.target.classList.contains('calendar-table__cell_event')) {
                                    event.target.classList.remove('calendar-table__cell_event');
                                } else {
                                    targetCell.classList.remove('calendar-table__cell_event');
                                }

                                for (let i = 0; i < localArray.length; i++) {
                                    console.log(localArray[i].dayDate);
                                    console.log(targetDates);
                                    if (localArray[i].dayDate == targetDates) {
                                        localArray.splice(i, 1);
                                    }
                                    localStorage.setItem('events', JSON.stringify(localArray));
                                }
                                
                                closeModalForm(modalDayForm);
                                resetActiveClassCell(modalDayTrigger, e);
                            });
                        });
                    } else {
                        placeModalDayForm(event, modalDayTrigger, modalDayForm);
                        closeModalForm(modalInfoForm);
                        showEventDate(event, inputDate);
                        resetActiveClassCell(modalDayTrigger, event);
                        postData(modalDayForm);
                    }
                });
            });
        }

        function placeModalDayForm(event, modalDayTrigger, modalForm) {
            let targetX = event.target.getBoundingClientRect().x,
                targetY = event.target.getBoundingClientRect().y;
        
            modalForm.classList.add('show');
            modalForm.classList.remove('hide');

            if (targetX > 730) {
                modalForm.style.left = `${targetX - 300}px`;
            } else {
                modalForm.style.left = `${targetX + 143}px`;
            }

            modalForm.style.top = `${targetY}px`;

            modalDayTrigger.forEach(e => {
            if (event.target !== e.target || modalForm.classList.contains('hide')) {
                    e.classList.remove('calendar-table__cell_active');

                    modalDayCloseBtn.addEventListener('click', () => {
                        closeModalForm(modalDayForm);
                        e.classList.remove('calendar-table__cell_active');
                    });
                }
            });
        }

        function showEventDate(event, date) {
            let targetDate = event.target.innerText;
            let cellNum = +targetDate.replace(/\D/g, '');
            
            if (cellNum < 10) {
                cellNum = `0${cellNum}`;
            }

            let targetMonth = showedMonth;

            if (showedMonth < 9) {
                targetMonth = `0${showedMonth + 1}`;
            } else {
                targetMonth = showedMonth + 1;
            }
            if (!event.target.classList.contains('calendar-table__cell_event')) {
                date.value = `${cellNum}.${targetMonth}.${showedYear}`;
            } else {
                date.textContent = `${cellNum} ${monthes[+targetMonth-1]}`;
            }
        }

        function showEvent(event , targetCell) {
            let eventName;
            if (event.target.classList.contains('calendar-table__cell_event')) {
                eventName = event.target.querySelector('.calendar-table__title').innerText;
            } else {
                eventName = targetCell.querySelector('.calendar-table__title').innerText;
            }

            let eventModalName = modalInfoForm.querySelector('.modal-info__title');
            eventModalName.textContent = `${eventName}`;
        }

        function showPeople(event, targetCell) {
            let eventPeople;
            if (event.target.classList.contains('calendar-table__cell_event')) {
                eventPeople = event.target.querySelector('.calendar-table__descr').innerText;
            } else {
                eventPeople = targetCell.querySelector('.calendar-table__descr').innerText;
            }

            let eventModalPeople = modalInfoForm.querySelector('.modal-info__people_names');

            eventModalPeople.textContent = `${eventPeople}`;

        } 

        function resetActiveClassCell (selector, elem) {
            selector.forEach(e => {
                if (elem.target !== e.target || modalDayForm.classList.contains('hide')) {
                    e.classList.remove('calendar-table__cell_active');

                    modalDayCloseBtn.addEventListener('click', () => {
                        closeModalForm(modalDayForm);
                        e.classList.remove('calendar-table__cell_active');
                    });
                }
            });
        }
        
        function closeModalForm(form) {
            form.classList.remove('show');
            form.classList.add('hide');
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


            form.addEventListener('submit', (e) => {
                e.preventDefault();
                let event = {
                    dayEvent: dayInputEvent.value,
                    dayDate: dayInputDate.value,
                    dayName: dayInputNames.value,
                    dayDescr: dayInputDescr.value
                };

                localArray.push(event);
                localStorage.setItem('events', JSON.stringify(localArray));

                modalDayTrigger.forEach((e) =>{
                    e.classList.remove('calendar-table__cell_active');
                });
                closeModalForm(modalDayForm);
                closeModalForm(modalInfoForm);
                try {
                    getData();
                } catch(e) {
                    
                }
            });
        }

        function getData(selector) {
            let eventDateArray = JSON.parse(localStorage.getItem(`events`));

            for (let i = 0; i <= eventDateArray.length; i++) {

                let eventDate = eventDateArray[i];
                
                let targetDayHeader = document.querySelectorAll('.calendar-table__header'),
                    allCells = document.querySelectorAll('.calendar-table__cell'),
                    lastDateOfMonth = getLastDayOfMonth(showedYear, showedMonth);
    
                let targetDate = eventDate.dayDate,
                    targetEvent = eventDate.dayEvent,
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
                            let descr = document.querySelector('[data-infoInputDescr]');
                            descr.value = targetDescr;
                        } else if (i <= lastDateOfMonth -1) {
                            showEventDay(i, targetDayHeader, targetDay, allCells, targetEvent, targetName);
                            let descr = document.querySelector('[data-infoInputDescr]');
                            descr.value = targetDescr;
                        }
                    }
                } 
            }

        }
        try {
            getData();
        } catch(e) {

        }

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
        
        modalQuickTrigger.addEventListener('click', (e) => {
            const allCells = document.querySelectorAll('.calendar-table__cell');
            closeModalForm(modalInfoForm);
            closeModalForm(modalDayForm);
            resetActiveClassCell(allCells, e);

            let targetX = e.target.getBoundingClientRect().x,
                targetY = e.target.getBoundingClientRect().y;
            const quickInput = document.querySelector('[data-quickInputEvent]');
            
            modalQuickForm.classList.add('show');
            modalQuickForm.classList.remove('hide');

            modalQuickForm.style.top = `${targetY + 26}px`;
            modalQuickForm.style.left = `${targetX}px`;
            
            modalQuickForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let targetDayHeader = document.querySelectorAll('.calendar-table__header'),
                    lastDateOfMonth = getLastDayOfMonth(showedYear, showedMonth);
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
                let event = {
                    dayEvent: quickEventName,
                    dayDate: quickInfo.slice(0, 10),
                    dayName: '',
                    dayDescr: ''
                };

                localArray.push(event);
                localStorage.setItem('events', JSON.stringify(localArray));

                closeModalForm(modalDayForm);
                closeModalForm(modalInfoForm);
                try {
                    getData();
                } catch(e) {}
                closeModalQuickForm();
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
});