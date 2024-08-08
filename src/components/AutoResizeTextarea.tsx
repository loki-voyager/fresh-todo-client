import { useEffect, useRef } from "react";

const AutoResizeTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [props.value]);
  
    return (
      <textarea
        ref={textareaRef}
        {...props}
        className={`${props.className} resize-none`}
      />
    );
  };

export {AutoResizeTextarea}