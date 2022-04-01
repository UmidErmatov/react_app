import React from 'react'
import { useGetUsersQuery } from '../api/apiSlice'

export const PostAuthor = ({ userId }) => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()
    const author = users?.find(user => user.id === userId)

    return <span>by {author ? author.name : 'Unknown author'}</span>
}