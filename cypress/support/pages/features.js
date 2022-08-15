import DemoApp from "../pages/demo-app";

const app = new DemoApp();
const form = app.locationSearchModal;

export default class ContactFormFeatures {
  loadApp() {
    cy.visit("");
    app.header().should("have.text", app.headerText);
    app.toggleForm();
  }
  searchByZip(zipCode = "12345") {
    form.search(zipCode);
    form.getSearchInputValue().should("equal", zipCode);
  }
  searchByLocation(name = "Test User") {
    form.search(name);
  }
  chooseFirstSearchResult(searchQuery = "Scoreboard") {
    form.search(searchQuery);
    form.getSearchResults().contains(searchQuery).first().click();
  }
  fillNameOnContactForm(name = "Tester") {
    this.chooseFirstSearchResult();
    form.fillNameInput(name);
  }
  fillPhoneNumberOnContactForm(phoneNumber = "+14154154154") {
    this.chooseFirstSearchResult();
    form.fillPhoneNumberInput(phoneNumber);
  }
  fillMessageOnContactForm(message = "This is a test message") {
    this.chooseFirstSearchResult();
    form.fillMessageInput(message);
  }
  getContactForm() {
    return this.chooseFirstSearchResult();
  }
  submitInvalidForm() {
    this.getContactForm();
    form.getNameInput().clear().should("be.empty");
    form.getPhoneNumberInput().clear().should("be.empty");
    form.getMessageInput().clear().should("be.empty");
    form.getSendBtn({ submit: true });
  }
  submitValidForm() {
    this.getContactForm();
    form.fillNameInput();
    form.fillPhoneNumberInput();
    form.fillMessageInput();
    form.getSendBtn(); // do not actually submit form
  }
}
