import React from 'react';
import {render, waitFor, screen, fireEvent} from '@testing-library/react';
import AuthProvider, {AuthContext} from "./AuthProvider";
import authApi from "./authApi";
import {BrowserRouter} from "react-router-dom";
import {unmountComponentAtNode} from "react-dom";
import localStorageAdapter from "../../adapters/localStorageAdapter";

const TEST_USER = {
  id: 1,
  username: 'test-user'
};
const LOGIN_BTN_TEXT = 'Login';

let container = null
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('<AuthProvider />', () => {
  const TestComponent = () => {
    const {user, logout} =
        React.useContext(AuthContext);
    return (
        <div>
          {user && (
              <>
                  <div data-testid="user">{user.username}</div>
                  <button onClick={logout}>logout</button>
              </>
          )}
        </div>
    );
  };

  test('userId in localstorage', async () => {
      jest.spyOn(localStorageAdapter, 'getItem').mockImplementation(() => TEST_USER.id)
      jest.spyOn(authApi, 'getUserById').mockImplementation(() =>
          Promise.resolve({
              data: TEST_USER
          }),
      );

      render(
          <BrowserRouter>
              <AuthProvider>
                  <TestComponent/>
              </AuthProvider>
          </BrowserRouter>,
      );



      expect(screen.queryByTestId('loading')).toBeInTheDocument();
      expect(screen.queryByTestId('user')).not.toBeInTheDocument();
      expect(localStorageAdapter.getItem).toBeCalledTimes(1);

      await waitFor(() => {
          expect(screen.getByTestId('user').textContent).toBe(TEST_USER.username);
      });
  });

  test('no userId in localStorage login flow', async () => {
      jest.spyOn(localStorageAdapter, 'getItem').mockImplementation(() => null);
      jest.spyOn(localStorageAdapter, 'setItem');
      jest.spyOn(localStorageAdapter, 'removeItem');
      jest.spyOn(authApi, 'getUserById').mockImplementation(() =>
          Promise.resolve({
              data: null
          }),
      );
      jest.spyOn(authApi, 'login').mockImplementation(() =>
          Promise.resolve({
              data: TEST_USER
          }),
      );

      render(
          <BrowserRouter>
              <AuthProvider>
                  <TestComponent/>
              </AuthProvider>
          </BrowserRouter>,
      );

      expect(screen.queryByTestId('user')).not.toBeInTheDocument();
      expect(localStorageAdapter.getItem).toBeCalledTimes(1);

      await waitFor(() => {
          expect(screen.getByTestId('login-btn')).toBeInTheDocument();
      });

      const input = screen.getByTestId('login-input').querySelector('input')
      fireEvent.change(input, {target: {value: TEST_USER.username}})
      expect(input.value).toBe(TEST_USER.username)

      fireEvent.click(screen.getByTestId('login-btn'))

      await waitFor(() => {
          expect(screen.getByTestId('user').textContent).toBe(TEST_USER.username);
      });

      expect(localStorageAdapter.setItem).toBeCalledTimes(1);
  });

})