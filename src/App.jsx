import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import FileSaver from "file-saver";
import { wrap } from "comlink";

import ThreeContext from "./ThreeContext.jsx";
import ReplicadMesh from "./ReplicadMesh.jsx";

import cadWorker from "./worker.js?worker";

import "./App.css";
const cad = wrap(new cadWorker());

export default function ReplicadApp() {
  const [size, setSize] = useState(5);
  const [baseradius, setBaseRadius] = useState(200);
  const [height, setHeight] = useState(100);
  const [outerRadius, setOuterRadius] = useState(30);
  const [innerRadius, setInnerRadius] = useState(25);
  const [thickness, setThickness] = useState(5);

  const downloadModel = async () => {
    const blob = await cad.createBlob(size,baseradius,height,outerRadius,innerRadius,thickness);
    FileSaver.saveAs(blob, "thing.stl");
  };

  // const downloadModel = async () => {
  //   const blob = await cad.createBlob(baseradius);
  //   FileSaver.saveAs(blob, "thing.stl");
  // };

  const [mesh, setMesh] = useState(null);

  useEffect(() => {
    cad
      .createMesh(size, baseradius, height, outerRadius, innerRadius, thickness)
      .then((m) => setMesh(m));
  }, [size, baseradius, height, outerRadius, innerRadius, thickness]);

  return (
    <main
      style={{
        display: "flex",
      }}
    >
      <section style={{ width: "40%" }}>
        <div className="heading-wrap">
          <h1 className="heading">Impellar</h1>
        </div>

        <div>
          <div className="heading-p">
            <h2>Set Characteristics of Impellar</h2>
          </div>
       
          <div className="parameters">
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3" className="label-c">
                Blades
                </Form.Label>
                <Col sm="8">
                  <div className="inp">
                    {" "}
                    <Form.Control
                      className="inp-box"
                      size="lg"
                      type="number"
                      placeholder=""
                      step="1"
                      min="1"
                      max="15"
                      value={size}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val > 0 && val <= 100) setSize(val);
                      }} 
                    />{" "}
                  </div>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3" className="label-c">
                  Radius
                </Form.Label>
                <Col sm="8">
                  <div className="inp">
                    {" "}
                    <Form.Control
                      className="inp-box"
                      size="lg"
                      type="number"
                      placeholder=""
                      step="1"
                      min="99"
                      max="1000"
                      value={baseradius}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val > 9 && val <= 10000) setBaseRadius(val);
                      }}
                    />{" "}
                  </div>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3" className="label-c">
                  Height
                </Form.Label>
                <Col sm="8">
                  <div className="inp">
                    {" "}
                    <Form.Control
                      className="inp-box"
                      size="lg"
                      type="number"
                      placeholder=""
                      step="1"
                      min="1"
                      max="1000"
                      value={height}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val > 0 && val <= 1000) setHeight(val);
                      }}
                    />{" "}
                  </div>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3" className="label-c" >
                  OuterRadius
                </Form.Label>
                <Col sm="8">
                  <div className="inp">
                    {" "}
                    <Form.Control
                      className="inp-box"
                      size="lg"
                      type="number"
                      placeholder=""
                      step="1"
                      min="1"
                      max="1000"
                      value={outerRadius}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val > 0 && val <= 1000) setOuterRadius(val);
                      }}
                    />{" "}
                  </div>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3" className="label-c">
               InnerRadius
                </Form.Label>
                <Col sm="8">
                  <div className="inp">
                    {" "}
                    <Form.Control
                      className="inp-box"
                      size="lg"
                      type="number"
                      placeholder=""
                      step="1"
                      min="1"
                      max="1000"
                      value={innerRadius}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val > 0 && val <= 1000) setInnerRadius(val);
                      }} 
                    />{" "}
                  </div>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="3" className="label-c">
                  Thickness
                </Form.Label>
                <Col sm="8">
                  <div className="inp">
                    {" "}
                    <Form.Control
                      className="inp-box"
                      size="lg"
                      type="number"
                      placeholder=""
                      step="1"
                      min="1"
                      max="1000"
                      value={thickness}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (val > 0 && val <= 1000) setThickness(val);
                      }} 
                    />{" "}
                  </div>
                </Col>
              </Form.Group>
            </Form>

            {/* <button className="btn-download">Downlad</button> */}
          </div>
          <div className="d-grid gap-2">
       <div className="btn-downc">
       <Button onClick={downloadModel} variant="secondary" size="lg"  style={{paddingRight:"20px",width:"80%",fontSize:"25px"}}>
        Download
      </Button>
       </div>
     

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
            className="loading-option"
            style={{ display: "flex", alignItems: "center", fontSize: "2em" }}
          >
            Loading...
          </div>
        )}
      </section>
    </main>
  );
}
