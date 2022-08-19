import {showedMonth, showedYear} from './calendar-btns';
import {localArray, postData} from './local-storage';
import {modalInfoForm, modalDayForm, modalInfoCloseBtn, 
        dates , modalDayCloseBtn, monthes, modalQuickForm, infoDate, 
        infoDoneBtn, refreshBtn, deleteEventBtn, refreshDeleteEventBtn, searchForm} from './variables';

function showModalDayForm() {
    const modalDayTrigger = document.querySelectorAll('.calendar-table__cell'),
          inputDate = document.querySelector('[data-dayInputDate]');

    modalDayTrigger.forEach(element => {
        element.addEventListener('click', (event) => {
            let targetCell = event.target.closest('.calendar-table__cell');

            if (targetCell.classList.contains('calendar-table__cell_event')) {
                
                //showInfoForm

                let deleteTitle,
                    deleteNames;

                if (event.target.classList.contains('calendar-table__cell_event')) {
                    deleteTitle = event.target.querySelector('.calendar-table__title');
                    deleteNames = event.target.querySelector('.calendar-table__descr');
                } else {
                    deleteTitle = targetCell.querySelector('.calendar-table__title');
                    deleteNames = targetCell.querySelector('.calendar-table__descr');
                }

                placeModalDayForm(event, modalDayTrigger, modalInfoForm);
                closeModalForm(modalDayForm);
                closeModalForm(modalQuickForm);
                closeModalForm(searchForm);
                showEventDate(event, infoDate);
                showEvent(event, targetCell);
                showPeople(event, targetCell);

                //CloseInfoFrom

                modalInfoCloseBtn.addEventListener('click', () => {
                    closeModalForm(modalInfoForm);
                    if (event.target.classList.contains('calendar-table__cell_event')) {
                        event.target.classList.remove('calendar-table__cell_active');
                    } else {
                        targetCell.classList.remove('calendar-table__cell_active');
                    }
                    
                });

                //deleteEventInfoForm

                deleteEventBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    closeModalForm(modalInfoForm);
                    resetActiveClassCell(modalDayTrigger, e);
                    deleteEvent(deleteTitle, deleteNames, targetCell, event);
                });

                infoDoneBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    closeModalForm(modalInfoForm);
                    resetActiveClassCell(modalDayTrigger, e);
                });

                //RefreshForm

                refreshBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let targetDate,
                        targetDates;
                    placeModalDayForm(event, modalDayTrigger, modalDayForm);
                    closeModalForm(modalInfoForm);
                    closeModalForm(modalQuickForm);
                    closeModalForm(searchForm);
                    postData(modalDayForm);
                    showEventDateRefreshBtn(targetDate, targetCell, targetDates, inputDate, event);

                    // refreshEventDeleteBtn
                    
                    refreshDeleteEventBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        closeModalForm(modalInfoForm);
                        closeModalForm(modalDayForm);
                        closeModalForm(searchForm);
                        resetActiveClassCell(modalDayTrigger, e);
                        deleteEvent(deleteTitle, deleteNames, targetCell, event);
                    });
                });
            } else {

                //addNewEvent

                placeModalDayForm(event, modalDayTrigger, modalDayForm);
                closeModalForm(modalInfoForm);
                closeModalForm(modalQuickForm);
                closeModalForm(searchForm);
                showEventDate(event, inputDate);
                resetActiveClassCell(modalDayTrigger, event);
                postData(modalDayForm);
            }
        });
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

    let targetMonth = showedMonth;

    if (showedMonth < 9) {
        targetMonth = `0${showedMonth + 1}`;
    } else {
        targetMonth = showedMonth + 1;
    }
    targetDates =`${cellNum}.${targetMonth}.${showedYear}`;
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
    
    if (showedMonth < 9) {
        targetMonth = `0${showedMonth + 1}`;
    } else {
        targetMonth = showedMonth + 1;
    }
    let targetDates = `${cellNum}.${targetMonth}.${showedYear}`;

    for (let i = 0; i < localArray.length; i++) {
        if (localArray[i].dayDate == targetDates) {
            localArray.splice(i, 1);
        }
        localStorage.setItem('events', JSON.stringify(localArray));
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

export {showModalDayForm, closeModalForm, resetActiveClassCell};