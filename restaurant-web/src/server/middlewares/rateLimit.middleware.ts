import { NextRequest } from "next/server";

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const apiRequests = new Map<string, RateLimitEntry>();

const authRequests = new Map<string, RateLimitEntry>();

const API_WINDOW_MS = 60 * 1000;
const API_MAX_REQUESTS = 100;

const AUTH_WINDOW_MS = 10 * 60 * 1000;
const AUTH_MAX_REQUESTS = 5;

function getClientIp(request: NextRequest): string {
    const forwardedFor =
        request.headers.get("x-forwarded-for");

    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }

    return (
        request.headers.get("x-real-ip") ??
        "unknown"
    );
}

function checkLimit(
    store: Map<string, RateLimitEntry>,
    key: string,
    windowMs: number,
    maxRequests: number
) {
    const now = Date.now();

    const existing = store.get(key);

    // First request or previous window expired
    if (!existing || existing.resetAt <= now) {
        store.set(key, {
            count: 1,
            resetAt: now + windowMs,
        });

        return {
            success: true,
            remaining: maxRequests - 1,
        };
    }

    // Limit reached
    if (existing.count >= maxRequests) {
        return {
            success: false,
            remaining: 0,
            retryAfter: Math.ceil(
                (existing.resetAt - now) / 1000
            ),
        };
    }

    existing.count += 1;

    return {
        success: true,
        remaining: maxRequests - existing.count,
    };
}

export function checkApiRateLimit(
    request: NextRequest
) {
    const ip = getClientIp(request);

    return checkLimit(
        apiRequests,
        ip,
        API_WINDOW_MS,
        API_MAX_REQUESTS
    );
}

export function checkAuthRateLimit(
    request: NextRequest
) {
    const ip = getClientIp(request);

    return checkLimit(
        authRequests,
        ip,
        AUTH_WINDOW_MS,
        AUTH_MAX_REQUESTS
    );
}