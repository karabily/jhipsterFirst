import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Club e2e test', () => {

    let navBarPage: NavBarPage;
    let clubDialogPage: ClubDialogPage;
    let clubComponentsPage: ClubComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clubs', () => {
        navBarPage.goToEntity('club');
        clubComponentsPage = new ClubComponentsPage();
        expect(clubComponentsPage.getTitle())
            .toMatch(/myFirstJHipsterApp.club.home.title/);

    });

    it('should load create Club dialog', () => {
        clubComponentsPage.clickOnCreateButton();
        clubDialogPage = new ClubDialogPage();
        expect(clubDialogPage.getModalTitle())
            .toMatch(/myFirstJHipsterApp.club.home.createOrEditLabel/);
        clubDialogPage.close();
    });

    it('should create and save Clubs', () => {
        clubComponentsPage.clickOnCreateButton();
        clubDialogPage.setNameInput('name');
        expect(clubDialogPage.getNameInput()).toMatch('name');
        clubDialogPage.setAddressInput('address');
        expect(clubDialogPage.getAddressInput()).toMatch('address');
        clubDialogPage.setEmailInput('email');
        expect(clubDialogPage.getEmailInput()).toMatch('email');
        clubDialogPage.setNumberPhone1Input('numberPhone1');
        expect(clubDialogPage.getNumberPhone1Input()).toMatch('numberPhone1');
        clubDialogPage.setNumberPhone2Input('numberPhone2');
        expect(clubDialogPage.getNumberPhone2Input()).toMatch('numberPhone2');
        clubDialogPage.setCityInput('city');
        expect(clubDialogPage.getCityInput()).toMatch('city');
        clubDialogPage.setCountryInput('country');
        expect(clubDialogPage.getCountryInput()).toMatch('country');
        clubDialogPage.save();
        expect(clubDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClubComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-club div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ClubDialogPage {
    modalTitle = element(by.css('h4#myClubLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    addressInput = element(by.css('input#field_address'));
    emailInput = element(by.css('input#field_email'));
    numberPhone1Input = element(by.css('input#field_numberPhone1'));
    numberPhone2Input = element(by.css('input#field_numberPhone2'));
    cityInput = element(by.css('input#field_city'));
    countryInput = element(by.css('input#field_country'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setNumberPhone1Input = function(numberPhone1) {
        this.numberPhone1Input.sendKeys(numberPhone1);
    };

    getNumberPhone1Input = function() {
        return this.numberPhone1Input.getAttribute('value');
    };

    setNumberPhone2Input = function(numberPhone2) {
        this.numberPhone2Input.sendKeys(numberPhone2);
    };

    getNumberPhone2Input = function() {
        return this.numberPhone2Input.getAttribute('value');
    };

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    };

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    };

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    };

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
