import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';

import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { useLogin } from '@/features/auth/hooks/useLogin';

jest.mock('@/features/auth/hooks/useLogin');

const mockUseLogin = useLogin as jest.Mock;

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseLogin.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  it('renders email and password inputs with submit button', () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);

    expect(getByTestId('login-email-input')).toBeTruthy();
    expect(getByTestId('login-password-input')).toBeTruthy();
    expect(getByTestId('login-submit-button')).toBeTruthy();
  });

  it('shows validation errors when submitting empty form', async () => {
    const { getByTestId, findByText } = renderWithProviders(<LoginScreen />);

    fireEvent.changeText(getByTestId('login-email-input'), '');
    fireEvent.changeText(getByTestId('login-password-input'), '');

    fireEvent.press(getByTestId('login-submit-button'));

    expect(await findByText('auth.validation.emailInvalid')).toBeTruthy();
    expect(await findByText('auth.validation.passwordRequired')).toBeTruthy();
  });

  it('submits valid credentials', async () => {
    const mutateAsync = jest.fn().mockResolvedValue({});

    mockUseLogin.mockReturnValue({
      mutate: jest.fn(),
      mutateAsync,
      isPending: false,
    });

    const { getByTestId } = renderWithProviders(<LoginScreen />);

    fireEvent.changeText(
      getByTestId('login-email-input'),
      'jdouglas@example.com',
    );
    fireEvent.changeText(getByTestId('login-password-input'), '123123');

    await waitFor(() => {
      expect(getByTestId('login-submit-button')).not.toBeDisabled();
    });

    fireEvent.press(getByTestId('login-submit-button'));

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        email: 'jdouglas@example.com',
        password: '123123',
      });
    });
  });
});
