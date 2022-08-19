import {closeModalForm, resetActiveClassCell} from './modal-day-form';
import {modalDayForm, modalInfoForm, modalQuickForm, searchInput, searchForm} from './variables';
import {localArray} from './local-storage';

const modalDayTrigger = document.querySelectorAll('.calendar-table__cell');

function showSeacrInput() {
    searchInput.addEventListener('click', (e) => {
        let targetX = e.target.getBoundingClientRect().x,
             targetY = e.target.getBoundingClientRect().y;

        closeModalForm(modalDayForm);
        closeModalForm(modalInfoForm);
        closeModalForm(modalQuickForm);
        modalDayTrigger.forEach((e) => {
            resetActiveClassCell(modalDayTrigger, e);
        });
    
        searchForm.style.top = `${targetY + 30}px`;
        searchForm.style.left = `${targetX}px`;

        searchForm.classList.add('show');
        searchForm.classList.remove('hide');

        createInputEventList();
    });
}

function createInputEventList() {
    let eventDateArray = JSON.parse(localStorage.getItem(`events`));
}

export {showSeacrInput};