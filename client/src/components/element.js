export default class Element {
    constructor(classname, child) {
        console.log(classname, child);
        this.classname = classname;
        this.child = child;
        this.setHtml();
    }
    getChildHtml(child){
        if(!child) return '';
        else if(Array.isArray(child)) {
            return `${child.reduce((a, b) => a + this.getChildHtml(b), '')}`;
        }
        else return typeof(child) === `object` ? child.getHtml() : child;
    }
    setHtml() {
        this.html = `<div class='${this.classname}'>${this.getChildHtml(this.child)}</div>`;    
        console.log(this.html);
    }
   
    getHtml() {
        return this.html;
    }
}