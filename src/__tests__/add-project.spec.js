import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  queryByText,
} from '@testing-library/react';
import { AddProject } from '../components/add-project';
import { Keys } from '../constants';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectValues: jest.fn(() => ({
    projects: [
      {
        name: '­THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
      },
      {
        name: '­DAILY',
        projectId: '2',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'daily-office',
      },
      {
        name: '­FUTURE',
        projectId: '3',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'wake-up',
      },
      {
        name: 'WORDS',
        projectId: '4',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'arcade-fire',
      },
      {
        name: 'MUSIC',
        projectId: '5',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'bella-ciao',
      },
    ],
    setProjects: jest.fn(),
  })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('I am resolved!')),
      })),
    })),
  },
}));

beforeEach(cleanup);

describe('<AddProject />', () => {
  describe('Success', () => {
    it('renders <AddProject />', () => {
      const { queryByTestId } = render(<AddProject />);
      expect(queryByTestId('add-project')).toBeTruthy();
    });

    it('renders <AddProject /> and adds a project using onClick', async () => {
      const { queryByTestId, queryByText } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project in the world!' },
      });
      expect(queryByTestId('project-name').value).toBe(
        'Best project in the world!'
      );
      fireEvent.click(queryByTestId('add-project-submit'));
      await waitFor(() =>
        expect(queryByText('Best project in the world!')).toBeNull()
      );
    });
    it('renders <AddProject /> and adds a project using onKeyDown', async () => {
      const { queryByTestId, queryByText } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project in the world!' },
      });
      expect(queryByTestId('project-name').value).toBe(
        'Best project in the world!'
      );
      fireEvent.keyDown(queryByTestId('add-project-submit'), Keys.Enter);
      await waitFor(() =>
        expect(queryByText('Best project in the world!')).toBeNull()
      );
    });

    it('hides the project overlay when cancelled using onClick', () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.click(getByText('Cancel'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay when cancelled onKeyDown', () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(getByText('Cancel'), Keys.a);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(getByText('Cancel'), Keys.Enter);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay using onClick singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay using onKeyDown singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-project-action'), Keys.a);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-project-action'), Keys.Enter);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });
  });
});
