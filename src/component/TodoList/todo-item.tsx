import React from 'react'
import './todo-item.css';
import classNames from 'classnames';
import { DeleteTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import { IPropsTodoItem } from '../../modal/todo-list';

export const TodoItem = (props: IPropsTodoItem) => {
    
    const convert = (time: string) => {
        let date = new Date(time);
        let mnth = ("0" + (date.getMonth()+1)).slice(-2);
        let day  = ("0" + date.getDate()).slice(-2);
        let hours  = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let seconds = ("0" + date.getSeconds()).slice(-2);
        return  [hours, 'h', minutes, 'p', seconds, 's'].join("") + ' ' + [day, mnth, date.getFullYear()].join("-");
    }

    const timeFormat = convert(props.item.datetime);
    
    return (
        <div className="todo-item">
            <div className="d-flex item-left"> 
                <div onClick={props.isActiveItem} className={classNames("checkbox", {'checkbox-done' : !props.item.isActive})}></div>
                <div className={classNames("title", {'title-done' : !props.item.isActive})}>{props.item.title}</div>
                <Tag className="item-type" color="#2db7f5">{props.item.type}</Tag>     
            </div>
            <div className="d-flex item-right">
                <Tag className="item-datetime" color="#f50">{timeFormat}</Tag>    
                <DeleteTwoTone className="icon-del" twoToneColor="#ff0000" onClick={props.delItem}/>
            </div> 
        </div>
    )
}
