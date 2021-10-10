import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';



export default function Home() {

    const [users, setUsers] = useState([]);
    const [remove, setRemove] = useState();
    const HTTP = async () => {
        const res = await fetch("https://reqres.in/api/users/");
        const json = await res.json();
        setUsers(json.data);
    };
    const handleEditReq = async (user) => {
        fetch("https://reqres.in/api/users", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    name: user.first_name,
                    job: user.email
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
    useEffect(() => {
        HTTP()
    }, [])



    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '10px' }}>User List</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th> Email</th>
                        <th>Avatar</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>
                                        <strong>{user.first_name}</strong>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <img key={user.avatar} src={user.avatar} style={{ borderRadius: '50%' }} alt='' />
                                    </td>
                                    <td>
                                        <Button variant="info" onCLick={() => handleEditReq(user)}>Edit</Button>
                                        &nbsp;<Button variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </Table>
        </div>

    )
}