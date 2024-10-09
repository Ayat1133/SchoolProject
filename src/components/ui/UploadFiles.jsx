import { useState, useMemo, useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Dropzone, { useDropzone } from 'react-dropzone';
import { MdOutlineAttachment } from 'react-icons/md';
import classes from './UploadFiles.module.scss';
import Button from './Button';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    gap: '10px',
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const UploadFiles = ({ onChange, isMulti = true, btnTitle, fileTypes }) => {

    const [files, setFiles] = useState([]);
    const [acceptedFilesContent, setAcceptedFilesContent] = useState([]);
    const {
        open,
        isFocused,
        acceptedFiles,
        isDragAccept,
        isDragReject,
        getInputProps
    } = useDropzone({
        accept: fileTypes,
        noClick: true,
        noKeyboard: true,
        maxFiles: 5,
        disabled: !isMulti && acceptedFilesContent?.length > 0,
        onDrop: (file) => {

            if (file.length > 1 && isMulti) {
                let filesArr = [];
                file.map(item => {
                    return filesArr.push(item)
                })
                setFiles(prevState => [...prevState, ...filesArr])
            }
            else if (file.length > 1 && !isMulti) {
                let filesArr = [];
                filesArr.push(file[0])
                setFiles(filesArr)
            }
            else if (file.length === 1) {
                setFiles(prevState => [...prevState, file[0]])
            }
        },
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    useEffect(() => {

        if (acceptedFiles.length > 0 && isMulti) {
            let acceptedFileItems = [];


            acceptedFiles.forEach((file) => {
                var split = file.path.split('.');
                var filename = split[0];
                var extension = split[1];
                if (filename.length > 20) {
                    filename = filename.substring(0, 20);
                }
                var name = filename + "...." + extension;

                acceptedFileItems.push(<li key={file.path}>
                    <div>
                        {name}
                    </div>
                    <div>
                        <Button text={'remove'} onClick={() => removeFile(file.path)} />
                    </div>
                </li>)
            })

            // debugger

            setAcceptedFilesContent(prevState => {
                return [...prevState, acceptedFileItems]
            })
        }
        else if (acceptedFiles.length > 0 && !isMulti) {
            let acceptedFileItems = [];

            var split = acceptedFiles[0].path.split('.');
            var filename = split[0];
            var extension = split[1];
            if (filename.length > 20) {
                filename = filename.substring(0, 20);
            }
            var name = filename + "...." + extension;

            acceptedFileItems.push(<li key={acceptedFiles[0].path}>
                <div>
                    {name}
                </div>
                <div>
                <Button text={'remove'} onClick={() => removeFile(acceptedFiles[0].path)} />
                </div>
            </li>)

            setAcceptedFilesContent(acceptedFileItems)
        }

    }, [acceptedFiles])

    useEffect(() => {
        // debugger
        if (files.length > 0) {
            // debugger
            onChange(files)
        }
    }, [files, onChange])

    const removeFile = (file) => {
        setFiles(prevState => prevState.filter(item => item.path !== file))
        onChange(prevState => prevState.filter(item => item.path !== file))
        setAcceptedFilesContent(prevState => {
            if (prevState.length > 0) return prevState.filter(item => item.key !== file)
            else return []
        })
    }

    const onDragAcceptedHandler = (file) => {
        setFiles(prevState => [...prevState, file[0]])
        setAcceptedFilesContent(prevState => {
            var split = file[0].path.split('.');
            var filename = split[0];
            var extension = split[1];
            if (filename.length > 20) {
                filename = filename.substring(0, 20);
            }
            var name = filename + "...." + extension;
            return [...prevState, <li key={file[0].path}>
                <div>
                    {name}
                </div>
                <div>
                    <CloseButton onClick={() => removeFile(file[0].path)} />
                </div>
            </li>]
        })
    }

    return (
        <>
            <Dropzone className={classes.container} disabled={!isMulti && acceptedFilesContent?.length > 0} noKeyboard={true} noClick={true} onDropAccepted={(e) => onDragAcceptedHandler(e)}>
                {({ getRootProps }) => (
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <p className={classes.title} style={!isMulti && acceptedFilesContent?.length > 0 ? { color: '#f5f5f5' } : undefined}>Drag And Drop</p>
                        <span>Or</span>
                            <Button onClick={open} text={<><MdOutlineAttachment size={18}/>
                            {btnTitle}</>} disabled={!isMulti && acceptedFilesContent?.length > 0}/>
                    </div>
                )}
            </Dropzone>

            {files.length > 0 &&
                <div className={classes.upload}>
                    <div className={classes.file}>
                        <ul>{acceptedFilesContent.map(file => file)}</ul>
                    </div>
                </div>
            }
          
        </>
    );
}

export default UploadFiles;