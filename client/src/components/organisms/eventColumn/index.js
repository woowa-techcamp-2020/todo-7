import element from '../../../utils/element';
import card from '../../molecules/card';
import icon from '../../atoms/icon';
import columnHeader from '../../molecules/header';

import './styles.css';

export default ({ className, data}) => element({
    className,
    id: data.id, 
    child: [ 
        columnHeader({
            className: `${className}-header`, 
            leading: icon({ className: `${className}-header-icon` }),
            title: element({
                className: `${className}-header-title`,
                child: 'Menu'
            }),
            actions: icon({ className: `${className}-close-icon` })
        }),
        columnHeader({
            className: `${className}-header`, 
            leading: icon({ className: `${className}-header-activity-icon` }),
            title: element({
                className: `${className}-header-title`,
                child: 'Activity'
            }),
        }),
        element({
            className: `${className}-body`,
            child:[
                ...data.notes.map(note => card({
                    className: `${className}-card`,
                    data: note,
                }))
            ]
        })
        
    ]
});