// ============================================================
// BroCast Weather Engine v2
// "Optimize for emotional accuracy, not weather accuracy."
// ============================================================

// --- 1% Rare Easter Eggs ---
const easterEggs = [
    "The sun has personally selected you.",
    "Weather status: Character development.",
    "You have unlocked: Premium Suffering.",
    "This weather was brought to you by your past karma.",
    "Error 404: Comfortable weather not found.",
    "The atmosphere is gaslighting you.",
    "Plot twist: the weather is the main character today.",
    "You're not sweating. You're glistening with regret.",
    "Breaking news: The sky hates you specifically.",
    "This temperature is a personal attack.",
    "The weather is giving main villain energy today.",
    "Somebody set the thermostat to 'revenge'.",
    "Did you anger an ancient deity recently?",
    "Your survival instincts are about to kick in.",
    "Outside is officially cancelled.",
    "Nature is testing your patience. You are failing.",
    "If you go outside, tell my WiFi I love it.",
    "The simulation is glitching out today.",
    "God's AC is broken and we are paying the price.",
    "The weather app developer is currently crying.",
    "Even the UI doesn't want to load this.",
    "A moment of silence for your electricity bill.",
    "Welcome to the beta test of the apocalypse.",
    "The weather is operating on pure spite right now.",
    "We are all NPCs in a disaster movie today."
];

