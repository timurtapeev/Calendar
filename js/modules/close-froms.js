import { closeModalForm } from "./modal-day-form";
import { calendar, modalQuickForm, modalDayForm, modalInfoForm, searchForm} from "./variables";

const header = document.querySelector('.header');
function closeForms() {
    calendar.addEventListener('click', (event) => {
        let targetCell = event.target.closest('.calendar-table__cell');
        if (targetCell) {

        } else {
            closeModalForm(modalQuickForm);
            closeModalForm(modalDayForm);
            closeModalForm(modalInfoForm);
            closeModalForm(searchForm);
        }
    });
    header.addEventListener('click', (e) => {
        let targetElem = e.target.closest('[data-headerBtn]');
        if (targetElem) {
            
        } else {
            closeModalForm(modalQuickForm);
            closeModalForm(modalDayForm);
            closeModalForm(modalInfoForm);
            closeModalForm(searchForm);
        }
    });
}

export {closeForms};