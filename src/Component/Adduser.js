import React, { useEffect, useState } from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

function Adduser() {

    const [id, setId] = useState();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');



    let pageTitle;
    if (id) {
        pageTitle = <h2>Edit User</h2>
    } else {
        pageTitle = <h2>Add User</h2>


        const handleSubmit = (e) => {
            e.preventDefault();
            setUserName(userName);
        }

        const handleChange = (e) => {
            setUserName(e.current.value)
            console.log(`name`, setUserName)
        }



        return (
            <div>
                {pageTitle}
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="userName">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    value={userName}
                                    onChange={handleChange}
                                    placeholder="User Name" />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    placeholder="Email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="hidden" name="id" value={id} />
                                <Button variant="success" type="submit">Add</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Adduser;