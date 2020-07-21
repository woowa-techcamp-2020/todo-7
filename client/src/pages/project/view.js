import Event from '../../utils/event';
import projectPage from '../../components/templates/project'
import card from '../../components/molecules/card';
import DragAndDrop from '../../utils/dragndrop';

export default class ProjectView { 
    init(project, app) {
        this.project = project;
        this.app = app;
        this.render();
        this.createEvents();
        this.addUserEventListener();   
    }

    createEvents(){
        this.createNoteEvent = new Event();
        this.updateNoteEvent = new Event();
        this.deleteNoteEvent = new Event();
        this.createGroupEvent = new Event();
        this.deleteGroupEvent = new Event();
    }

    addUserEventListener(){
        this.app.addEventListener('click', (event) => this.onAppClickHandler(event, this));
        new DragAndDrop(this.app.querySelector('.project'), '.project-column-body', '.project-column-card');
        new DragAndDrop(this.app.querySelector('.project'), '.project-columns', '.project-column');
        const columns = document.querySelectorAll('.project-column');
        columns.forEach(column => {
            column.addEventListener('mousedown', (event) => this.onColumnClickHandler(event, this));
            column.addEventListener('keyup', (event) => this.onFormCardTypeHandler(event, this));
        });
    }

    onAppClickHandler(event, self) {
        const classList = event.target.classList;
        if(classList.contains('project-header-menu-icon')) {
            self.onEventColumnToggler(event, true);
        } else if(classList.contains('project-event-column-close-icon')) {
            self.onEventColumnToggler(event, false);
        }
    }

    onColumnClickHandler(event, self) {
        let foundHandler = true;
        const classList = event.target.classList;
        
        if(classList.contains('project-column-header-add-icon')) {
            self.onNoteAddIconCickHandler(event); 
        } else if(classList.contains('project-column-form-card-add-button')) {
            self.onFormCardButtonClickHandler(event, true);
        } else if(classList.contains('project-column-form-card-cancel-button')) {
            self.onFormCardButtonClickHandler(event, false);
        } else { 
            foundHandler = false;
        } 

        if(foundHandler) event.stopImmediatePropagation();

    }

    render(){
        this.app.innerHTML = projectPage(this.project);
    }

    createCard(data){
        this.app.querySelector(`.project-column-body`)
        .firstElementChild
        .insertAdjacentHTML('afterend', card({
            className: `project-column-card`, 
            data: data.note
        }));
    }

    updateCard(data){

    }
    
    createColumn(data){

    }
    deleteColumn(data){

    }

    createEventCard(data){

    }    
    
    toggleFormCard(formCard, clear = false) {
        formCard.style.display = formCard.style.display == 'block' ? null : 'block';
        if(clear) formCard.firstElementChild.innerHTML = '';   
    }

    onEventColumnToggler(event, open) {
        const eventColumn = event.currentTarget.querySelector('.project-event-column');
        if(open) eventColumn.style.transform = 'translateX(-360px)';
        else eventColumn.style.transform = 'translateX(360px)';        
    }

    onNoteAddIconCickHandler(event) {
        const formCard = event.currentTarget.querySelector('.project-column-form-card');
        this.toggleFormCard(formCard);
    }


    onFormCardButtonClickHandler(event, isAdd) {
        const formCard = event.currentTarget.querySelector('.project-column-form-card');
        if(isAdd) {
            this.createNoteEvent.trigger({ 
                title : formCard.firstElementChild.innerHTML, 
                columnId : +formCard.closest('.project-column').id
            });
        }
        this.toggleFormCard(formCard, isAdd);
    }
    
    onFormCardTypeHandler(event) {
        const { target, currentTarget }= event;
        if(target.className == 'project-column-form-card-textarea textarea'){
            const addButton = currentTarget.querySelector('.project-column-form-card-add-button');
            addButton.disabled = target.innerHTML.length == 0;
        }
    }
}