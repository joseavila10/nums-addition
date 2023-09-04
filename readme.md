<h2>How to run once the repository has been cloned:</h2>
<ol>
    <li>Make sure to have the latest node js version</li>
    <li>Install required packaged using the command 'npm install' and wait for the packaged to be installed</li>
    <li>Create a file on the root of this project named '.env' and its content must be:
        <div>
            PORT=3001
        <div>
        NOTE: We have to make sure that port 3000 is not in use in the computer trying to run this project,
        if port 3000 is is use, we can change '3000' for another port we are sure it is not in use locally.
    </li>
    <li>Use the command 'node index.js' and once this message is displayed on the console:
        <div>
            Server running on port 3001
        </div>
        (port my vary according to the used port declared on .env file) Local server is runging and ready to use.
    </li>
</ol>

<h2>How to use it</h2>
To send data to the server and recieve responses, we will need to use an external software to do it.
ie: Postman, (Another software to interact with backend server could be also usefull)
<h3>Interact with the server</h3>
<ol>
    <li>Open postman or the selected software to send data to the server</li>
    <li>Create a new post request using the following url:
        <div>http://localhost:3001/</div>
        <div>Url port may vary accoring to the one declared on .env file</div>
    </li>
    <li>
        Use the following headers on request
        <div><b>Key:</b> Content-Type<div>
        <div><b>Value:</b> application/json<div>
    </li>
    <li>
        Use the following example body on request
        <div>
            {<br/>
                "nums": numsValue <br/>
                "target": targetedNumber<br/>
            }<br/>
        </div>
        <div>
            <h5>numsValue:</h5>
            <div>
                numsValue must be a string using numers separed by a comma, not spacing, ie:
                "4,8,1,6".
                so for example, body on post request could be: 
                {
                    "nums": "4,8,1,6",
                    "target": 12
                }
            </div>
            <div>
                <h3>RESTRICTIONS:</h3>
                    <ul>
                        <li>numsValue must contain only numbers separated by a comma with no spacing</li>
                        <li>Must only contain integer numbers, not decimals</li>
                        <li>Must contain at leat one element</li>
                        <li>Must contain 10000 elemets as much</li>
                        <li>Highest number must not be more than 1000000000</li>
                        <li>lowest number must not be less than -1000000000</li>
                        <li>must contain at least 2 elements</li>
                    </ul>
            </div>
            <h5>targetedNumber:</h5>
            <div>
                targetedNumber must be an integer. that can be generated adding two numbers in numsValue
                "4,8,1,6".
                so for example, body on post request could be: 
                {
                    "nums": "4,8,1,6",
                    "target": 12
                }
            </div>
            <div>
                <h3>RESTRICTIONS:</h3>
                    <ul>
                        <li>Must be an integer</li>
                        <li>Must be the addition of only two number in numsValue</li>
                        <li>highest value could be 1000000000</li>
                        <li>lowest value could be -1000000000</li>
                    </ul>
            </div>
        </div>
    </li>
    <li>We send the request and we will be able to see responses</li>
</ol>

<h2>Reponses from the server</h2>
We may get two type of responses
<ul>
    <li>Response with 200 status</li>
    <li>Response with 400 status and error message</li>
<ul>

<h3>Response with 200 status</h3>
<div>
    This response will be returned if user sent a correct body on request as indicated before. 'array' property on response includes the indices of array generated using numsValue (nums property on body request), which means this is the only solution found.
</div>

<h3>Response with 400 status and error message</h3>
<div>
    This reponse will be returned if the user did not send the body correctly as indicated before. Error 400 is to indicate it is a response expected because of a bad request and the propery 'message' indicates what caused the error on the request.
</div>

<h2>Run unit test</h2>
<div>To run unit test we need to use the following command</div>
<div><b>npm run test</b></div>
<div>This unit test check the following cases:</div>
<ul>
    <li>When request has an empty body</li>
    <li>When nums in body includes different characters from numbers</li>
    <li>When nums in body includes a value out of allowed range</li>
    <li>When nums includes less than two elements</li>
    <li>When nums includes more elements than allowed</li>
    <li>When target value is out of allowed range</li>
    <li>When no solution is found</li>
    <li>When multiple solutions are found</li>
    <li>When a unique solution is found</li>
    <li>array property on response must include only number</li>
</ul>

<h2>Solution described</h2>
<ul>
    <li>Recieve the request body and get the 'nums' and 'target' values.</li>
    <li>Check if 'nums' and 'target' values on body exist or are empty before continue. if this is the case, throw an error</li>
    <li>Check if target value is out of allowed range, if it is, throw an error</li>
    <li>Split 'nums' in ',' to get an array, bu it will cointain only string values</li>
    <li>Check if nums value on body has more than 10000 elements before continue, if it does, throw an error.</li>
    <li>Check if array generated by nums contains at least two values, if it does not, throw an error</li>
    <li>Loop that array and check if we get a NaN value when apply a parseInt to each element, if we do, we throw an error because it means it is not a number</li>
    <li>in the same loop, we check that the value is not out of the allowed range, if it is, throw an error</li>
    <li>In the same loop, after we have the new valus but now in INT, we look for the values to be the same than in nums, because if we have this value '1d8', and we parse to Int, we will get '1', and not NaN, so precious step could not catch that issue, so if we find it is not the same, we throw an error.</li>
    <li>We create an empty array, this will be to store the result of the two indeces that added make targeted value</li>
    <li>We write a loop inside the same loop, this is because every number must be added to every number to check if they make targeted value, but we only check if index on first loop is different from index in second loop, this is to avoid adding the same item.</li>
    <li>once we find the two indexes for the first time, we add these two indeces numbers to the empty array created before. This is possible checking if array has a length of 2. If it does not, we push these two value, and once the array has two values, its length will be 2 and this array will be not modified</li>
    <li>@e have a variable starting from 0 that checks how many time targeted value can be maked from adding different array indeces, we add one every time a solution is found</li>
    <li>After both loops, we may have either an empty array (the one created before) ot that created array with two values and the value of the solutions found, we will call this variable 'answers'</li>
    <li>If 'answers' is equels 0, it means there was not solution found, so we throw an error</li>
    <li>
        If 'asnwer' has a value different from 0, it will be in multiples of 2, it is because for every soulution found, we add 1 to this value, and if we have these nums: <br/> 
        "1,2,5" <br/>
        and a target which is equals to 3<br/>
        We will get an answer in the loop during the first index is 0 and the second is 1, and so do we when first index is 1 and second is 0.<br/>
        We add 1 on 'answer' in both cases, but the empty array value with the two indexe of solution, was set just in the first time we find a soluition, not any other time.
    </li>
    <li>We divide 'answers' into two to get the real value of how many solutions we found</li>
    <li>if 'answers' divided by two if more than 1, we throw an error there was not a unique solution</li>
    <li>if answers is 1, we return the corresponding answer from the server, it means the body was sent correctly as indicated</li>
<ul>
<div>
    <b>Note:</b> For this server to accept a long value on body, we had to specify it in body parser in 'app.js' file
</div>