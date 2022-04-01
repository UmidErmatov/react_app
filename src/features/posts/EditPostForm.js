import React, { useState } from 'react'
import { useEditPostMutation, useGetPostQuery } from '../api/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { postUpdater, selectPostById } from './postsSlice'

export const EditPostForm = () => {
    const { postId } = useParams()
    const { data: post } = useGetPostQuery(postId)
    const [updatePost, { isLoading }] = useEditPostMutation()

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.body)

    const navigate = useNavigate()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            updatePost({ id: postId, title, content })
            navigate(-1)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <button type="button" onClick={onSavePostClicked}>
                Save Post
            </button>
        </section>
    )
}