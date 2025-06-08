import { api } from "@/utils/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URLS } from "./constants";
import {
  DecodedToken,
  LoginResponse,
  LoginSchemaType,
  RegisterResponse,
  RegisterSchemaType,
} from "./types";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      // Clear cookie
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

const authApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginSchemaType>({
      query: (body) => ({ url: URLS.login, method: "POST", body }),
      async onQueryStarted(_queryArgument, { dispatch, queryFulfilled }) {
        const {
          data: { access_token },
        } = await queryFulfilled;
        const decoded = jwtDecode<DecodedToken>(access_token);

        // Set token in cookie and state
        document.cookie = `token=${access_token}; path=/`;

        dispatch(
          setCredentials({
            user: {
              id: decoded.sub,
              firstName: decoded.firstName,
              lastName: decoded.lastName,
              email: decoded.email,
            },
            token: access_token,
          })
        );
      },
    }),
    register: build.mutation<RegisterResponse, RegisterSchemaType>({
      query: (body) => ({ url: URLS.register, method: "POST", body }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { access_token },
          } = await queryFulfilled;
          const decoded = jwtDecode<DecodedToken>(access_token);

          // Set token in cookie and state
          document.cookie = `token=${access_token}; path=/`;

          dispatch(
            setCredentials({
              user: {
                id: decoded.sub,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                email: decoded.email,
              },
              token: access_token,
            })
          );
        } catch {}
      },
    }),
  }),
  overrideExisting: true,
});

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
// export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
// export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
// export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const { setCredentials, setLoading, setError, logout } =
  authSlice.actions;
export default authSlice.reducer;

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
