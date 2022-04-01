import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
// import TimeAgo from './TimeAgo';
// import { ReactionButtons } from './ReactionButtons';
import { Spinner } from '../../components/Spinner';
import { useGetPostQuery } from '../api/apiSlice';

export const SinglePostPage = () => {
    const { postId } = useParams()
    const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

    let content

    if (isFetching) {
        content = <Spinner text='Loading...' />
    } else if (isSuccess) {
        content = (
            <article className="post">
                <h2>{post.title}</h2>
                <div>
                    <PostAuthor userId={post.user} />
                    {/* <TimeAgo timestamp={post.date} /> */}
                </div>
                <p className="post-content">{post.content}</p>
                {/* <ReactionButtons post={post} /> */}
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
            </article>
        )
    }

    return (
        <section>
            {content}
        </section>
    );
}
