import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { FiFile } from "react-icons/fi";

export const Dragendrop = ({ onFileData }) => {
    const [files, setFiles] = React.useState([]);
    const [drop, setDrop] = React.useState(false);
    const inputRef = React.useRef();

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        setFiles([...files, ...droppedFiles]);
        onFileData([...files, ...droppedFiles]);
    }

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles([...files, ...selectedFiles]);
        onFileData([...files, ...selectedFiles]);

        // const file = event.target.files;
        // if (file.length > 0) {
        //     const reader = new FileReader();
        //     reader.onload = function (fileEvent) {
        //         const fileData = fileEvent.target.result;
        //         console.log(fileData);
        //     };
        //     reader.readAsText(file[0]);
        // }
    }

    const removeFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
        onFileData(updatedFiles);
    }

    return (
        <>
            {!drop && (
                <div className="flex flex-col h-[400px] justify-center items-center font-code border-neutral-400 border-2 border-dashed p-3"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <h4 className="text-white text-xl">Drag and drop to upload</h4>
                    <h6 className='text-sxl'>or</h6>
                    <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleFileChange}
                        ref={inputRef}
                    />
                    <button onClick={() => inputRef.current.click()} className="bg-gray-700 w-24 h- px-2 rounded-md border-gray-400 border-2">upload</button>
                </div>
            )}
            {!drop && (
                <div className="overflow-x-auto Whitespace-nowrap">
                    <div className="flex overflow-x-auto" >
                        {files.map((file, index) => (
                            <div key={index} className="file-item border-[1px] border-zinc-500 bg-zinc-700 text-white p-2 rounded-md m-1 flex items-center justify-between">
                            <div className="file-info flex items-center gap-2">
                                <FiFile className="text-zinc-200" /> {/* File icon */}
                                <span className="file-name text-xs text-zinc-200">{file.name}</span>
                            </div>
                            <button className="remove-button" onClick={() => removeFile(index)}>
                                <RxCross2 className="text-zinc-200 hover:text-red-500" />
                            </button>
                        </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
