import React, { useState, useEffect } from "react";

import FileSaver from "file-saver";
import { wrap } from "comlink";

import ThreeContext from "./ThreeContext.jsx";
import ReplicadMesh from "./ReplicadMesh.jsx";

import cadWorker from "./worker.js?worker";

import './App.css';
const cad = wrap(new cadWorker());

export default function ReplicadApp() {
  const [size, setSize] = useState(5);
  const [baseradius,setBaseRadius] =useState(200);
  const [height,setHeight]=useState(100);
  const [outerRadius,setOuterRadius]=useState(30);
  const [innerRadius,setInnerRadius]=useState(25)
  const [thickness,setThickness]=useState(5)

  const downloadModel = async () => {
    const blob = await cad.createBlob(size);
    FileSaver.saveAs(blob, "thing.stl");
  };

  // const downloadModel = async () => {
  //   const blob = await cad.createBlob(baseradius);
  //   FileSaver.saveAs(blob, "thing.stl");
  // };

  const [mesh, setMesh] = useState(null);

  useEffect(() => {
    cad.createMesh(size,baseradius,height,outerRadius,innerRadius,thickness).then((m) => setMesh(m));
  }, [size,baseradius,height,outerRadius,innerRadius,thickness]);

  return (
    <main style={{
          display: "flex"
        }}>
    
      <section style={{width: "44%"}}>
        <div className="heading-wrap">
        <h1 className="heading">Propellar</h1>
        </div>
         
         <div>
          <div className="parameters">
          <label htmlFor="numbladesInput" style={{paddingRight:"75px"}}>Blades</label>
          <input
          
             style={{width:"10%"}}
            id="numbladesInput"
            type="number"
            step="1"
            min="1"
            max="15"
            value={size}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 100) setSize(val);
            }}
          /> <br />
            <label htmlFor="baseradius" style={{paddingRight:"75px"}}>Radius</label>
          <input
             style={{width:"10%"}}
            id="baseradius"
            type="number"
            step="10"
            min="99"
            max="1000"
            value={baseradius}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 9 && val <= 10000) setBaseRadius(val);
            }}
          /> <br />
            <label htmlFor="height" style={{paddingRight:"75px"}}>Height</label>
          <input
             style={{width:"10%"}}
            id="height"
            type="number"
            step="1"
            min="1"
            max="1000"
            value={height}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 1000) setHeight(val);
            }}
          />
          <br />
            <label htmlFor="outerradius" style={{paddingRight:"5px"}}>OuterRadius</label>
          <input
             style={{width:"10%"}}
            id="outerradius"
            type="number"
            step="1"
            min="1"
            max="1000"
            value={outerRadius}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 1000) setOuterRadius(val);
            }}
          />
          <br />
            <label htmlFor="innerradius" style={{paddingRight:"8px"}}>InnerRadius</label>
          <input
             style={{width:"10%"}}
            id="innerradius"
            type="number"
            step="1"
            min="1"
            max="1000"
            value={innerRadius}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 1000) setInnerRadius(val);
            }}
          />
          <br />
            <label htmlFor="thickness" style={{paddingRight:"36px"}} >Thickness</label>
          <input
             style={{width:"10%"}}
            id="thickness"
            type="number"
            step="1"
            min="1"
            max="1000"
            value={thickness}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 1000) setThickness(val);
            }}
          />
         
              </div>
          
        </div>
        {/* <input type="number" /> */}
        {/* <button onClick={downloadModel}>Download STL</button> */}
      </section>
      <section style={{ height: "100vh", width: "60%" }}>
        {mesh ? (
          <ThreeContext>
            <ReplicadMesh edges={mesh.edges} faces={mesh.faces} />
          </ThreeContext>
        ) : (
          <div
            style={{ display: "flex", alignItems: "center", fontSize: "2em" }}
          >
            Loading...
          </div>
        )}
      </section>
    </main>
  );
}
