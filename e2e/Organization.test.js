import { device, element, by, expect } from 'detox';

describe('Organization Component', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display organizations', async () => {
    await expect(element(by.text('Organizations:'))).toBeVisible();

    await element(by.id('orgDisplayName_0')).scrollTo('bottom');

    await expect(element(by.text('Organization Name 1'))).toBeVisible();
    await expect(element(by.text('Organization Name 2'))).toBeVisible();
  });

  it('should add a new organization', async () => {
    await element(by.text('Add new')).tap();

    await element(by.id('orgFormInput')).typeText('New Organization');
    await element(by.text('Submit')).tap();

    await expect(element(by.text('New Organization'))).toBeVisible();
  });

});
