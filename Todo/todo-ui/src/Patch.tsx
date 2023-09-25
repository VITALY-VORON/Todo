import { useEffect, useState } from "react";
import axios from "axios";

const Patch = ({id, close, update, exit}: any) => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `http://localhost:4200/api/task/get-task/${id}`,
          };
          
          axios.request(options).then(function (response) {
            setTitle(response.data.title);
            setDescription(response.data.description);
            setStatus(response.data.status);
          }).catch(function (error) {
            console.error(error);
          });
    }, [])



    const handleSubmit = () => {
        const options = {
            method: 'PATCH',
            url: `http://localhost:4200/api/task/update-task/${id}`,
            headers: {'Content-Type': 'application/json'},
            data: {newTitle: title, newDescription: description, newStatus: status},
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            close();
            exit();
            update();
          }).catch(function (error) {
            console.error(error);
          });
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDescription(e.target.value);
    }

    const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setStatus(e.target.value);
    }

    return (
        <form onSubmit={() => handleSubmit()} style={{
            position: 'fixed',
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
            <input placeholder={title} value={title} onChange={handleTitle} style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                outline: 'none',
            }} />
            <input placeholder={description} value={description} onChange={handleDescription} style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                outline: 'none',
            }} />
            <input placeholder={status} value={status} onChange={handleStatus} style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                outline: 'none',
            }} />
            <button type="submit">Submit</button>
            <button onClick={() => {
                exit();
                close();
            }}>Back</button>
        </form>
    );
}

export default Patch;
