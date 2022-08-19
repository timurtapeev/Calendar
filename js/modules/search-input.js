import {closeModalForm, resetActiveClassCell} from './modal-day-form';
import {modalDayForm, modalInfoForm, modalQuickForm, searchInput, searchForm} from './variables';

// const modalDayTrigger = document.querySelectorAll('.calendar-table__cell');

function showSeacrInput() {
    searchInput.addEventListener('click', (e) => {
        let targetX = e.target.getBoundingClientRect().x,
            targetY = e.target.getBoundingClientRect().y;
        
        searchForm.style.top = `${targetY + 30}px`;
        searchForm.style.left = `${targetX}px`;

        searchForm.classList.add('show');
        searchForm.classList.remove('hide');
        closeModalForm(modalDayForm);
        closeModalForm(modalInfoForm);
        closeModalForm(modalQuickForm);
        createInputEventList();

        // modalDayTrigger.forEach((e) => {
        //     resetActiveClassCell(modalDayTrigger, e);
        // });       
    });
}

function createInputEventList() {
    const inputWrapper = document.querySelector('.search-input__wrapper');
    inputWrapper.innerHTML = ``;
    let eventDateArray = JSON.parse(localStorage.getItem(`events`));

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
        }
    } catch(e) {}
}

export {showSeacrInput, createInputEventList};