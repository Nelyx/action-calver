const Calver = require('../src/calver.js');

describe('makeVersion', () => {
    test('makeVersion throws exception with undefined date', async () => {
        let date = undefined;
        let options = {};
        
        const sut = new Calver();   
        
        try {
            await sut.makeVersion(date, options);
        }
        catch (e) {
            expect(e).toEqual({
                message: 'No date has been provided.'
              });
        }
    });
    test('makeVersion throws exception with null date', async () => {
        let date = null;
        let options = {};
        
        const sut = new Calver();   
        
        try {
            await sut.makeVersion(date, options);
        }
        catch (e) {
            expect(e).toEqual({
                message: 'No date has been provided.'
              });
        }
    });
    
    test('makeVersion throws exception with undefined options', async () => {
        let date = new Date().toUTCString();
        let options = undefined;
        
        const sut = new Calver();   
        
        try {
            await sut.makeVersion(date, options);
        }
        catch (e) {
            expect(e).toEqual({
                message: 'No options have been provided.'
              });
            }
        });
    test('makeVersion throws exception with null option', async () => {
        let date = new Date().toUTCString();
        let options = null;
        const sut = new Calver();   
        
        try {
            await sut.makeVersion(date, options);
        }
        catch (e) {
            expect(e).toEqual({
                message: 'No options have been provided.'
            });
        }
    });

    test('makeVersion throws exception with empty format', async () => {
        let date = new Date().toUTCString();
        let options = {
            format: ""
        };
        
        const sut = new Calver();   
        
        try {
            await sut.makeVersion(date, options);
        }
        catch (e) {
            expect(e).toEqual({
                message: 'No format string has been provided.'
              });
        }
    });
    
    test('makeVersion returns appropriate version for default branch', async () => {
        const options = {
            defaultBranch: 'refs/heads/main',
            currentRef: 'refs/heads/main',
            buildNumber: 1,
            prefix: '',
            format: "YY.M.D", 

        };
        const date = new Date("2022-01-01").toUTCString();
        const expected = "22.1.1.1";
        
        const sut = new Calver();   
        let actual = await sut.makeVersion(date, options);
        expect(actual).toBe(expected);
    });

    test('makeVersion returns appropriate version for nondefault branch', async () => {
        const options = {
            defaultBranch: 'refs/heads/main',
            currentRef: 'refs/heads/some-new-feature',
            buildNumber: 1,
            prefix: '',
            format: "YY.M.D",
        };
        const date = new Date("2022-01-01").toUTCString();
        const expected = "22.1.1.1-some-new-feature";
        
        const sut = new Calver();   
        let actual = await sut.makeVersion(date, options);
        expect(actual).toBe(expected);
    });
    test('makeVersion returns appropriate version for long nondefault branch', async () => {
        const options = {
            defaultBranch: 'refs/heads/main',
            currentRef: 'refs/heads/some-new-feature-with-a-really-long-name-that-should-be-trimmed',
            buildNumber: 1,
            prefix: '',
            format: "YY.M.D",
        };
        const date = new Date("2022-01-01").toUTCString();
        const expected = "22.1.1.1-some-new-feature-wit";
        
        const sut = new Calver();   
        let actual = await sut.makeVersion(date, options);
        expect(actual).toBe(expected);
    });


});