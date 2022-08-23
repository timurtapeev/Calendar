/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calendar-btns.js":
/*!*************************************!*\
  !*** ./js/modules/calendar-btns.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeMonth": () => (/* binding */ changeMonth),
/* harmony export */   "current": () => (/* binding */ current),
/* harmony export */   "showedDate": () => (/* binding */ showedDate),
/* harmony export */   "showedMonth": () => (/* binding */ showedMonth),
/* harmony export */   "showedYear": () => (/* binding */ showedYear)
/* harmony export */ });
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table */ "./js/modules/table.js");
/* harmony import */ var _modal_day_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-day-form */ "./js/modules/modal-day-form.js");
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./local-storage */ "./js/modules/local-storage.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./variables */ "./js/modules/variables.js");





let date = new Date(),
showedYear = date.getFullYear(),
showedMonth = date.getMonth(),
showedDate = date.getDate(),
current = {year: showedYear, 
        month: showedMonth, 
        date: showedDate};
        
function changeMonth() {
    const prev = _variables__WEBPACK_IMPORTED_MODULE_3__.calendar.querySelector('[data-prev]'),
        next = _variables__WEBPACK_IMPORTED_MODULE_3__.calendar.querySelector('[data-next]'),
        todayButton = _variables__WEBPACK_IMPORTED_MODULE_3__.calendar.querySelector('.calendar-header__button-today');

    prev.addEventListener('click', () => {
        showedYear = getPrevYear(showedYear, showedMonth);
        showedMonth = getPrevMonth(showedMonth);

        (0,_table__WEBPACK_IMPORTED_MODULE_0__.initCalendar)(showedYear, showedMonth, current, _variables__WEBPACK_IMPORTED_MODULE_3__.calendar);

        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.modalDayForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.modalInfoForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.modalQuickForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.searchForm);
        try {
            (0,_local_storage__WEBPACK_IMPORTED_MODULE_2__.getData)();
        } catch(e) {
            
        }
    });

    next.addEventListener('click', () => {
        showedYear = getNextYear(showedYear, showedMonth);
        showedMonth = getNextMonth(showedMonth);

        (0,_table__WEBPACK_IMPORTED_MODULE_0__.initCalendar)(showedYear, showedMonth, current, _variables__WEBPACK_IMPORTED_MODULE_3__.calendar);

        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.modalDayForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.modalInfoForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.modalQuickForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.searchForm);
        try {
            (0,_local_storage__WEBPACK_IMPORTED_MODULE_2__.getData)();
        } catch(e) {
            
        }
    });

    todayButton.addEventListener('click', () => {
        showedYear = date.getFullYear();
        showedMonth = date.getMonth();

        (0,_table__WEBPACK_IMPORTED_MODULE_0__.initCalendar)(showedYear, showedMonth, current, _variables__WEBPACK_IMPORTED_MODULE_3__.calendar);

        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.modalDayForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.modalInfoForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.modalQuickForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_3__.searchForm);
        try {
            (0,_local_storage__WEBPACK_IMPORTED_MODULE_2__.getData)();
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
}



/***/ }),

/***/ "./js/modules/close-froms.js":
/*!***********************************!*\
  !*** ./js/modules/close-froms.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeForms": () => (/* binding */ closeForms)
/* harmony export */ });
/* harmony import */ var _modal_day_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-day-form */ "./js/modules/modal-day-form.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./variables */ "./js/modules/variables.js");



const header = document.querySelector('.header');

function closeForms() {
    _variables__WEBPACK_IMPORTED_MODULE_1__.calendar.addEventListener('click', (event) => {
        let targetCell = event.target.closest('.calendar-table__cell');
        let triggerCell = document.querySelectorAll('.calendar-table__cell_active');
        if (targetCell) {

        } else {
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalQuickForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalDayForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.searchForm);
            triggerCell.forEach(elem => {
                elem.classList.remove('calendar-table__cell_active');
            });
        }
    });
    header.addEventListener('click', (e) => {
        let targetElem = e.target.closest('[data-headerBtn]');
        let triggerCell = document.querySelectorAll('.calendar-table__cell_active');
        if (targetElem) {
            
        } else {
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalQuickForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalDayForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.searchForm);
            triggerCell.forEach(elem => {
                elem.classList.remove('calendar-table__cell_active');
            });
        }
    });
}



/***/ }),

