import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Sidebar } from '../components/layout/sidebar';
import { Keys } from '../constants';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
  useProjectValues: jest.fn(() => ({
    setProjects: jest.fn(),
    projects: [
      {
        name: 'THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
      },
    ],
  })),
}));

describe('<Sidebar />', () => {
  describe('Success', () => {
    it('renders the <Sidebar />', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();
    });

    it('changes the active project to inbox in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();
      fireEvent.click(queryByTestId('inbox-action'));
      fireEvent.keyDown(queryByTestId('inbox-action'), Keys.a);
      fireEvent.keyDown(queryByTestId('inbox-action'), Keys.Enter);

      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    });

    it('changes the active project to today in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();
      fireEvent.click(queryByTestId('today-action'));
      fireEvent.click(queryByTestId('inbox-action'));
      fireEvent.keyDown(queryByTestId('today-action'), Keys.a);

      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('today-action'), Keys.Enter);

      expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    });

    it('changes the active project to next_7 in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();
      fireEvent.click(queryByTestId('next_7-action'));
      fireEvent.click(queryByTestId('inbox-action'));
      fireEvent.keyDown(queryByTestId('next_7-action'), Keys.a);

      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('next_7-action'), Keys.Enter);
      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
    });

    it('hides and shows the sidebar projects using onClick', () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      fireEvent.click(getByText('Projects'));
      expect(queryByText('Add Project')).toBeFalsy();

      fireEvent.click(getByText('Projects'));
      expect(queryByText('Add Project')).toBeTruthy();
    });

    it('hides and shows the sidebar projects using onKeyDown', () => {
      const { queryByTestId, queryByText, getByText } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();

      fireEvent.keyDown(getByText('Projects'), Keys.a);
      expect(queryByText('Add Project')).toBeTruthy();

      fireEvent.keyDown(getByText('Projects'), Keys.Enter);
      expect(queryByText('Add Project')).toBeFalsy();

      fireEvent.keyDown(getByText('Projects'), Keys.a);
      expect(queryByText('Add Project')).toBeFalsy();

      fireEvent.keyDown(getByText('Projects'), Keys.Enter);
      expect(queryByText('Add Project')).toBeTruthy();
    });
  });
});
