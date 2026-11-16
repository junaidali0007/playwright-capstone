import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://jsonplaceholder.typicode.com' });

test.describe('Posts API', () => {

    test('GET a single post', { tag: '@api' }, async ({ request }) => {
        const response = await request.get('/posts/1');

        await expect(response).toBeOK();
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.id).toBe(1);
        expect(body.userId).toBe(1);
        expect(body.title).toBeTruthy();
        // Log the response body for debugging purposes
        await test.info().attach('response body', {
            body: JSON.stringify(body, null, 2),
            contentType: 'application/json',
        });
    });
    test('GET all posts returns 100 items', { tag: '@api' }, async ({ request }) => {
        const response = await request.get('/posts');
        await expect(response).toBeOK();

        const posts = await response.json();
        expect(posts).toHaveLength(100);
        expect(response.headers()['content-type']).toContain('application/json');
        // Log the response body for debugging purposes
        await test.info().attach('response body', {
            body: JSON.stringify(posts, null, 2),
            contentType: 'application/json',
        });
    });

    test('GET posts of one user', { tag: '@api' }, async ({ request }) => {
        const response = await request.get('/posts', { params: { userId: 1 } });
        await expect(response).toBeOK();

        const posts = await response.json();
        expect(posts.length).toBeGreaterThan(0);
        for (const post of posts) {
            expect(post.userId).toBe(1);
        }
        // Log the response body for debugging purposes
        await test.info().attach('response body', {
            body: JSON.stringify(posts, null, 2),
            contentType: 'application/json',
        });
    });

    test('POST creates a post', { tag: '@api' }, async ({ request }) => {
        const newPost = {
            title: 'My first API test',
            body: 'Written with Playwright',
            userId: 1,
        };

        const response = await request.post('/posts', { data: newPost });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body).toMatchObject(newPost);
        expect(body.id).toBeDefined();
    });
    //put update a post
    test('PUT updates a post', { tag: '@api' }, async ({ request }) => {
        const updatedPost = {   
            title: 'Updated title',
            body: 'Updated body',
            userId: 1,
        };
        const response = await request.put('/posts/1', { data: updatedPost });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toMatchObject(updatedPost);
    });
    //Delete a post
    test('DELETE a post', { tag: '@api' }, async ({ request }) => {
        const response = await request.delete('/posts/1');
        expect(response.status()).toBe(200);
    });
    
    test('GET a post that does not exist returns 404', { tag: '@api' }, async ({ request }) => {
        const response = await request.get('/posts/9999');
        expect(response.status()).toBe(404);
    });

});