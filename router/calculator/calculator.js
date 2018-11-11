var express = require('express')
var router = express.Router()

router.get('/calculatorPop', function(req,res){
    
    res.render('calculator.ejs')
})

router.post('/calculatorPop', function(req, res){
    var inputText = req.body.inputString; // 넘어온 파라미터 텍스트
    if(isNumber(inputText.charAt(inputText.length-1))== 'false'){ // 마지막에 숫자가 아닌 부호가 들어오면 잘라줌
        inputText = inputText.substring(0, inputText.length-1);
    }
    
    var appendNumber = ''; // 자릿수를 문자열로 조합해 완전한 수로 만들어줌
    var calArray = new Array(); // 숫자와 기호로 이루어진 배열
    var arrayCount = 0; // calArray의 인덱스

    for(var i=0; i<inputText.length; i++){
        
        var oneCharater = inputText.charAt(i);
        if(isNumber(oneCharater) == 'true'){ // 입력된 값이 숫자라면 더해줌
            appendNumber += oneCharater; // 123으로 넘어왔다면 '1'+'2'+'3'으로 만들어줌
        }else{
            calArray[arrayCount++] = appendNumber; // 연산 기호가 나왔다면 앞의 appendNumber을 대입
            calArray[arrayCount++] = oneCharater; // 연산 기호를 담아줌
            appendNumber = ''; // 초기화
        }
        
    }

    calArray[arrayCount] = appendNumber; // 연산 기호 다음, 마지막으로 들어온 appendNumber을 대입 
    arrayCount = 1; // 연산 기호가 있는 인덱스를 가리킴
    
    var calculationOutput = 0; // 리턴될 결과값

    /** arrayCount는 연산 기호가 있는 위치를 가리킨다. 연산 기호가 배열의 마지막 값에 들어갈 수 없으므로
     *  배열의 길이보다 -1의 위치가 마지막 연산 기호가 있을 수 있는 위치이다.
     *  ex) 1+3+4는 가능하지만 1+4+5+ 는 안됨.
     * 
     * 숫자가 올 수 있는 배열의 인덱스는 0,2,4,6으로 온다. 345*9+123을 보면 알 수 있다.
     * 똑같이 연산 기호는 1,3,5 홀수의 위치만 올 수 있다.
     */
    while(arrayCount < calArray.length){
        
        switch(calArray[arrayCount]){
            case '+':
                if(arrayCount == 1){ // 첫 연산 기호일 경우 앞의 숫자와 뒤에 오는 숫자를 같이 계산해준다.
                    calculationOutput = parseInt(calArray[arrayCount-1])+parseInt(calArray[arrayCount+1]);
                }else{ // 첫 연산기호가 아닐 경우는 이제까지 계산된 결과에 대해서 연산을 수행하면 된다.
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
        arrayCount += 2; // +2를 통해서 숫자는 건너뛰고 연산 기호만 비교할 수 있다.
    }

    var result = {};
    result.calculationOutput = calculationOutput
    res.json(result); // json형태로 결과 값을 리턴한다.

})

/** 입력된 값이 숫자인지 문자인지 판별 */
function isNumber(numOrString){
    var output = parseInt(numOrString)

    if(isNaN(output)){ // 숫자가 아니면 parseInt를 수행할 경우 NaN 결과 값을 내뱉는다.
        return 'false';
    }
    return 'true';
}

module.exports = router;