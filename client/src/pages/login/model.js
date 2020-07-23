import Event from '../../utils/event';

export default class LoginModel {
    init() {
        this.createEvents();
    }
    
    createEvents() {
        this.LoginEvent = new Event();
    }
}