/**
 * Created by tharaka_ra on 8/10/2017.
 */

describe('Testing Hairbnb', function() {
    var mail = 'tharaka.kamal@gmail.com';
    var password = 'Aa1111';
    var EC = protractor.ExpectedConditions;
    it('should have the title', function() {
        browser.get('http://localhost:63342/HairBnB/app/views/#!/');
        expect(browser.getTitle()).toEqual('Hairbnb');
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



});