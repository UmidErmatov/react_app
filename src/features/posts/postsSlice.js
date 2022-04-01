import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "../../api/services";

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const response = await services.getAll('posts')
    return response.data
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost) => {
        const response = await services.post('posts', initialPost)
        return response.data
    }
)

export const postUpdater = (state, action) => {
    const { id, title, content } = action.payload
    const existingPost = state.posts.find(post => post.id === id)
    if (existingPost) {
        console.log("existingPost: ", existingPost);
        existingPost.title = title
        existingPost.body = content
    }
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        reactionAdder(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { reactionAdder } = postsSlice.actions
export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === Number(postId))

export default postsSlice.reducer