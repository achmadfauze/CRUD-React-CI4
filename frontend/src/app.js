
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Index from "views/Index.js";
import Icons from "views/examples/Icons.js";

function App() {
  return (
      <React.Fragment>
      <Routes>
                <Route path="/" element={<Index />} />
                <Route path= "/" name= "Transaction" icon= "ni ni-tv-2 text-primary" component= {<Icons />} layout= "/admin" />
                <Route path= "/icons" name= "Icons" icon= "ni ni-planet text-blue" component= {<Icons />} layout= "/admin" />
            </Routes>
      </React.Fragment>
  );
}

export default App;
