import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

describe('Table', () => {
    const title = 'Test Title';
    const data = [['Key1', 'Value1'], ['Key2', 'Value2']];
    const headers = ['Header1', 'Header2'];

    it('renders correctly', () => {
        render(<Table title={title} data={data} headers={headers} />);
        expect(screen.getByTestId('table-title').textContent).toBe(title);

        expect(screen.getByTestId(`col1_${headers[0]}`).textContent).toBe(headers[0] + ' : ');
        expect(screen.getByTestId(`col2_${headers[1]}`).textContent).toBe(headers[1]);

        data.forEach(([key, value]) => {
            expect(screen.getByTestId(`col1_${key}`).textContent).toBe(key + ' : ');
            expect(screen.getByTestId(`col2_${value}`).textContent).toBe(value);
        })
    });
});
