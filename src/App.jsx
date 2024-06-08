import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FileSaver from "file-saver";
import { wrap } from "comlink";

import Requirement from "./Requirement.jsx";
import ThreeContext from "./ThreeContext.jsx";
import ReplicadMesh from "./ReplicadMesh.jsx";
import Alert from "./Alert.jsx";
import cadWorker from "./worker.js?worker";
// import { debounce } from "lodash";

import "./App.css";

import { Loader } from "@react-three/drei";
// import { Color } from "three";
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
  }, [latestFormData]); // Ye  dependency hai , when latestformdata changes , on clicking generate button

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

  const handleContactUsClick = () => {
    const userFeedback = window.prompt(
      "Please provide your feedback or any specific requirements you have:"
    );

    if (userFeedback !== null) {
      // Here you can use the userFeedback variable to perform actions like sending the feedback to a server, displaying it, etc.
      // For now, let's just display an alert with the user's input.
      alert(`Thank you for your feedback:\n${userFeedback}`);
    }
  };




  const [user, setUser] = useState({
    email: "",
    requirement: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const getUserData = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    
  };

  const postdata = async (e) => {
    e.preventDefault();

    const { email, requirement } = user;
    const res = await fetch(
      "https://my-app-fb49e-default-rtdb.firebaseio.com/userinfo.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          requirement,
        }),
      }
    );
    setUser("");
    setShowPopup(false);
  };

  return (
    <main
      style={{
        display: "flex",
      }}
    >
      <section style={{ width: "45%" }}>
        <Alert />
        <div className="heading-wrap mb-5 logo-text bg-dark text-white">
          <h1 className="heading">Centrifugal Fan Designer</h1>
        </div>
        <div className="parameters px-2">
          <Form className="mb-4 mx-5">
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="5" className="label-c">
                Number of Blades
              </Form.Label>

              <Col sm="6" className="inpdiv">
                <Form.Control
                  className="inp-box"
                  size="lg"
                  type="number"
                  placeholder=""
                  step="3"
                  min="1"
                  max="25"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                />
              </Col>
              <small className="description">
                Recommended number of plates is between 8 to 15.
              </small>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="5" className="label-c">
                Base Plate Diameter
              </Form.Label>
              <Col sm="6" className="inpdiv">
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
              <small className="description">
                This is the Diameter of the base plate.
              </small>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="5" className="label-c">
                Thickess
              </Form.Label>
              <Col sm="6" className="inpdiv">
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
              <small className="description">
                This is the height of the hub.
              </small>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="5" className="label-c">
                Hub OD
              </Form.Label>
              <Col sm="6" className="inpdiv">
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
              <small className="description">
                Recommended size is between 800 to 1500 mm.
              </small>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="5" className="label-c">
                Hub ID
              </Form.Label>
              <Col sm="6" className="inpdiv">
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
              <small className="description">
                Recommended number of plates is between 8 to 15.
              </small>{" "}
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="5" className="label-c">
                Base Plate Thickness
              </Form.Label>
              <Col sm="6" className="inpdiv">
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
              <small className="description" style={{}}>
                Max100
              </small>
            </Form.Group>
          </Form>
        </div>
        <div className="d-grid gap-2">
          <div className="btn-downc">
            <Button
              onClick={downloadModel}
              variant="primary"
              size="lg"
              className="fly-button"
            >
              Download AutoCAD model
            </Button>

            <div className="download-count">3596+ downloads</div>
          </div>
        </div>

        <div className="bottom-small">
          <small>Made with ❤ by Lakshay Dulani</small>
          <br />
          <small>
            <a className="text-dark" onClick={togglePopup} >
              Need similar template for your product? Contact Us!


              
            </a>
          </small>
          <Modal show={showPopup} onHide={togglePopup}>
        <Modal.Header closeButton>
          <Modal.Title>What are your requirements?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={user.email}
                onChange={getUserData}
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group controlId="formRequirement">
              <Form.Label>Requirements</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter requirements"
                name="requirement"
                value={user.requirement}
                onChange={getUserData}
                autoComplete="off"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={togglePopup}>
            Cancel
          </Button>
          <Button variant="primary" onClick={postdata}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
         
        <div className="generate-btn">
        <Button
          onClick={generateModel}
          variant="primary"
          size="lg"
          style={{
            marginLeft: "165px",
            fontSize: "25px",
          }}
        >
          Generate Model
        </Button>
        </div>
      
      </section>
      <section
        style={{ height: "100vh", width: "55%", borderLeft: "1px solid black" }}
      >
        {mesh ? (
          <ThreeContext>
            <ReplicadMesh edges={mesh.edges} faces={mesh.faces} />
          </ThreeContext>
        ) : (
          <div class="lds-circle">
            <div></div>
          </div>
        )}
      </section>
    </main>
  );
}
