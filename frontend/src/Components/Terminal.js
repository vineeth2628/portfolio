import React, { useState, useEffect } from 'react';
import '../Styles/Terminal.css';
import CommandList from './CommandList';
import help from '../Utilities/constants';

import { checkIfAuthorized, getFileData, getAllFiles, updateFileData } from '../services/dataStore';


function Terminal() {
    //it stores the command entered and the output generated in an array
    const [history, setHistory] = useState([{
        command: '',
        result: `\\^o^/ - type 'help' to get started`
    }]);

    const [password, setPassword] = useState(false);

    const [authorization, setAuthorization] = useState(false);

    const [terminalInput, setTerminalInput] = useState('');

    const [cmdExec, setCmdExec] = useState(false);

    const [fileFetch, setFileFetch] = useState(false);

    const [fileList, setFileList] = useState(false);

    const [updateFile, setUpdateFile] = useState();

    useEffect(()=>{

        async function callUpdate(fileName,content){
            await updateFileData(fileName,content);
        }

        if(updateFile && updateFile.content){
            callUpdate(updateFile.fileName,updateFile.content);
            setUpdateFile(null);
        }
    },[updateFile])

    useEffect(() => {

        async function callAuthorization() {
            let result = await checkIfAuthorized(terminalInput);
            let commandResult = '';

            let command = history.pop();
            command = (command && command['command']) ? command['command'].split(' ') : [];

            if (result) {
                if (command.length) {

                    if (command[0] == 'cat' && command[1] == '>' && command[2]) {
                        let file = await getFileData(command[2]);
                        setUpdateFile({fileName : command[2]})

                        if(file){
                            setCmdExec(true)
                            document.getElementById('terminal__inputText').innerText = file['content'];
                        }
                        else{
                            commandResult = "Error: file not found in current directory"
                        }
                    }
                }
            }
            else
                commandResult = '<div>Error: You have no authorization</div>';

            addHistory(`${command.join(' ')}`, `<div>password:${terminalInput}</div>${commandResult}`);
            setPassword(false);
            setAuthorization(false);
        }

        if (authorization)
            callAuthorization();
    }, [authorization])


    useEffect(() => {

        async function callFileData(fileName) {
            let result = await getFileData(fileName);
            let commandResult = '';
            if (result) {
                commandResult = result['content'] || '';
            }
            else {
                commandResult = 'Error: file not found in current directory'

            }
            addHistory(terminalInput, `<div>${commandResult}</div>`);
            setFileFetch(false);
        }

        if (fileFetch) {
            let command = terminalInput.split(' ');
            if (command.length && command[0] == 'cat' && command[1] != '>') {
                callFileData(command[1])
            }

        }

    }, [fileFetch])


    useEffect(()=>{

        async function getFileList(){
            let files = await getAllFiles();
            setList(files);
        }

        if(list.length ==0)
        getFileList();

        if(fileList){
            getFileList()
            let commandResult = ls();
            addHistory(terminalInput,`<div>${commandResult}</div>`)
            setFileList(false);
        }

    },[fileList])

    //stores the list of filenames to be read by the user
    const [list, setList] = useState([]);
    // const list = ['about.txt', 'resume.txt', 'contact.txt', 'skillset.txt', 'projects.txt'];
    //state variable for the text color inside the terminal
    const [terminalColor, setTerminalColor] = useState('white');

    //adds the entered command and the output generated inside the state variable
    const addHistory = (command, result) => {
        const response = { command, result };
        setHistory([...history, response]);
    }
    //eventHandler function when the enter key is pressed inside the terminal
    const handleKeyPress = (e) => {
        if (cmdExec) {
            let charCode = String.fromCharCode(e.which).toLowerCase();
            if ((e.ctrlKey || e.metaKey) && charCode === 'z') {
                e.preventDefault();
                var command = document.getElementById('terminal__inputText').innerText;
                setTerminalInput(command);
                document.getElementById('terminal__inputText').innerText = '';
                checkCmd(command);
            }
        }

        else {
            if (e.key === "Enter") {
                e.preventDefault();
                var command = document.getElementById('terminal__inputText').innerText;
                setTerminalInput(command);
                document.getElementById('terminal__inputText').innerText = '';
                command = command.trim();
                command = command.split(' ');
                checkCmd(command);
            }
        }

    }
    //clears the history of commands and the output generated
    const clearHistory = () => {
        history.forEach(function ({ command }) {
            const newHistory = history.filter((item) => item.id === command);
            setHistory(newHistory);
        })
    }

    //prints the list of filenames
    const ls = () => {
        var str = '';
        list.forEach(function (x) {
            str = `${str}<p>${x}</p>`;
        })
        return str;
    }

    const cd = (command) => {
        if (command[1] === "root")
            return " ";
        else if (command[1])
            return 'Error: not a valid directory';
        else
            return 'Error: you did not specify a directory';
    }

    const cat = (fileName, isEdit = false) => {
        if (isEdit) {
            setPassword(true);
                return '';
        }
        else {
            setFileFetch(true);
            return;
        }
    }

    //function to set the user defined text color
    const color = (command) => {
        if (command[1]) {
            setTerminalColor(command[1]);
            return '';
        }
        else {
            return "Error: you did not specify a color";
        }
    }


    //function to return appropriate output for the given command
    const checkCmd = (command) => {

        let result = "";

        if (password) {
            setAuthorization(true);
            return;
        }

        if (cmdExec) {

            addHistory(``, `<div style='white-space:pre-wrap'>${command}</pre>`);
            setCmdExec(false);
            let content = command
            setUpdateFile({...updateFile,content})
            return;
        }

        let cmd = command.join(" ");

        //if no command is entered
        if (command[0] === '') {
            addHistory(`${cmd}`, `<div>${result}</div>`);
        }
        else {
            switch (command[0]) {
                case "clear":
                    addHistory(' ', ' ');
                    clearHistory();
                    break;
                case "help":
                    result = help();
                    break;
                case "cat":
                    if (command[1])
                        if (command[1] == '>') {
                            result = cat(command[2], true);
                        }
                        else {
                            result = cat(command[1]);
                            return;
                        }
                    else
                        result = "Error: you did not specify a file";
                    break;
                case "ls":
                    setFileList(true);
                    return;
                    result = ls();
                    break;
                case "cd":
                    result = cd(command);
                    break;
                case "path":
                    result = 'user/root';
                    break;
                case "echo":
                    result = command.slice(1,).join(' ');
                    break;
                case "mkdir":
                    result = 'Error: No write access';
                    break;
                case "color":
                    result = color(command);
                    break;
                default:
                    result = "Error: command not found";
                    break;
            }
        }
        if (command[0] !== 'clear')
            addHistory(`${cmd}`, `<div>${result}</div>`);
    }

    const getInputTemplate = () => {
        let style = {};

        let terminalPrefix = '';
        if (password) {
            terminalPrefix = 'password:';
        }
        else if (cmdExec) {
            style['whiteSpace'] = 'pre-line';
            terminalPrefix = '';
        }
        else {
            style['color'] = '#4af626';
            terminalPrefix = 'root $'
        }

        return (
            <div style={style} className="terminal__input">{terminalPrefix}
                <span style={{ color: terminalColor }} id="terminal__inputText" onKeyDown={handleKeyPress} contentEditable="true" ></span>
            </div>
        );
    }

    return (
        <div className="terminal" onClick={() => { document.getElementById('terminal__inputText').focus() }}>
            <div className="terminal__bar"><h4>🟠 🟡 🟢</h4> </div>
            <div className="terminal__container" style={{ color: terminalColor }}>
                {history.map((command) => (
                    <CommandList command={command.command} result={command.result} />
                ))}
                {getInputTemplate()}
            </div>
        </div>
    )
}
export default Terminal