/***/ "./js/modules/local-storage.js":
/*!*************************************!*\
  !*** ./js/modules/local-storage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "localArray": () => (/* binding */ localArray),
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "showLocalArray": () => (/* binding */ showLocalArray)
/* harmony export */ });
/* harmony import */ var _calendar_btns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar-btns */ "./js/modules/calendar-btns.js");
/* harmony import */ var _modal_day_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-day-form */ "./js/modules/modal-day-form.js");
/* harmony import */ var _modal_quick_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-quick-form */ "./js/modules/modal-quick-form.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./table */ "./js/modules/table.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./variables */ "./js/modules/variables.js");






let localArray;
function showLocalArray() {
    if (localStorage.getItem('events')) {
        localArray = JSON.parse(localStorage.getItem('events'));
    } else {
        localArray = [];
    }
    
    try {
        getData();
    } catch(e) {
    }
}

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

        for (let i = 0; i < localArray.length; i++ ) {
            console.log(localArray[i].dayDate, event.dayDate);
            if (localArray[i].dayDate == event.dayDate) {
                localArray.splice(i, 1);
                localStorage.setItem('events', JSON.stringify(localArray));
                break;
            }
        }

        localArray.push(event);
        localStorage.setItem('events', JSON.stringify(localArray));

        modalDayTrigger.forEach((e) =>{
            e.classList.remove('calendar-table__cell_active');
        });
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.modalDayForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_1__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.modalInfoForm);

        try {
            getData();
        } catch(e) {
            
        }
    });
}

function getData() {
    let eventDateArray = JSON.parse(localStorage.getItem(`events`));

    for (let i = 0; i <= eventDateArray.length; i++) {

        let eventDate = eventDateArray[i];
        
        let targetDayHeader = document.querySelectorAll('.calendar-table__header'),
            allCells = document.querySelectorAll('.calendar-table__cell'),
            lastDateOfMonth = (0,_table__WEBPACK_IMPORTED_MODULE_3__.getLastDayOfMonth)(_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedYear, _calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth);

        let targetDate = eventDate.dayDate,
            targetEvent = eventDate.dayEvent,
            targetDescr = eventDate.dayDescr,
            targetName = eventDate.dayName;

        targetDate = targetDate + '';

        let targetDay = +targetDate.slice(0,2),
            targetMonth = +targetDate.slice(3,5),
            targetYear = +targetDate.slice(6);

        if (_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedYear == targetYear && _calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth + 1 == targetMonth) {
            for (let i = 0; i < targetDayHeader.length; i++) {
                if (i < 7 && i <= lastDateOfMonth) {
                    (0,_modal_quick_form__WEBPACK_IMPORTED_MODULE_2__.showEventDay)(i, targetDayHeader, targetDay, allCells, targetEvent, targetName);
                    let descr = document.querySelector('[data-infoInputDescr]');
                    descr.value = targetDescr;
                } else if (i <= lastDateOfMonth -1) {
                    (0,_modal_quick_form__WEBPACK_IMPORTED_MODULE_2__.showEventDay)(i, targetDayHeader, targetDay, allCells, targetEvent, targetName);
                    let descr = document.querySelector('[data-infoInputDescr]');
                    descr.value = targetDescr;
                }
            }
        } 
    }

}



/***/ }),

/***/ "./js/modules/modal-day-form.js":
/*!**************************************!*\
  !*** ./js/modules/modal-day-form.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNewEvent": () => (/* binding */ addNewEvent),
/* harmony export */   "closeModalForm": () => (/* binding */ closeModalForm),
/* harmony export */   "resetActiveClassCell": () => (/* binding */ resetActiveClassCell),
/* harmony export */   "showEvent": () => (/* binding */ showEvent),
/* harmony export */   "showEventDate": () => (/* binding */ showEventDate),
/* harmony export */   "showInfoForm": () => (/* binding */ showInfoForm),
/* harmony export */   "showModalDayForm": () => (/* binding */ showModalDayForm),
/* harmony export */   "showPeople": () => (/* binding */ showPeople),
/* harmony export */   "showRefreshForm": () => (/* binding */ showRefreshForm)
/* harmony export */ });
/* harmony import */ var _calendar_btns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar-btns */ "./js/modules/calendar-btns.js");
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./local-storage */ "./js/modules/local-storage.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variables */ "./js/modules/variables.js");




