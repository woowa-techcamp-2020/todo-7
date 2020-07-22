import element from '../../../utils/element';
import card from '../../molecules/card';
import header from '../../molecules/header';
import counter from '../../atoms/counter';
import icon from '../../atoms/icon';

import './styles.css';

export default ({ className, data}) => element({
    className,
    id: data.id, 
    child: [ 
        header({
            className: `${className}-header`, 
            leading: counter({
                className: `${className}-header-counter`, 
                count: data.notes.length
            }),
            title: element({
                className: `${className}-header-title`,
                child: data.title
            }),
            actions: element({
                className: `${className}-header-actions`,
                child: icon({ className: `${className}-header-add-icon` })
            })
        }),
        element({
            className: `${className}-body`,
            child:[
                card({
                    className: `${className}-form-card`,
                }),
                ...data.notes.map(note => card({
                    className: `${className}-card`,
                    data: note,
                }))
            ]
        })
        
    ]
});