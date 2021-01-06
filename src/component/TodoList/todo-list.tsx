import React, { useEffect, useState } from "react";
import { List, Divider, Button } from "antd";
import "antd/dist/antd.css";
import "./todo-list.css";
import Search from "antd/lib/input/Search";
import { TodoItem } from "./todo-item";
import { ITodoList } from "../../modal/iTodoList";
import { CreateEditTodoItem } from "./CreateEditTodoItem/create-edit-todo-item";
import { deleteTodo, getAll, getAllActive, postItem, putItemActive } from "../../service/api";

export const TodoList = () => {
    const [listTodo, setListTodo] = useState<ITodoList[]>([]);
    const [listTodoFilter, setListTodoFilter] = useState<ITodoList[]>(listTodo);
    const [valueTodoFilter, setValueTodoFilter] = useState<number>(0);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    
    useEffect(() => { 
        getAll().then(e => {
            setListTodo(e.data)
        });
        setListTodoFilter(listTodo);
        filterItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listTodo]);

    useEffect(() => { 
        filterItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueTodoFilter]);

    const allActiveItem = () => {
        getAllActive().then(e => {})
    }

    const checkBoxActive = (item:ITodoList) => {
        putItemActive(item).then(e => {});
    };

    const onSearch = () => { };

    const delItem = (item: ITodoList) => {
        deleteTodo(item.id).then(e => {});
    };

    const addItem = (item: ITodoList) => {
        postItem(item).then(e => {});
        setListTodo(listTodo);
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
