import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type FullInputType = {
    callBack: (newTitle: string) => void
    addTask:(todoListID: string, title: string)=> void
    todoListID:
}


export const FullInput = (props: FullInputType) => {
    const [title, setTitle] = useState<string>('') //5
    const [error, setError] = useState<boolean>(false)
    const inputClasses = error ? 'error' : ''
    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }

    }
    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            // 0, null, undefined, "", NaN, -0 -> false !!!!// [], {} -> true
            props.addTask(props.todoListID, trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }//8
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) setError(false)

    }


    return (


        <div>
            <input
                value={title} /*//7*/
                onChange={onChangeSetTitle}/*//6*/
                //e.currentTarget -  это input
                onKeyPress={onKeyPressSetTitle}
                className={inputClasses}
            />
            <button onClick={onClickAddTask}>+</button>
            {error && <div>ERROR</div>}
            {/*//3*/}
        </div>
    )
}