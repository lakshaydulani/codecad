
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
