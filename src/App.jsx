import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
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
            <h2>Parameters</h2>
     <Form>
     <Form.Group className="mb-0" controlId="formGroupEmail">
        <Form.Label className="para-heading">Blades</Form.Label>
        <div className="inp">
        <Form.Control type="number" placeholder="" className="inp-box"  id="numbladesInput"
            
            step="1"
            min="1"
            max="15"
            value={size}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 100) setSize(val);
            }}  />
        </div>
        
      </Form.Group>
      <Form.Group className="mb-0" controlId="formGroupEmail">
        <Form.Label className="para-heading">Radius</Form.Label>
        <div className="inp">
        <Form.Control type="number" placeholder="" className="inp-box"   id="baseradius"
           
            step="1"
            min="99"
            max="1000"
            value={baseradius}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 9 && val <= 10000) setBaseRadius(val);
            }} />
        </div>
        
      </Form.Group>
      <Form.Group className="mb-0" controlId="formGroupEmail">
        <Form.Label className="para-heading">Height</Form.Label>
        <div className="inp">
        <Form.Control type="number" placeholder="" className="inp-box"   id="height"
          
            step="1"
            min="1"
            max="1000"
            value={height}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 1000) setHeight(val);
            }} />
        </div>
        
      </Form.Group>
      <Form.Group className="mb-0" controlId="formGroupEmail">
        <Form.Label className="para-heading">Outer Radius</Form.Label>
        <div className="inp">
        <Form.Control type="number" placeholder="" className="inp-box"   id="outerradius"
            step="1"
            min="1"
            max="1000"
            value={outerRadius}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 1000) setOuterRadius(val);
            }} />
        </div>
        
      </Form.Group>
      <Form.Group className="mb-0" controlId="formGroupEmail">
        <Form.Label className="para-heading">Inner Radius</Form.Label>
        <div className="inp">
        <Form.Control type="number" placeholder="" className="inp-box"    id="innerradius"
            step="1"
            min="1"
            max="1000"
            value={innerRadius}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 1000) setInnerRadius(val);
            }}  />
        </div>
        
      </Form.Group>
      <Form.Group className="mb-0" controlId="formGroupEmail">
        <Form.Label className="para-heading">Thickness</Form.Label>
        <div className="inp">
        <Form.Control type="number" placeholder="" className="inp-box"   id="thickness"
            step="1"
            min="1"
            max="1000"
            value={thickness}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= 1000) setThickness(val);
            }} />
        </div>
        
      </Form.Group>
    </Form>
          <button className="btn-download">Downlad</button>
              </div>
           
        </div>
        {/* <input type="number" /> */}
        {/* <button onClick={downloadModel}>Download STL</button> */}
      </section>
      <section style={{ height: "140vh", width: "60%" }}>
        {mesh ? (
          <ThreeContext>
            <ReplicadMesh edges={mesh.edges} faces={mesh.faces} />
          </ThreeContext>
        ) : (
          <div className="loading-option"
            style={{ display: "flex", alignItems: "center", fontSize: "2em" }}
          >
            Loading...
          </div>
        )}
      </section>
    </main>
  );
}