// --- Comment Database (200+ lines, condition-combo aware) ---
const comments = {

    // === CONDITION COMBOS (checked first for higher specificity) ===

    heat_humid: [
        "The air is now soup.",
        "You're not breathing air. You're drinking it.",
        "Welcome to the outdoor sauna nobody asked for.",
        "Humidity so high, the sweat can't even evaporate.",
        "The air has the texture of a warm wet towel.",
        "It's not just hot. It's hot AND sticky. The worst combo.",
        "Your glasses fog up the moment you step outside.",
        "Even your sweat is sweating.",
        "The atmosphere is trying to drown you slowly.",
        "You're basically marinating in your own misery.",
        "The air is so thick you need to chew before breathing.",
        "Steam room vibes, but you can't leave.",
        "Breathing feels like inhaling hot bathwater.",
        "The air is physically sticky.",
        "You could cut the humidity with a knife.",
        "It's like walking through a hot, invisible swamp.",
        "I've felt less sticky covered in honey.",
        "Your clothes are now permanently glued to your body.",
        "It's 90% water out here and none of it is drinkable."
    ],

    heat_wind: [
        "Congratulations. The oven now has a fan.",
        "Hot wind. Like a hair dryer aimed at your soul.",
        "The breeze is just redistributing the suffering.",
        "Wind doesn't help when the air is preheated.",
        "Nature's convection oven mode: activated.",
        "The wind is hot. Even the wind is against you.",
        "A fan in hell would be more useful than this breeze.",
        "Breezy and boiling. The worst vacation ever.",
        "The wind is just the heat's delivery system.",
        "Imagine wind, but angry and warm.",
        "It's like a dragon is breathing on the entire city.",
        "The wind feels like exhaust from a moving bus.",
        "Opening the window just lets the fire inside.",
        "A breeze shouldn't feel like a physical threat.",
        "The air is moving, but it's not helping."
    ],

    heat_aqi: [
        "You are being slow-roasted in smog.",
        "Hot AND toxic. Your lungs are filing a complaint.",
        "The air is spicy today. And not in a good way.",
        "Getting cooked in premium polluted air.",
        "Double damage: heat + poison air combo.",
        "The sun is trying to kill you. The air is helping.",
        "Your lungs and your skin are both under attack.",
        "Heatstroke AND pollution. Achievement unlocked.",
        "The atmosphere has chosen violence today.",
        "Breathing is PvP today.",
        "The air is visible, chewy, and hot.",
        "It's a great day to stay inside and filter your own air.",
        "You are smoking 10 cigarettes a day just by sweating outside.",
        "The sky is a toxic yellow blanket of doom.",
        "Hot smog. The worst flavor of oxygen."
    ],

    rain_heat: [
        "Warm rain. Like God's sweat.",
        "It's raining but it's still hot. Make it make sense.",
        "The rain is warm. Even the sky is sweating.",
        "Wet AND hot. The worst personality combo.",
        "The rain is not refreshing. It's just wet heat.",
        "Tropical depression. Both the weather and your mood.",
        "Steam rises from the road. Welcome to the pressure cooker.",
        "Hot rain. Nature's lukewarm shower.",
        "The sky is crying but the tears are warm.",
        "Monsoon preview: wet, hot, and miserable.",
        "It's like a dishwasher is running outside.",
        "You are now a steamed dumpling.",
        "The puddles are literally warm.",
        "It's raining hot soup.",
        "Wet, sticky, and tragic."
    ],

    rain_cold: [
        "Cold shower from the sky. Free of charge.",
        "The sky is crying and so will you.",
        "Perfect weather to question every life decision.",
        "Wet AND cold. The desi winter special.",
        "Your bones are cold. Your socks are wet. Life is pain.",
        "The rain is cold. Your motivation is colder.",
        "Imagine being comfortable. Can't relate today.",
        "Cold rain: Nature's way of testing your will.",
        "Your umbrella can't protect you from this misery.",
        "Getting cold AND wet. Not the vibe.",
        "You step in one puddle and your day is ruined.",
        "The wind is freezing, the rain is freezing, you are freezing.",
        "It's giving 'sad movie montage' energy.",
        "A hot chai is the only thing standing between you and a breakdown.",
        "Everything you touch is damp and freezing."
    ],

    cold_wind: [
        "The wind is slapping you on purpose.",
        "Windchill is the universe's favorite prank.",
        "The cold wasn't enough. The wind joined the chat.",
        "Your face is being sandpapered by icy wind.",
        "The wind is personally invested in your suffering.",
        "Cold + wind = why scarves were invented.",
        "The breeze is committing assault.",
        "Feels like standing inside a freezer with a fan.",
        "The wind has chosen you as its victim today.",
        "Your nose is running faster than you ever will.",
        "Every gust of wind removes a year of your life.",
        "The wind cuts through jackets like they are made of paper.",
        "You don't need a jacket, you need a bunker.",
        "Even your bones are shivering.",
        "Walking against this wind is a full workout."
    ],

    // === CONDITION-BASED ===

    thunder: [
        "Zeus is having a really bad day outside.",
        "The sky is flashing like an Indian wedding DJ.",
        "Thor just landed in your neighborhood.",
        "Nature is currently doing a factory reset.",
        "God is taking flash photos.",
        "It sounds like a Michael Bay movie out there.",
        "Good time to unplug the expensive TV.",
        "The clouds are currently throwing hands.",
        "WiFi connection has left the chat.",
        "Your dog is probably hiding under the bed.",
        "The sky is auditioning for an action movie.",
        "Lightning round: Nature's light show. No tickets needed.",
        "The sky is literally screaming.",
        "If you have plans, the thunder just cancelled them.",
        "Nature's bass drop is too loud today.",
        "The clouds are angry and they want you to know it."
    ],

    rain: [
        "Perfect weather to cancel all your plans and sleep.",
        "The sky is crying because of your life choices.",
        "Auto driver rejection rate is now at 200%.",
        "Puddle dodging season is officially open.",
        "Time to order Pakodas and romanticize your life.",
        "Nature is spitting on you. Respectfully.",
        "Traffic is about to become a survival game.",
        "Umbrella is useless. You will get splashed by a car.",
        "Great day to stay in bed and doomscroll.",
        "Your laundry is officially ruined.",
        "Everything smells like wet dog and regret.",
        "The roads are now classified as rivers.",
        "Delivery guys deserve a raise today.",
        "Waterproofing test for your shoes: FAILED.",
        "Your plans have been cancelled by the sky.",
        "Drizzling. Just enough to be annoying.",
        "It's spitting. The sky is literally spitting.",
        "Everything is grey. Your mood included.",
        "Your umbrella will definitely flip inside out today."
    ],

    aqiBad: [
        "Air so thick you can literally chew it. RIP lungs.",
        "Breathing is officially a health hazard.",
        "Your lungs just filed a restraining order against the sky.",
        "I've seen cleaner air inside a smoking lounge.",
        "Congratulations, you are now a passive smoker.",
        "Taking a deep breath is considered an extreme sport today.",
        "The sky looks like it was downloaded on 2G.",
        "N95 mask or early grave. Your choice.",
        "Currently breathing in 4K resolution smog.",
        "You don't need a cigarette. Just open the window.",
        "Every breath is a side quest.",
        "The air quality is 'Industrial Revolution' level.",
        "It's not fog. It's premium toxic smog.",
        "Your life expectancy drops with every inhale.",
        "The AQI is higher than your credit score.",
        "Air purifiers are fighting for their lives.",
        "Visibility is zero. Oxygen is optional."
    ],

    // === TEMPERATURE-BASED (fallback) ===

    hell: [
        "Bro, the sun is taking this personally.",
        "Welcome to the surface of the actual Sun.",
        "You are legally allowed to punch anyone who says 'go outside'.",
        "Stepping outside is an act of extreme courage.",
        "Your skin is actively melting off your bones.",
        "The atmosphere has completely given up.",
        "Satan is currently taking notes from this weather.",
        "We are getting cooked like leftover rice.",
        "The AC is crying for help.",
        "Even the stray dogs are looking for an AC.",
        "You don't sweat anymore. You just evaporate.",
        "Frying an egg on the road is no longer a joke.",
        "The pavement is plotting your assassination.",
        "Your scooter seat is now a weapon.",
        "Congratulations, you have survived into the apocalypse.",
        "If you go outside, you will instantly turn to ash.",
        "The sun is basically a deadly laser.",
        "Everything outside is lava.",
        "Water boils instantly upon touching the ground."
    ],

    extreme: [
        "Your scooter seat is an actual frying pan right now.",
        "The sun is out for blood.",
        "It's not even noon and we're already getting cooked.",
        "Walking outside feels like opening a hot oven.",
        "Hydration is no longer a choice. It's mandatory.",
        "Your sweat is sweating.",
        "Taking a shower just makes you a wet, hot mess.",
        "The birds have stopped singing and started hiding.",
        "Even the shade is hot.",
        "Why did we decide to build a city here?",
        "Do not touch the steering wheel without oven mitts.",
        "Global warming is not a myth. It's right outside your door.",
        "I'm considering moving to Antarctica.",
        "The air conditioner deserves a national award.",
        "We are essentially living in a microwave.",
        "The sun is staring at you. Do not blink.",
        "Step outside and become instant jerky.",
        "You are slowly turning into a baked potato."
    ],

    hot: [
        "Congratulations, you live inside a Momo steamer.",
        "AC on 16. Fan on 5. Blanket still required.",
        "The air is 90% sweat right now.",
        "RIP to your electricity bill this month.",
        "I took a shower 5 minutes ago and I'm already sweating.",
        "Deodorant is fighting for its life.",
        "You can literally see the heat waves on the road.",
        "Sticky, sweaty, and entirely unpleasant.",
        "Cold water hits different today.",
        "Don't wear grey t-shirts unless you want sweat patches.",
        "The fan is just blowing hot air at me.",
        "Nature's sauna, but without the relaxation.",
        "I miss winter. I take back everything bad I said.",
        "A cold shower is the only salvation.",
        "Ice cream melts before you can even eat it.",
        "You step outside, you sweat. It is the law.",
        "Sunscreen is your only shield.",
        "You feel sticky. Everyone feels sticky. We are all sticky."
    ],

    warm: [
        "It's warm enough to be annoying.",
        "You will sweat, but you won't die.",
        "T-shirt weather, but make it uncomfortable.",
        "The AC is optional but highly recommended.",
        "Perfect temperature for mosquitos to thrive.",
        "Not hot enough to complain, not cool enough to enjoy.",
        "Just a deeply average, slightly sweaty day.",
        "Fan on speed 3 is the perfect vibe.",
        "You can walk outside without instantly regretting it.",
        "Drink water, but don't panic.",
        "The sun is present, but not aggressive.",
        "A deeply mid weather experience.",
        "Nothing special. Just exist.",
        "You might get a little sticky by noon.",
        "Acceptable conditions for human life.",
        "The weather is basically 'room temperature' outside."
    ],

    pleasant: [
        "Rare W for the weather today.",
        "Perfect weather to fake your aesthetic life on Instagram.",
        "Main character energy outside.",
        "Go touch grass. It actually feels nice.",
        "Nature is finally cooperating.",
        "You have zero excuses to be unproductive today.",
        "The kind of weather that makes you want to fall in love.",
        "Breeze is breezing. Vibes are immaculate.",
        "Open the windows and let the fresh air in.",
        "Peak human operating conditions.",
        "This is why we pay rent.",
        "Actually, life is pretty good.",
        "No sweating, no shivering. Just perfect.",
        "Take a walk. You need it.",
        "The weather is carrying your mood today.",
        "It's so nice outside it feels suspicious.",
        "You couldn't ask for better weather. Stop complaining.",
        "A 10/10 day. Go enjoy it."
    ],

    cool: [
        "Mummy was right. Put a sweater on.",
        "Fan is off, blanket is out.",
        "Chai hits absolutely different right now.",
        "Perfect sleeping weather. Turn off the alarm.",
        "Getting out of bed is a struggle.",
        "Hoodie season is approaching.",
        "Cozy vibes only.",
        "Time to pretend we live in a cold country.",
        "Don't turn on the fan. Are you crazy?",
        "Bathing requires mental preparation.",
        "The air is crisp, like a fresh apple.",
        "Cuddle weather, but you are single.",
        "Actually shivering a little bit.",
        "Socks in bed weather.",
        "Hot chocolate kind of day.",
        "If you have a jacket, wear it.",
        "Winter is sending its regards.",
        "The floor is lava, but only because it's too cold to step on."
    ]
};

