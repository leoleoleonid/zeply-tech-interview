import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SubscribedAddressesProvider, { SubscribedAddressesContext } from './SubscribedAddressProvider';
import subscribedAddressApi from './subscribedAddressApi';
import {WSConnectionContext} from "../WSConnectionProvider";

const wsMock = {
    send: (data) => console.log(data)
}

describe('SubscribedAddressesProvider', () => {
    test('should fetch subscribed addresses on mount and add address', async () => {
        const addresses = ['address1', 'address2'];
        jest.spyOn(subscribedAddressApi, 'getSubscribedAddress').mockImplementation(() =>
            Promise.resolve({ data: addresses }),
        );
        jest.spyOn(subscribedAddressApi, 'subscribeOnAddress').mockImplementation(() =>
            Promise.resolve(),
        );
        jest.spyOn(wsMock, 'send');

        const { container } = render(
            <WSConnectionContext.Provider value={{ws: wsMock}}>
                <SubscribedAddressesProvider>
                    <SubscribedAddressesContext.Consumer>
                        {({ subscribedAddresses, addSubscribedAddress }) => (
                            <>
                                <div data-testid="subscribed-addresses">{subscribedAddresses.join(',')}</div>
                                <button onClick={() => addSubscribedAddress('newAddress')} data-testid="add-address-button">
                                    Add Address
                                </button>
                            </>
                        )}
                    </SubscribedAddressesContext.Consumer>
                </SubscribedAddressesProvider>
            </WSConnectionContext.Provider>
        );

        await waitFor(() => {
            expect(subscribedAddressApi.getSubscribedAddress).toHaveBeenCalledTimes(1);
        });
        expect(subscribedAddressApi.subscribeOnAddress).not.toHaveBeenCalled();
        expect(wsMock.send).toHaveBeenCalledTimes(2);
        expect(screen.getByTestId('subscribed-addresses').textContent).toBe('address1,address2');

        fireEvent.click(screen.getByTestId('add-address-button'));

        await waitFor(() => {
            expect(subscribedAddressApi.subscribeOnAddress).toHaveBeenCalledTimes(1);
        });
        expect(wsMock.send).toHaveBeenCalledTimes(3);
        expect(screen.getByTestId('subscribed-addresses').textContent).toBe('address1,address2,newAddress');
    });
});
