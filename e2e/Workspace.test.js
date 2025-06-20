import { device, element, by, expect } from 'detox';

describe('WorkSpace Component', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display boards', async () => {
    await expect(element(by.text('Workspace'))).toBeVisible();

    await expect(element(by.text('Board Name 1'))).toBeVisible();
    await expect(element(by.text('Board Name 2'))).toBeVisible();
  });

  it('should add a new board', async () => {
    await element(by.text('Add Board')).tap();

    await element(by.id('boardNameInput')).typeText('New Board');
    await element(by.text('Add Board')).tap();

    await expect(element(by.text('New Board'))).toBeVisible();
  });

  it('should update a board name', async () => {
    await element(by.text('Update')).atIndex(0).tap();

    await element(by.id('boardNameInput')).typeText(' Updated');

    await element(by.text('Save')).tap();

    await expect(element(by.text('Board Name 1 Updated'))).toBeVisible();
  });

  it('should delete a board', async () => {
    await element(by.text('Delete')).atIndex(0).tap();

    await expect(element(by.text('Board Name 1'))).not.toBeVisible();
  });

});
