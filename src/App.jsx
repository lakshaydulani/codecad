
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import FileSaver from "file-saver";
import { wrap } from "comlink";

import Requirement from "./Requirement.jsx";
import ThreeContext from "./ThreeContext.jsx";
import ReplicadMesh from "./ReplicadMesh.jsx";
import Alert from "./Alert.jsx";
import cadWorker from "./worker.js?worker";

import "./App.css";

import loading from "./loading.gif";
const cad = wrap(new cadWorker());

export default function ReplicadApp() {
  const [formData, setFormData] = useState({
    size: 5,
    baseradius: 200,
    height: 100,
    outerRadius: 30,
    innerRadius: 25,
    thickness: 5,
  });

  const [latestFormData, setLatestFormData] = useState({});

  const [mesh, setMesh] = useState(null);

  useEffect(() => {
    cad
      .createMesh(
        latestFormData.size || formData.size,
        latestFormData.baseradius || formData.baseradius,
        latestFormData.height || formData.height,
        latestFormData.outerRadius || formData.outerRadius,
        latestFormData.innerRadius || formData.innerRadius,
        latestFormData.thickness || formData.thickness
      )
      .then((m) => setMesh(m));
  }, [latestFormData]);          // Ye  dependency hai , when latestformdata changes , on clicking generate button 

  const downloadModel = async () => {
    const blob = await cad.createBlob(
      latestFormData.size || formData.size,
      latestFormData.baseradius || formData.baseradius,
      latestFormData.height || formData.height,
      latestFormData.outerRadius || formData.outerRadius,
      latestFormData.innerRadius || formData.innerRadius,
      latestFormData.thickness || formData.thickness
    );
    FileSaver.saveAs(blob, "impellar.step");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value),
    }));
  };

  const generateModel = () => {
    setLatestFormData(formData);
  };

  return (
    <main style={{ display: "flex" }}>
      <section style={{ width: "40%", backgroundColor: "pink" }}>
        <Alert />
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
                <Form.Label column sm="4" className="label-c">
                  Blades
                </Form.Label>

                <Col sm="8">
                  <Form.Control
                    className="inp-box"
                    size="lg"
                    type="number"
                    placeholder=""
                    step="1"
                    min="1"
                    max="25"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                  />
                </Col>
                <small className="description">Max 25</small>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="4" className="label-c">
                  Radius
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="inp-box"
                    size="lg"
                    type="number"
                    placeholder=""
                    step="1"
                    min="99"
                    max="500"
                    name="baseradius"
                    value={formData.baseradius}
                    onChange={handleInputChange}
                  />
                </Col>
                <small className="description">Max 500</small>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="4" className="label-c">
                  Height
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="inp-box"
                    size="lg"
                    type="number"
                    placeholder=""
                    step="1"
                    min="1"
                    max="500"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                </Col>
                <small className="description">Max 500</small>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="4" className="label-c">
                  OuterRadius
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="inp-box"
                    size="lg"
                    type="number"
                    placeholder=""
                    step="1"
                    min="1"
                    max={formData.baseradius}
                    name="outerRadius"
                    value={formData.outerRadius}
                    onChange={handleInputChange}
                  />
                </Col>
                <small className="description">Less Than Radius</small>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="4" className="label-c">
                  InnerRadius
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="inp-box"
                    size="lg"
                    type="number"
                    placeholder=""
                    step="1"
                    min="1"
                    max="499"
                    name="innerRadius"
                    value={formData.innerRadius}
                    onChange={handleInputChange}
                  />
                </Col>
                <small className="description">Less Than OuterRadius</small>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="4" className="label-c">
                  Thickness
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="inp-box"
                    size="lg"
                    type="number"
                    placeholder=""
                    step="1"
                    min="1"
                    max="100"
                    name="thickness"
                    value={formData.thickness}
                    onChange={handleInputChange}
                  />
                </Col>
                <small className="description">Max 100</small>
              </Form.Group>
            </Form>
            <div className="d-grid gap-2">
              <div className="btn-downc">

                <Button
                  onClick={generateModel}
                  variant="secondary"
                  size="lg"
                  style={{
                    paddingRight: "20px",
                    width: "80%",
                    fontSize: "25px",
                    marginLeft:""
                  }}
                >
                  Generate
                </Button>
                <Button
                onClick={downloadModel}
                variant="secondary"
                size="lg"
                style={{ paddingRight: "20px", width: "80%", fontSize: "25px" ,marginTop:"10px"}}
              >
                Download
              </Button>
              </div>
            </div>
          </div>
          <Requirement />
        </div>
      </section>

      <section style={{ height: "100vh", width: "60%", paddingTop: "100px" }}>
        {mesh ? (
          <ThreeContext>
            <ReplicadMesh edges={mesh.edges} faces={mesh.faces} />
          </ThreeContext>
        ) : (
          <div className="loading-option">
            <img src={loading} alt="Loading" className="loading-gif" />
          </div>
        )}
      </section>
    </main>
  );
}
