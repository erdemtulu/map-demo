
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import HomePage from './HomePage';
import store from '../store/store';
import axios from 'axios';
import mockAxios from 'jest-mock-axios';

describe('HomePage', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });


    test('renders the map, and controls', async () => {
        const mockData = {
            data: {
                features: [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                4.431185541607231,
                                52.03791712663947
                            ]
                        },
                        "properties": {
                            "id": 827,
                            "name": "Point 827"
                        }
                    },
                ],
            },
        };

        mockAxios.get.mockResolvedValue(mockData);

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));

        expect(screen.getByTestId('map')).toBeInTheDocument();
        expect(screen.getByTestId('fullscreen-control')).toBeInTheDocument();
        expect(screen.getByTestId('navigation-control')).toBeInTheDocument();
        expect(screen.getByTestId('scale-control')).toBeInTheDocument();
    });

});
