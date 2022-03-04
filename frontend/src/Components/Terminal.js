import React, { useState} from 'react';
import '../Styles/Terminal.css';
import CommandList from './CommandList';
import help ,{about,resume,skillset,projects,contact} from '../Utilities/constants';

function Terminal() {
    //it stores the command entered and the output generated in an array
    const [history, setHistory] = useState([{
        command: '',
        result: `\\^o^/ - type 'help' to get started`
    }]);

    //stores the list of filenames to be read by the user
    const list = ['about.txt','resume.txt','contact.txt','skillset.txt','projects.txt'];
    //state variable for the text color inside the terminal
    const [terminalColor,setTerminalColor] = useState('white');

    //adds the entered command and the output generated inside the state variable
    const addHistory =(command,result) =>{
        const response = {command,result};
        setHistory([...history,response]);
    }
    //eventHandler function when the enter key is pressed inside the terminal
    const handleKeyPress = (e) =>{
        if(e.key ==="Enter"){
            e.preventDefault();
            var command = document.getElementById('terminal__inputText').innerText;
            document.getElementById('terminal__inputText').innerText = '';
            command=command.trim();
            command = command.split(' ');
            checkCmd(command);
        }
    }
    //clears the history of commands and the output generated
    const clearHistory = ()=>{
        history.forEach(function({command}){
            const newHistory= history.filter((item) =>item.id ===command);
            setHistory(newHistory);
        })
    }

    //prints the list of filenames
    const ls = ()=>{
        var str='';
        list.forEach(function(x){
            str=`${str}<p>${x}</p>`;
        })
        return str;
    }

    const cd = (command)=>{
        if(command[1] === "root")
        return " ";
        else if(command[1])
            return 'Error: not a valid directory';
        else
            return 'Error: you did not specify a directory';
    }

    const cat =(fileName)=>{
        switch(fileName){
            case 'about.txt':
                return about();
                // eslint-disable-next-line
                break;
            case 'resume.txt':
                return resume();
                // eslint-disable-next-line
                break;
            case 'contact.txt':
                return contact();
                // eslint-disable-next-line
                break;
            case 'skillset.txt':
                return skillset();
                // eslint-disable-next-line
                break;
            case 'projects.txt':
                return projects();
                // eslint-disable-next-line
                break;
            default:
                return "Error: file not found in current directory";
        }
    }

    //function to set the user defined text color
    const color =(command)=>{
        if(command[1]){
            setTerminalColor(command[1]);
            return '';
        }
        else{
            return "Error: you did not specify a color";
        }
    }


    //function to return appropriate output for the given command
    const checkCmd = (command)=>{ 
        
        let cmd= command.join(" ");
        let result ="";
        //if no command is entered
        if(command[0] ===''){
            addHistory(`${cmd}`,`<div>${result}</div>`);
        }
        else{
            switch(command[0]){
                case "clear":
                    addHistory(' ',' ');
                    clearHistory();
                    break;
                case "help":
                    result = help();
                    break;
                case "cat":
                    if(command[1])
                        result = cat(command[1]);
                    else
                        result= "Error: you did not specify a file";
                    break;
                case "ls":
                    result =ls();
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
        if(command[0] !== 'clear')
            addHistory(`${cmd}`,`<div>${result}</div>`);
    }

    return (
        <div className="terminal" onClick ={()=>{  document.getElementById('terminal__inputText').focus()}}>
            <div  className= "terminal__bar"><h4>🟠 🟡 🟢</h4> </div>
            <div className = "terminal__container" style={{color: terminalColor}}>
                {history.map((command) =>(
                    <CommandList command ={command.command} result={command.result} />
                ))}
                <div style={{color :'#4af626'}} className="terminal__input">root $
                    <span style={{color:terminalColor}}  id="terminal__inputText" onKeyPress={handleKeyPress} contentEditable="true" ></span>
                </div>
            </div>
        </div>
    )
}
export default Terminal
