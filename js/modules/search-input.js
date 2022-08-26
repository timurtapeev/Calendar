import {closeModalForm} from './modal-day-form';
import {modalDayForm, modalInfoForm, modalQuickForm, 
        searchInput, searchForm, refreshDeleteEventBtn, monthes, 
        modalInfoCloseBtn, infoDoneBtn, deleteEventBtn, refreshBtn} from './variables';
import {showedMonth, showedYear, changeShowDate} from './calendar-btns';
import {localArray, postData, getData} from './local-storage';

function showSeacrInput() {
    searchInput.addEventListener('click', (e) => {
        let triggerCell = document.querySelectorAll('.calendar-table__cell_active');
        let eventDateArray = JSON.parse(localStorage.getItem(`events`));
        let targetX = e.target.getBoundingClientRect().x,
            targetY = e.target.getBoundingClientRect().y;
        
        searchForm.style.top = `${targetY + 30}px`;
        searchForm.style.left = `${targetX}px`;

        searchForm.classList.add('show');
        searchForm.classList.remove('hide');
        closeModalForm(modalDayForm);
        closeModalForm(modalInfoForm);
        closeModalForm(modalQuickForm);
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
            targetDate = elem.querySelector('.search-input__date').innerText,
            realMonthNumber;
        let eventCells = document.querySelectorAll('.calendar-table__cell_event');
        let eventDateArray = JSON.parse(localStorage.getItem(`events`));

        if(showedMonth < 9) {
            realMonthNumber = `0${showedMonth + 1}`;
        } else {
            realMonthNumber = showedMonth + 1;
        }

        eventCells.forEach(elem => {
            let eventDay = elem.querySelector('.calendar-table__header').innerText;
            let eventTitle,
                eventNames,
                eventDate,
                descr,
                targetCell;
            const inputDate = document.querySelector('[data-dayInputDate]');

            if (targetDate.slice(0, 2) == eventDay.replace(/\D/g, '') &&
                showedYear == targetDate.slice(6, 10) &&
                realMonthNumber == targetDate.slice(3, 5)) {

                showEventInSearchInput(eventDateArray, targetName, targetDate, 
                    eventTitle, eventNames, eventDate, descr ,targetCell, elem, inputDate);
            } else if (showedYear !== targetDate.slice(6, 10) && realMonthNumber !== targetDate.slice(3, 5)) {
                let showTargetYear = +targetDate.slice(6, 10),
                    showTargetMonth = +targetDate.slice(3, 5) - 1;

                changeShowDate(showTargetMonth, showTargetYear);

                try {
                    getData();
                } catch(e) {

                }                

                let eventCells = document.querySelectorAll('.calendar-table__cell_event');
                eventCells.forEach(elem => {
                    let eventDay = elem.querySelector('.calendar-table__header').innerText;

                    if (targetDate.slice(0, 2) == eventDay.replace(/\D/g, '')) {
                        showEventInSearchInput(eventDateArray, targetName, targetDate, 
                            eventTitle, eventNames, eventDate, descr ,targetCell, elem, inputDate);
                    }
                });
            }
        });
    });
}

function showEventInSearchInput(array, targetName, targetDate, title, members, date, descr ,cell, elem, inputDate) {
    for (let i = 0; i < array.length; i++ ) {
        if (array[i].dayEvent == targetName && targetDate == array[i].dayDate) {
            title = array[i].dayEvent;
            members = array[i].dayName;
            date = array[i].dayDate;
            descr = array[i].dayDescr;
            cell = elem.closest('.calendar-table__cell');
        }
    }

    console.log(title, members, date, cell);

    showInfoForm(date, members, title, cell);
    showRefreshForm(elem, cell, targetDate, inputDate);
    placeInfoForm(elem, modalInfoForm);
}

function findTagetCell(eventDays, eventTitle, targetCell, eventName) {
    eventDays.forEach(e => {
        if (eventName == eventTitle) {
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
    closeModalForm(modalDayForm);
    closeModalForm(modalQuickForm);
    closeModalForm(searchForm);
    showEventDate(eventDate);
    closeModalForm(searchForm);
    showEvent(eventTitle);
    showPeople(eventNames);

    //infoFormBtns
    
    closeEventBtnInInfoForm(targetCell);
    deleteEventBtnInInfoForm(targetCell, eventDate);
    doneEventBtnInInfoForm(targetCell);
}

function showRefreshForm(elem, targetCell, targetDate, inputDate) {
    refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        placeInfoForm(elem, modalDayForm);
        closeModalForm(modalInfoForm);
        closeModalForm(modalQuickForm);
        closeModalForm(searchForm);
        postData(modalDayForm);
        showEventDateRefreshBtn(targetDate, inputDate);

        // refreshEventDeleteBtn
        
        refreshDeleteEventBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModalForm(modalInfoForm);
            closeModalForm(modalDayForm);
            closeModalForm(searchForm);
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
    deleteEventBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalForm(modalInfoForm);
        resetActiveClassCell(targetCell);
        deleteEvent(targetCell, eventDate);
    });
}

function doneEventBtnInInfoForm(targetCell) {
    infoDoneBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalForm(modalInfoForm);
        resetActiveClassCell(targetCell);
    });
}

function closeEventBtnInInfoForm(targetCell) {
    modalInfoCloseBtn.addEventListener('click', () => {
        closeModalForm(modalInfoForm);
        targetCell.classList.remove('calendar-table__cell_active');
    });
}

function deleteEvent(targetCell, targetDate) {
    const Title = targetCell.querySelector('.calendar-table__title'),
          Members = targetCell.querySelector('.calendar-table__descr');

    Title.textContent = '';
    Members.textContent = '';

    targetCell.classList.remove('calendar-table__cell_event');

    for (let i = 0; i < localArray.length; i++) {
        if (localArray[i].dayDate == targetDate) {
            localArray.splice(i, 1);
        }
        localStorage.setItem('events', JSON.stringify(localArray));
    }
}

function showEventDate(infoDate) {
    let targetDate = infoDate;
    const dateInput = modalInfoForm.querySelector('.modal-info__date');
    
    let eventDay = +targetDate.slice(0,2),
        eventMonth = +targetDate.slice(3,5),
        eventYear = +targetDate.slice(6);
   
    if (eventDay < 10) {
        eventDay = `0${eventDay}`;
    }

    let targetMonth = showedMonth;

    dateInput.textContent = `${eventDay} ${monthes[+targetMonth]}`;
}

function showEvent(eventName) {
    let eventModalName = modalInfoForm.querySelector('.modal-info__title');
    eventModalName.textContent = `${eventName}`;
}

function showPeople(names) {
    let eventModalPeople = modalInfoForm.querySelector('.modal-info__people_names');
    eventModalPeople.textContent = `${names}`;

} 

function searchEventInput() {
    searchInput.addEventListener('input', () => {
        let eventDateArray = JSON.parse(localStorage.getItem(`events`));
        let searchedEventList = showSearchedEvent(eventDateArray);
        createInputEventList(searchedEventList);
    });
}

function showSearchedEvent(eventDateArray) {
    return eventDateArray.filter(item => {
        return item.dayEvent.indexOf(searchInput.value) > - 1 || item.dayDate.indexOf(searchInput.value) > - 1;
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

export {showSeacrInput, createInputEventList};