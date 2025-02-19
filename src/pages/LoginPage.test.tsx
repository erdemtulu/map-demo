

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authState } from "../store/auth-state";
import LoginPage from "./LoginPage";


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
});
