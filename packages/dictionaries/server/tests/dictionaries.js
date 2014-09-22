'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Dictionary = mongoose.model('Dictionary');

/**
 * Globals
 */
var user;
var dictionary;

/**
 * Test Suites
 */
describe('<Unit Test>', function () {
    describe('Model Dictionary:', function () {
        beforeEach(function (done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function () {
                dictionary = new Dictionary({
                    v1: 'BR1.1',
                    v3: [
                        {"_": "BR1.1", "a": "1.00", "b": "T17a", "c": ['v.1', 'e.2'], "t": "1001"},
                        {"_": "BR67.1", "a": "614.32", "b": "T17a", "c": ['v.2'], "t": "25"},
                        {"b": "T17a", "c": ['v.2'], "t": "25"}
                    ],
                    v5: 'SCP'
                });

                done();
            });
        });

        describe('Method Save', function () {
            it('should be able to save without problems', function (done) {
                return dictionary.save(function (err) {
                    should.not.exist(err);
                    //dictionary.v3[0].a.should.equal(1.00);
                    /*dictionary.title.should.equal('Dictionary Title');
                     dictionary.content.should.equal('Dictionary Content');
                     dictionary.user.should.not.have.length(0);
                     dictionary.created.should.not.have.length(0);*/
                    done();
                });
            });

            /*  it('should be able to show an error when try to save without title', function(done) {
             dictionary.title = '';

             return dictionary.save(function(err) {
             should.exist(err);
             done();
             });
             });

             it('should be able to show an error when try to save without content', function(done) {
             dictionary.content = '';

             return dictionary.save(function(err) {
             should.exist(err);
             done();
             });
             });

             it('should be able to show an error when try to save without user', function(done) {
             dictionary.user = {};

             return dictionary.save(function(err) {
             should.exist(err);
             done();
             });
             });*/

        });

        afterEach(function (done) {

            user.remove();
            done();
        });
    });
});
