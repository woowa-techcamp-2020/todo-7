export default class DragAndDrop {
    constructor(container, parentSelector, childSelector) {
        this.container = container;
        this.parentSelector = parentSelector;
        this.childSelector = childSelector;
        this.addEventListener();
    }

    addEventListener() {
        const self = this;
        this.container.addEventListener('mousedown', event => self.onMouseDown(event))
        this.container.addEventListener('mouseup', event => self.onMouseUp(event))
        this.container.addEventListener('mousemove', event => self.onMouseMove(event))
    }
    
    onMouseDown(event) {
        const target = event.target.closest(this.childSelector);
        if(target) {
            this.dragging = true;
            this.oldNode = target;
            const sizeData = this.oldNode.getBoundingClientRect();
            this.initialize(target, event, sizeData);
            this.instantiate(sizeData);       
        }
    }

    onMouseMove(event) {
        if(this.dragging) {
            this.updateNewNodePosition(event);
            this.updateOldNodePosition(event);
        }
    }

    onMouseUp(event) {
        document.body.onselectstart = () => true;
        this.dragging = false;
        this.oldNode.style.filter = 'none';
        this.newNode.remove();
    }

    createNewNode(oldNode, sizeData){
        const newNode = oldNode.cloneNode(true);
        newNode.classList.add('dragging');
        newNode.style.left = sizeData.left + 'px';
        newNode.style.top = sizeData.top + 'px';
        newNode.style.width = sizeData.width + 'px';
        newNode.style.height = sizeData.height + 'px';
        newNode.style.pointerEvents = 'none';
        newNode.style.position = 'absolute';
        return newNode;
    }

    instantiate(sizeData) {
        this.newNode = this.createNewNode(this.oldNode, sizeData);
        this.oldNode.style.filter = 'blur(5px)';
        this.container.appendChild(this.newNode);
    }

    initialize(element, event, sizeData){
        document.body.onselectstart = () => false;
        this.clientX = event.clientX;
        this.clientY = event.clientY; 
        this.element = element;
        this.left = sizeData.left;
        this.top = sizeData.top;
    }

    getNewLeft(clientX) {
        return (clientX - this.clientX + this.left) + 'px';
    }
    
    getNewTop(clientY) {
        return (clientY - this.clientY + this.top) + 'px';
    }

    updateNewNodePosition(event) {
        this.newNode.style.left = this.getNewLeft(event.clientX);
        this.newNode.style.top = this.getNewTop(event.clientY);
    }

    updateOldNodePosition(event) {
        const parentElement = event.target.closest(this.parentSelector);
        const childElement = event.target.closest(this.childSelector);
        if(parentElement) parentElement.insertBefore(this.oldNode, childElement)
    }
}

