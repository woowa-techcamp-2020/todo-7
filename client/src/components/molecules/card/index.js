import './styles.css';
import element from '../../../utils/element';
import button from '../../atoms/button';
import textarea from '../../atoms/textarea';
import icon from '../../atoms/icon';
const addButton = (className) => button({
    className,
    text: 'Add', 
    disabled: true,
});

const cancelButton = (className) => button({
    className,
    text: 'Cancel', 
});

const cardButtonBar = (className) => [ 
    addButton(`${className}-add-button primary`),
    cancelButton(`${className}-cancel-button dismiss`),
];

const deleteIcon = () => icon({});

const header = (className, text) => element({
    className, 
    child:[
        element({ className: `${className}-text`, child: text }),
        deleteIcon()
    ],
});

const writer = (className, text) => element({
    className: `${className}-footer-writer`,
    child: text,
})

const projectColumnCard = (className, data) => [
    header(`${className}-header`, data.title),
    element({
        className: `${className}-body`, 
        child: data.description,
    }),
    element({
        className: `${className}-footer`, 
        child: `Added by ${writer(className, data.writer)}`
    })
]

const projectColumnNewCard = (className) => [
    textarea({ 
        className: `${className}-textarea`, 
        name: 'note'
    }),
    element({ 
        className: `${className}-footer`, 
        child: cardButtonBar(className)
    })
];

const getCardByClassName = (className, data) => {
    switch(className){
        case 'project-column-form-card' :
            return projectColumnNewCard(className)
        case 'project-column-card' :
            return projectColumnCard(className, data);
    }
}

export default ({ className, data }) => element({
    className, 
    id: data?.id,
    child: getCardByClassName(className, data)
});