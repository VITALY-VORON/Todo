import { useState } from "react";
import axios from "axios";

const Form = ({onClick}: any) => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            url: 'http://localhost:4200/api/task/create-task',
            headers: {'Content-Type': 'application/json'},
            data: {title: title, description: description, status: status}
        };

        axios.request(options).then(function () {
            onClick();
        }).catch(function (error) {
            console.error(error);
        });
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        console.log(title);
    }

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
        console.log(description);
    }

    const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
        console.log(status);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            width: 400,
        }}>
            <input placeholder="Введите заголовок" value={title} onChange={handleTitle} style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                outline: 'none',
            }} />
            <input placeholder="Введите описание" value={description} onChange={handleDescription} style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                outline: 'none',
            }} />
            <input placeholder="Статус" value={status} onChange={handleStatus} style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                outline: 'none',
            }} />
            <button type="submit">Submit</button>
            <button onClick={() => onClick()}>Back</button>
        </form>
    );
}

export default Form;
