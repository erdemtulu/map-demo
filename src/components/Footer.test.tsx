import { render, screen } from '@testing-library/react';
import Footer from './Footer'; 
import '@testing-library/jest-dom'; 

describe('Footer', () => {
    test('renders Footer component', () => {
        render(<Footer />);

        const footerText = screen.getByText('map-demo');
        expect(footerText).toBeInTheDocument();
    });

    test('renders privacy policy, terms, help center, and contact us links', () => {
        render(<Footer />);

        const privacyPolicyLink = screen.getByText('Privacy Policy');
        const termsLink = screen.getByText('Terms & Conditions');
        const helpCenterLink = screen.getByText('Help Center');
        const contactUsLink = screen.getByText('Contact Us');

        expect(privacyPolicyLink).toBeInTheDocument();
        expect(termsLink).toBeInTheDocument();
        expect(helpCenterLink).toBeInTheDocument();
        expect(contactUsLink).toBeInTheDocument();
    });

    test('renders Follow Us section and social media links', () => {
        render(<Footer />);

        const followUsText = screen.getByText('Follow Us');
        expect(followUsText).toBeInTheDocument();

        const facebookLink = screen.getByText('Facebook');
        const twitterLink = screen.getByText('Twitter');
        const linkedinLink = screen.getByText('LinkedIn');

        expect(facebookLink).toBeInTheDocument();
        expect(twitterLink).toBeInTheDocument();
        expect(linkedinLink).toBeInTheDocument();
    });

    test('links have correct href attributes', () => {
        render(<Footer />);

        const privacyPolicyLink = screen.getByText('Privacy Policy');
        const termsLink = screen.getByText('Terms & Conditions');
        const helpCenterLink = screen.getByText('Help Center');
        const contactUsLink = screen.getByText('Contact Us');

        expect(privacyPolicyLink).toHaveAttribute('href', '#');
        expect(termsLink).toHaveAttribute('href', '#');
        expect(helpCenterLink).toHaveAttribute('href', '#');
        expect(contactUsLink).toHaveAttribute('href', '#');

        const facebookLink = screen.getByText('Facebook');
        const twitterLink = screen.getByText('Twitter');
        const linkedinLink = screen.getByText('LinkedIn');

        expect(facebookLink).toHaveAttribute('href', '#');
        expect(twitterLink).toHaveAttribute('href', '#');
        expect(linkedinLink).toHaveAttribute('href', '#');
    });

    test('Footer has correct background color and text color', () => {
        render(<Footer />);

        const footer = screen.getByText('map-demo').closest('div'); 
        expect(footer).toHaveStyle('background-color: #333');
        expect(footer).toHaveStyle('color: white');
    });

    test('Footer has fixed position at the bottom', () => {
        render(<Footer />);

        const footer = screen.getByText('map-demo').closest('div'); 
        expect(footer).toHaveStyle('position: fixed');
        expect(footer).toHaveStyle('bottom: 0');
        expect(footer).toHaveStyle('width: 100%');
    });
});
