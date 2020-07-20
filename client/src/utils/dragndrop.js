import './styles.css';

export default class dragAndDrop {
    constructor(element, querySelector) {
        this.element = element;
        this.querySelector = querySelector;
        const self = this;
        this.element.addEventListener('mousedown', event => self.onMouseDown(event))
        this.element.addEventListener('mouseup', event => self.onMouseUp(event))
        this.element.addEventListener('mousemove', event => self.onMouseMove(event))
    }

    setClientXY(clientX, clientY){
        this.clientX = clientX;
        this.clientY = clientY;
    }

    onMouseDown(event) {
        this.mouseDown = true;
        const original = event.target.closest(this.querySelector);
        if(original) {
            console.log(original);
            this.copy = original.cloneNode(true);
            console.log(original.getBoundingClientRect());
            const { top, left, width, height } = original.getBoundingClientRect();
            this.setClientXY(event.clientX, event.clientY);
            this.left = left;
            this.top = top;
            // console.log(event.clientX, event.clientY);
            original.classList.add('blur');
            this.copy.classList.add('dragging');
            this.copy.style.left = left + 'px';
            this.copy.style.top = top + 'px';
            this.copy.style.width = width + 'px';
            this.copy.style.height = height + 'px';
            this.element.appendChild(this.copy);
        }
    }


    onMouseUp(event) {
        this.mouseDown = false;
    }

    getNewLeft(clientX) {
        console.log(this.clientX, clientX);
        return (clientX - this.clientX + this.left) + 'px';
    }
    getNewTop(clientY) {
        return (clientY - this.clientY + this.top) + 'px';
    }

    onMouseMove(event) {
        if(this.mouseDown) {
            this.copy.style.left = this.getNewLeft(event.clientX);
            this.copy.style.top = this.getNewTop(event.clientY);
        }
    }
}

