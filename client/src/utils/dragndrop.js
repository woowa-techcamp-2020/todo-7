export default class DragAndDrop {
  constructor(container, parentSelector, childSelector) {
    this.container = container;
    this.parentSelector = parentSelector;
    this.childSelector = childSelector;
    this.addEventListeners();
  }

  addEventListeners() {
    this.container.addEventListener('mousedown', (event) => this.onMouseDown(event));
    this.container.addEventListener('mouseup', (event) => this.onMouseUp(event));
    this.container.addEventListener('mousemove', (event) => this.onMouseMove(event));
  }

  onMouseDown(event) {
    const target = event.target.closest(this.childSelector);
    if (target) {
      event.stopImmediatePropagation();
      this.dragging = true;
      this.oldNode = target;
      const sizeData = this.oldNode.getBoundingClientRect();
      this.initialize(target, event, sizeData);
      this.instantiate(sizeData);
    }
  }

  onMouseMove(event) {
    if (this.dragging) {
      event.stopImmediatePropagation();
      this.updateNewNodePosition(event);
      this.updateOldNodePosition(event);
    }
  }

  onMouseUp(event) {
    if (this.dragging) {
      document.body.onselectstart = () => true;
      event.stopImmediatePropagation();
      this.dragging = false;
      this.oldNode.style.filter = 'none';
      this.newNode.remove();
    }
  }

  createNewNode(oldNode, sizeData) {
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
    this.newNode.style.transition = 'box-shadow 200ms ease';
    this.container.appendChild(this.newNode);
    this.newNode.getBoundingClientRect();
    this.newNode.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
  }

  initialize(element, event, sizeData) {
    document.body.onselectstart = () => false;
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    this.element = element;
    this.left = sizeData.left;
    this.top = sizeData.top;
  }

  getNewLeft(clientX) {
    return clientX - this.clientX + this.left + 'px';
  }

  getNewTop(clientY) {
    return clientY - this.clientY + this.top + 'px';
  }

  updateNewNodePosition(event) {
    this.newNode.style.left = this.getNewLeft(event.clientX);
    this.newNode.style.top = this.getNewTop(event.clientY);
  }

  updateOldNodePosition(event) {
    const parentElement = event.target.closest(this.parentSelector);
    const childElement = event.target.closest(this.childSelector);
    if (parentElement) parentElement.insertBefore(this.oldNode, childElement);
  }
}