// --- Achievements (50+ entries) ---
const achievements = {
    heat_extreme: [
        "Scooter Seat Survivor", "AC Hostage", "Sunscreen Bankrupt", "Human Tandoori", 
        "Electricity Bill Champion", "Cold Shower Convert", "Walked Into the Sun Voluntarily", 
        "Dehydration Risk Taker", "Melting Point Discovered", "Oven Mitt Driver", "Satan's Roommate",
        "Heatstroke Evader", "Shadow Hunter", "Evaporating Rapidly"
    ],
    heat: [
        "Ceiling Fan Believer", "Ice Cube Investor", "Sweat Patch Artist", "Deodorant Dependent", 
        "Water Bottle Loyalist", "Sticky Situation", "Fan Speed 5 Enjoyer", "Sunburn Collector",
        "Hydration Hero"
    ],
    cold: [
        "Blanket Burrito", "Chai Dependent", "Refusing to Bathe", "Sweater Hoarder", 
        "Heater Hugger", "Rajma Chawal Weather Certified", "Frostbite Tester", "Socks In Bed Enjoyer",
        "Shivering Champion", "Hibernation Mode Activated"
    ],
    rain: [
        "Puddle Dodger Pro", "Cancelled Plans Master", "Pakoda Economist", "Umbrella Forgetter", 
        "Indoor Champion", "Wet Socks Veteran", "Mud Splatter Magnet", "Traffic Jam Survivor",
        "Romanticizing The Dampness", "Crying With The Sky"
    ],
    aqi: [
        "Iron Lungs", "Mask Fashion Icon", "Pollution Survivor", "Professional Breath Holder",
        "Coughing Champion", "Air Purifier Financier", "Passive Smoker Level 99", "Smog Navigator"
    ],
    general: [
        "Walked Outside Voluntarily", "Actually Touched Grass", "Hydration Enthusiast", 
        "Survived the Commute", "Professional Complainer", "Weather Screenshot Specialist",
        "Sky Observer", "Existed Today", "Window Stare Master"
    ]
};

