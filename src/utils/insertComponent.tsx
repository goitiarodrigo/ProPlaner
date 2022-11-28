import ActionButton from '@/components/actionButton/ActionButton';
import { IComment } from '@/interfaces/IComments';

export const insertComponent = (rowData) => {
    const newRowData = rowData.map(element => {
        return Object.assign(element, {user_open: <ActionButton idComment={element.id}/>})
    })
    return newRowData
}