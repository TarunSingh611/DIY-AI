import { useState } from 'react';  

const ClickToCopy = ({ text }: { text: string }) => {  
  const [copied, setCopied] = useState(false);  

  const handleCopy = () => {  
    navigator.clipboard.writeText(text).then(() => {  
      setCopied(true);  
      setTimeout(() => setCopied(false), 2000); // Reset "copied" state after 2 seconds  
    });  
  };  

  return (  
      <button  
        onClick={handleCopy}  
        className="text-blue-600 hover:text-blue-800 font-medium"  
      >  
        {copied ? 'Copied!' : 'Copy'}  
      </button>  
  );  
};  

export default ClickToCopy;  