// --- Verdicts (by difficulty range) ---
const verdicts = {
    effortless: [
        "Flawless. Go touch grass.", "The weather is being suspiciously nice.", 
        "No excuses. Go outside and be a functional human.", "Excellent weather. Go be productive for once.", 
        "The universe is smiling at you. Suspicious.", "Peak vibes. Don't waste it inside.",
        "Absolute 10/10. Do not squander this."
    ],
    manageable: [
        "Surprisingly decent. Don't get used to it.", "You might actually enjoy today. Weird.", 
        "Cautious optimism is allowed.", "Not bad. The sky has chosen peace today.", 
        "Acceptable vibes. Proceed.", "It could be worse. Be grateful.", "A deeply average experience awaits."
    ],
    questionable: [
        "Proceed with moderate expectations.", "Pack water and prayers.", 
        "Stay hydrated or stay home. Your call.", "It's giving 'maybe stay inside' energy.", 
        "Survivable, but not enjoyable.", "It's an 'indoor activities only' kind of day.", 
        "Nature is mildly annoyed with you today."
    ],
    hostile: [
        "Avoid unnecessary heroism.", "The outdoors is not your friend today.", 
        "Consider working from home. For your safety.", "Only go outside if absolutely necessary.", 
        "The weather woke up violent today.", "Nature is actively hostile. Retreat.", 
        "You will regret stepping outside. Guaranteed."
    ],
    absolutelyNot: [
        "Touch grass? Absolutely not.", "Stay inside and pretend you're productive.", 
        "Going outside is a war crime against yourself.", "Cancel everything. The sky said no.", 
        "The sun woke up angry today. Stay hidden.", "Survival mode engaged. Lock the doors.",
        "Your bed is the only safe place left."
    ]
};

