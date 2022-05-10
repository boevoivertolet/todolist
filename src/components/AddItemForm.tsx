import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type FullInputPropsType = {
    callBack: (newTitle: string) => void
}


export const AddItemForm = (props: FullInputPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.callBack(newTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }


    return (
        <div>
            <TextField

                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
                id="standard-basic"
                label=""
                variant="standard"
                error={!!error}
                helperText={error}/>


            <Button
                style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                color={'primary'}
                variant="contained"
                size="small"
                onClick={addTask}>+</Button>

        </div>
    )
}