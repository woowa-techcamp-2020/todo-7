import './styles.css';
import element from '../../../utils/element';
import card from '../../molecules/card';
import columnHeader from '../../molecules/columnHeader';

export default ({ className, data}) => element({
    className,
    id: data.id, 
    child: [ 
        columnHeader({
            className: `${className}-header`, 
            title: data.title, 
            count: data.notes.length,
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