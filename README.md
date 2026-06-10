<p align="center">
  <img src="Brocast-logo.png" alt="BroCast Logo" width="200">
</p>

# BroCast

"Forecast by WeatherAPI. Judgment by BroCast."

## Product Philosophy
BroCast is NOT a weather dashboard. It is a premium internet joke disguised as a weather application.
Every feature is optimized for emotional accuracy, shareability, personality, and humor over meteorological analysis and dense data displays. We don't predict the weather; we judge it.

## Features
- **Feels Like Temperature**: We show what the weather actually feels like, because humans experience "feels like" temperature, not laboratory temperature.
- **Scooter Seat Temperature**: A fun, unscientific metric to show how dangerously hot your scooter seat has become.
- **Touch Grass Difficulty**: Forget generic weather scores. Our 0-100 scale tells you exactly how hostile the outdoors are.
- **Premium Design**: Built with large typography, sleek gradients, and subtle motion inspired by Linear, Stripe, and Raycast. No dashboard aesthetics.
- **Condition-Based Roast Engine**: Highly dynamic comments generated based on complex weather combinations (e.g., heat + humidity, rain + cold, bad AQI).
- **Achievements**: Unlock ridiculous badges for simply surviving outside.
- **Native Sharing**: One-click premium screenshot generation that copies perfectly to your clipboard for instant sharing.

## Technology Stack
- Vanilla HTML5 / CSS3 / JavaScript
- No frontend frameworks
- Custom SVG rendering engine for celestial bodies
- CSS Glassmorphism and Backdrop Filters
- `html-to-image` for high-quality native DOM screenshots

## Cloudflare Worker Architecture
To ensure complete security, the WeatherAPI key is NEVER used directly in the frontend. 
The application communicates exclusively with a Cloudflare Worker proxy (`https://brocast-api.happysmile123444.workers.dev/`).

The Worker acts as a secure intermediary:
- **Search Autocomplete**: `/?type=search&q={city}`
- **Forecast & Current Weather**: `/?type=forecast&q={city}` (Returns current conditions, astronomy, and alerts)

The Worker stores the `WEATHER_API_KEY` securely inside Cloudflare Secrets and returns the data payload in a `{ "success": true, "data": {...} }` wrapper.

## Local Development
1. Clone the repository: `git clone https://github.com/VIKAS-REREAL/Brocast-REREAL.git`
2. Open `index.html` in your browser or run a simple local server.
3. No build step or environment variables required for the frontend.

## GitHub Pages Deployment
This repository is configured to be deployed natively via GitHub Pages. Since it consists only of static HTML, CSS, and JS, simply enable GitHub Pages in your repository settings and point it to the `main` branch.

## Security Notes
- The frontend does not contain any API keys or secrets.
- All requests are proxied.
- Do not add `.env` files to the frontend repository.

## License
MIT License. See `LICENSE` for more information.