function showModalDayForm() {
    const modalDayTrigger = document.querySelectorAll('.calendar-table__cell'),
          inputDate = document.querySelector('[data-dayInputDate]');

    modalDayTrigger.forEach(element => {
        element.addEventListener('click', (event) => {
            let targetCell = event.target.closest('.calendar-table__cell');

            if (targetCell.classList.contains('calendar-table__cell_event')) {
                let deleteTitle,
                    deleteNames;
                if (event.target.classList.contains('calendar-table__cell_event')) {
                    deleteTitle = event.target.querySelector('.calendar-table__title');
                    deleteNames = event.target.querySelector('.calendar-table__descr');
                } else {
                    deleteTitle = targetCell.querySelector('.calendar-table__title');
                    deleteNames = targetCell.querySelector('.calendar-table__descr');
                }

                showInfoForm(event, modalDayTrigger, targetCell, deleteTitle, deleteNames);
                showRefreshForm(event, modalDayTrigger, targetCell, inputDate, deleteTitle, deleteNames);
            } else {
                addNewEvent(event, modalDayTrigger, inputDate);
            }
        });
    });
}

function showInfoForm(event, modalDayTrigger, targetCell, deleteTitle, deleteNames) {
    placeModalDayForm(event, modalDayTrigger, _variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoForm);
    closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalDayForm);
    closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalQuickForm);
    closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.searchForm);
    showEventDate(event, _variables__WEBPACK_IMPORTED_MODULE_2__.infoDate);
    showEvent(event, targetCell);
    showPeople(event, targetCell);

    //infoFormBtns
    
    closeEventBtnInInfoForm(targetCell, event);
    deleteEventBtnInInfoForm(modalDayTrigger, deleteTitle, deleteNames, targetCell, event);
    doneEventBtnInInfoForm(modalDayTrigger);
}

function showRefreshForm(event, modalDayTrigger, targetCell, inputDate, deleteTitle, deleteNames) {
    _variables__WEBPACK_IMPORTED_MODULE_2__.refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let targetDate,
            targetDates;
        placeModalDayForm(event, modalDayTrigger, _variables__WEBPACK_IMPORTED_MODULE_2__.modalDayForm);
        closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoForm);
        closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalQuickForm);
        closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.searchForm);
        (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.postData)(_variables__WEBPACK_IMPORTED_MODULE_2__.modalDayForm);
        showEventDateRefreshBtn(targetDate, targetCell, targetDates, inputDate, event);

        // refreshEventDeleteBtn
        
        _variables__WEBPACK_IMPORTED_MODULE_2__.refreshDeleteEventBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoForm);
            closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalDayForm);
            closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.searchForm);
            resetActiveClassCell(modalDayTrigger, e);
            deleteEvent(deleteTitle, deleteNames, targetCell, event);
        });
    });
}

function addNewEvent(event, modalDayTrigger, inputDate) {
    placeModalDayForm(event, modalDayTrigger, _variables__WEBPACK_IMPORTED_MODULE_2__.modalDayForm);
    closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoForm);
    closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalQuickForm);
    closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.searchForm);
    showEventDate(event, inputDate);
    resetActiveClassCell(modalDayTrigger, event);
    (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.postData)(_variables__WEBPACK_IMPORTED_MODULE_2__.modalDayForm);
}

function deleteEventBtnInInfoForm(modalDayTrigger, deleteTitle, deleteNames, targetCell, event) {
    _variables__WEBPACK_IMPORTED_MODULE_2__.deleteEventBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoForm);
        resetActiveClassCell(modalDayTrigger, e);
        deleteEvent(deleteTitle, deleteNames, targetCell, event);
    });
}

function doneEventBtnInInfoForm(modalDayTrigger) {
    _variables__WEBPACK_IMPORTED_MODULE_2__.infoDoneBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoForm);
        resetActiveClassCell(modalDayTrigger, e);
    });
}

function closeEventBtnInInfoForm(targetCell, event) {
    _variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoCloseBtn.addEventListener('click', () => {
        closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoForm);
        if (event.target.classList.contains('calendar-table__cell_event')) {
            event.target.classList.remove('calendar-table__cell_active');
        } else {
            targetCell.classList.remove('calendar-table__cell_active');
        }
        
    });
}

function showEventDateRefreshBtn(targetDate, targetCell, targetDates, inputDate, event) {
    if (event.target.classList.contains('calendar-table__cell_event')) {
        targetDate = event.target.querySelector('.calendar-table__header').innerText;
    } else {
        targetDate = targetCell.querySelector('.calendar-table__header').innerText;
    }
    
    let cellNum = +targetDate.replace(/\D/g, '');
    
    if (cellNum < 10) {
        cellNum = `0${cellNum}`;
    }

    let targetMonth = _calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth;

    if (_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth < 9) {
        targetMonth = `0${_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth + 1}`;
    } else {
        targetMonth = _calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth + 1;
    }
    targetDates =`${cellNum}.${targetMonth}.${_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedYear}`;
    inputDate.value = targetDates;
}

