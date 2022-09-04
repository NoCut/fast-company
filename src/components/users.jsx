import React, { useState } from "react";
import api from "../API";

const Users = () => {
    let [users, setUsers] = useState(api.users.fetchAll());
    let [userCount, setUserCount] = useState(users.length);

    const counter = () => {
        return (userCount !== 0 
            ? <h1 key={ userCount } className="badge bg-primary fs-1">{ userCount } человек с тобой тусанет</h1>
            : <h1 className="badge bg-warning fs-1">Сегодня с тобой ни кто не тусанет</h1>
        )
    };

    const hadlerDeleteUser = (id) => {
        setUsers(prevState => prevState.filter(users => users._id !== id));
        setUserCount(prevState => prevState - 1);
    };

    const getUserList = () => {
        return users.map(user => (  
            <tr key={ user._id }>
                <td>{ user.name }</td>
                <td>{ user.qualities.map(qualitie => (
                    <span key={ qualitie._id } className={ "badge m-2 bg-" + qualitie.color }>{ qualitie.name }</span>
                )) }</td>
                <td>{ user.profession.name }</td>
                <td>{ user.completedMeetings }</td>
                <td>{ user.rate + '/5' }</td>
                <td><button className="btn btn-danger" onClick={() => hadlerDeleteUser(user._id)}>delete</button></td>
            </tr>
        ))
    };

    return (
    <>
        { counter() }
        <table className="table">
            <thead>
                <tr>
                    <th scope='col'>Имя</th>
                    <th scope='col'>Качества</th>
                    <th scope='col'>Профессия</th>
                    <th scope='col'>Встретился, раз</th>
                    <th scope='col'>Оценка</th>
                    <th scope='col'></th>
                </tr>
                
            </thead>
            <tbody>
                { getUserList() }
            </tbody>
        </table>
    </>
    );
}

export default Users;