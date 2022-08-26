import {initCalendar} from './table';
import {closeModalForm} from './modal-day-form';
import {getData} from './local-storage';
import {calendar, modalDayForm, modalInfoForm, modalQuickForm, searchForm} from './variables';

let date = new Date(),
showedYear = date.getFullYear(),
showedMonth = date.getMonth(),
showedDate = date.getDate(),
current = {year: showedYear, 
        month: showedMonth, 
        date: showedDate};
        
function changeMonth() {
    const prev = calendar.querySelector('[data-prev]'),
        next = calendar.querySelector('[data-next]'),
        todayButton = calendar.querySelector('.calendar-header__button-today');

    prev.addEventListener('click', () => {
        showedYear = getPrevYear(showedYear, showedMonth);
        showedMonth = getPrevMonth(showedMonth);

        initCalendar(showedYear, showedMonth, current, calendar);

        closeModalForm(modalDayForm);
        closeModalForm(modalInfoForm);
        closeModalForm(modalQuickForm);
        closeModalForm(searchForm);
        try {
            getData();
        } catch(e) {
            
        }
    });

    next.addEventListener('click', () => {
        showedYear = getNextYear(showedYear, showedMonth);
        showedMonth = getNextMonth(showedMonth);

        initCalendar(showedYear, showedMonth, current, calendar);

        closeModalForm(modalDayForm);
        closeModalForm(modalInfoForm);
        closeModalForm(modalQuickForm);
        closeModalForm(searchForm);
        try {
            getData();
        } catch(e) {
            
        }
    });

    todayButton.addEventListener('click', () => {
        showedYear = date.getFullYear();
        showedMonth = date.getMonth();

        initCalendar(showedYear, showedMonth, current, calendar);

        closeModalForm(modalDayForm);
        closeModalForm(modalInfoForm);
        closeModalForm(modalQuickForm);
        closeModalForm(searchForm);
        try {
            getData();
        } catch(e) {
            
        }
    });

    function getPrevYear(year, month) {
        if (month == 0) {
            return year - 1;
        } else {
            return year;
        }
    }

    function getPrevMonth(month) {
        if (month == 0) {
            return 11;
        } else {
            return month - 1;
        }
    }

    function getNextYear(year, month) {
        if (month == 11) {
            return year + 1;
        } else {
            return year;
        }
    }

    function getNextMonth(month) {
        if (month == 11) {
            return 0;
        } else {
            return month + 1;
        }
    }
}

function changeShowDate(month, year) {
    showedMonth = month;
    showedYear = year;
    initCalendar(showedYear, showedMonth, current, calendar);
}

export {changeMonth, showedYear, showedMonth, showedDate, current, changeShowDate};