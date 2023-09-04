import app from "../app";
import request from 'supertest';

describe('POST /', () => {
    test('When request has an empty body', async() => {
        const response = await request(app).post('/').send();
        const jsonRes = JSON.parse(response.text);
        expect(jsonRes.status).toBe(400);
        expect(jsonRes.message).toBe('No body found on request');
    });

    test('When nums in body includes different characters from numbers', async() => {
        const response = await request(app).post('/').send({
            nums: "3,8,4g",
            target: 11
        });
        const jsonRes = JSON.parse(response.text);
        expect(jsonRes.status).toBe(400);
        expect(jsonRes.message).toBe('Only integer numbers allowed');
    });

    test('When nums in body includes a value out of allowed range', async() => {
        const response = await request(app).post('/').send({
            nums: "3,8,1000000001",
            target: 11
        });
        const jsonRes = JSON.parse(response.text);
        expect(jsonRes.status).toBe(400);
        expect(jsonRes.message).toBe('an item in nums is out of allowed range');
    });

    test('When nums includes less than two elements', async() => {
        const response = await request(app).post('/').send({
            nums: "1",
            target: 1
        });
        const jsonRes = JSON.parse(response.text);
        expect(jsonRes.status).toBe(400);
        expect(jsonRes.message).toBe('nums must contain at least two elements');
    });

    test('When nums includes more elements than allowed', async() => {
        let testArray = Array.from(Array(10001).keys());
        const response = await request(app).post('/').send({
            nums: testArray.join(','),
            target: 1
        });
        const jsonRes = JSON.parse(response.text);
        expect(jsonRes.status).toBe(400);
        expect(jsonRes.message).toBe('nums must contain 10000 elements as much');
    });

    test('When target value is out of allowed range', async() => {
        const response = await request(app).post('/').send({
            nums: "3,1,1000000000",
            target: 1000000001
        });
        const jsonRes = JSON.parse(response.text);
        expect(jsonRes.status).toBe(400);
        expect(jsonRes.message).toBe('target value is out of allowed range');
    });

    test('When no solution is found', async() => {
        const response = await request(app).post('/').send({
            nums: "2,3,1",
            target: 50
        });
        const jsonRes = JSON.parse(response.text);
        expect(jsonRes.status).toBe(400);
        expect(jsonRes.message).toBe('There is no solution given these nums and target');
    });

    test('When multiple solutions are found', async() => {
        const response = await request(app).post('/').send({
            nums: "3,3,2,4",
            target: 6
        });
        const jsonRes = JSON.parse(response.text);
        expect(jsonRes.status).toBe(400);
        expect(jsonRes.message).toBe('There are more than one valid answer');
    });

    test('When a unique solution is found', async() => {
        const response = await request(app).post('/').send({
            nums: "2,7,11,15",
            target: 9
        });
        const jsonRes = JSON.parse(response.text);
        expect(jsonRes.status).toBe(200);
        expect(jsonRes.message).toBe('success');
        expect(jsonRes).toHaveProperty('array');
    });

    test('array property on response must include only number', async() => {
        const response = await request(app).post('/').send({
            nums: "2,7,11,15",
            target: 9
        });
        const jsonRes = JSON.parse(response.text);
        jsonRes.array.forEach(num => {
            expect(typeof num).toBe('number');
        })
    });
})
