import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AccountMenu from './AccountMenu';
import userEvent from '@testing-library/user-event';

describe('AccountMenu', () => {
    const mockLogOut = jest.fn();
    beforeEach(() => {
        mockLogOut.mockClear();
    });

    test('renders the avatar and menu button', () => {
        render(<AccountMenu onLogOut={mockLogOut} />);

        const avatar = screen.getByRole('button');
        expect(avatar).toBeInTheDocument();
    });

    test('opens the menu when the avatar is clicked', () => {
        render(<AccountMenu onLogOut={mockLogOut} />);

        const avatar = screen.getByRole('button');
        userEvent.click(avatar);

        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();
    });

    test('closes the menu when clicking a menu item', async () => {
        render(<AccountMenu onLogOut={mockLogOut} />);

        const avatar = screen.getByRole('button');
        userEvent.click(avatar);

        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();

        const accountSettingsMenuItem = screen.getByText('Account Settings');

        fireEvent.click(accountSettingsMenuItem)

        await waitFor(() => {
            expect(menu).not.toBeInTheDocument();
        });
    });

    test('calls onLogOut when clicking the Logout menu item', () => {
        render(<AccountMenu onLogOut={mockLogOut} />);

        const avatar = screen.getByRole('button');
        userEvent.click(avatar);

        const logoutMenuItem = screen.getByText('Logout');
        userEvent.click(logoutMenuItem);

        expect(mockLogOut).toHaveBeenCalledTimes(1);
    });

    test('does not call onLogOut when clicking Profile or Account Settings', () => {
        render(<AccountMenu onLogOut={mockLogOut} />);

        const avatar = screen.getByRole('button');
        userEvent.click(avatar);

        const profileMenuItem = screen.getByText('Profile');
        userEvent.click(profileMenuItem);

        expect(mockLogOut).not.toHaveBeenCalled();

        const accountSettingsMenuItem = screen.getByText('Account Settings');
        userEvent.click(accountSettingsMenuItem);

        expect(mockLogOut).not.toHaveBeenCalled();
    });
});
