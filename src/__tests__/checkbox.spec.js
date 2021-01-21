import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/checkbox';
import { firebase } from '../firebase';
afterEach(() => {
  cleanup();
  jest.spyOn(firebase, 'firestore').mockRestore();
}); // clean the DOM!

beforeEach(() => {
  jest.spyOn(firebase, 'firestore').mockImplementation(() => ({
    collection: jest.fn(() => ({
      doc: () => ({
        update: () => null,
      }),
    })),
  }));
});

describe('<Checkbox />', () => {
  it('renders the task checkbox', () => {
    const { queryByTestId } = render(
      <Checkbox id="1" taskDesc="Finish this tutorial series!" />
    );
    expect(queryByTestId('checkbox-action')).toBeTruthy();
  });

  it('renders the task checkbox and accepts a onClick', () => {
    const { queryByTestId } = render(
      <Checkbox id="1" taskDesc="Finish this tutorial series!" />
    );
    expect(queryByTestId('checkbox-action')).toBeTruthy();
    fireEvent.click(queryByTestId('checkbox-action'));
    expect(firebase.firestore).toHaveBeenCalled();
  });

  it('renders the task checkbox and accepts a onKeyDown', () => {
    const { queryByTestId } = render(
      <Checkbox id="1" taskDesc="Finish this tutorial series!" />
    );
    expect(queryByTestId('checkbox-action')).toBeTruthy();
    fireEvent.keyDown(queryByTestId('checkbox-action'), {
      key: 'a',
      code: 65,
    });
    expect(firebase.firestore).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(queryByTestId('checkbox-action'), {
      key: 'Enter',
      code: 13,
    });
    expect(firebase.firestore).toHaveBeenCalled();
  });
});
