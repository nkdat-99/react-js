export interface ITodoList {
    id: string,
    title: string,
    isActive: boolean,
    type: string,
    datetime: string
}

export interface IPropsTodoItem {
    item: ITodoList,
    isActiveItem: (event:any) => void,
    delItem: Function,
}

export interface IPropsCreateEditItem {
    isModalVisible: boolean,
    openModalTodoItem: Function,
    addItem: Function,
}