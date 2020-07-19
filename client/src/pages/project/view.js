import Event from '../../utils/event';
import projectPage from '../../components/templates/project'
import card from '../../components/molecules/card';

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
        const columns = document.querySelectorAll('.project-column');
        columns.forEach(column => {
            column.addEventListener('click', (event) => this.onClickHandler(event, this));
            column.addEventListener('keyup', (event) => this.onFormCardTypeHandler(event, this));
        });
    }

    onClickHandler(event, self) {
        const classList = event.target.classList;
        if(classList.contains('project-column-header-add-icon')) {
            self.onNoteAddIconCickHander(event); 
        } else if(classList.contains('project-column-form-card-add-button')) {
            self.onFormCardButtonClickHandler(event, true);
        } else if(classList.contains('project-column-form-card-cancel-button')) {
            self.onFormCardButtonClickHandler(event, false);
        }
    }

    render(){
        this.app.innerHTML = projectPage(this.project);
    }

    createCard(data){
        this.app.querySelector(`.project-column`)
        .firstElementChild
        .nextElementSibling
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

    onNoteAddIconCickHander(event) {
        const formCard = event.currentTarget.firstElementChild.nextElementSibling;
        this.toggleFormCard(formCard);
    }

    onFormCardButtonClickHandler(event, isAdd) {
        const formCard = event.target.closest('.project-column-form-card');
        if(isAdd) {
            this.createNoteEvent.trigger({ 
                title : formCard.firstElementChild.innerHTML, 
                columnId : +formCard.closest('.project-column').id
            });
        }
        this.toggleFormCard(formCard, isAdd);
    }
    
    onFormCardTypeHandler(event) {
        const target = event.target;
        if(target.className == 'project-column-form-card-textarea textarea'){
            const addButton = target.nextElementSibling.firstElementChild;
            addButton.disabled = target.innerHTML.length == 0;
        }
    }
}