function deleteEvent(deleteTitle, deleteNames, targetCell, event) {
    deleteTitle.textContent = '';
    deleteNames.textContent = '';
    if (event.target.classList.contains('calendar-table__cell_event')) {
        event.target.classList.remove('calendar-table__cell_event');
    } else {
        targetCell.classList.remove('calendar-table__cell_event');
    }

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
    
    if (_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth < 9) {
        targetMonth = `0${_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth + 1}`;
    } else {
        targetMonth = _calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth + 1;
    }
    let targetDates = `${cellNum}.${targetMonth}.${_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedYear}`;

    for (let i = 0; i < _local_storage__WEBPACK_IMPORTED_MODULE_1__.localArray.length; i++) {
        if (_local_storage__WEBPACK_IMPORTED_MODULE_1__.localArray[i].dayDate == targetDates) {
            _local_storage__WEBPACK_IMPORTED_MODULE_1__.localArray.splice(i, 1);
        }
        localStorage.setItem('events', JSON.stringify(_local_storage__WEBPACK_IMPORTED_MODULE_1__.localArray));
    }
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

            _variables__WEBPACK_IMPORTED_MODULE_2__.modalDayCloseBtn.addEventListener('click', () => {
                closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalDayForm);
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

    let targetMonth = _calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth;

    if (_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth < 9) {
        targetMonth = `0${_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth + 1}`;
    } else {
        targetMonth = _calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedMonth + 1;
    }
    if (!event.target.classList.contains('calendar-table__cell_event')) {
        date.value = `${cellNum}.${targetMonth}.${_calendar_btns__WEBPACK_IMPORTED_MODULE_0__.showedYear}`;
    } else {
        date.textContent = `${cellNum} ${_variables__WEBPACK_IMPORTED_MODULE_2__.monthes[+targetMonth-1]}`;
    }
}

function showEvent(event , targetCell) {
    let eventName;
    if (event.target.classList.contains('calendar-table__cell_event')) {
        eventName = event.target.querySelector('.calendar-table__title').innerText;
    } else {
        eventName = targetCell.querySelector('.calendar-table__title').innerText;
    }

    let eventModalName = _variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoForm.querySelector('.modal-info__title');
    eventModalName.textContent = `${eventName}`;
}

function showPeople(event, targetCell) {
    let eventPeople;
    if (event.target.classList.contains('calendar-table__cell_event')) {
        eventPeople = event.target.querySelector('.calendar-table__descr').innerText;
    } else {
        eventPeople = targetCell.querySelector('.calendar-table__descr').innerText;
    }

    let eventModalPeople = _variables__WEBPACK_IMPORTED_MODULE_2__.modalInfoForm.querySelector('.modal-info__people_names');

    eventModalPeople.textContent = `${eventPeople}`;

} 

function resetActiveClassCell (selector, elem) {
    selector.forEach(e => {
        if (elem.target !== e.target || _variables__WEBPACK_IMPORTED_MODULE_2__.modalDayForm.classList.contains('hide')) {
            e.classList.remove('calendar-table__cell_active');

            _variables__WEBPACK_IMPORTED_MODULE_2__.modalDayCloseBtn.addEventListener('click', () => {
                closeModalForm(_variables__WEBPACK_IMPORTED_MODULE_2__.modalDayForm);
                e.classList.remove('calendar-table__cell_active');
            });
        }
    });
}

function closeModalForm(form) {
    form.classList.remove('show');
    form.classList.add('hide');
}

_variables__WEBPACK_IMPORTED_MODULE_2__.dates.addEventListener('click', (e) => {
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



/***/ }),

/***/ "./js/modules/modal-quick-form.js":
/*!****************************************!*\
  !*** ./js/modules/modal-quick-form.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quickModalForm": () => (/* binding */ quickModalForm),
/* harmony export */   "showEventDay": () => (/* binding */ showEventDay)
/* harmony export */ });
/* harmony import */ var _modal_day_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-day-form */ "./js/modules/modal-day-form.js");
/* harmony import */ var _calendar_btns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar-btns */ "./js/modules/calendar-btns.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table */ "./js/modules/table.js");
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./local-storage */ "./js/modules/local-storage.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./variables */ "./js/modules/variables.js");






