import { getService } from "../../di-container";


const service = getService();

beforeAll(async () => {
    await service.userService.create({
        name: 'tester',
        email: 'tester@gmail.com',
        password: '123'
    }).then(() => {
        console.log('test user created!');
    });
});

describe("AuthService", () => {

    describe('POST /login', () => {

        it('should login', async () => {
            const response = await service.authService.login({
                "email": "tester@gmail.com",
                "password": "123"
            });
            expect(response.id).toBeDefined;
            expect(response.token).toBeDefined;
        });
    });
    
    describe('POST /generate_token', () => {
        it('should generate auth token', async () => {
            const response = await service.authService.generateToken({
                "email": "tester@gmail.com",
                "userId": "61ded6d3248bfc0030304e6d"
            });
            expect(response.token).toBeDefined;
        });
    });

    describe('GET /parse', () => {

        it('should parse url and return response', async () => {
            const response = await service.parserService.parse('github.com');
            expect(response.title).toBeDefined;
            expect(response.favicon).toBeDefined;
            expect(response).toMatchObject({
                title: 'GitHub: Where the world builds software · GitHub',
                favicon: 'https://github.githubassets.com/favicons/favicon.svg',
            })
        });
    }); 

    describe('POST /upload', () => {
        
        it('should upload file and return identifier', async () => {
            const identifier = await service.fileService.upload(
                "61ded6d3248bfc0030304e6d",
                Buffer.from('test'),
                'test.png',
            );
            expect(identifier).toBe('test.png');
        });
    });
});