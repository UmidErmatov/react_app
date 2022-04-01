import React from 'react'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'

export const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let content

    if (isLoading) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        const renderedUsers = users.map(user => (
            <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
        ))
        content = renderedUsers
    } else if (isError) {
        content = <div>{error}</div>
    }


    return (
        <section>
            <h2>Users</h2>

            <ul>{content}</ul>
        </section>
    )
}