// --- Footer Taglines ---
const footerTaglines = [
    "Forecast by WeatherAPI. Judgment by BroCast.",
    "Based on real weather data. Emotional damage generated locally.",
    "Accuracy not guaranteed. Suffering is.",
    "We don't predict weather. We judge it.",
    "Data from satellites. Roasts from the heart.",
    "Your weather app could never.",
    "Brought to you by existential dread and CSS.",
    "Look out a window to verify. We might be lying.",
    "If it's wrong, blame the API. If it's funny, praise BroCast."
];

// --- Daily Record Templates ---
const dailyRecordTemplates = [
    "Today's peak: {max}°C. The pavement has feelings too.",
    "High of {max}°C expected. Stay hydrated or stay crispy.",
    "Forecasted max: {max}°C. The sun woke up and chose violence.",
    "Today hits {max}°C. Your scooter seat is already crying.",
    "Peak suffering: {max}°C. Plan accordingly.",
    "Max temp today: {max}°C. Mother Nature is unhinged.",
    "Prepare for {max}°C. Cancel your afternoon plans.",
    "The sky threatens {max}°C later. Good luck.",
    "Hitting {max}°C today. It's over for you."
];

// --- Loading Messages ---
const loadingMessages = [
    "Consulting the heavens...",
    "Measuring atmospheric suffering...",
    "Calculating scooter seat burns...",
    "Asking the sun to chill...",
    "Downloading weather opinions...",
    "Generating emotional damage...",
    "Checking if it's safe outside...",
    "Looking out the virtual window...",
    "Preparing your daily roast...",
    "Judging your local climate..."
];


// ============================================================
// THE ENGINE
// ============================================================

