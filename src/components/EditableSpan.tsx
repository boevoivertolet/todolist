import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';


type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {
    let [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }


    return (
        edit
            ? <TextField
                variant="standard"
                onBlur={onDoubleClickHandler}
                onChange={onChangeHandler}
                value={newTitle}
                autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    )

}