function quickModalForm() {
    let modalQuickCloseBtn = document.querySelector('[data-quickClose]'),
        modalQuickTrigger = document.querySelector('[data-addQuickEvent]');

    modalQuickTrigger.addEventListener('click', (e) => {
        const allCells = document.querySelectorAll('.calendar-table__cell');
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.modalInfoForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.modalDayForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.searchForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.resetActiveClassCell)(allCells, e);

        let targetX = e.target.getBoundingClientRect().x,
            targetY = e.target.getBoundingClientRect().y;
        const quickInput = document.querySelector('[data-quickInputEvent]');
        
        _variables__WEBPACK_IMPORTED_MODULE_4__.modalQuickForm.classList.add('show');
        _variables__WEBPACK_IMPORTED_MODULE_4__.modalQuickForm.classList.remove('hide');

        _variables__WEBPACK_IMPORTED_MODULE_4__.modalQuickForm.style.top = `${targetY + 26}px`;
        _variables__WEBPACK_IMPORTED_MODULE_4__.modalQuickForm.style.left = `${targetX}px`;
    
        _variables__WEBPACK_IMPORTED_MODULE_4__.modalQuickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let targetDayHeader = document.querySelectorAll('.calendar-table__header'),
                lastDateOfMonth = (0,_table__WEBPACK_IMPORTED_MODULE_2__.getLastDayOfMonth)(_calendar_btns__WEBPACK_IMPORTED_MODULE_1__.showedYear, _calendar_btns__WEBPACK_IMPORTED_MODULE_1__.showedMonth);
            let quickInfo = '' + quickInput.value,
                quickDate = +quickInfo.slice(0,2),
                quickMonth = +quickInfo.slice(3,5),
                quickYear = +quickInfo.slice(6,10),
                quickEventName = quickInfo.slice(11);

            if (_calendar_btns__WEBPACK_IMPORTED_MODULE_1__.showedYear == quickYear && _calendar_btns__WEBPACK_IMPORTED_MODULE_1__.showedMonth + 1 == quickMonth) {
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

            _local_storage__WEBPACK_IMPORTED_MODULE_3__.localArray.push(event);
            localStorage.setItem('events', JSON.stringify(_local_storage__WEBPACK_IMPORTED_MODULE_3__.localArray));

            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.modalDayForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.modalInfoForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.searchForm);
            try {
                (0,_local_storage__WEBPACK_IMPORTED_MODULE_3__.getData)();
            } catch(e) {}
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.modalQuickForm);

        });

        modalQuickCloseBtn.addEventListener('click', () => {
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_4__.modalQuickForm);
        });
    });
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



/***/ }),

/***/ "./js/modules/search-input.js":
/*!************************************!*\
  !*** ./js/modules/search-input.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInputEventList": () => (/* binding */ createInputEventList),
/* harmony export */   "showSeacrInput": () => (/* binding */ showSeacrInput)
/* harmony export */ });
/* harmony import */ var _modal_day_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-day-form */ "./js/modules/modal-day-form.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./variables */ "./js/modules/variables.js");
/* harmony import */ var _calendar_btns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar-btns */ "./js/modules/calendar-btns.js");
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./local-storage */ "./js/modules/local-storage.js");





function showSeacrInput() {
    _variables__WEBPACK_IMPORTED_MODULE_1__.searchInput.addEventListener('click', (e) => {
        let triggerCell = document.querySelectorAll('.calendar-table__cell_active');
        let eventDateArray = JSON.parse(localStorage.getItem(`events`));
        let targetX = e.target.getBoundingClientRect().x,
            targetY = e.target.getBoundingClientRect().y;
        
        _variables__WEBPACK_IMPORTED_MODULE_1__.searchForm.style.top = `${targetY + 30}px`;
        _variables__WEBPACK_IMPORTED_MODULE_1__.searchForm.style.left = `${targetX}px`;

        _variables__WEBPACK_IMPORTED_MODULE_1__.searchForm.classList.add('show');
        _variables__WEBPACK_IMPORTED_MODULE_1__.searchForm.classList.remove('hide');
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalDayForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalQuickForm);
        createInputEventList(eventDateArray);
        triggerCell.forEach(elem => {
            elem.classList.remove('calendar-table__cell_active');
        });

    });
    searchEventInput();
}

