const CalVer = require('../src/calver.js');

describe('getVersion', () => {
    test('getVersion throws exception with undefined date', async () => {
        let options = {};
    
        const sut = new CalVer();   
        
        try {
            await sut.getVersion(undefined, options);
        }
        catch (e) {
            expect(e).toEqual({
                message: 'No date has been provided.'
              });
        }
    });

    test('getVersion throws exception with null date', async () => {
        let options = {};
    
        const sut = new CalVer();   
        
        try {
            await sut.getVersion(null, options);
        }
        catch (e) {
            expect(e).toEqual({
                message: 'No date has been provided.'
              });
        }
    });

    test('getVersion throws exception with undefined options', async () => {
        let data = new Date().toISOString();
    
        const sut = new CalVer();   
        
        try {
            await sut.getVersion(data, undefined);
        }
        catch (e) {
            expect(e).toEqual({
                message: 'No options have been provided.'
              });
        }
    });

});