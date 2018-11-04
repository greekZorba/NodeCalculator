var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

router.get('/calculatorPop', function(req,res){
    
    res.render('calculator.ejs')
})

router.post('/calculatorPop', function(req, res){
    var body = req.body;
    var inputText = req.body.inputString;
    if(isNumber(inputText.charAt(inputText.length-1))== 'false'){ // 마지막에 부호가 들어오면 잘라줌
        inputText = inputText.substring(0, inputText.length-1);
    }
    
    var appendNumber = '';
    var number = 0;
    var calArray = new Array();
    var arrayCount = 0;

    for(var i=0; i<inputText.length; i++){
        
        var oneCharater = inputText.charAt(i);
        if(isNumber(oneCharater) == 'true'){
            appendNumber += oneCharater;
        }else{
            calArray[arrayCount++] = parseInt(appendNumber);
            calArray[arrayCount++] = oneCharater;
            appendNumber = '';
        }
        
    }

    calArray[arrayCount] = appendNumber;
    arrayCount = 1;
    
    var calculationOutput = 0;
    while(arrayCount < calArray.length){
        
        switch(calArray[arrayCount]){
            case '+':
                if(arrayCount == 1){
                    calculationOutput = parseInt(calArray[arrayCount-1])+parseInt(calArray[arrayCount+1]);
                }else{
                    calculationOutput += parseInt(calArray[arrayCount+1]);
                }
                break;
            case '-':
                if(arrayCount == 1){
                    calculationOutput = parseInt(calArray[arrayCount-1])-parseInt(calArray[arrayCount+1]);
                }else{
                    calculationOutput -= parseInt(calArray[arrayCount+1]);
                }
                break;
            case '*':
                if(arrayCount == 1){
                    calculationOutput = parseInt(calArray[arrayCount-1])*parseInt(calArray[arrayCount+1]);
                }else{
                    calculationOutput *= parseInt(calArray[arrayCount+1]);
                }
                break;
            case '/':    
                if(arrayCount == 1){
                    calculationOutput = parseInt(calArray[arrayCount-1])/parseInt(calArray[arrayCount+1]);
                }else{
                    calculationOutput /= parseInt(calArray[arrayCount+1]);
                }
                break;
        }
        arrayCount += 2;
    }

    var result = {};
    result.calculationOutput = calculationOutput
    res.json(result);

})

function isNumber(numOrString){
    var output = parseInt(numOrString)

    if(isNaN(output)){
        return 'false';
    }
    return 'true';
}

module.exports = router;