let calendar = document.querySelector('.calendar'),
    dates = calendar.querySelector('.calendar-table__wrapper');
const modalDayForm = document.querySelector('.modal-day__form'),
    modalQuickForm = document.querySelector('.modal-quick__form'),
    modalDayCloseBtn = document.querySelector('[data-close]'),
    modalInfoCloseBtn = document.querySelector('[data-modalInfoClose]'),
    modalInfoForm = document.querySelector('.modal-info__form'),
    monthes = ['января', 'февраля', 'марта', 
    'апреля', 'мая', 'июня', 'июля', 
    'августа', 'сентября', 'октября', 
    'ноября', 'декабря'],
    infoDate = document.querySelector('.modal-info__date'),
    infoDoneBtn = document.querySelector('[data-done]'),
    refreshBtn = document.querySelector('[data-refreshEvent]'),
    deleteEventBtn = document.querySelector('[data-deleteEvent]'),
    refreshDeleteEventBtn = document.querySelector('[data-delete]'),
    searchInput = document.querySelector('[data-search-input]'),
    searchForm = document.querySelector('.search-input'),
    modalDayTrigger = document.querySelectorAll('.calendar-table__cell');

export {calendar, modalDayForm, modalInfoForm, dates, modalQuickForm, modalDayCloseBtn, modalInfoCloseBtn, monthes,
        infoDate, infoDoneBtn, refreshBtn, deleteEventBtn, refreshDeleteEventBtn, 
        searchInput, searchForm, modalDayTrigger};