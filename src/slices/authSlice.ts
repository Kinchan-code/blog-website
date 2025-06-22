import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabase';

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk for sign in
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) return thunkAPI.rejectWithValue(error.message);
    if (!data.user) return thunkAPI.rejectWithValue('No user returned');
    return { id: data.user.id, email: data.user.email } as AuthUser;
  }
);

// Async thunk for sign up
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) return thunkAPI.rejectWithValue(error.message);
    if (!data.user) return thunkAPI.rejectWithValue('No user returned');
    return { id: data.user.id, email: data.user.email } as AuthUser;
  }
);

// Async thunk for sign out
export const signOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  const { error } = await supabase.auth.signOut();
  if (error) return thunkAPI.rejectWithValue(error.message);
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to sign in';
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to sign up';
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to sign out';
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
