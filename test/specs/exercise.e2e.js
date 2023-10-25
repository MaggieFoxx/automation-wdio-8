// import LoginPage from '../pageobjects/login.page'
// import ApplicationsPage from '../pageobjects/applications.page'


describe('Czechitas Login Page', async () => {

  it('should login and list applications', async () => {

    const username = 'da-app.admin@czechitas.cz';
    const password = 'Czechitas123';

        await browser.reloadSession();
        await browser.url('/prihlaseni');

        const loginButton = $('.btn-primary');
        await loginButton.click();

        const emailField = $('#email');
        const passwordField = $('#password');


        await emailField.setValue("nespravneMeno");
        await passwordField.setValue("nespravneHeslo");
        await loginButton.click();

        console.log('Prihlásenie úspešné: ' + await emailField.isDisplayed() && await passwordField.isDisplayed());


        const UserLogged = await $('=Přihlásit').isDisplayed()
        console.log("Prihlasenie sa podarilo " + await UserLogged);
 
        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        console.log('Prihlásenie úspešné: ' + await emailField.isDisplayed() && await passwordField.isDisplayed());

        const currentUser = $('.navbar-right').$('strong').getText()
        console.log(await currentUser);

        await browser.url('/admin/prihlasky');
        await browser.pause(1000);

        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            //console.log(rowText);
        }

        await $('input[type="search"]').setValue('bil');

        const userNameDropdown = $('[data-toggle="dropdown"]');
        userNameDropdown.click()
        await browser.pause(1000);


        const UserLoggedOut = await $('=Odhlásit').isDisplayed()
        console.log("dropdown displayes: " + UserLoggedOut)
        await $('=Odhlásit').click()
        await browser.pause(1000);
    });

});


import {username, password} from './fixtures.js'

describe('Login And Applications Page', async () => {

    it('My long and ugly test', async () => {
        await browser.reloadSession();
        await browser.url('/prihlaseni');

        // selektory pro elementy na prihlasovacim formulari
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');
        const fieldError = $('.invalid-feedback');
        const toastMessage = $('.toast-message');


        // uzivatel na je formulari pro prihlaseni
        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());


        // uzivatel nevyplni prihlasovaci udaje a klikne prihlasit - ocekava ze se neprihlasi
        await loginButton.click();
        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());

        
        // uzivatel vyplni spatne prihlasovaci udaje a klikne prihlasit - ocekava ze se neprihlasi
        await emailField.setValue(username);
        await passwordField.setValue('invalid');
        await loginButton.click();
        console.log('Error: ' + await toastMessage.getText());
        console.log('Field error: ' + await fieldError.getText());
        console.log('Email field is dislayed: ' + await emailField.isDisplayed());
        console.log('Password field is dislayed: ' + await passwordField.isDisplayed());
        console.log('Login button is dislayed: ' + await loginButton.isDisplayed());


        // uzivatel vyplni spravne prihlasovaci udaje a klikne prihlasit - ocekava ze se prihlasi
        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        // kontrola jmena prihlaseneho uzivaele
        const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
        console.log('User currently logged in: ' + await userNameDropdown.getText());

        // prechod na prihlasky
        await $('=Přihlášky').click();
        await browser.pause(1000);

        console.log('Page title is: ' + await $('h1').getText());

        // vypis tabulky
        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText);
        }
        
        // selektory pro filtrovani v tabulce
        const searchInput = $('input[type="search"]');
        const loading = $('#DataTables_Table_0_processing');  // !!! zobrazuje sa modal že loading, je tam celý čas ale je displayed none
        const searchText = 'mar';

        // filtrovani v tabulce
        await searchInput.setValue(searchText);
        await browser.pause(1000);
        await loading.waitForDisplayed({ reverse: true});

        // vypis tabulky
        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.getText());
        }

        // odhlaseni
        //const navbarRight = $('.navbar-right')
        const logoutLink = $('#logout-link');
        await userNameDropdown.click();
        await logoutLink.click();
        console.log('Navbar text: ' + await navbarRight.getText());
    });
});
