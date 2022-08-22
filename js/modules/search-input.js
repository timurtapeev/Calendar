import {closeModalForm} from './modal-day-form';
import {modalDayForm, modalInfoForm, modalQuickForm, 
        searchInput, searchForm, modalDayCloseBtn, monthes, modalInfoCloseBtn} from './variables';
import {showedMonth, showedYear} from './calendar-btns';

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
            const eventDays = document.querySelectorAll('.calendar-table__cell_event');

            placeInfoForm(elem);

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

function placeInfoForm(elem) {
    let targetX = elem.getBoundingClientRect().x,
    targetY = elem.getBoundingClientRect().y;

    modalInfoForm.classList.add('show');
    modalInfoForm.classList.remove('hide');

    if (targetX > 730) {
        modalInfoForm.style.left = `${targetX - 300}px`;
    } else {
        modalInfoForm.style.left = `${targetX + 143}px`;
    }

    modalInfoForm.style.top = `${targetY}px`;
}

function showInfoForm(infoDate, names, eventName, targetCell) {
    targetCell.classList.add('calendar-table__cell_active');
    closeModalForm(modalDayForm);
    closeModalForm(modalQuickForm);
    closeModalForm(searchForm);
    showEventDate(infoDate);
    showEvent(eventName);
    showPeople(names);

    //infoFormBtns
    
    closeEventBtnInInfoForm(targetCell);
    // deleteEventBtnInInfoForm(modalDayTrigger, deleteTitle, deleteNames, targetCell, event);
    // doneEventBtnInInfoForm(modalDayTrigger);
}

function closeEventBtnInInfoForm(targetCell, event) {
    modalInfoCloseBtn.addEventListener('click', () => {
        closeModalForm(modalInfoForm);
        targetCell.classList.remove('calendar-table__cell_active');
    });
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