export default class DemoApp {
  header = () => cy.get("h1");
  headerText =
    "All we have to decide is what to do with the time that is given us.";
  toggleForm() {
    return cy.enter("#podium-bubble").then((getBody) => {
      getBody().find(".ContactBubble__Bubble").click();
    });
  }
  locationSearchModal = {
    getChatPrompt() {
      return cy.enter("#podium-prompt").then((getBody) => {
        getBody().find("div.Prompt__PromptText");
      });
    },
    getModal() {
      return cy.iframe("#podium-modal");
    },
    clearSearchInput() {
      return this.getModal().find('[name="Search Locations"]').clear();
    },
    search(input = "") {
      return this.getModal()
        .find('[name="Search Locations"]')
        .clear()
        .type(input);
    },
    getSearchInput() {
      return this.getModal().find('[name="Search Locations"]');
    },
    getSearchInputValue() {
      return this.getSearchInput().invoke("val");
    },
    clearSearch() {
      return this.getModal().find(".SearchInput__Reset").click();
    },
    getSearchResults() {
      return cy.iframe("#podium-modal").find(".LocationContainer__Name");
    },

    errorMessages: {
      nameError: "Name is required",
      nameTooLongError: "Name is too long",
      phoneNumberError: "Mobile phone is required",
      numberTooLongError: "Mobile phone is too long",
      messageError: "Message is required",
    },

    // SMS Page
    currentLocationName: ".SendSmsPage__CurrentLocationName",
    getLocationNameInHeader() {
      return this.getModal().find(this.currentLocationName);
    },
    currentLocationAddress: ".SendSmsPage__CurrentLocationAddress",
    getLocationAddressInHeader() {
      return this.getModal().find(this.currentLocationAddress);
    },
    getNameInput() {
      return this.getModal().find("#Name");
    },
    fillNameInput(name = "Tester") {
      return this.getNameInput().clear().type(name);
    },
    getPhoneNumberInput() {
      return this.getModal().find('[id = "Mobile Phone"]');
    },
    fillPhoneNumberInput(phoneNumber = "9999999999") {
      return this.getPhoneNumberInput().clear().type(phoneNumber);
    },
    getMessageInput() {
      return this.getModal().find('[id="Message"]');
    },
    fillMessageInput(message = "This is a test message 1") {
      return this.getMessageInput().clear().type(message);
    },
    getSendBtn(submit = false) {
      if (submit) {
        this.getModal().find('[type="submit"]').click();
      } else {
        return this.getModal().find('[type="submit"]');
      }
    },
    getContactNameErrorMessage() {
      return this.getModal().find(".TextInput__TextInputError").first();
    },
    getContactPhoneNumberErrorMessage() {
      return this.getModal().find(".TextInput__TextInputError--tel");
    },
    getContactMessageErrorMessage() {
      return this.getModal().find(".TextInput__TextInputError").last();
    },
  };
}
