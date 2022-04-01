import React, { useState } from 'react'
import { useAddPostMutation, useGetUsersQuery } from '../api/apiSlice'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [userId, setUserId] = useState('');

    const [addPost, { isLoading }] = useAddPostMutation()

    const {data: users} = useGetUsersQuery()

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setBody(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)

    const canSave = [title, body, userId].every(Boolean) && !isLoading

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await addPost({ title, body, userId: Number(userId) }).unwrap()
                setTitle('')
                setBody('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post: ', err)
            }
        }
    }

    const usersOptions = users?.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section className='posts'>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    placeholder="What's on your mind?"
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={body}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
                    Save Post
                </button>
            </form>
        </section>
    )
}
