import {showedYear, showedMonth} from './calendar-btns';
import {closeModalForm} from './modal-day-form';
import {showEventDay} from './modal-quick-form';
import {getLastDayOfMonth} from './table';
import {modalDayForm, modalInfoForm} from './variables';

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
        closeModalForm(modalDayForm);
        closeModalForm(modalInfoForm);

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

export {localArray, postData, getData, showLocalArray};