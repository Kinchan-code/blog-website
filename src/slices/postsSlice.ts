import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabase';

export type Post = {
  id: string;
  title: string;
  content: string;
  author_id?: string;
  author_email?: string;
  created_at: string;
};

type PostsState = {
  posts: Post[];
  userPosts: Post[];
  loading: boolean;
  userPostsLoading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  userPosts: [],
  loading: false,
  userPostsLoading: false,
  error: null,
};

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return thunkAPI.rejectWithValue(error.message);
    return data as Post[];
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post: { title: string; content: string }, thunkAPI) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return thunkAPI.rejectWithValue('No authenticated user');

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: post.title,
        content: post.content,
        author_id: user.id,
        author_email: user.email,
      })
      .select() // Returns the created row
      .single();

    if (error) return thunkAPI.rejectWithValue(error.message);
    return data as Post;
  }
);

// Async thunk to fetch posts by user ID
export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: string, thunkAPI) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', userId)
      .order('created_at', { ascending: false });

    if (error) return thunkAPI.rejectWithValue(error.message);
    return data as Post[];
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Optionally add sync reducers (e.g. clearPosts, addPostLocally)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) || 'Something went wrong';
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        // Prepend the new post (or push, depending on your ordering preference)
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) || 'Failed to create post';
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPostsLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.userPostsLoading = false;
          state.userPosts = action.payload;
        }
      )
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.userPostsLoading = false;
        state.error =
          (action.payload as string | undefined) ||
          'Failed to fetch user posts';
      });
  },
});

export default postsSlice.reducer;