const WeatherEngine = {

    // --- Custom BroCast "Feels Like" (NOAA Heat Index + Wind Chill) ---
    calculateFeelsLike: (tempC, humidity, windKph) => {
        if (tempC >= 26) {
            let T = (tempC * 9 / 5) + 32;
            let HI = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (humidity * 0.094));

            if ((HI + T) / 2 >= 80) {
                HI = -42.379 + 2.04901523 * T + 10.14333127 * humidity - 0.22475541 * T * humidity - 0.00683783 * T * T - 0.05481717 * humidity * humidity + 0.00122874 * T * T * humidity + 0.00085282 * T * humidity * humidity - 0.00000199 * T * T * humidity * humidity;

                if (humidity < 13 && T >= 80 && T <= 112) {
                    let adj = ((13 - humidity) / 4) * Math.sqrt(Math.max(0, 17 - Math.abs(T - 95)) / 17);
                    HI -= adj;
                } else if (humidity > 85 && T >= 80 && T <= 87) {
                    let adj = ((humidity - 85) / 10) * ((87 - T) / 5);
                    HI += adj;
                }
            }
            let feelsLikeC = (HI - 32) * 5 / 9;
            return Math.round(Math.max(tempC, feelsLikeC));
        }

        if (tempC <= 10 && windKph > 4.8) {
            let v = Math.pow(windKph, 0.16);
            let WC = 13.12 + 0.6215 * tempC - 11.37 * v + 0.3965 * tempC * v;
            return Math.round(Math.min(tempC, WC));
        }

        return Math.round(tempC);
    },

    // --- Touch Grass Difficulty (0-100) ---
    calculateDifficulty: (temp, humidity, wind, rain, aqi = 1) => {
        let score = 50;
        if (temp > 25) score += (temp - 25) * 2;
        if (temp < 15) score += (15 - temp) * 2;
        if (humidity > 70) score += (humidity - 70) * 0.5;
        if (wind > 20) score += (wind - 20) * 0.8;
        if (rain > 0) score += rain * 5;
        if (aqi > 3) score += (aqi - 3) * 8;
        return Math.min(100, Math.max(0, Math.round(score)));
    },

    // --- Difficulty Label ---
    getDifficultyLabel: (score) => {
        if (score <= 20) return "Effortless";
        if (score <= 40) return "Manageable";
        if (score <= 60) return "Questionable";
        if (score <= 80) return "Hostile";
        return "Absolutely Not";
    },

    // --- Scooter Seat Temperature (fun, not science) ---
    calculateScooterSeat: (tempC, uvIndex) => {
        if (tempC <= 25) return null;
        let seat = tempC + (tempC - 20) * 1.2 + (uvIndex || 0) * 2;
        return Math.round(Math.min(seat, tempC + 35));
    },

    // --- Commentary Engine (condition-combo aware, 1% easter eggs) ---
    getCommentary: (temp, humidity, wind, rain, condition, aqi) => {
        // 1% easter egg chance
        if (Math.random() < 0.01) {
            return easterEggs[Math.floor(Math.random() * easterEggs.length)];
        }

        let category;

        // Priority 1: Severe conditions
        if (aqi >= 5) category = 'aqiBad';
        else if (condition.includes('thunder')) category = 'thunder';

        // Priority 2: Condition combos (higher specificity)
        else if (temp >= 35 && humidity > 60) category = 'heat_humid';
        else if (temp >= 35 && wind > 15) category = 'heat_wind';
        else if (temp >= 30 && aqi >= 4) category = 'heat_aqi';
        else if ((condition.includes('rain') || condition.includes('drizzle')) && temp >= 28) category = 'rain_heat';
        else if ((condition.includes('rain') || condition.includes('drizzle')) && temp < 20) category = 'rain_cold';
        else if (temp < 15 && wind > 15) category = 'cold_wind';

        // Priority 3: Single conditions
        else if (condition.includes('rain') || condition.includes('drizzle')) category = 'rain';

        // Priority 4: Temperature ranges
        else if (temp >= 45) category = 'hell';
        else if (temp >= 40) category = 'extreme';
        else if (temp >= 35) category = 'hot';
        else if (temp >= 30) category = 'warm';
        else if (temp >= 20) category = 'pleasant';
        else category = 'cool';

        const lines = comments[category];
        return lines[Math.floor(Math.random() * lines.length)];
    },

    // --- Verdict (by difficulty + AQI override) ---
    getVerdict: (difficulty, aqi) => {
        if (aqi >= 5) return "Wear an N95 or write your will.";

        let range;
        if (difficulty <= 20) range = 'effortless';
        else if (difficulty <= 40) range = 'manageable';
        else if (difficulty <= 60) range = 'questionable';
        else if (difficulty <= 80) range = 'hostile';
        else range = 'absolutelyNot';

        const lines = verdicts[range];
        return lines[Math.floor(Math.random() * lines.length)];
    },

    // --- Achievement (random, category-aware) ---
    getAchievement: (temp, rain, aqi, humidity, wind) => {
        let pool = [];

        if (temp > 40) pool = pool.concat(achievements.heat_extreme);
        else if (temp > 30) pool = pool.concat(achievements.heat);
        else if (temp < 15) pool = pool.concat(achievements.cold);
        else pool = pool.concat(achievements.general);

        if (rain > 0) pool = pool.concat(achievements.rain);
        if (aqi >= 4) pool = pool.concat(achievements.aqi);

        return pool[Math.floor(Math.random() * pool.length)];
    },

    // --- Daily Record (from forecast max temp) ---
    getDailyRecord: (maxTemp) => {
        if (!maxTemp) return null;
        const template = dailyRecordTemplates[Math.floor(Math.random() * dailyRecordTemplates.length)];
        return template.replace('{max}', Math.round(maxTemp));
    },

    // --- Footer Tagline ---
    getFooterTagline: () => {
        return footerTaglines[Math.floor(Math.random() * footerTaglines.length)];
    },

    // --- Loading Message ---
    getLoadingMessage: () => {
        return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    },

    // --- UI Config (Premium Color Palette) ---
    getUIConfig: (temp, condition) => {
        // Temperature extremes (highest priority)
        if (temp >= 45) return { c1: '#6B0F1A', c2: '#1a0005', sound: 'damage.mp3' };
        if (temp >= 40) return { c1: '#9B2335', c2: '#2d0a10', sound: 'vine_boom.mp3' };
        if (temp >= 35) return { c1: '#C46210', c2: '#3a1d05', sound: 'alert.mp3' };

        // Condition-based (override temperature)
        if (condition.includes('fog') || condition.includes('mist')) return { c1: '#5a6a72', c2: '#1a2025', sound: 'wind.mp3' };
        if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder')) return { c1: '#1a2535', c2: '#050a10', sound: 'rain.mp3' };
        if (condition.includes('snow') || condition.includes('ice') || condition.includes('blizzard')) return { c1: '#4a6580', c2: '#121e28', sound: 'shiver.mp3' };

        // Temperature ranges
        if (temp >= 30) return { c1: '#B8860B', c2: '#2a1f03', sound: 'alert.mp3' };
        if (temp >= 20) return { c1: '#1a6b4a', c2: '#0a1f16', sound: 'choir.mp3' };
        if (temp >= 10) return { c1: '#2d5a8e', c2: '#0a1a2d', sound: 'wind.mp3' };
        return { c1: '#1a2744', c2: '#050a14', sound: 'shiver.mp3' };
    },

    // --- Dynamic SVG Graphics ---
    getGraphics: (temp, condition, isDay) => {
        let html = '';

        const sunSVG = `<svg class="dynamic-sun" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glowSun" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="15" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs><circle cx="100" cy="100" r="50" fill="#FFD700" filter="url(#glowSun)" /></svg>`;
        const hellSunSVG = `<svg class="dynamic-sun hell" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glowHell" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs><circle cx="100" cy="100" r="50" fill="#FF4500" filter="url(#glowHell)" /></svg>`;
        const moonSVG = `<svg class="dynamic-moon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glowMoon" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs><circle cx="100" cy="100" r="50" fill="#DCE5F2" filter="url(#glowMoon)" /></svg>`;
        const pleasantSunSVG = `<svg class="dynamic-sun pleasant" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glowPleasant" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="15" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs><circle cx="100" cy="100" r="50" fill="#FFFACD" filter="url(#glowPleasant)" /></svg>`;
        const cloudSVG = `<svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg"><path d="M20 40 Q10 40 10 30 Q10 20 25 20 Q30 10 45 10 Q60 10 65 20 Q80 20 80 30 Q80 40 70 40 Z" fill="#FFFFFF" opacity="0.5"/></svg>`;

        // Sun / Moon Logic - Always show them so the scene feels alive
        if (isDay) {
            if (temp >= 40) {
                html += hellSunSVG;
            } else if (condition.includes('rain') || condition.includes('drizzle')) {
                html += pleasantSunSVG;
            } else {
                html += sunSVG;
            }
        } else {
            html += moonSVG;
        }

        // Random Clouds Logic
        const hasClouds = condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder') || condition.includes('cloud') || condition.includes('overcast') || condition.includes('fog') || condition.includes('mist') || condition.includes('haze');
        
        if (hasClouds) {
            const numClouds = Math.floor(Math.random() * 5) + 4; // 4 to 8 clouds
            for (let i = 0; i < numClouds; i++) {
                const top = Math.random() * 85; // 0% to 85% down the screen
                const duration = Math.random() * 40 + 20; // 20s to 60s
                const delay = Math.random() * -60; // Start at random points along the path
                const scale = Math.random() * 1.5 + 0.5; // 0.5x to 2.0x size
                const opacity = Math.random() * 0.4 + 0.05; // 0.05 to 0.45 opacity
                
                html += `<div class="cloud-wrapper" style="top: ${top}%; animation-duration: ${duration}s; animation-delay: ${delay}s; opacity: ${opacity};"><div style="transform: scale(${scale});">${cloudSVG}</div></div>`;
            }
        }

        return html;
    }
};

window.WeatherEngine = WeatherEngine;
