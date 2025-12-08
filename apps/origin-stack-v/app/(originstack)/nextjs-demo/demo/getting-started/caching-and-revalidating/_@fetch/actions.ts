'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Revalidate cache entries tagged with 'posts'
 * Used in the tag-based demo to show on-demand cache invalidation
 */
export async function revalidatePostsTag() {
    try {
        revalidateTag('posts', 'max');
        return { success: true, message: 'Posts cache invalidated successfully!' };
    } catch (error) {
        console.error('Failed to revalidate posts tag:', error);
        return { success: false, error: 'Failed to invalidate cache' };
    }
}

/**
 * Revalidate cache entries tagged with 'weather'
 * Used in the time-based demo to manually trigger revalidation
 */
export async function revalidateWeatherTag() {
    try {
        revalidateTag('weather', 'max');
        return { success: true, message: 'Weather cache invalidated successfully!' };
    } catch (error) {
        console.error('Failed to revalidate weather tag:', error);
        return { success: false, error: 'Failed to invalidate cache' };
    }
}

/**
 * Revalidate the entire @fetch page
 * Demonstrates path-based revalidation
 */
export async function revalidateDemoPath() {
    try {
        revalidatePath('/nextjs-demo/demo/getting-started/caching-and-revalidating');
        return { success: true, message: 'Page cache revalidated successfully!' };
    } catch (error) {
        console.error('Failed to revalidate path:', error);
        return { success: false, error: 'Failed to revalidate page' };
    }
}

/**
 * Revalidate all demo caches at once
 */
export async function revalidateAllDemos() {
    try {
        revalidateTag('posts', 'max');
        revalidateTag('weather', 'max');
        revalidateTag('quotes', 'max');
        return { success: true, message: 'All demo caches invalidated!' };
    } catch (error) {
        console.error('Failed to revalidate all:', error);
        return { success: false, error: 'Failed to invalidate caches' };
    }
}

