
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

export const about =()=>{
    return `<br>
    <li>A CS student interested to create and work in cool tech.</li>
    <li>A hobbyist game developer.</li>
    <li>Love to travel and play sport.</li>
    <li>Learning everyday</li>
    <br>`;
} 
export const projects =()=>{
    return `<br>
    <div>
        <li>
            <strong style=${strongStyle}><a style=${linkStyle}  href="https://play.google.com/store/apps/details?id=com.hyperlinkcrew" target="_blank">
            Molecular devastation</strong></a>
        - a 2D single player arcade game application developed using C# in Unity for the android platform
        </li><br>
        <li>
            <strong style=${strongStyle}>Disease Prediction using Symptom data</strong>
        - A python machine learning approach using three algorithms (Decision tree, Random Forest, and Naïve Bayes Classifier) to
        predict the disease using the symptoms given by the user.
        </li><br>
        <li>
            <strong style=${strongStyle}>Autonomous Traffic Light Control System for Smart Cities</strong>
        - It uses Raspberry pi to perform live object detection of vehicles in the
        traffic signal using Tensorflow and OpenCV and predict the signal time based on the
        vehicle count.
        </li>
     </div>
     <br>`;
}
export const contact =()=>{
    return `<br>
    <center><strong style=${strongStyle}>
        <a style = ${linkStyle} href="https://www.instagram.com/vineeth__2628/"  target="_blank">Instagram</a>
    </strong></center>
    <center><strong style=${strongStyle}>
        <a style = ${linkStyle} href="https://twitter.com/vineeth2628"  target="_blank">Twitter</a>
    </strong></center>
    <center><strong style=${strongStyle}>
        <a style = ${linkStyle} href="https://www.linkedin.com/in/vineeth-rajendran-05568b15a/"  target="_blank">LinkedIn</a>
    </strong></center>
    <center><strong style=${strongStyle}>
        <a style = ${linkStyle} href="https://github.com/vineeth2628"  target="_blank">Github</a>
    </strong></center>
    <br>`;
} 

export const skillset =()=>{
    return `<br>
    <p>Can code in <div style="margin-left:20px" >
        <li>C</li>
        <li>C#</li>
        <li>Java</li>
        <li>Javascript</li>
        <li>Python</li>
        </div>
    </p><br>
    <p>Have done projects in<div style="margin-left:20px">
        <li>Web development</li>
        <li>Mobile App development</li>
        <li>Game development</li>
        <li>Machine Learning</li></div>
    </p><br>
    <p>Interested in exploring<div style="margin-left:20px">
    <li>AR and VR</li>
    <li>Advanced AI</li>
    </p>
    <br>`;
} 

export const resume =()=>{
    return `<br>
    <center><strong style=${strongStyle}>
        <a style=${linkStyle} href="https://drive.google.com/file/d/1uMEUEu6ZugOdZ_bPsoApJURrjyP8XT_l/view?usp=sharing" target="_blank">
        View my resume</a>
    </strong></center>
    <br>`;
} 

export default help;
