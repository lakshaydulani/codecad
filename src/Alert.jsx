// import React, { useEffect,useState } from 'react';

// const MobileAlert = () => {

//   const [mob,setMob] =useState(768);
//   const str="For better experience switch to System";
//   useEffect(() => {
//     const isMobile = window.innerWidth < 768; 
     
//     if (isMobile) {
//       console.log("ALert open to desktop")
//       alert('For the best experience, please open this site on a desktop.');
//     }
//   }, []);

//   return (
 
//     <div if () {
        
//     } else {
        
//     }>
        
//     </div>
//   );
// };

// export default MobileAlert;

import React, { useEffect, useState } from 'react';

const MobileAlert = () => {
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; 

    setDisplayAlert(isMobile);
  }, []);

  return (
    // Your main component JSX
    <div>
      {displayAlert && (
        <h2>
           Please open this site on a desktop.
        </h2>
      )}
    
    </div>
  );
};

export default MobileAlert;
