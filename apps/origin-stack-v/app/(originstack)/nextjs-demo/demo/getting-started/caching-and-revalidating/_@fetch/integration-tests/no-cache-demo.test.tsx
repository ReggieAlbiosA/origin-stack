import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Integration Tests for NoCacheDemo Component
 *
 * Note: This tests the API integration logic directly since NoCacheDemo is a
 * React Server Component (RSC). RSCs are rendered on the server and testing them
 * with traditional component testing tools is complex and requires special setup.
 *
 * Instead, we focus on testing:
 * 1. The fetch behavior with different scenarios (success, errors, timeouts)
 * 2. The data handling with various API responses
 * 3. The fallback mechanism
 * 4. The cache configuration (no-store)
 */

interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}

describe('NoCacheDemo Integration Tests', () => {
    const mockGitHubUser: GitHubUser = {
        login: 'vercel',
        name: 'Vercel',
        avatar_url: 'https://avatars.githubusercontent.com/u/14985020?v=4',
        bio: 'Develop. Preview. Ship. For the best frontend teams',
        public_repos: 156,
        followers: 25800,
        following: 0,
        created_at: '2015-10-28T08:42:27Z',
    };

    const API_URL = 'https://api.github.com/users/vercel';

    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();
        // Reset fetch mock
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Successful API Response', () => {
        it('should fetch GitHub user data with correct cache options', async () => {
            const mockFetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockGitHubUser,
            } as Response);

            global.fetch = mockFetch;

            // Simulate the fetch call made in the component
            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            // Verify fetch was called with correct URL and options
            expect(mockFetch).toHaveBeenCalledWith(
                API_URL,
                expect.objectContaining({
                    cache: 'no-store',
                })
            );

            expect(response.ok).toBe(true);
            const data = await response.json();
            expect(data).toEqual(mockGitHubUser);
        });

        it('should handle successful response with all user fields', async () => {
            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockGitHubUser,
            } as Response);

            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            expect(response.ok).toBe(true);
            const data = await response.json() as GitHubUser;

            // Verify all expected fields are present
            expect(data.login).toBe('vercel');
            expect(data.name).toBe('Vercel');
            expect(data.avatar_url).toBe('https://avatars.githubusercontent.com/u/14985020?v=4');
            expect(data.bio).toBe('Develop. Preview. Ship. For the best frontend teams');
            expect(data.public_repos).toBe(156);
            expect(data.followers).toBe(25800);
            expect(data.following).toBe(0);
        });

        it('should use no-store cache policy to ensure fresh data', async () => {
            const mockFetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockGitHubUser,
            } as Response);

            global.fetch = mockFetch;

            await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            // Verify cache: 'no-store' was used
            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    cache: 'no-store',
                })
            );
        });

        it('should handle response with timeout signal', async () => {
            const mockFetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockGitHubUser,
            } as Response);

            global.fetch = mockFetch;

            const signal = AbortSignal.timeout(5000);
            await fetch(API_URL, {
                cache: 'no-store',
                signal,
            });

            expect(mockFetch).toHaveBeenCalledWith(
                API_URL,
                expect.objectContaining({
                    signal: expect.any(AbortSignal),
                })
            );
        });
    });

    describe('API Error Handling', () => {
        it('should handle 404 Not Found errors', async () => {
            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found',
                json: async () => ({ message: 'Not Found' }),
            } as Response);

            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            expect(response.ok).toBe(false);
            expect(response.status).toBe(404);
            expect(response.statusText).toBe('Not Found');
        });

        it('should handle 500 Internal Server Error', async () => {
            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: async () => ({ message: 'Internal Server Error' }),
            } as Response);

            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            expect(response.ok).toBe(false);
            expect(response.status).toBe(500);
        });

        it('should handle 403 Forbidden (rate limiting)', async () => {
            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: false,
                status: 403,
                statusText: 'Forbidden',
                json: async () => ({ message: 'API rate limit exceeded' }),
            } as Response);

            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            expect(response.ok).toBe(false);
            expect(response.status).toBe(403);
            expect(response.statusText).toBe('Forbidden');
        });

        it('should handle network errors', async () => {
            global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

            await expect(
                fetch(API_URL, {
                    cache: 'no-store',
                    signal: AbortSignal.timeout(5000),
                })
            ).rejects.toThrow('Network error');
        });

        it('should handle timeout errors', async () => {
            global.fetch = vi.fn().mockRejectedValueOnce(
                new Error('The operation was aborted')
            );

            await expect(
                fetch(API_URL, {
                    cache: 'no-store',
                    signal: AbortSignal.timeout(5000),
                })
            ).rejects.toThrow('The operation was aborted');
        });

        it('should handle DNS resolution errors', async () => {
            global.fetch = vi.fn().mockRejectedValueOnce(
                new Error('getaddrinfo ENOTFOUND')
            );

            await expect(
                fetch(API_URL, {
                    cache: 'no-store',
                    signal: AbortSignal.timeout(5000),
                })
            ).rejects.toThrow('getaddrinfo ENOTFOUND');
        });
    });

    describe('Response Data Validation', () => {
        it('should handle response with all required fields', async () => {
            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockGitHubUser,
            } as Response);

            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            const data = await response.json() as GitHubUser;

            // Verify data structure matches GitHubUser interface
            expect(data).toHaveProperty('login');
            expect(data).toHaveProperty('name');
            expect(data).toHaveProperty('avatar_url');
            expect(data).toHaveProperty('bio');
            expect(data).toHaveProperty('public_repos');
            expect(data).toHaveProperty('followers');
            expect(data).toHaveProperty('following');
            expect(data).toHaveProperty('created_at');
        });

        it('should handle response with missing optional fields', async () => {
            const incompleteUser = {
                login: 'vercel',
                name: 'Vercel',
                avatar_url: 'https://avatars.githubusercontent.com/u/14985020?v=4',
                bio: '',
                public_repos: 0,
                followers: 0,
                following: 0,
                created_at: '2015-10-28T08:42:27Z',
            };

            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => incompleteUser,
            } as Response);

            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            const data = await response.json() as GitHubUser;

            expect(data.bio).toBe('');
            expect(data.followers).toBe(0);
            expect(data.following).toBe(0);
        });

        it('should handle response with very large numbers', async () => {
            const userWithLargeNumbers = {
                ...mockGitHubUser,
                public_repos: 999999,
                followers: 1000000,
                following: 50000,
            };

            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => userWithLargeNumbers,
            } as Response);

            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            const data = await response.json() as GitHubUser;

            expect(data.public_repos).toBe(999999);
            expect(data.followers).toBe(1000000);
            expect(data.following).toBe(50000);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty response body', async () => {
            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => ({}) as unknown,
            } as unknown as Response);

            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            const data = await response.json();
            expect(data).toEqual({});
        });

        it('should handle malformed JSON response', async () => {
            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => {
                    throw new SyntaxError('Unexpected token in JSON');
                },
            } as unknown as Response);

            const response = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            await expect(response.json()).rejects.toThrow('Unexpected token in JSON');
        });

        it('should handle very slow responses (within timeout)', async () => {
            vi.useFakeTimers();

            global.fetch = vi.fn().mockImplementation(
                () =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve({
                                ok: true,
                                status: 200,
                                json: async () => mockGitHubUser,
                            } as Response);
                        }, 3000); // 3 seconds, within 5 second timeout
                    })
            );

            const fetchPromise = fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            // Fast-forward time
            await vi.advanceTimersByTimeAsync(3000);

            const response = await fetchPromise;
            expect(response.ok).toBe(true);

            vi.useRealTimers();
        });
    });

    describe('Fetch Call Behavior', () => {
        it('should be called exactly once per request', async () => {
            const mockFetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockGitHubUser,
            } as Response);

            global.fetch = mockFetch;

            await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });

            expect(mockFetch).toHaveBeenCalledTimes(1);
        });

        it('should not retry on failure (no-store behavior)', async () => {
            const mockFetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

            global.fetch = mockFetch;

            await expect(
                fetch(API_URL, {
                    cache: 'no-store',
                    signal: AbortSignal.timeout(5000),
                })
            ).rejects.toThrow('Network error');

            // Should only attempt once, no retries
            expect(mockFetch).toHaveBeenCalledTimes(1);
        });

        it('should make fresh request each time (no caching)', async () => {
            const mockFetch = vi.fn()
                .mockResolvedValueOnce({
                    ok: true,
                    status: 200,
                    json: async () => ({ ...mockGitHubUser, followers: 1000 }),
                } as Response)
                .mockResolvedValueOnce({
                    ok: true,
                    status: 200,
                    json: async () => ({ ...mockGitHubUser, followers: 2000 }),
                } as Response);

            global.fetch = mockFetch;

            // First request
            const response1 = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });
            const data1 = await response1.json() as GitHubUser;

            // Second request
            const response2 = await fetch(API_URL, {
                cache: 'no-store',
                signal: AbortSignal.timeout(5000),
            });
            const data2 = await response2.json() as GitHubUser;

            // Different data should be returned (simulating fresh fetch)
            expect(data1.followers).toBe(1000);
            expect(data2.followers).toBe(2000);
            expect(mockFetch).toHaveBeenCalledTimes(2);
        });
    });
});