function addClickForInputListEvent(elem) {
    elem.addEventListener('click', () => {
        let targetName = elem.querySelector('.search-input__event').innerText,
            targetDate = elem.querySelector('.search-input__date').innerText;
        const eventCells = document.querySelectorAll('.calendar-table__cell_event');

        eventCells.forEach(elem => {
            let eventName = elem.querySelector('.calendar-table__title').innerText;
            let eventDateArray = JSON.parse(localStorage.getItem(`events`));
            let eventTitle,
                eventNames,
                eventDate,
                descr,
                targetCell;
            const eventDays = document.querySelectorAll('.calendar-table__cell_event'),
                  inputDate = document.querySelector('[data-dayInputDate]');


            placeInfoForm(elem, _variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm);

            if (eventName == targetName) {

                for (let i = 0; i < eventDateArray.length; i++ ) {
                    if (eventDateArray[i].dayEvent == targetName) {
                        eventTitle = eventDateArray[i].dayEvent;
                        eventNames = eventDateArray[i].dayName;
                        eventDate = eventDateArray[i].dayDate;
                        descr = eventDateArray[i].dayDescr;

                    }
                }

                findTagetCell(eventDays, eventTitle, targetCell);
                eventDays.forEach(e => {
                    let targetCellTitle = e.querySelector('.calendar-table__title').innerText;

                    if (targetCellTitle == eventTitle) {
                        targetCell = e.closest('.calendar-table__cell');
                    }
                });

                showInfoForm(eventDate, eventNames, eventTitle, targetCell);
                showRefreshForm(elem, targetCell, targetDate, inputDate);
            }
        });
    });
}

function findTagetCell(eventDays, eventTitle, targetCell) {
    eventDays.forEach(e => {
        let targetCellTitle = e.querySelector('.calendar-table__title').innerText;

        if (targetCellTitle == eventTitle) {
            targetCell = e.closest('.calendar-table__cell');
            return targetCell;
        }
    });
}

function placeInfoForm(elem, form) {
    let targetX = elem.getBoundingClientRect().x,
        targetY = elem.getBoundingClientRect().y;

    form.classList.add('show');
    form.classList.remove('hide');

    if (targetX > 730) {
        form.style.left = `${targetX - 300}px`;
    } else {
        form.style.left = `${targetX + 143}px`;
    }

    form.style.top = `${targetY}px`;
}

function showInfoForm(eventDate, eventNames, eventTitle, targetCell) {
    targetCell.classList.add('calendar-table__cell_active');
    (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalDayForm);
    (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalQuickForm);
    (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.searchForm);
    showEventDate(eventDate);
    (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.searchForm);
    showEvent(eventTitle);
    showPeople(eventNames);

    //infoFormBtns
    
    closeEventBtnInInfoForm(targetCell);
    deleteEventBtnInInfoForm(targetCell, eventDate);
    doneEventBtnInInfoForm(targetCell);
}

function showRefreshForm(elem, targetCell, targetDate, inputDate) {
    _variables__WEBPACK_IMPORTED_MODULE_1__.refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        placeInfoForm(elem, _variables__WEBPACK_IMPORTED_MODULE_1__.modalDayForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalQuickForm);
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.searchForm);
        (0,_local_storage__WEBPACK_IMPORTED_MODULE_3__.postData)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalDayForm);
        showEventDateRefreshBtn(targetDate, inputDate);

        // refreshEventDeleteBtn
        
        _variables__WEBPACK_IMPORTED_MODULE_1__.refreshDeleteEventBtn.addEventListener('click', (e) => {
            e.preventDefault();
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalDayForm);
            (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.searchForm);
            resetActiveClassCell(targetCell);
            deleteEvent(targetCell, targetDate);
        });
    });
}
function showEventDateRefreshBtn(targetDate, inputDate) {
    inputDate.value = targetDate;
}

function resetActiveClassCell(triggerCell) {
    triggerCell.classList.remove('calendar-table__cell_active');
}

function deleteEventBtnInInfoForm(targetCell, eventDate) {
    _variables__WEBPACK_IMPORTED_MODULE_1__.deleteEventBtn.addEventListener('click', (e) => {
        e.preventDefault();
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm);
        resetActiveClassCell(targetCell);
        deleteEvent(targetCell, eventDate);
    });
}

function doneEventBtnInInfoForm(targetCell) {
    _variables__WEBPACK_IMPORTED_MODULE_1__.infoDoneBtn.addEventListener('click', (e) => {
        e.preventDefault();
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm);
        resetActiveClassCell(targetCell);
    });
}

function closeEventBtnInInfoForm(targetCell) {
    _variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoCloseBtn.addEventListener('click', () => {
        (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.closeModalForm)(_variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm);
        targetCell.classList.remove('calendar-table__cell_active');
    });
}

