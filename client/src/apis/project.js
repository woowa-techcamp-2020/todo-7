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
                    title: 'hello',
                    description: 'goood',
                    writer: 'Jinhyeok',
                },
                {
                    id: 1,
                    title: 'hello',
                    description: 'goood',
                    writer: 'Jinhyeok',
                }
            ],
        },
        {
            id: 2,
            title: '📒doing',  
            notes: [],
        },
        {
            id: 3,
            title: '📕done',  
            notes: [],
        }
    ]
});
export const login = async (loginData) => await post('/users/login', loginData);