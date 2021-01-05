import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { List, Divider, Button } from "antd";
import "antd/dist/antd.css";
import "./todo-list.css";
import Search from "antd/lib/input/Search";
import { TodoItem } from "./todo-item";
import { ITodoList } from "../../modal/todo-list";

export const TodoList = () => {
    const todoItems = [
        {
            id: 1,
            title: 'Angularty',
            isActive: true,
            type: "Work",
            datetime: "2021-01-05T15:27:08"
        },
        {
            id: 2,
            title: 'ReactJs',
            isActive: false,
            type: "Training",
            datetime: "2021-01-05T15:27:08"
        },
        {
            id: 3,
            title: 'React Native',
            isActive: true,
            type: "Outside",
            datetime: "2021-01-05T15:27:08"
        },
        {
            id: 4,
            title: 'HTML',
            isActive: true,
            type: "Work",
            datetime: "2021-01-05T15:27:08"
        },
        {
            id: 5,
            title: 'NCC Soft',
            isActive: true,
            type: "Training",
            datetime: "2021-01-05T15:27:08"
        },
        {
            id: 6,
            title: 'VueJS',
            isActive: true,
            type: "Outside",
            datetime: "2021-01-05T15:27:08"
        },
    ]

    // const [isLoaded, setIsLoaded] = useState(false);
    const [listTodo, setListUser] = useState<ITodoList[]>(todoItems);
    const [checkAllActive, setcheckAllActive] = useState(false);
    const [listTodoFilter, setListTodoFilter] = useState(listTodo);
    const [valueTodoFilter, setValueTodoFilter] = useState(0);
    
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

    const test = () => {
        console.log(123);
    };

    const onSearch = () => { };

    const delItem = (item:ITodoList) => {
        let index = listTodo.indexOf(item);
        setListUser(
            [...listTodo.slice(0, index),
            ...listTodo.slice(index + 1)]
        );
    };

    const filterItem = () => {
        let list = (valueTodoFilter===0) ? listTodo : (valueTodoFilter===1) ? listTodo.filter(e => e.isActive === true) : listTodo.filter(e => e.isActive === false);
        setListTodoFilter(list);
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
                                <div className="check-all" onClick={() => test()}></div>
                            </Button>
                            <Search placeholder="Search text" onSearch={onSearch} enterButton style={{ width: 340 }} />
                            <Button onClick={() => test()} type="primary">Thêm Mới</Button>
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
        </div>
    );
};
