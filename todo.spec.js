/**
 * Created by tharaka_ra on 8/10/2017.
 */

describe('Hairbnb Testing', function() {
    var mail = 'tharaka.kamal@gmail.com';
    var password = 'Aa1111';
    var firstn = "Tharaka";
    var lastn = "Ranatunga";
    var emailn = "tharaka.kamal@gmail.com";
    var passwordn = "Aa1111";
    var confirmn = "Aa1111";
    var EC = protractor.ExpectedConditions;

    it('should check users already exist', function() {
        browser.get('http://localhost:63342/HairBnB/app/views/#!/');
        e = element(by.id('signup_button'));
        e.click();
        firstk = element(by.id('first'));
        for(var i = 0; i < firstn.length; i++){
            firstk.sendKeys(firstn.charAt(i));
        }
        lastk = element(by.id('last'));
        for(var i = 0; i <lastn.length; i++){
            lastk.sendKeys(lastn.charAt(i));
        }
        emailk = element(by.id('email'));
        for(var i = 0; i < emailn.length; i++){
            emailk.sendKeys(emailn.charAt(i));
        }
        passwordk = element(by.id('password'));
        for(var i = 0; i < passwordn.length; i++){
            passwordk.sendKeys(passwordn.charAt(i));
        }
        confirmk = element(by.id('confirm'));
        for(var i = 0; i < confirmn.length; i++){
            confirmk.sendKeys(confirmn.charAt(i));
        }
        element(by.id("sign")).click();
        message = element(by.id('signup_message')).getText();
        expect(message).toEqual('This email already registered');
    });

    it('should sign in the user', function() {
        browser.get('http://localhost:63342/HairBnB/app/views/#!/');
        // var signin_button = element(by.css('.modal.fade #signin'))
        var a = element(by.css('#signin_button'));
        a.click();
        b = element(by.id('uemail'));
        c = element(by.id('upassword'));
        var i;
        var j;
        for(i = 0; i < mail.length; i++){
            b.sendKeys(mail.charAt(i));
        }
        for(j = 0; j < password.length; j++){
            c.sendKeys(password.charAt(j));
        }
        //
        // browser.wait(b.clear()thensendKeys(mail), 5000);
        // browser.wait(c.sendKeys(password), 5000);
        element(by.id("signin_click")).click();

        // element(by.id('upassword')).sendKeys('Aa1111')
        // expect(browser.getTitle()).toEqual('Hairbnb');
    });

    it('should go to user profile', function(){
        d = element(by.id('user_dropdown'));
        browser.wait(EC.visibilityOf(d), 5000);
        d.click();
        element(by.id('myprofile')).click();
        name = element(by.id('title')).getText();
        expect(name).toEqual('Tharaka Ranatunga');
    });

    it('should check username and email', function(){
        name = element(by.id('title')).getText();
        email = element(by.id('user_email')).getText();
        expect(name).toEqual('Tharaka Ranatunga');
        expect(email).toEqual('tharaka.kamal@gmail.com')
    });

    it('should show search results', function(){
        f = element(by.id('brand'));
        browser.wait(EC.visibilityOf(f), 5000);
        f.click();
    });



});

