import React from 'react'
import './todo-item.css';
import classNames from 'classnames';
import { DeleteTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { IPropsTodoItem } from '../../modal/todo-list';

export const TodoItem = (props: IPropsTodoItem) => {
    return (
        <div className="todo-item">
            <div className="d-flex item-left"> 
                <div onClick={props.isActiveItem} className={classNames("checkbox", {'checkbox-done' : !props.item.isActive})}></div>
                <div className={classNames("title", {'title-done' : !props.item.isActive})}>{props.item.title}</div>
                <Tag className="item-type" color="#2db7f5">{props.item.type}</Tag>     
            </div>
            <div className="d-flex item-right">
                <Tag className="item-datetime" color="#f50">{props.item.datetime}</Tag>    
                <DeleteTwoTone className="icon-del" twoToneColor="#ff0000" onClick={props.delItem}/>
            </div> 
        </div>
    )
}
