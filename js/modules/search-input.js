import {closeModalForm} from './modal-day-form';
import {modalDayForm, modalInfoForm, modalQuickForm, searchInput, searchForm} from './variables';

function showSeacrInput() {
    searchInput.addEventListener('click', (e) => {
        let triggerCell = document.querySelectorAll('.calendar-table__cell_active');
        let eventDateArray = JSON.parse(localStorage.getItem(`events`));
        let targetX = e.target.getBoundingClientRect().x,
            targetY = e.target.getBoundingClientRect().y;
        
        searchForm.style.top = `${targetY + 30}px`;
        searchForm.style.left = `${targetX}px`;

        searchForm.classList.add('show');
        searchForm.classList.remove('hide');
        closeModalForm(modalDayForm);
        closeModalForm(modalInfoForm);
        closeModalForm(modalQuickForm);
        createInputEventList(eventDateArray);
        triggerCell.forEach(elem => {
            elem.classList.remove('calendar-table__cell_active');
        });
    });

    searchInput.addEventListener('input', (e) => {
        let eventDateArray = JSON.parse(localStorage.getItem(`events`));
        
        createInputEventList(showSearchedEvent(eventDateArray));    
    });
}

function showSearchedEvent(eventDateArray) {
    return eventDateArray.filter(item => {
        return item.dayEvent.indexOf(searchInput.value) > - 1 || item.dayDate.indexOf(searchInput.value) > - 1;
   });
}

function createInputEventList(eventDateArray) {
    const inputWrapper = document.querySelector('.search-input__wrapper');
    inputWrapper.innerHTML = ``;

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