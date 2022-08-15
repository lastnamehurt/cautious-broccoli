/// <reference types="cypress" />
import ContactFormFeatures from "../support/pages/features";
import DemoApp from "../support/pages/demo-app";
import formData from "../fixtures/form-data";
import registerCypressGrep from "cypress-grep";
import locations from "../fixtures/locations";

registerCypressGrep();
const features = new ContactFormFeatures();
const form = new DemoApp().locationSearchModal;
let locationNames = locations.map(({ displayName }) => displayName);
let locationAddresses = locations.map(({ address }) => address);

describe("Contact Us Form", () => {
  context("Chat Popup", () => {
    beforeEach(() => {
      cy.visit("");
    });
    it(
      "chat prompt timestamp is always relative to page load timestamp",
      { tags: ["@regression", "@failing"] },
      () => {
        let rightNow = new Date().toISOString();
        const index = rightNow.indexOf("T");
        const today = rightNow.slice(0, index);

        // validate that the timestamp is today
        form.getChatPrompt().invoke("text").should("contain", "greeting -");
        form.getChatPrompt().invoke("text").should("contain", today);
      }
    );
  });
  context("Form", () => {
    beforeEach(() => {
      features.loadApp();
      form.getSearchInput().should("be.visible");
    });
    it("can search by zip code", { tags: ["@smoke"] }, () => {
      features.searchByZip(formData.zipCode);
      form.getSearchInputValue().should("equal", formData.zipCode);
      form.getSearchResults().then(results => {
        expect(results.length).to.be.above(0)
      })
    });
    it("can search by invalid zip code", { tags: ["@regression", "@failing"] }, () => {
      features.searchByZip(formData.invalidZipCode);
      form.getSearchInputValue().should("equal", formData.invalidZipCode);
      form.getSearchResults().then(results => {
        expect(results.length).to.equal(0)
      })
    });
    it("can search by location", { tags: ["@smoke"] }, () => {
      features.searchByLocation(formData.locationName);
      form.getSearchInputValue().should("equal", formData.locationName);
    });
    it(
      "should have to click a location to access the contact form",
      { tags: ["@smoke"] },
      () => {
        // sms contact form should not be available yet
        form.getSearchInput().should("exist");
        // select any search result
        features.chooseFirstSearchResult();
        // sms contact form should be available now
        form.getNameInput().should("exist");
      }
    );
    it(
      "should have four locations to choose from",
      { tags: ["@smoke", "@failing"] },
      () => {
        // pass in an empty location for all results
        features.searchByLocation(" ");
        form.getSearchResults().should("have.length", 4);
      }
    );
    it(
      "should show location details in header of the contact form",
      { tags: ["smoke", "@regression"] },
      () => {
        features.chooseFirstSearchResult();
        form
          .getLocationNameInHeader()
          .find("h1")
          .invoke("text")
          .then((text) => {
            // soft check that a valid location name is showing
            expect(text).to.be.oneOf(locationNames);
          });
        form
          .getLocationAddressInHeader()
          .invoke("text")
          .then((text) => {
            expect(text).to.be.oneOf(locationAddresses);
          });
      }
    );
    it(
      "should throw error if contact name exceeds max characters (49)",
      { tags: ["@regression"] },
      () => {
        let loc = "a";
        features.fillNameOnContactForm(loc.repeat(50));
        form.getSendBtn(true);
        form
          .getContactNameErrorMessage()
          .invoke("text")
          .should("equal", form.errorMessages.nameTooLongError);
      }
    );
    it(
      "should throw error if phone number is too long",
      { tags: ["@regression"] },
      () => {
        let num = "9";
        features.fillPhoneNumberOnContactForm(num.repeat(25));
        form.getSendBtn(true);
        form
          .getContactPhoneNumberErrorMessage()
          .invoke("text")
          .should("equal", form.errorMessages.numberTooLongError);
      }
    );
    it(
      "search returns only locations based on input",
      { tags: ["@regression", "@failing"] },
      () => {
        features.searchByLocation("Hawaii");
        form.getSearchResults().each((result) => {
          cy.wrap(result).should("contain.text", "Hawaii");
        });
      }
    );
    it("contact form requires a name", { tags: ["@smoke"] }, () => {
      features.fillNameOnContactForm(formData.contactName);
      form.getNameInput().invoke("val").should("equal", "Tester");
    });
    it("contact form requires a phone number", { tags: ["@smoke"] }, () => {
      features.fillPhoneNumberOnContactForm(formData.contactPhoneNumber); // 9999999999 -> (999) 999-9999
      form
        .getPhoneNumberInput()
        .invoke("val")
        .should("equal", "(999) 999-9999");
    });
    it(
      "phone number input rejects alpha characters",
      { tags: ["@regression"] },
      () => {
        features.fillPhoneNumberOnContactForm("abcd");
        form.getPhoneNumberInput().invoke("val").should("eq", "");
      }
    );
    it(
      "contact form accepts alphanumeric message",
      { tags: ["@regression"] },
      () => {
        features.fillMessageOnContactForm(formData.message);
        form.getMessageInput().invoke("val").should("equal", formData.message);
      }
    );
    it("cannot submit an invalid form", { tags: ["@smoke"] }, () => {
      features.submitInvalidForm();
      form
        .getContactNameErrorMessage()
        .invoke("text")
        .should("equal", form.errorMessages.nameError);
      form
        .getContactPhoneNumberErrorMessage()
        .invoke("text")
        .should("equal", form.errorMessages.phoneNumberError);
      form
        .getContactMessageErrorMessage()
        .invoke("text")
        .should("equal", form.errorMessages.messageError);
    });
    it(
      "send button becomes active once a form is valid",
      { tags: ["@smoke"] },
      () => {
        features.submitValidForm();
        form.getMessageInput().invoke("val").should("not.be.empty");
        form.getMessageInput().invoke("val").should("eq", formData.message);
        form.getPhoneNumberInput().invoke("val").should("not.be.empty");
        form.getPhoneNumberInput().invoke("val").should("eq", "(999) 999-9999");
        form.getNameInput().invoke("val").should("eq", formData.contactName);
        form.getSendBtn().should("be.visible");
      }
    );
  });
});
