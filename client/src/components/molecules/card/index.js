import "./styles.css";
import element from "../../element";
import button from "../../atoms/button";
import textarea from "../../atoms/textarea";
import icon from "../../atoms/icon";
const addButton = () => button('primary', 'Add', true);
const cancelButton = () => button('dismiss', 'Cancel');
const cardButtonBar = () => `${addButton()}${cancelButton()}`;
const deleteIcon = () => icon('');
const header = (type, text) => element(
    `${type}-card-header`, 
    `${element(
        `${type}-card-header-text`, 
        text)
    }
    ${deleteIcon()}
`);

const body = (type, text) => element(
    `${type}-card-body`, 
    text
);

const footer = (type, child) => element(
    `${type}-card-footer`,
    child
);

const projectColumnCard = (type, data) => `
    ${header(type, data.title)}
    ${body(type, data.description)}
    ${footer(type, `Added by ${element(
        `${type}-card-footer-writer`, 
        data.writer)}
    `)}
`;

const projectColumnNewCard = (type) => `
    ${textarea(`${type}-card`, 'note', 'Enter a note')}    
    ${footer(type, cardButtonBar())}
`

const getCardByType = (type, data) => {
    console.log(data);
    switch(type){
        case 'project-column-new' :
            return `${projectColumnNewCard(type)}`
        case 'project-column' :
            return projectColumnCard(type, data);
    }
    
}

export default (type, data) => element(`${type}-card`, getCardByType(type, data));