import React, { useEffect, useState } from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

function Adduser() {

    const [id, setId] = useState();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        fetch("https://reqres.in/api/users?page=1").then(res => res.json).then(res => console.log(res))
    }, [])

    const saveData = () => {
        fetch("https://reqres.in/api/users", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    name: userName,
                    job: email
                })
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                if (res) {
                    getListofUsers()
                }
            })
    }

    const getListofUsers = async () => {
        await fetch("https://reqres.in/api/unknown")
            .then(res => res.json())
            .then(res => console.log(res))
    }

    let pageTitle;
    if (id) {
        pageTitle = <h2>Edit User</h2>
    } else {
        pageTitle = <h2>Add User</h2>


        const handleSubmit = (e) => {
            e.preventDefault();
            // setUserName(userName);
        }

        const handleUserName = (e) => {
            const val = e.target.value
            setUserName(val)
            // console.log(`name`, setUserName)
        }
        const handleUserEmail = (e) => {
            const val = e.target.value
            setEmail(val)
            // console.log(`name`, setUserName)
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
                                    onChange={handleUserName}
                                    placeholder="User Name" />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleUserEmail}
                                    placeholder="Email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="hidden" name="id" value={id} />
                                <Button variant="success" type="submit" onClick={() => saveData()}>Add</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Adduser;