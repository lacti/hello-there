import React from "react";
import ReactQuill from "react-quill";
import { compress, decompress } from "lzutf8";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

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
  const [preview, setPreview] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const encoded = window.location.href.substring(window.location.href.indexOf("#") + 1);
    if (encoded) {
      setValue(decompress(encoded, { inputEncoding: "Base64" }));
    }
  }, []);
  return (
    <div className="App">
      <button onClick={() => setPreview(!preview)}>Toggle Preview</button>
      <button
        onClick={() =>
          (window.location.href = "#" + compress(value, { outputEncoding: "Base64" }))
        }
      >
        Share
      </button>
      <ReactQuill
        theme={preview ? "bubble" : "snow"}
        formats={formats}
        modules={modules}
        value={value}
        onChange={setValue}
        readOnly={preview}
      />
    </div>
  );
}

export default App;
