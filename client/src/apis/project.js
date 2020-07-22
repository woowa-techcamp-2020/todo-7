import { get } from ".";

export const getProject = async (id) => ({
    id: 1,
    name: 'Jinhyeok',
    groups: [
        {
            id: 1,
            title: '📗todo',  
            notes: [
                {
                    id: 1,
                    title: '5',
                    description: 'goood',
                    writer: 'Jinhyeok',
                },
                {
                    id: 1,
                    title: '6',
                    description: 'goood',
                    writer: 'Jinhyeok',
                }
            ],
        },
        {
            id: 2,
            title: '📒doing',  
            notes: [
                {
                    id: 1,
                    title: '3',
                    description: 'goood',
                    writer: 'Jinhyeok',
                },
                {
                    id: 1,
                    title: '4',
                    description: 'goood',
                    writer: 'Jinhyeok',
                }
            ],
        },
        {
            id: 3,
            title: '📕done',  
            notes: [
                {
                    id: 1,
                    title: '1',
                    description: 'goood',
                    writer: 'Jinhyeok',
                },
                {
                    id: 1,
                    title: '2',
                    description: 'goood',
                    writer: 'Jinhyeok',
                }
            ],
        }
    ]
});
export const login = async (loginData) => await post('/users/login', loginData);