function deleteEvent(targetCell, targetDate) {
    const Title = targetCell.querySelector('.calendar-table__title'),
          Members = targetCell.querySelector('.calendar-table__descr');

    Title.textContent = '';
    Members.textContent = '';

    targetCell.classList.remove('calendar-table__cell_event');

    for (let i = 0; i < _local_storage__WEBPACK_IMPORTED_MODULE_3__.localArray.length; i++) {
        if (_local_storage__WEBPACK_IMPORTED_MODULE_3__.localArray[i].dayDate == targetDate) {
            _local_storage__WEBPACK_IMPORTED_MODULE_3__.localArray.splice(i, 1);
        }
        localStorage.setItem('events', JSON.stringify(_local_storage__WEBPACK_IMPORTED_MODULE_3__.localArray));
    }
}

function showEventDate(infoDate) {
    let targetDate = infoDate;
    const dateInput = _variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm.querySelector('.modal-info__date');
    
    let eventDay = +targetDate.slice(0,2),
        eventMonth = +targetDate.slice(3,5),
        eventYear = +targetDate.slice(6);
   
    if (eventDay < 10) {
        eventDay = `0${eventDay}`;
    }

    let targetMonth = _calendar_btns__WEBPACK_IMPORTED_MODULE_2__.showedMonth;

    dateInput.textContent = `${eventDay} ${_variables__WEBPACK_IMPORTED_MODULE_1__.monthes[+targetMonth]}`;
}

function showEvent(eventName) {
    let eventModalName = _variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm.querySelector('.modal-info__title');
    eventModalName.textContent = `${eventName}`;
}

function showPeople(names) {
    let eventModalPeople = _variables__WEBPACK_IMPORTED_MODULE_1__.modalInfoForm.querySelector('.modal-info__people_names');
    eventModalPeople.textContent = `${names}`;

} 

function searchEventInput() {
    _variables__WEBPACK_IMPORTED_MODULE_1__.searchInput.addEventListener('input', () => {
        let eventDateArray = JSON.parse(localStorage.getItem(`events`));
        let searchedEventList = showSearchedEvent(eventDateArray);
        createInputEventList(searchedEventList);
    });
}

function showSearchedEvent(eventDateArray) {
    return eventDateArray.filter(item => {
        return item.dayEvent.indexOf(_variables__WEBPACK_IMPORTED_MODULE_1__.searchInput.value) > - 1 || item.dayDate.indexOf(_variables__WEBPACK_IMPORTED_MODULE_1__.searchInput.value) > - 1;
   });
}

function createInputEventList(eventDateArray) {
    const inputWrapper = document.querySelector('.search-input__wrapper');
    inputWrapper.innerHTML = ``;

    try {
        for (let i = 0; i < eventDateArray.length; i++) {

            let eventDate = eventDateArray[i];
            let inputItem = document.createElement('div');
                
            let targetDate = eventDate.dayDate,
                targetEvent = eventDate.dayEvent;
    
            inputItem.classList.add('search-input__item');
            inputItem.innerHTML = `
                <div class="search-input__descr">
                    <p class="search-input__event">${targetEvent}</p>
                    <p class="search-input__date">${targetDate}</p>
                </div>
            `;
            inputWrapper.appendChild(inputItem);
            addClickForInputListEvent(inputItem);
        }
    } catch(e) {
    }
}



/***/ }),

/***/ "./js/modules/table.js":
/*!*****************************!*\
  !*** ./js/modules/table.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawDates": () => (/* binding */ drawDates),
/* harmony export */   "getLastDayOfMonth": () => (/* binding */ getLastDayOfMonth),
/* harmony export */   "initCalendar": () => (/* binding */ initCalendar),
/* harmony export */   "showCurrentDay": () => (/* binding */ showCurrentDay),
/* harmony export */   "showInfo": () => (/* binding */ showInfo)
/* harmony export */ });
/* harmony import */ var _modal_day_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-day-form */ "./js/modules/modal-day-form.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./variables */ "./js/modules/variables.js");


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
    (0,_modal_day_form__WEBPACK_IMPORTED_MODULE_0__.showModalDayForm)();
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

    drawDates(showedYear, showedMonth, _variables__WEBPACK_IMPORTED_MODULE_1__.dates);
    showInfo(showedYear, showedMonth, info);
    showCurrentDay(showedYear, showedMonth, current, _variables__WEBPACK_IMPORTED_MODULE_1__.dates);
}



/***/ }),

