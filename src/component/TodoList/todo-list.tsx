import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { List, Divider, Button } from "antd";
import "antd/dist/antd.css";
import "./todo-list.css";
import Search from "antd/lib/input/Search";
import { TodoItem } from "./todo-item";

export const TodoList = () => {
    const todoItems = [
        {
            title: 'Angularty',
            isActive: true,
            type: "Work",
            datetime: "2021-01-05T15:27:08"
        },
        {
            title: 'ReactJs',
            isActive: false,
            type: "Training",
            datetime: "2021-01-05T15:27:08"
        },
        {
            title: 'React Native',
            isActive: true,
            type: "Outside",
            datetime: "2021-01-05T15:27:08"
        },
        {
            title: 'HTML',
            isActive: true,
            type: "Work",
            datetime: "2021-01-05T15:27:08"
        },
        {
            title: 'NCC Soft',
            isActive: true,
            type: "Training",
            datetime: "2021-01-05T15:27:08"
        },
        {
            title: 'VueJS',
            isActive: true,
            type: "Outside",
            datetime: "2021-01-05T15:27:08"
        },
    ]

    // const [isLoaded, setIsLoaded] = useState(false);
    const [listTodo, setListUser] = useState(todoItems);
    const [checkAllActive, setcheckAllActive] = useState(false);
    const [listTodoFilter, setListTodoFilter] = useState(listTodo);
    
    useEffect(() => { 
        setListTodoFilter(listTodo);
    }, [listTodo]);

    const allActiveItem = () => {
        listTodo.forEach(e => {
            e.isActive = checkAllActive;
        })
        setcheckAllActive(!checkAllActive);
    }

    const checkBoxActive = (item:any) => {
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

    const delItem = (item:any) => {
        let index = listTodo.indexOf(item);
        setListUser(
            [...listTodo.slice(0, index),
            ...listTodo.slice(index + 1)]
        );
    };

    const filterItem = (value:any) => {
        let list = (value===1) ? listTodo : listTodo.filter(e => e.isActive === value);
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
                            <Button onClick={() => filterItem(1)} type="primary">All</Button>
                            <Button onClick={() => filterItem(true)} type="primary">Active</Button>
                            <Button onClick={() => filterItem(false)} type="primary">Completed</Button>
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
