
//css style property for hyperlinks
const linkStyle=`" color: inherit;text-decoration: none;"`;
//css style property for strong text
const strongStyle =`"padding:5px"`;
 


const help =() =>{
    return `<br>
    <li><strong>ls</strong> - show files in the current directory</li>
    <li><strong>path</strong> - display current directory</li>
    <li><strong>cat FILENAME</strong> - display contents of FILENAME in the terminal window</li>
    <li><strong>clear</strong> - clear current terminal window</li>
    <li><strong>color COLORNAME</strong> - display the content in color COLORNAME(can use hex values)</li>
    <br>`;
}

export default help;
