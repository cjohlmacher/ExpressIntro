function getMean(nums) {
    const total = nums.reduce((acc,num) => {
        return acc + parseInt(num);
    },0); 
    return total/nums.length;
}

function getMedian(nums) {
    let midIndex = Math.floor(nums.length/2);
    let median;
    if (nums.length % 2 != 0) {
        median = nums[midIndex];
    } else {
        median = (nums[midIndex]+nums[midIndex-1])/2
    };
    return median;
}

function getMode(nums) {
    const count = new Map();
    for (let num of nums) {
        if (count.has(num)) count.set(num,count.get(num) + 1);
        else count.set(num,1);
    };
    let modes = new Set();
    const max = Math.max(...count.values());
    for (let num of nums) {
        if (count.get(num) == max) {
            modes.add(num);
        };
    };
    return [...modes];
}

module.exports =  {getMean, getMedian, getMode };