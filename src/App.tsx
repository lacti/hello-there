import React from "react";
import ReactQuill from "react-quill";
import "./App.css";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function App() {
  const [value, setValue] = React.useState("");
  return (
    <div className="App">
      <ReactQuill
        theme="snow"
        formats={formats}
        modules={modules}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export default App;
