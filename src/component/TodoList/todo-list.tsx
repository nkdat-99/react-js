import React, { useEffect } from 'react';
// import axios from 'axios';
import { List, Typography, Divider, Button } from 'antd';
import 'antd/dist/antd.css';
import './todo-list.css';
import Search from 'antd/lib/input/Search';

export const TodoList = () => {
    // const [isLoaded, setIsLoaded] = useState(false);
    // const [listUser, setItems] = useState([]);
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    useEffect(() => {
    }, [])

    const test = () => {
        console.log(123);
    };
    
    const onSearch = () => {

    }

    return (
        <div className="todo">
            <div className="todo-title">
                <Divider orientation="center" className="f-s-24">Total List TSX</Divider>
            </div>
            <div className="todo-main">
                <List
                    header={
                        <div>
                            <Button onClick={() => test()} type="primary">Theem </Button>
                            <Search placeholder="Search text" onSearch={onSearch} enterButton style={{ width: 200 }}/>
                            <Button onClick={() => test()} type="primary">Theem </Button>
                        </div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}

