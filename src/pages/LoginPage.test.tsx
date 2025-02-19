

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authState } from "../store/auth-state";
import LoginPage from "./LoginPage";
import mockAxios from 'jest-mock-axios';

const store = configureStore({
    reducer: {
        auth: authState.reducer,
    },
});

jest.mock('react-router', () => ({
    useNavigate: jest.fn(),
}));

describe("LoginPage", () => {
    const mockNavigate = jest.fn();
    afterEach(() => {
        mockAxios.reset();
    });
    beforeEach(() => {
        require('react-router').useNavigate.mockImplementation(() => mockNavigate);
    });

    test("renders login form", () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });


    test("displays an error message for empty credentials", async () => {
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => screen.getByText(/empty credentials/i));

        expect(screen.getByText(/empty credentials/i)).toBeInTheDocument();
    });


    test('submits login form successfully', async () => {
        const mockSuccessResponse = {
            data: { accessToken: 'mockAccessToken' }
        };

        mockAxios.post.mockResolvedValue(mockSuccessResponse);


        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => expect(mockAxios.post).toHaveBeenCalledTimes(1));

        expect(mockAxios.post).toHaveBeenCalledWith(
            'login',
            { username: 'testuser', password: 'password' }
        );

    });



    test('displays error message on login failure', async () => {
        const mockErrorResponse = 'Invalid credentials';

        mockAxios.post.mockRejectedValueOnce({
            message: mockErrorResponse,
        });

        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );


        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument());
    });
});


