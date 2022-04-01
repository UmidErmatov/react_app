import React from 'react'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { useGetPostsQuery } from '../api/apiSlice'
import classNames from 'classnames'
// import TimeAgo from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                {/* <TimeAgo timestamp={post.date} /> */}
            </div>
            <p className="post-content">{post.body.substring(0, 100)}</p>

            {/* <ReactionButtons post={post} /> */}
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    )
}

export const PostsList = () => {
    const {
        data: posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetPostsQuery()

    let content

    if (isLoading) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        // Sort posts in reverse chronological order by datetime string
        // const orderedPosts = posts
        //     .slice()
        //     .sort((a, b) => b.date.localeCompare(a.date))
        const containerClassname = classNames('post-container', { disabled: isFetching })
        const renderedPosts = posts.map((post) => (
            <PostExcerpt key={post.id} post={post} />
        ))
        content = <div className={containerClassname}>{renderedPosts}</div>
    } else if (isError) {
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            <button onClick={refetch}>Refetch Posts</button>
            {content}
        </section>
    )
}