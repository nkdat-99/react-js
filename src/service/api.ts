import axios from 'axios';
import { ITodoList } from '../modal/iTodoList';

const baseURL = 'http://localhost:3001/';

export const getAll = async () => {
    let result = await axios.get(baseURL + 'todoList')
    return result.data;
}

export const getAllActive = async () => {
    let result = await axios.get(baseURL + 'todoList/itemActiveAll')
    return result.data;
}

export const postItem = async (item :ITodoList) => {
    let result = await axios.post(baseURL + 'todoList', { item })
    return result.data;
}

export const putItemActive = async (item :ITodoList) => {
    let result = await axios.put(baseURL + 'todoList/itemActive', { item })
    return result.data;
}

export const deleteTodo = async (id :string) => {
    let result = await axios.delete(baseURL + `todoList/${id}`)
    return result.data;
}
