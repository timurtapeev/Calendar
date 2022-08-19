import {closeModalForm, resetActiveClassCell} from './modal-day-form';
import {showedYear, showedMonth} from './calendar-btns';
import {getLastDayOfMonth} from './table';
import {localArray, getData} from './local-storage';
import {modalDayForm, modalInfoForm, modalQuickForm, searchForm} from './variables';

function quickModalForm() {
    let modalQuickCloseBtn = document.querySelector('[data-quickClose]'),
        modalQuickTrigger = document.querySelector('[data-addQuickEvent]');

    modalQuickTrigger.addEventListener('click', (e) => {
        const allCells = document.querySelectorAll('.calendar-table__cell');
        closeModalForm(modalInfoForm);
        closeModalForm(modalDayForm);
        closeModalForm(searchForm);
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
            closeModalForm(searchForm);
            try {
                getData();
            } catch(e) {}
            closeModalForm(modalQuickForm);

        });

        modalQuickCloseBtn.addEventListener('click', () => {
            closeModalForm(modalQuickForm);
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

export {quickModalForm, showEventDay};