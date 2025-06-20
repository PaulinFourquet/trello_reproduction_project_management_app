import { device, element, by, expect } from 'detox';

describe('Board Component', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display lists and cards', async () => {
    // Assurez-vous que votre application a chargé le composant Board
    await expect(element(by.text('Create New List'))).toBeVisible();

    // Assurez-vous que certains éléments sont visibles
    await expect(element(by.text('List Name 1'))).toBeVisible();
    await expect(element(by.text('Card Name 1'))).toBeVisible();
  });

  it('should add a new list', async () => {
    // Appuyez sur le bouton "Create New List"
    await element(by.text('Create New List')).tap();

    // Remplissez le formulaire pour ajouter une nouvelle liste
    await element(by.id('listNameInput')).typeText('New List');
    await element(by.text('Submit')).tap();

    // Assurez-vous que la nouvelle liste est ajoutée à la liste
    await expect(element(by.text('New List'))).toBeVisible();
  });

  it('should add a new card to a list', async () => {
    // Appuyez sur le bouton "plus-circle" pour ajouter une nouvelle carte à la première liste
    await element(by.id('plusCircleButton_0')).tap();

    // Remplissez le formulaire pour ajouter une nouvelle carte
    await element(by.id('cardNameInput')).typeText('New Card');
    await element(by.id('cardDescriptionInput')).typeText('Description of new card');
    await element(by.text('Add Card')).tap();

    // Assurez-vous que la nouvelle carte est ajoutée à la liste
    await expect(element(by.text('New Card'))).toBeVisible();
  });

  it('should update a list name', async () => {
    // Appuyez sur le bouton "Edit" de la première liste
    await element(by.text('Edit')).atIndex(0).tap();

    // Modifiez le nom de la liste
    await element(by.id('listNameInput')).typeText(' Updated');

    // Appuyez sur le bouton "Update"
    await element(by.text('Update')).tap();

    // Assurez-vous que le nom de la liste est mis à jour
    await expect(element(by.text('List Name 1 Updated'))).toBeVisible();
  });

  it('should update a card name', async () => {
    // Appuyez sur le bouton "edit" de la première carte de la première liste
    await element(by.text('edit')).atIndex(0).tap();

    // Modifiez le nom de la carte
    await element(by.id('cardNameInput')).typeText(' Updated');

    // Appuyez sur le bouton "Update"
    await element(by.text('Update')).tap();

    // Assurez-vous que le nom de la carte est mis à jour
    await expect(element(by.text('Card Name 1 Updated'))).toBeVisible();
  });

  it('should delete a card', async () => {
    // Appuyez sur le bouton "delete" de la première carte de la première liste
    await element(by.text('delete')).atIndex(0).tap();

    // Assurez-vous que la carte est supprimée de la liste
    await expect(element(by.text('Card Name 1'))).not.toBeVisible();
  });

  it('should display member modal and update card members', async () => {
    // Appuyez sur le bouton "user-plus" de la première carte de la première liste
    await element(by.text('user-plus')).atIndex(0).tap();

    await expect(element(by.text('Add Member'))).toBeVisible();

    await element(by.text('Member Name')).tap();

    await element(by.text('Save')).tap();

    await expect(element(by.text('Member Name'))).toBeVisible();
  });

});
