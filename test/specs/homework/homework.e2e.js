describe("Homework", async () => {
  // HW1
  it("should open login page", async () => {
    await browser.reloadSession();
    await browser.url("/prihlaseni");
    await browser.saveScreenshot("screenshots/login_page.png");
    await browser.pause(5000);
  });

  // HW2
  it("examples of selectors", async () => {
    // $('#email')            // Políčko pro email
    // $('#name')             // Políčko pro jméno a příjmení - ale v registraci
    // $('#password')         // Políčko pro zadání hesla
    // $('#password-confirm') // Políčko pro kontrolu zadaného hesla
    // $('.btn-secondary')    // Tlačítko na registraci
    //console.log(await $('.btn-secondary').getText())
  });

  // HW3
  it("should register new user", async () => {
    await browser.reloadSession();
    await browser.url("/registrace");

    const nameField = $("#name");
    const emailField = $("#email");
    const passwordField = $("#password");
    const passwordConfirmField = $("#password-confirm");
    const loginButton = $(".btn-primary");
    //const fieldError = $('.invalid-feedback');
    //const toastMessage = $('.toast-message');

    await nameField.setValue("Name Surname");
    await emailField.setValue("name.surname@gmail.com");
    await passwordField.setValue("password");
    await passwordConfirmField.setValue("password");
    await loginButton.click();
  });
});
