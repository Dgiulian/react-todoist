import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';
afterEach(cleanup);
describe('<App />', () => {
  it('renders the application', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeTruthy();
  });
  it('renders the application in dark mode', () => {
    const { queryByTestId, debug } = render(<App darkModeDefault={false} />);
    expect(
      queryByTestId('application')?.classList.contains('darkmode')
    ).toBeFalsy();
    fireEvent.click(queryByTestId('dark-mode-action')!);
    expect(
      queryByTestId('application')?.classList.contains('darkmode')
    ).toBeTruthy();
  });
});
