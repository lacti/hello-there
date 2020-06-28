import "./App.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { compress, decompress } from "lzutf8";

import React from "react";
import ReactQuill from "react-quill";

const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["small", false, "large", "huge"] }, { color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      ["link", "image", "video"],
      ["clean"]
    ],
    handlers: { image: console.log, video: console.log }
  },
  clipboard: { matchVisual: false }
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "size",
  "color",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align"
];


function App() {
  const [preview, setPreview] = React.useState(false);
  const [value, setValue] = React.useState("");
  const quillRef = React.useRef<ReactQuill | null>(null);

  React.useEffect(() => {
    const url = window.location.href;
    if (url.includes('#')) {
      const encoded = url.substring(url.indexOf("#") + 1);
      setValue(decompress(encoded, { inputEncoding: "Base64" }));
    }
  }, []);

  const addText = React.useCallback(() => {

    const quill = quillRef.current?.getEditor();
    if (!quill) {
      return;
    }
    const range = quill.getSelection();
    quill.insertText(range?.index ?? 0, "안녕하쇼");
    // quill.setSelection((range?.index ?? 0) + 1);
    quill.focus();
  }, [quillRef]);
  return (
    <div className="App">
      <button onClick={() => setPreview(!preview)}>Toggle Preview</button>
      <button onClick={addText}>Say hello</button>
      <button
        onClick={() =>
          (window.location.href = "#" + compress(value, { outputEncoding: "Base64" }))
        }
      >
        Share
      </button>
      <ReactQuill
        theme={preview ? "bubble" : "snow"}
        ref={quillRef}
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