/***/ "./js/modules/variables.js":
/*!*********************************!*\
  !*** ./js/modules/variables.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calendar": () => (/* binding */ calendar),
/* harmony export */   "dates": () => (/* binding */ dates),
/* harmony export */   "deleteEventBtn": () => (/* binding */ deleteEventBtn),
/* harmony export */   "infoDate": () => (/* binding */ infoDate),
/* harmony export */   "infoDoneBtn": () => (/* binding */ infoDoneBtn),
/* harmony export */   "modalDayCloseBtn": () => (/* binding */ modalDayCloseBtn),
/* harmony export */   "modalDayForm": () => (/* binding */ modalDayForm),
/* harmony export */   "modalDayTrigger": () => (/* binding */ modalDayTrigger),
/* harmony export */   "modalInfoCloseBtn": () => (/* binding */ modalInfoCloseBtn),
/* harmony export */   "modalInfoForm": () => (/* binding */ modalInfoForm),
/* harmony export */   "modalQuickForm": () => (/* binding */ modalQuickForm),
/* harmony export */   "monthes": () => (/* binding */ monthes),
/* harmony export */   "refreshBtn": () => (/* binding */ refreshBtn),
/* harmony export */   "refreshDeleteEventBtn": () => (/* binding */ refreshDeleteEventBtn),
/* harmony export */   "searchForm": () => (/* binding */ searchForm),
/* harmony export */   "searchInput": () => (/* binding */ searchInput)
/* harmony export */ });
let calendar = document.querySelector('.calendar'),
    dates = calendar.querySelector('.calendar-table__wrapper');
const modalDayForm = document.querySelector('.modal-day__form'),
    modalQuickForm = document.querySelector('.modal-quick__form'),
    modalDayCloseBtn = document.querySelector('[data-close]'),
    modalInfoCloseBtn = document.querySelector('[data-modalInfoClose]'),
    modalInfoForm = document.querySelector('.modal-info__form'),
    monthes = ['января', 'февраля', 'марта', 
    'апреля', 'мая', 'июня', 'июля', 
    'августа', 'сентября', 'октября', 
    'ноября', 'декабря'],
    infoDate = document.querySelector('.modal-info__date'),
    infoDoneBtn = document.querySelector('[data-done]'),
    refreshBtn = document.querySelector('[data-refreshEvent]'),
    deleteEventBtn = document.querySelector('[data-deleteEvent]'),
    refreshDeleteEventBtn = document.querySelector('[data-delete]'),
    searchInput = document.querySelector('[data-search-input]'),
    searchForm = document.querySelector('.search-input'),
    modalDayTrigger = document.querySelectorAll('.calendar-table__cell');



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/table */ "./js/modules/table.js");
/* harmony import */ var _modules_local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/local-storage */ "./js/modules/local-storage.js");
/* harmony import */ var _modules_calendar_btns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calendar-btns */ "./js/modules/calendar-btns.js");
/* harmony import */ var _modules_modal_quick_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal-quick-form */ "./js/modules/modal-quick-form.js");
/* harmony import */ var _modules_search_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/search-input */ "./js/modules/search-input.js");
/* harmony import */ var _modules_modal_day_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal-day-form */ "./js/modules/modal-day-form.js");
/* harmony import */ var _modules_variables__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/variables */ "./js/modules/variables.js");
/* harmony import */ var _modules_close_froms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/close-froms */ "./js/modules/close-froms.js");









window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_modal_quick_form__WEBPACK_IMPORTED_MODULE_3__.quickModalForm)();
    (0,_modules_search_input__WEBPACK_IMPORTED_MODULE_4__.showSeacrInput)();
    (0,_modules_calendar_btns__WEBPACK_IMPORTED_MODULE_2__.changeMonth)();
    (0,_modules_modal_day_form__WEBPACK_IMPORTED_MODULE_5__.showModalDayForm)();
    (0,_modules_table__WEBPACK_IMPORTED_MODULE_0__.initCalendar)(_modules_calendar_btns__WEBPACK_IMPORTED_MODULE_2__.showedYear, _modules_calendar_btns__WEBPACK_IMPORTED_MODULE_2__.showedMonth, _modules_calendar_btns__WEBPACK_IMPORTED_MODULE_2__.current, _modules_variables__WEBPACK_IMPORTED_MODULE_6__.calendar);
    (0,_modules_local_storage__WEBPACK_IMPORTED_MODULE_1__.showLocalArray)();
    (0,_modules_close_froms__WEBPACK_IMPORTED_MODULE_7__.closeForms)();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map