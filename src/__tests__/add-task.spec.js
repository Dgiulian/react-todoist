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
afterEach(() => {
  cleanup();
  jest.spyOn(firebase, 'firestore').mockRestore();
}); // clean the DOM!

beforeEach(() => {
  jest.spyOn(firebase, 'firestore').mockImplementation(() => ({
    collection: jest.fn(() => ({
      add: jest.fn(() => Promise.resolve('')),
    })),
  }));
});
jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectValues: jest.fn(() => ({ projects: [] })),
}));
describe('<AddTask />', () => {
  it('renders the <Add Task />', () => {
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={true}
        shouldShowMain={false}
        showQuickAddTask={false}
        setShowQuickAddTask={() => {}}
      />
    );
    expect(queryByTestId('add-task-comp')).toBeTruthy();
  });
  it('renders the <Add Task /> quick overlay', () => {
    const setShowQuickAddTask = jest.fn();

    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain
        shouldShowMain={false}
        showQuickAddTask
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );

    expect(queryByTestId('quick-add-task')).toBeTruthy();
  });
  it('renders the <Add Task /> main when clicked', () => {
    const setShowQuickAddTask = jest.fn();
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain={true}
        shouldShowMain={false}
        showQuickAddTask={false}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();
  });
  it('renders the <AddTask /> project overlay when using onClick', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('show-project-overlay'));
    expect(queryByTestId('project-overlay')).toBeTruthy();
  });
  it('renders the <AddTask /> project overlay when using onKeyDown', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);

    fireEvent.keyDown(queryByTestId('show-main-action'), Keys.a);
    expect(queryByTestId('add-task-main')).toBeFalsy();

    fireEvent.keyDown(queryByTestId('show-main-action'), Keys.Enter);
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('show-project-overlay'), Keys.a);
    expect(queryByTestId('project-overlay')).toBeFalsy();

    fireEvent.keyDown(queryByTestId('show-project-overlay'), Keys.Enter);
    expect(queryByTestId('project-overlay')).toBeTruthy();
  });
  it('renders the <AddTask /> task date overlay when using onClick', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();
  });
  it('renders the <AddTask /> task date overlay when using onKeyDown', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);

    fireEvent.keyDown(queryByTestId('show-main-action'), Keys.a);
    expect(queryByTestId('add-task-main')).toBeFalsy();

    fireEvent.keyDown(queryByTestId('show-main-action'), Keys.Enter);
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('show-task-date-overlay'), Keys.a);
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.keyDown(queryByTestId('show-task-date-overlay'), Keys.Enter);
    expect(queryByTestId('task-date-overlay')).toBeTruthy();
  });
  it('hides the <AddTask /> main when cancel is clicked using onClick', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('add-task-main-cancel'));
    expect(queryByTestId('add-task-main')).toBeFalsy();
  });
  it('hides the <AddTask /> main when cancel is clicked using onKeyDown', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);

    fireEvent.keyDown(queryByTestId('show-main-action'), Keys.a);
    expect(queryByTestId('add-task-main')).toBeFalsy();

    fireEvent.keyDown(queryByTestId('show-main-action'), Keys.Enter);
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('add-task-main-cancel'), Keys.a);
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('add-task-main-cancel'), Keys.Enter);
    expect(queryByTestId('add-task-main')).toBeFalsy();
  });
  it('renders <AddTask /> for quick add task and then clicks cancel using onClick', () => {
    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
    const { queryByTestId } = render(
      <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
    );

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('add-task-quick-cancel'));
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });
  it('renders <AddTask /> for quick add task and then clicks cancel using onKeyDown', () => {
    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
    const { queryByTestId } = render(
      <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
    );
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), Keys.a);
    expect(setShowQuickAddTask).not.toHaveBeenCalled();

    fireEvent.keyDown(queryByTestId('add-task-quick-cancel'), Keys.Enter);
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });
  it('renders <AddTask /> and adds a task to TODAY', async () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'TODAY',
    }));

    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
    const { queryByTestId, queryByText } = render(
      <AddTask
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'I am a new task and I am amazing!' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'I am a new task and I am amazing!'
    );

    fireEvent.click(queryByTestId('add-task'));
    await waitFor(() =>
      expect(queryByText('I am a new task and I am amazing!')).toBeNull()
    );
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });
  it('renders <AddTask /> and adds a task to NEXT_7', async () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'NEXT_7',
    }));

    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
    const { queryByTestId, queryByText } = render(
      <AddTask
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'I am a new task and I am amazing!' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'I am a new task and I am amazing!'
    );

    fireEvent.keyDown(queryByTestId('add-task'), Keys.Enter);
    await waitFor(() =>
      expect(queryByText('I am a new task and I am amazing!')).toBeNull()
    );
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });
  it('renders <AddTask /> and adds a task with a task date of TODAY', async () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId, queryByText } = render(<AddTask showMain />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'I am the most amazing task ever!' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'I am the most amazing task ever!'
    );

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.click(queryByTestId('task-date-today'));
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('task-date-today'), Keys.a);
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('task-date-today'), Keys.Enter);
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('add-task'));
    await waitFor(() =>
      expect(queryByText('I am a new task and I am amazing!')).toBeNull()
    );
  });
  it('renders <AddTask /> and adds a task with a task date of TOMORROW', async () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId, queryByText } = render(<AddTask showMain />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'I am the most amazing task ever!' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'I am the most amazing task ever!'
    );

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.click(queryByTestId('task-date-tomorrow'));
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('task-date-tomorrow'), Keys.a);
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('task-date-tomorrow'), Keys.Enter);
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('add-task'));
    await waitFor(() =>
      expect(queryByText('I am a new task and I am amazing!')).toBeNull()
    );
  });
  it('renders <AddTask /> and adds a task with a task date of NEXT_7', async () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
    }));

    const { queryByTestId, queryByText } = render(<AddTask showMain />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'I am the most amazing task ever!' },
    });
    expect(queryByTestId('add-task-content').value).toBe(
      'I am the most amazing task ever!'
    );

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.click(queryByTestId('task-date-next-week'));
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('task-date-next-week'), Keys.a);
    expect(queryByTestId('task-date-overlay')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('task-date-next-week'), Keys.Enter);
    expect(queryByTestId('task-date-overlay')).toBeFalsy();

    fireEvent.click(queryByTestId('add-task'));
    await waitFor(() =>
      expect(queryByText('I am a new task and I am amazing!')).toBeNull()
    );
  });
});
