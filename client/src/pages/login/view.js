import Event from '../../utils/event';
import loginPage from '../../components/templates/login'

export default class LoginView { 
    init(app) {
        this.app = app;
        this.render();
    }

    createEvents(){
        this.loginEvent = new Event();
    }

    render(){
        this.app.innerHTML = loginPage();
    }
}