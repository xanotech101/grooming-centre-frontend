import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { AppProvider } from '../../../../contexts';
import { render } from '../../../../utils';
import UpdateDetailsPage from './UpdateDetailsPage';

describe('UpdateDetailsPage', () => {
  it('handles input validation', async () => {
    render(
      () => (
        <AppProvider>
          <UpdateDetailsPage />
        </AppProvider>
      ),
      { wrapWithRouter: true }
    );

    const submitButton = screen.getByTestId('submit');
    user.click(submitButton);

    let errorMessages = await screen.findAllByText(/is required/i);
    expect(errorMessages.length).toBe(5);

    const allInputs = screen.getAllByTestId('input');
    expect(allInputs.length).toBe(6);

    allInputs.forEach((input) => user.type(input, 'test'));
    screen.debug();
    user.click(submitButton);
  });
});
