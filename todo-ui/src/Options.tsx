import axios from "axios";
import { useState } from "react";
import Patch from './Patch';

const Options = ({id, close, update}: any) => {

    const [form, setForm] = useState(false);

    return ( 
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            right: 740,
            top: 520
        }}>
            <button onClick={() => {
                const options = {
                    method: 'DELETE',
                    url: `http://localhost:4200/api/task/delete-task/${id}`,
                    headers: {'User-Agent': 'insomnia/2023.5.8'}
                  };
                  
                  axios.request(options).then(() => {
                    close();
                  }).catch(function (error) {
                    console.error(error);
                  });
            }}>Delete</button>
            <button onClick={() => setForm(!form)}>Putch</button>
            {form && <Patch id={id} exit={close} close={() => setForm(false)} update={update} />}
        </div>
     );
}
 
export default Options;