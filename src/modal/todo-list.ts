export interface ITodoList {
    id: number,
    title: string,
    isActive: boolean,
    type: string,
    datetime: string
}

export interface IPropsTodoItem {
    item: ITodoList,
    isActiveItem: (event:any) => void,
    delItem: (event:any) => void,
}