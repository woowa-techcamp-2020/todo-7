export default class ProjectController {
    constructor(model, view) {
        const root = document.querySelector('#App');
        this.model = model;
        this.view = view;
        root.innerHTML = view(model.store);
        this.handleEvents();
    }

    handleEvents () {
        const columns = document.querySelectorAll('.project-column');
        columns.forEach(column => column.addEventListener('click', function(evt) {
            if(evt.target.className == 'icon') {
                const addCard = column.firstElementChild.nextElementSibling;
                const display = addCard.style.display;
                console.log(display);
                if(!display)addCard.style.display = 'block';
                else addCard.style.display = null;
            }
            console.log(evt.target);
        }));

        columns.forEach(column => column.addEventListener('keyup', function(evt) {
            if(evt.target.className == 'project-column-new-card-textarea textarea'){
                if(evt.target.innerHTML.length == 0) {
                    evt.target.nextElementSibling.firstElementChild.disabled = true;
                }
                else evt.target.nextElementSibling.firstElementChild.disabled = false;
            }

        }));

    }
   
}