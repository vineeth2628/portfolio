import React from 'react';

function CommandList({command,result}) {
    var parse = require('html-react-parser');
    return (
        <div className= "commandList">
            <p className="commandList__command">{command?(<span style={{color:'#4af626'}}>root $  </span>):(<span></span>)}
            {command}</p>
            <div style={{marginLeft: '15px'}} className="commandList__result">{parse(result)}</div>
        </div>
    )
}

export default CommandList
