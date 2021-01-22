import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
  waitFor,
  act,
} from '@testing-library/react';
import { useSelectedProjectValue, useProjectValues } from '../context';
import { firebase } from '../firebase';
import { AddTask } from '../components/add-task';
import { ProjectOverlay } from '../components/project-overlay';
const Keys = {
  Enter: {
    key: 'Enter',
    code: 13,
  },
  a: {
    key: 'a',
    code: 65,
  },
};
jest.mock('../context', () => ({
  useProjectValues: jest.fn(() => ({
    projects: [
      {
        name: '­THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
      },
    ],
  })),
}));

afterEach(cleanup);

describe('<ProjectOverlay', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('renders the project overlay and calls setShowProjectOverlay using onClick', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setProject={setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />
      );

      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.click(queryByTestId('project-overlay-action'));
      expect(setProject).toHaveBeenCalled();
    });

    it('renders the project overlay and calls setShowProjectOverlay using onKeyDown', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setProject={setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />
      );

      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('project-overlay-action'), Keys.a);
      expect(setProject).not.toHaveBeenCalled();

      fireEvent.keyDown(queryByTestId('project-overlay-action'), Keys.Enter);
      expect(setProject).toHaveBeenCalled();
    });
  });

  describe('Failure', () => {
    it('does not render the project overlay with any projects', () => {
      useProjectValues.mockImplementation(() => ({
        projects: [],
      }));

      const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />);
      expect(queryByTestId('project-overlay')).toBeTruthy();
      expect(queryByTestId('project-overlay-action')).toBeFalsy();
    });
  });
});
