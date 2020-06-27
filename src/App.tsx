import React from 'react';
import ReactQuill from 'react-quill';
import './App.css';
import 'react-quill/dist/quill.snow.css';

function App() {
  const [value, setValue] = React.useState('');
  return (
    <div className="App">
        <ReactQuill theme="snow" value={value} onChange={setValue}/>
    </div>
  );
}

export default App;
