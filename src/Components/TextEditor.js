import React from "react";

import { useQuill } from "react-quilljs";
import { useState, useEffect, useContext, useRef} from "react";

// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
import { Button, Em, Strong, Text } from "@radix-ui/themes";
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

export default ({childToSet, initText, handleSubmit, beliefId, refresh}) => {
  const { quill, quillRef } = useQuill();
  const [startedTyping, setStartedTyping ] = useState(false);

    


  useEffect(() => {
   
  }, [quill]);

  if (quill) {
    // console.log(initText)
    // console.log(quill.root.innerHTML.length); 
    // console.log(quill.getText()===''); 
   
    //we know to set default text only if the current state isn[t the passed in init text. if its different then it was likely already changed so we dont want default text]
  if (initText && !startedTyping )// && initText!==quill.root.innerHTML)
  {
     console.log('init text is', initText)
    quill.clipboard.dangerouslyPasteHTML(initText)
  }
   

   quill.on('text-change', (delta, oldDelta, source) => {

    if(!startedTyping)
      setStartedTyping(true)
    //  console.log('Text change!');
    //  console.log(quill.getText()); // Get text only
    //  console.log(quill.getContents()); // Get delta contents
    //  console.log(quill.root.innerHTML); // Get innerHTML using quill
     //in future we will passs in object and set new field in the object. i think this will cut down on renders
      childToSet(quill.root.innerHTML)
    // childToSet(quillRef.current.firstChild.innerHTML)
    //  console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
   });
 }


 //DISABLE PICTURES
  return (
    <div style={{  }}>
   
      <div ref={quillRef} />
      <Text size='2'><Strong>Note!! The upload an image/video functions of the editor do not currently work. We are working on a workaround. You can instead provide a link to what you want to share</Strong></Text>
      {/* {beliefId ? <Button onClick={handleSubmit}>Edit</Button > : <button style={{ marginTop: '10px'}} onClick={handleSubmit}>Create belief</button>} */}
      {/* <p>{initText}</p> */}
    </div>

  );
};

// export default ({childToSet, p}) => {
//   console.log(p)
//   const { quill, quillRef } = useQuill({ placeholder: "<p>haryyooo</p>" });
 

//   const myStyles ={ width: 500, height: 300 };

//   console.log(quill); // undefined > Quill Object
//   console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

//   //we need to do this outside useffect cause quill might not be iniatilized 
//   if (p && quill)
//     //quill.root.innerHTML = p
//   useEffect(() => {
//     if (quill) {
//       // quill.setText(p);
//       //quill.root.innerHTML = '<p>haryyooo</p>'

//       quill.on('text-change', (delta, oldDelta, source) => {
//         // console.log('Text change!');
//         // console.log(quill.getText()); // Get text only
//         // console.log(quill.getContents()); // Get delta contents
//         // console.log(quill.root.innerHTML); // Get innerHTML using quill
//         //childToSet(quill.root.innerHTML)
//         // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
  
  
//       });
//     }
//   }, []);
  
//   return (
//     <div style={{}}>
//       <div ref={quillRef} />
//     </div>
//   );
// };
