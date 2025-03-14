import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';  // Importar el modo JSON
import { basicSetup } from 'codemirror'; // Tema para el editor
import { Typography } from '@mui/material';

export const CodeEditor = ({ data, label, change }) => {
    const [jsonData, setJsonData] = useState(data);

    const handleChange = (value) => {
        try {
            change(value)
        } catch (e) {

            setJsonData(value);
        }
    };

    return (
        <div>
            <Typography variant='h6' color='black'>{label}</Typography>
            <CodeMirror
                value={JSON.stringify(jsonData, null, 2)}
                height="350px"
                width='400px'
                extensions={[json(), basicSetup]}
                onChange={handleChange}
                theme="dark"
            />
        </div>
    );
};


