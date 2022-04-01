import React from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'
import { useGetUserQuery } from '../api/apiSlice'

export const UserPage = () => {
    const { userId } = useParams()
    const { data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserQuery(userId)

    let content

    console.log("user: ", useGetUserQuery(userId))
    if (isLoading) {
        content = <Spinner text='loading...' />
    } else if (isSuccess) {
        content = (<section>
            <h2>{user.name}</h2>

            {/* <ul>{postTitles}</ul> */}
        </section>)
    } else if (isError) {
        content = <div>{error}</div>
    }
    return (
        { content }
    )
}