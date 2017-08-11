/**
 * Created by tharaka_ra on 8/10/2017.
 */
exports.config = {
    types: ['jasmine','node'],
    module:'commonjs',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['todo.spec.js']
};