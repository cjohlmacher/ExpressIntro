const { getMean, getMedian, getMode } = require('./methods');

describe('Calculation methods', function() {
    test('should calculate the mean of a list of numbers', function(){
        expect(getMean([2,4,6])).toEqual(4);
    });
    test('should calculate the median of a list of numbers', function(){
        expect(getMedian([2,4,6])).toEqual(4);
        expect(getMedian([2,4,5,6])).toBeCloseTo(4.5);
    });
    test('should calculate the mode of a list of numbers', function(){
        expect(getMode([2,4,2,4,2])).toEqual([2]);
        expect(getMode([2,4,4,2])).toEqual([2,4]);
        expect(getMode([0,-1,0,0,-1,-1])).toEqual([0,-1]);
    });
});