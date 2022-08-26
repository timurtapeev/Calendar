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
                let eventDateArray = JSON.parse(localStorage.getItem(`events`));
                let eventTitle,
                    eventNames,
                    eventDescr,
                    realMonthNumber,
                    targetDate,
                    targetDay;
                if (event.target.classList.contains('calendar-table__cell_event')) {
                    targetDay = event.target.querySelector('.calendar-table__header').innerText.replace(/\D/g, '');
                } else {
                    targetDay = targetCell.querySelector('.calendar-table__header').innerText.replace(/\D/g, '');
                }
                console.log(targetDay);
                if(showedMonth < 9) {
                    realMonthNumber = `0${showedMonth + 1}`;
                } else {
                    realMonthNumber = showedMonth + 1;
                }

                if(targetDay < 10) {
                    targetDay = `0${targetDay}`;
                }

                targetDate = `${targetDay}.${realMonthNumber}.${showedYear}`;

                for (let i = 0; i < eventDateArray.length; i++) {
                    
                    if (eventDateArray[i].dayDate == targetDate) {
                        eventTitle = eventDateArray[i].dayEvent;
                        eventNames = eventDateArray[i].dayName;
                        eventDescr = eventDateArray[i].dayDescr;

                        break;
                    }
                }

                showInfoForm(event, modalDayTrigger, targetCell, eventTitle, eventNames, targetDate);
                showRefreshForm(event, modalDayTrigger, targetCell, inputDate, targetDate);
            } else {
                addNewEvent(event, modalDayTrigger, inputDate);
            }
        });
    });
}

function showInfoForm(event, modalDayTrigger, targetCell, eventTitle, eventNames, targetDate) {
    placeModalDayForm(event, modalDayTrigger, modalInfoForm);
    closeModalForm(modalDayForm);
    closeModalForm(modalQuickForm);
    closeModalForm(searchForm);
    showEventDate(event, infoDate, targetDate);
    showEvent(eventTitle);
    showPeople(eventNames);

    //infoFormBtns
    
    closeEventBtnInInfoForm(targetCell, event);
    deleteEventBtnInInfoForm(modalDayTrigger, targetCell, event, targetDate);
    doneEventBtnInInfoForm(modalDayTrigger);
}

function showRefreshForm(event, modalDayTrigger, targetCell, inputDate, targetDate) {
    refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let date,
            targetDates;
        placeModalDayForm(event, modalDayTrigger, modalDayForm);
        closeModalForm(modalInfoForm);
        closeModalForm(modalQuickForm);
        closeModalForm(searchForm);
        postData(modalDayForm);
        showEventDateRefreshBtn(date, targetCell, targetDates, inputDate, event);

        // refreshEventDeleteBtn
        
        refreshDeleteEventBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModalForm(modalInfoForm);
            closeModalForm(modalDayForm);
            closeModalForm(searchForm);
            resetActiveClassCell(modalDayTrigger, e);
            deleteEvent(modalDayTrigger, targetCell, event, targetDate);
        });
    });
}

function addNewEvent(event, modalDayTrigger, inputDate) {
    placeModalDayForm(event, modalDayTrigger, modalDayForm);
    closeModalForm(modalInfoForm);
    closeModalForm(modalQuickForm);
    closeModalForm(searchForm);
    showEventDate(event, inputDate);
    resetActiveClassCell(modalDayTrigger, event);
    postData(modalDayForm);
}

function deleteEventBtnInInfoForm(modalDayTrigger, targetCell, event, targetDate) {
    deleteEventBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalForm(modalInfoForm);
        resetActiveClassCell(modalDayTrigger, e);
        deleteEvent(targetCell, event, targetDate);
    });
}

function doneEventBtnInInfoForm(modalDayTrigger) {
    infoDoneBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalForm(modalInfoForm);
        resetActiveClassCell(modalDayTrigger, e);
    });
}

function closeEventBtnInInfoForm(targetCell, event) {
    modalInfoCloseBtn.addEventListener('click', () => {
        closeModalForm(modalInfoForm);
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

    let targetMonth = showedMonth;

    if (showedMonth < 9) {
        targetMonth = `0${showedMonth + 1}`;
    } else {
        targetMonth = showedMonth + 1;
    }
    targetDates =`${cellNum}.${targetMonth}.${showedYear}`;
    inputDate.value = targetDates;
}

function deleteEvent(targetCell, e, targetDate) {
    // let deleteTitle = e.target.querySelector('.calendar-table__header');
    let deleteMembers = e.target.querySelector('.calendar-table__title');
    // deleteTitle.textContent = '';
    try {
        deleteMembers.textContent = '';
    } catch(e) {

    } 
    
    if (e.target.classList.contains('calendar-table__cell_event')) {
        e.target.classList.remove('calendar-table__cell_event');
    } else {
        targetCell.classList.remove('calendar-table__cell_event');
    }

    for (let i = 0; i < localArray.length; i++) {
        if (localArray[i].dayDate == targetDate) {
            console.log(localArray[i].dayDate, targetDate);
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
    let targetCell = event.target.closest('.calendar-table__cell_event');
    let targetDate,
        cellNum;
    console.log(targetCell);
    if (targetCell) {
        targetDate = targetCell.querySelector('.calendar-table__header').innerText;
        cellNum = +targetDate.replace(/\D/g, '');
    } else {
        cellNum = event.target.innerText.replace(/\D/g, '');
    }

    if (cellNum < 10) {
        cellNum = `0${cellNum}`;
    }

    let targetMonth = showedMonth;

    if (showedMonth < 9) {
        targetMonth = `0${showedMonth + 1}`;
    } else {
        targetMonth = showedMonth + 1;
    }

    if (targetCell) {
        date.textContent = `${+cellNum} ${monthes[+targetMonth-1]}`;
    } else {
        date.value = `${cellNum}.${targetMonth}.${showedYear}`;
    }
}

function showEvent(deleteTitle) {
    let eventModalName = modalInfoForm.querySelector('.modal-info__title');
    eventModalName.textContent = `${deleteTitle}`;
}

function showPeople(deleteNames) {
    let eventModalPeople = modalInfoForm.querySelector('.modal-info__people_names');

    eventModalPeople.textContent = `${deleteNames}`;

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

function addDots(str, symbolNumber) {
    let symbolInStr = str.length,
        newStr;

    if (symbolInStr > symbolNumber) {
        newStr = `${str.slice(0, symbolNumber)}...`;
    } else {
        newStr = str;
    }
    return newStr;
}

export {showModalDayForm, closeModalForm, resetActiveClassCell, showInfoForm, showRefreshForm, 
        addNewEvent, showEventDate, addDots};