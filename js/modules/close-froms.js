import { closeModalForm } from "./modal-day-form";
import { calendar, modalQuickForm, modalDayForm, modalInfoForm, searchForm} from "./variables";

const header = document.querySelector('.header');

function closeForms() {
    calendar.addEventListener('click', (event) => {
        let targetCell = event.target.closest('.calendar-table__cell');
        let triggerCell = document.querySelectorAll('.calendar-table__cell_active');
        if (targetCell) {

        } else {
            closeModalForm(modalQuickForm);
            closeModalForm(modalDayForm);
            closeModalForm(modalInfoForm);
            closeModalForm(searchForm);
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
            closeModalForm(modalQuickForm);
            closeModalForm(modalDayForm);
            closeModalForm(modalInfoForm);
            closeModalForm(searchForm);
            triggerCell.forEach(elem => {
                elem.classList.remove('calendar-table__cell_active');
            });
        }
    });
}

export {closeForms};