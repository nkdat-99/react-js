import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { List, Divider, Button } from "antd";
import "antd/dist/antd.css";
import "./todo-list.css";
import Search from "antd/lib/input/Search";
import { TodoItem } from "./todo-item";
import { ITodoList } from "../../modal/todo-list";
import { CreateEditTodoItem } from "./CreateEditTodoItem/create-edit-todo-item";

export const TodoList = () => {
    const todoItems = [
        {
            id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa1",
            title: 'Angularty',
            isActive: true,
            type: "Work",
            datetime: "Tue Jan 05 2021 08:19:29 GMT+0700 (Giờ Đông Dương)"
        },
        {
            id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa1",
            title: 'ReactJs',
            isActive: false,
            type: "Training",
            datetime: "Tue Jan 05 2021 21:19:29 GMT+0700 (Giờ Đông Dương)"
        },
        {
            id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa1",
            title: 'React Native',
            isActive: true,
            type: "Outside",
            datetime: "Tue Jan 10 2021 03:20:29 GMT+0700 (Giờ Đông Dương)"
        },
        {
            id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa1",
            title: 'HTML',
            isActive: true,
            type: "Work",
            datetime: "Tue Jan 05 2021 7:19:29 GMT+0700 (Giờ Đông Dương)"
        },
        {
            id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa1",
            title: 'NCC Soft',
            isActive: true,
            type: "Training",
            datetime: "Tue Jan 08 2021 05:38:29 GMT+0700 (Giờ Đông Dương)"
        },
        {
            id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa1",
            title: 'VueJS',
            isActive: true,
            type: "Outside",
            datetime: "Tue Jan 05 2021 15:19:29 GMT+0700 (Giờ Đông Dương)"
        },
    ]

    // const [isLoaded, setIsLoaded] = useState(false);
    const [listTodo, setListUser] = useState<ITodoList[]>(todoItems);
    const [checkAllActive, setcheckAllActive] = useState<boolean>(false);
    const [listTodoFilter, setListTodoFilter] = useState<ITodoList[]>(listTodo);
    const [valueTodoFilter, setValueTodoFilter] = useState<number>(0);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    
    useEffect(() => { 
        setListTodoFilter(listTodo);
        filterItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listTodo]);

    useEffect(() => { 
        filterItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueTodoFilter]);

    const allActiveItem = () => {
        listTodo.forEach(e => {
            e.isActive = checkAllActive;
        })
        filterItem();
        setcheckAllActive(!checkAllActive);
    }

    const checkBoxActive = (item:ITodoList) => {
        let isActive = item.isActive;
        let index = listTodo.indexOf(item);
        setListUser(
            [...listTodo.slice(0, index),
            {...item, isActive: !isActive }, 
            ...listTodo.slice(index + 1)]
        );
    };

    const onSearch = () => { };

    const delItem = (item: ITodoList) => {
        let index = listTodo.indexOf(item);
        setListUser(
            [...listTodo.slice(0, index),
            ...listTodo.slice(index + 1)]
        );
    };

    const addItem = (item: ITodoList) => {
        listTodo.push(item);
        setListUser(listTodo);
    }

    const filterItem = () => {
        let list = (valueTodoFilter===0) ? listTodo : (valueTodoFilter===1) ? listTodo.filter(e => e.isActive === true) : listTodo.filter(e => e.isActive === false);
        setListTodoFilter(list);
    }

    const openModalTodoItem = (value: boolean) => {
        setIsModalVisible(value);
    }

    return (
        <div className="todo">
            <div className="todo-title">
                <Divider orientation="center" className="f-s-24">
                    Total List TSX
        </Divider>
            </div>
            <div className="todo-main">
                <List
                    header={
                        <div className="list-header">
                            <Button onClick={() => allActiveItem()} type="primary">
                                <div className="check-all"></div>
                            </Button>
                            <Search placeholder="Search text" onSearch={onSearch} enterButton style={{ width: 440 }} />
                            <Button onClick={() => openModalTodoItem(true)} type="primary">New Item</Button>
                        </div>
                    }
                    footer={
                        <div className="list-footer">
                            <div className="total-active">{listTodoFilter.filter(e => e.isActive === true).length} items left</div>
                            <Button onClick={() => setValueTodoFilter(0)} type="primary">All</Button>
                            <Button onClick={() => setValueTodoFilter(1)} type="primary">Active</Button>
                            <Button onClick={() => setValueTodoFilter(2)} type="primary">Completed</Button>
                        </div>
                    }
                    bordered
                    dataSource={listTodoFilter}
                    renderItem={(item) => (
                        <List.Item>
                            <TodoItem item={item} isActiveItem={() => checkBoxActive(item)} delItem={() => delItem(item)}></TodoItem>
                        </List.Item>
                    )}
                />
            </div>
            <CreateEditTodoItem isModalVisible={isModalVisible} addItem={addItem} openModalTodoItem={() => openModalTodoItem(false)}></CreateEditTodoItem>
        </div>
    );
};
