import {initCalendar} from './modules/table';
import {showLocalArray} from './modules/local-storage';
import {changeMonth, showedYear, showedMonth, current} from './modules/calendar-btns';
import {quickModalForm} from './modules/modal-quick-form';
import {showSeacrInput} from './modules/search-input';
import {showModalDayForm} from './modules/modal-day-form';
import {calendar} from './modules/variables';

window.addEventListener('DOMContentLoaded', () => {
    quickModalForm();
    showSeacrInput();
    changeMonth();
    showModalDayForm();
    initCalendar(showedYear, showedMonth, current, calendar);
    showLocalArray();
});
