const { app } = require('@azure/functions');

app.http('httpTriggerMidnightFormula', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        let a, b, c;
        
        if (request.method == 'GET') {
            a = request.query.get('a');
            b = request.query.get('b');
            c = request.query.get('c');
        }

        if (request.method == 'POST') {
            try {
                const body = await request.json(); 
                a = body.a;
                b = body.b;
                c = body.c;
                context.log(`a=${a}, b=${b}, c=${c}`);
            } catch (error) {
                return {
                    status: 400,
                    body: 'Invalid JSON body.',
                };
            }
        }

        if (a === undefined || b === undefined || c === undefined) {
            return { status: 400, body: 'Missing input parameters' };
        }
        
        if (a === null || b === null || c === null) {
            return { status: 400, body: 'Missing input parameters' };
        }

        context.log(`Http function processed request for url "${request.url}"`);
        a = parseInt(a);
        b = parseInt(b);
        c = parseInt(c);

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            return { status: 400, body: 'Invalid input parameters' };
        }

        if (a === 0) {
            return { status: 400, body: 'a cannot be 0' };
        }

        //calculate midnight formula
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return { status: 400, body: 'No real zero points' };
        }

        if (discriminant === 0) {
            const x = -b / (2 * a);
            return { status: 200, body: `The zero point at x is ${x}!` };
        }

        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        return { status: 200, body: `The zero point at x1 is ${x1} and the zero point at x2 is ${x2}!` };
    }
});
