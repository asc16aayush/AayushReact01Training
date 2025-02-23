import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  movies: any[];
  totalResults: number;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMovies(state, action: PayloadAction<any[]>) {
      state.movies = action.payload;
    },
    setTotalResults(state, action: PayloadAction<number>) {
      state.totalResults = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { getMovies, setTotalResults, setLoading, setError } = movieSlice.actions;

export default movieSlice.reducer;
