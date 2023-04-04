import React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import WSConnectionProvider from './index';
import { WS } from 'jest-websocket-mock';

let ws;
beforeEach(() => {
    ws = new WS(process.env.REACT_APP_WS_URL);
    console.log('beforeEach')
});
afterEach(() => {
    WS.clean();
});

describe('WSConnectionProvider', () => {
    it('should render children', () => {
        render(
            <WSConnectionProvider>
                <div>Child Component</div>
            </WSConnectionProvider>
        );

        expect(screen.getByText('Child Component')).toBeInTheDocument();
    });

    it('should connect to WebSocket and show toast on message event', async () => {
        render(
            <WSConnectionProvider>
                <div>Child Component</div>
            </WSConnectionProvider>
        );
        await ws.connected;

        const messageData = {
            x: {
                hash: 'hashValue',
                size: 10,
                inputs: [{}, {}],
                out: [{}, {}, {}],
            },
        };
        ws.send(JSON.stringify(messageData));

        await waitFor(() => {
            expect(screen.getByText(/hashValue/i)).toBeTruthy();
        });
        expect(screen.getByText(/hashValue/i)).toHaveTextContent(
            JSON.stringify({
                hash: messageData.x.hash,
                size: messageData.x.size,
                inputs: messageData.x.inputs.length,
                out: messageData.x.out.length,
            })
        );
    });
});
