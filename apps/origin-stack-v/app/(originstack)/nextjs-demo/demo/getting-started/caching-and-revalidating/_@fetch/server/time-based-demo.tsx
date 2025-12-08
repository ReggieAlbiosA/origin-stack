import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Badge } from '@/components/shadcn-ui/badge';
import { RevalidateButton } from '../client/revalidate-button';
import { revalidateWeatherTag } from '../actions';
import { connection } from 'next/server';
import { DemoError } from './demo-error';

/**
 * TIME-BASED REVALIDATION DEMO
 * Uses next: { revalidate: 30 } to automatically refresh cache every 30 seconds
 * Perfect for data that updates periodically (weather, stock prices, etc.)
 */

interface WeatherData {
    latitude: number;
    longitude: number;
    timezone: string;
    current_weather: {
        temperature: number;
        windspeed: number;
        weathercode: number;
        time: string;
    };
}

// Fallback weather data
const FALLBACK_WEATHER: WeatherData = {
    latitude: 37.7749,
    longitude: -122.4194,
    timezone: 'America/Los_Angeles',
    current_weather: {
        temperature: 18.5,
        windspeed: 12.3,
        weathercode: 2,
        time: new Date().toISOString(),
    },
};

async function getWeatherData(): Promise<{ data: WeatherData; error?: string; isFallback: boolean }> {
    try {
        // San Francisco coordinates
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current_weather=true',
            {
                next: {
                    revalidate: 30, // Revalidate every 30 seconds
                    tags: ['weather'],
                },
                signal: AbortSignal.timeout(10000), // 10 second timeout for WSL2 compatibility
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json() as WeatherData;
        return { data, isFallback: false };
    } catch (error) {
        console.warn('Weather API unavailable, using fallback data:', error);
        // Randomize temperature slightly to show it's "live"
        const randomTemp = 15 + Math.random() * 10;
        return {
            data: {
                ...FALLBACK_WEATHER,
                current_weather: {
                    ...FALLBACK_WEATHER.current_weather,
                    temperature: Math.round(randomTemp * 10) / 10,
                },
            },
            error: error instanceof Error ? error.message : 'Unknown error',
            isFallback: true,
        };
    }
}

// Weather code to description mapping
function getWeatherDescription(code: number): { desc: string; emoji: string } {
    const weatherMap: Record<number, { desc: string; emoji: string }> = {
        0: { desc: 'Clear sky', emoji: '☀️' },
        1: { desc: 'Mainly clear', emoji: '🌤️' },
        2: { desc: 'Partly cloudy', emoji: '⛅' },
        3: { desc: 'Overcast', emoji: '☁️' },
        45: { desc: 'Foggy', emoji: '🌫️' },
        48: { desc: 'Foggy', emoji: '🌫️' },
        51: { desc: 'Light drizzle', emoji: '🌦️' },
        61: { desc: 'Light rain', emoji: '🌧️' },
        80: { desc: 'Rain showers', emoji: '🌧️' },
        95: { desc: 'Thunderstorm', emoji: '⛈️' },
    };

    return weatherMap[code] || { desc: 'Unknown', emoji: '🌍' };
}

export default async function TimeBasedDemo() {
    // Access connection to ensure dynamic rendering
    await connection();

    const { data: weather, error, isFallback } = await getWeatherData();
    const fetchTime = new Date().toLocaleTimeString();
    const weatherInfo = getWeatherDescription(weather.current_weather.weathercode);

    // If using fallback data, show error state
    if (isFallback) {
        return (
            <DemoError
                title="Time-based Revalidation Demo"
                description="next: { revalidate: 30 }"
                error={error || 'API unavailable'}
                badgeText="ISR - 30s"
                badgeClassName="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800"
            />
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Time-based Revalidation Demo</CardTitle>
                        <CardDescription>
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                next: &#123; revalidate: 30 &#125;
                            </code>
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800">
                        ISR - 30s
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border rounded-lg p-6">
                    <div className="text-center space-y-4">
                        <div className="text-6xl">{weatherInfo.emoji}</div>
                        <div>
                            <h3 className="text-3xl font-bold">
                                {weather.current_weather.temperature}°C
                            </h3>
                            <p className="text-muted-foreground">{weatherInfo.desc}</p>
                        </div>
                        <div className="flex justify-center gap-8 text-sm">
                            <div>
                                <div className="text-muted-foreground">Wind Speed</div>
                                <div className="font-semibold">{weather.current_weather.windspeed} km/h</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">Location</div>
                                <div className="font-semibold">San Francisco</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-muted-foreground pt-4 border-t space-y-1">
                    <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">Stale-While-Revalidate ✓</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fetched at:</span>
                        <span className="font-mono">{fetchTime}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Revalidate interval:</span>
                        <span className="font-mono">30 seconds</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Cache tag:</span>
                        <span className="font-mono">'weather'</span>
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <p className="text-xs text-muted-foreground">
                        Manually trigger revalidation:
                    </p>
                    <RevalidateButton
                        action={revalidateWeatherTag}
                        label="Revalidate Now"
                        variant="outline"
                    />
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                    <p className="text-xs text-green-800 dark:text-green-200">
                        <strong>How it works:</strong> Data is cached for 30 seconds. After the interval expires,
                        the next request serves stale data while fresh data is fetched in the background.
                        Subsequent requests get the updated data. This provides the best of both worlds: speed + freshness!
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
