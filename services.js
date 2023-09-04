const getAddition = function(nums, target){
    if(!nums || !target) return ({status: 400, message: 'No body found on request'});
    if(nums.trim() === '') return ({status: 400, message: 'nums value is empty'});
    if(typeof target !== 'number') return ({status: 400, message: 'target value must be a number'});

    if(target < -1000000000 || target > 1000000000) return ({status: 400, message: 'target value is out of allowed range'});

    let numsArrayString = nums.split(',');
    if(numsArrayString.length < 2) return ({status: 400, message: 'nums must contain at least two elements'});
    if(numsArrayString.length > 10000) return ({status: 400, message: 'nums must contain 10000 elements as much'});

    let validation = {valid: true, message: ''};

    let intsArray = [];
    numsArrayString.forEach((num, i) => {
        let intNum = parseInt(num);
        if(isNaN(intNum)) validation = {valid: false, message: 'Only integer numbers allowed in "nums"'};

        if(intNum < -1000000000 || intNum > 1000000000) validation = {valid: false, message: 'an item in nums is out of allowed range'};

        intsArray.push(intNum);
        if(num != intsArray[i]) validation = {valid: false, message: 'Only integer numbers allowed'};
    })

    let answers = 0;
    let resultIndices = [];
    intsArray.forEach((num, i) => {
        intsArray.forEach((item, j) => {
            if(i !== j){
                if(num + item === target){
                    answers = answers + 1;
                    if(resultIndices.length !== 2) resultIndices = [i, j];
                }
            }
        })
    })

    if(answers === 0) return {status: 400, message: 'There is no solution given these nums and target'};

    let totalAnswers = answers / 2;
    if(totalAnswers > 1) return ({status: 400, message: 'There are more than one valid answer'});

    if(!validation.valid) return ({status: 400, message: validation.message});

    return ({status: 200, message: 'success', array: resultIndices});
}
   
export default getAddition;
