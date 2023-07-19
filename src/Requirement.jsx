
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Requirement = () => {
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
    <div className="requirement-sty">
      <div className="d-grid gap-2">
        <div className="popup">
        <Button
           className="popup"
          onClick={togglePopup}
          variant="secondary"
          size="lg"
          style={{
            
            paddingRight: "20px",
            width: "50%",
            fontSize: "25px",
            marginLeft:"130px",marginTop:"10px",fontFamily:"cursive"
          }}
        >
          Send Information
        </Button>
        </div>
       
      </div>

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
  );
};

export default Requirement;
