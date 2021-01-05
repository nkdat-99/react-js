import React, { useEffect, useState } from 'react'
import './todo-item.css';
import classNames from 'classnames';
import { DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Tag } from 'antd';
import { IPropsTodoItem } from '../../modal/todo-list';

export const TodoItem = (props: IPropsTodoItem) => {
    const { confirm } = Modal;
    
    const [isDeadLine, setIsDeadLine] = useState(false);
    
    useEffect(() => {
        onDeadline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.item])

    const onDeadline = () => {
        let dateline = new Date(props.item.datetime);
        var dateNow = new Date();
        let timeSecond = (dateline.getTime() - dateNow.getTime());
        if (timeSecond < 60*15*1000) 
            setIsDeadLine(true);
        else {
            setIsDeadLine(false);
            setTimeout(() => { 
                setIsDeadLine(true); 
            }, timeSecond - 60*15*1000);
        }
    }

    const showConfirm = () => {
        confirm({
          title: 'Delete Item',
          icon: <ExclamationCircleOutlined />,
          content: 'Do you want to delete these items?',
          onOk() {
            props.delItem();
          },
          onCancel() {},
        });
      }
    
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
                { isDeadLine ? <Tag className="deadline" color="#f50">Deadline</Tag> : ""}
                <Tag className="item-datetime" color="#f50">{timeFormat}</Tag>    
                <DeleteTwoTone className="icon-del" twoToneColor="#ff0000" onClick={showConfirm}/>
            </div> 
        </div>
    )
}
