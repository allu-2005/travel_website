// Basic curated attraction data for a few well known destinations.
// This keeps everything client-side and avoids external dependencies except weather.
const DESTINATION_PRESETS = {
  "paris": {
    country: "France",
    attractions: [
      {
        name: "Eiffel Tower & Trocadéro",
        area: "7th arrondissement",
        type: "iconic",
        bestTime: "morning",
        description: "Beat the crowds and enjoy soft morning light over Paris.",
      },
      {
        name: "Louvre Museum",
        area: "1st arrondissement",
        type: "culture",
        bestTime: "late-morning",
        description: "Explore masterpieces like the Mona Lisa and Winged Victory.",
      },
      {
        name: "Seine River Cruise",
        area: "Central Paris",
        type: "relax",
        bestTime: "evening",
        description: "Take in the city lights from the water at golden hour.",
      },
      {
        name: "Montmartre & Sacré-Cœur",
        area: "18th arrondissement",
        type: "viewpoint",
        bestTime: "sunset",
        description: "Wander cobbled streets and watch the skyline turn golden.",
      },
      {
        name: "Latin Quarter cafés",
        area: "5th arrondissement",
        type: "food",
        bestTime: "afternoon",
        description: "Slow down with coffee and people watching on classic terraces.",
      },
    ],
  },
  "tokyo": {
    country: "Japan",
    attractions: [
      {
        name: "Senso-ji Temple, Asakusa",
        area: "Asakusa",
        type: "culture",
        bestTime: "morning",
        description: "Walk Nakamise-dori shopping street and visit Tokyo's oldest temple.",
      },
      {
        name: "Shibuya Crossing & Hachikō",
        area: "Shibuya",
        type: "city",
        bestTime: "evening",
        description: "Experience the famous scramble crossing under neon lights.",
      },
      {
        name: "Tsukiji Outer Market food walk",
        area: "Tsukiji",
        type: "food",
        bestTime: "morning",
        description: "Taste ultra-fresh sushi, tamagoyaki, and Japanese street food.",
      },
      {
        name: "Odaiba Bay & teamLab Planets",
        area: "Odaiba",
        type: "experience",
        bestTime: "afternoon",
        description: "Enjoy a futuristic art museum and skyline views over Tokyo Bay.",
      },
      {
        name: "Meiji Shrine & Harajuku",
        area: "Shibuya",
        type: "nature",
        bestTime: "late-morning",
        description: "Walk forested paths and explore unique boutiques nearby.",
      },
    ],
  },
  "bali": {
    country: "Indonesia",
    attractions: [
      {
        name: "Tegalalang Rice Terraces",
        area: "Near Ubud",
        type: "nature",
        bestTime: "morning",
        description: "Walk along emerald terraces before the day warms up.",
      },
      {
        name: "Uluwatu Temple & Kecak Dance",
        area: "Bukit Peninsula",
        type: "sunset",
        bestTime: "sunset",
        description: "Watch the sun sink into the Indian Ocean from dramatic cliffs.",
      },
      {
        name: "Snorkeling at Nusa Penida / Lembongan",
        area: "Offshore islands",
        type: "adventure",
        bestTime: "morning",
        description: "Swim with vibrant fish and enjoy clear blue water.",
      },
      {
        name: "Canggu cafés & beach clubs",
        area: "Canggu",
        type: "food",
        bestTime: "afternoon",
        description: "Relax with smoothies, coffee, and oceanfront sunsets.",
      },
      {
        name: "Mount Batur sunrise hike",
        area: "Kintamani",
        type: "adventure",
        bestTime: "early-morning",
        description: "Optional sunrise hike with rewarding panoramic views.",
      },
    ],
  },
  "new york": {
    country: "USA",
    attractions: [
      {
        name: "Central Park walk",
        area: "Midtown / Upper East & West",
        type: "nature",
        bestTime: "morning",
        description: "Stroll tree-lined paths and rowboats, a calm start to the city.",
      },
      {
        name: "Times Square & Broadway",
        area: "Midtown",
        type: "nightlife",
        bestTime: "evening",
        description: "Experience bright lights and, if you like, catch a Broadway show.",
      },
      {
        name: "Brooklyn Bridge & DUMBO",
        area: "Brooklyn",
        type: "viewpoint",
        bestTime: "sunset",
        description: "Walk the bridge and photograph the skyline from Brooklyn.",
      },
      {
        name: "9/11 Memorial & One World Observatory",
        area: "Lower Manhattan",
        type: "culture",
        bestTime: "afternoon",
        description: "Reflect at the memorial pools and enjoy views from above.",
      },
      {
        name: "Museum stop: MoMA or MET",
        area: "Manhattan",
        type: "culture",
        bestTime: "late-morning",
        description: "Choose a world-class art museum based on your interests.",
      },
    ],
  },
};

// Basic list of sample cities mapped to coordinates for Open-Meteo geocoding fallback.
const CITY_COORDINATES = [
  { name: "Paris, France", lat: 48.8566, lon: 2.3522 },
  { name: "Tokyo, Japan", lat: 35.6762, lon: 139.6503 },
  { name: "Bali, Indonesia", lat: -8.4095, lon: 115.1889 },
  { name: "New York, USA", lat: 40.7128, lon: -74.006 },
  { name: "London, United Kingdom", lat: 51.5072, lon: -0.1276 },
  { name: "Rome, Italy", lat: 41.9028, lon: 12.4964 },
  { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
  { name: "Barcelona, Spain", lat: 41.3874, lon: 2.1686 },
  { name: "Istanbul, Türkiye", lat: 41.0082, lon: 28.9784 },
  { name: "Dubai, UAE", lat: 25.2048, lon: 55.2708 },
];

const form = document.getElementById("trip-form");
const destinationInput = document.getElementById("destination");
const budgetInput = document.getElementById("budget");
const daysInput = document.getElementById("days");
const travelStyleSelect = document.getElementById("travel-style");
const interestSelect = document.getElementById("interest");

const suggestionsContainer = document.getElementById("destination-suggestions");
const itinerarySummary = document.getElementById("itinerary-summary");
const itinerarySummaryText = document.getElementById("itinerary-summary-text");
const itineraryContainer = document.getElementById("itinerary-container");
const itineraryNotes = document.getElementById("itinerary-notes");

const plannerSection = document.getElementById("planner");
const destinationsSection = document.getElementById("destinations");
const itinerarySection = document.getElementById("itinerary");
const weatherCard = document.getElementById("weather-card");
const heroHighlightCards = document.querySelectorAll(".highlight-card");
const heroBadges = document.querySelectorAll(".hero-badge");

const weatherLocation = document.getElementById("weather-location");
const weatherLoading = document.getElementById("weather-loading");
const weatherError = document.getElementById("weather-error");
const weatherContent = document.getElementById("weather-content");
const weatherTemp = document.getElementById("weather-temp");
const weatherDesc = document.getElementById("weather-desc");
const weatherMeta = document.getElementById("weather-meta");
const weatherIcon = document.getElementById("weather-icon");
const weatherForecast = document.getElementById("weather-forecast");
const tipCards = document.querySelectorAll(".tip-card");

function normalizeKey(text) {
  return text.toLowerCase().trim();
}

function getPresetForDestination(destination) {
  const key = normalizeKey(destination);
  const foundKey = Object.keys(DESTINATION_PRESETS).find((k) =>
    key.includes(k)
  );
  return foundKey ? DESTINATION_PRESETS[foundKey] : null;
}

function describeBudgetPerDay(totalBudget, days) {
  if (!totalBudget || !days) return "Flexible daily budget";
  const perDay = totalBudget / days;
  if (perDay < 80) return "Shoestring budget";
  if (perDay < 150) return "Comfortable budget";
  if (perDay < 260) return "Upgraded experiences";
  return "Premium experiences";
}

function generateItinerary({ destination, budget, days, travelStyle, interest }) {
  const preset = getPresetForDestination(destination);
  const totalDays = Math.max(1, Math.min(21, Number(days) || 1));
  const parsedBudget = Number(budget) || 0;
  const perDay = parsedBudget && totalDays ? parsedBudget / totalDays : null;

  itineraryContainer.innerHTML = "";

  const detailsText = [
    preset ? `${destination}` : `Custom trip to ${destination}`,
    parsedBudget
      ? `~$${Math.round(parsedBudget).toLocaleString()} total (${perDay ? `$${Math.round(perDay)} per day` : "flexible daily"})`
      : "no fixed budget",
    travelStyle === "relaxed"
      ? "relaxed pacing"
      : travelStyle === "packed"
      ? "busy days"
      : "balanced flow",
    interest !== "mixed" ? `${interest} focus` : "mixed highlights",
  ];

  itinerarySummary.classList.remove("empty-state");
  if (itinerarySummaryText) {
    itinerarySummaryText.innerHTML = `
      <strong>Plan ready:</strong> ${detailsText.join(" · ")}.
      Adjust the form at any time to instantly regenerate your schedule.
    `;
  }

  const attractionPool = preset ? [...preset.attractions] : [];

  function pickAttraction(preferredType) {
    if (!attractionPool.length) return null;
    if (!preferredType) return attractionPool.shift();
    const index = attractionPool.findIndex((a) => a.type === preferredType);
    if (index >= 0) {
      return attractionPool.splice(index, 1)[0];
    }
    return attractionPool.shift();
  }

  for (let day = 1; day <= totalDays; day++) {
    const card = document.createElement("article");
    card.className = "day-card";
    card.style.animationDelay = `${Math.min(day - 1, 5) * 40}ms`;

    const dailyBudget = perDay ? `$${Math.round(perDay).toLocaleString()}` : "Flexible";
    const budgetDescriptor = describeBudgetPerDay(parsedBudget, totalDays);

    const header = document.createElement("div");
    header.className = "day-header";
    header.innerHTML = `
      <div class="day-title">Day ${day}</div>
      <div class="day-budget">${dailyBudget} · ${budgetDescriptor}</div>
    `;

    const list = document.createElement("ul");
    list.className = "day-activities";

    const slots = [
      { label: "Morning", key: "morning" },
      { label: "Midday", key: "midday" },
      { label: "Afternoon", key: "afternoon" },
      { label: "Evening", key: "evening" },
    ];

    slots.forEach((slot, index) => {
      let preferredType = null;
      if (interest === "culture" && (slot.key === "morning" || slot.key === "midday")) preferredType = "culture";
      if (interest === "food" && slot.key === "midday") preferredType = "food";
      if (interest === "nature" && slot.key === "morning") preferredType = "nature";
      if (interest === "nightlife" && slot.key === "evening") preferredType = "nightlife";

      let attraction = pickAttraction(preferredType);

      if (!attraction && preset) {
        const pool = preset.attractions;
        attraction = pool[(day + index) % pool.length];
      }

      const item = document.createElement("li");
      const tagLabel =
        interest === "mixed"
          ? attraction?.type || "highlight"
          : interest;

      if (travelStyle === "relaxed" && index === 1) {
        item.innerHTML = `
          <span class="activity-time">${slot.label}</span>
          Slow morning & café stop
          <span class="activity-tag">easy pace</span>
        `;
      } else if (travelStyle === "packed" && index === 2 && preset) {
        item.innerHTML = `
          <span class="activity-time">${slot.label}</span>
          Optional add‑on in nearby area
          <span class="activity-tag">extra stop</span>
        `;
      } else if (attraction) {
        item.innerHTML = `
          <span class="activity-time">${slot.label}</span>
          ${attraction.name}
          <span class="activity-tag">${tagLabel}</span>
          <br />
          <small>${attraction.description}</small>
        `;
      } else {
        item.innerHTML = `
          <span class="activity-time">${slot.label}</span>
          Free exploration time
          <span class="activity-tag">flexible</span>
        `;
      }

      list.appendChild(item);
    });

    card.appendChild(header);
    card.appendChild(list);
    itineraryContainer.appendChild(card);
  }
}

async function fetchWeather(destination) {
  if (!destination) return;

  weatherError.classList.add("hidden");
  weatherContent.classList.add("hidden");
  weatherLoading.classList.remove("hidden");
  weatherLocation.textContent = `Fetching weather for ${destination}…`;

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      destination
    )}&count=1&language=en&format=json`;
    const geoRes = await fetch(geoUrl);
    if (!geoRes.ok) throw new Error("Geocoding failed");
    const geo = await geoRes.json();

    let lat, lon, label;
    if (geo && geo.results && geo.results.length) {
      const place = geo.results[0];
      lat = place.latitude;
      lon = place.longitude;
      label = `${place.name}, ${place.country_code}`;
    } else {
      const match = CITY_COORDINATES.find((c) =>
        normalizeKey(destination).includes(normalizeKey(c.name.split(",")[0]))
      );
      if (!match) {
        throw new Error("Destination not found");
      }
      lat = match.lat;
      lon = match.lon;
      label = match.name;
    }

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const forecastRes = await fetch(forecastUrl);
    if (!forecastRes.ok) throw new Error("Forecast fetch failed");
    const data = await forecastRes.json();

    if (!data.current_weather) {
      throw new Error("No weather data available");
    }

    const current = data.current_weather;
    weatherTemp.textContent = `${Math.round(current.temperature)}°C`;
    weatherDesc.textContent = mapWeatherCode(current.weathercode);
    weatherMeta.textContent = `Wind ${Math.round(current.windspeed)} km/h · Feels like ${Math.round(
      current.temperature
    )}°C`;
    weatherIcon.textContent = weatherEmojiForCode(current.weathercode, current.is_day);

    weatherLocation.textContent = label;

    weatherForecast.innerHTML = "";
    const days = data.daily.time || [];
    const max = data.daily.temperature_2m_max || [];
    const min = data.daily.temperature_2m_min || [];
    const precip = data.daily.precipitation_probability_max || [];

    for (let i = 0; i < Math.min(4, days.length); i++) {
      const date = new Date(days[i]);
      const weekday = date.toLocaleDateString(undefined, { weekday: "short" });
      const el = document.createElement("div");
      el.className = "weather-forecast-day";
      el.innerHTML = `
        <span class="day">${weekday}</span>
        <span class="hi">▲ ${Math.round(max[i])}°</span>
        <span class="lo">▼ ${Math.round(min[i])}°</span>
        <span class="rain">${precip[i] ?? 0}% rain</span>
      `;
      weatherForecast.appendChild(el);
    }

    weatherLoading.classList.add("hidden");
    weatherContent.classList.remove("hidden");
  } catch (err) {
    weatherLoading.classList.add("hidden");
    weatherContent.classList.add("hidden");
    weatherError.classList.remove("hidden");
    weatherError.textContent =
      "Could not fetch weather for this destination right now. Try another city name or check your connection.";
    weatherLocation.textContent = "Weather unavailable";
    console.error(err);
  }
}

function mapWeatherCode(code) {
  if (code === 0) return "Clear sky";
  if (code === 1 || code === 2) return "Mostly clear";
  if (code === 3) return "Overcast";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snowfall";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorms";
  return "Variable conditions";
}

function weatherEmojiForCode(code, isDay = 1) {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code === 1 || code === 2) return isDay ? "🌤" : "🌤";
  if (code === 3) return "☁️";
  if (code >= 51 && code <= 67) return "🌦";
  if (code >= 71 && code <= 77) return "🌨";
  if (code >= 80 && code <= 82) return "🌧";
  if (code >= 95) return "⛈";
  return "🌍";
}

function renderDestinationSuggestions(query) {
  suggestionsContainer.innerHTML = "";
  if (!query || query.trim().length < 2) return;

  const normalized = normalizeKey(query);
  const results = CITY_COORDINATES.filter((city) =>
    normalizeKey(city.name).includes(normalized)
  ).slice(0, 6);

  if (!results.length) return;

  const dropdown = document.createElement("div");
  dropdown.className = "suggestions-dropdown";

  results.forEach((city) => {
    const item = document.createElement("div");
    item.className = "suggestion-item";
    item.innerHTML = `
      <span>${city.name}</span>
    `;
    item.addEventListener("click", () => {
      destinationInput.value = city.name;
      suggestionsContainer.innerHTML = "";
      destinationInput.focus();
    });
    dropdown.appendChild(item);
  });

  suggestionsContainer.appendChild(dropdown);
}

function scrollAndPulse(element) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const offset = rect.top + window.scrollY - 90;
  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
  element.classList.add("section-pulse");
  setTimeout(() => {
    element.classList.remove("section-pulse");
  }, 1200);
}

heroHighlightCards.forEach((card) => {
  const target = card.getAttribute("data-highlight-target");

  function handleActivate() {
    if (target === "itinerary") {
      scrollAndPulse(itinerarySection);
    } else if (target === "weather") {
      scrollAndPulse(weatherCard || plannerSection);
      if (!destinationInput.value) {
        destinationInput.focus();
      }
    } else if (target === "destinations") {
      scrollAndPulse(destinationsSection);
    }
  }

  card.addEventListener("click", handleActivate);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  });
});

heroBadges.forEach((badge) => {
  const action = badge.getAttribute("data-hero-action");

  function handleHeroBadge() {
    if (action === "auto-itinerary") {
      scrollAndPulse(plannerSection);
      destinationInput.focus();
    } else if (action === "weather") {
      scrollAndPulse(weatherCard || plannerSection);
      if (!destinationInput.value) {
        destinationInput.focus();
      }
    } else if (action === "suggestions") {
      scrollAndPulse(destinationsSection);
    }
  }

  badge.addEventListener("click", handleHeroBadge);
});

tipCards.forEach((card) => {
  function addTipToNotes() {
    if (!itineraryNotes) return;
    const title = card.querySelector("h3")?.textContent?.trim() || "Travel tip";
    const body = card.querySelector("p")?.textContent?.trim() || "";
    const line = `• ${title}: ${body}`;

    if (itineraryNotes.value.trim().length) {
      itineraryNotes.value += `\n${line}`;
    } else {
      itineraryNotes.value = line;
    }

    itineraryNotes.focus();
    itineraryNotes.classList.add("section-pulse");
    setTimeout(() => itineraryNotes.classList.remove("section-pulse"), 900);
  }

  card.addEventListener("click", addTipToNotes);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      addTipToNotes();
    }
  });
});

destinationInput.addEventListener("input", (e) => {
  renderDestinationSuggestions(e.target.value);
});

document.addEventListener("click", (e) => {
  if (!suggestionsContainer.contains(e.target) && e.target !== destinationInput) {
    suggestionsContainer.innerHTML = "";
  }
});

document.querySelectorAll(".destination-card").forEach((card) => {
  card.addEventListener("click", () => {
    const destination = card.getAttribute("data-destination");
    const budget = card.getAttribute("data-budget");
    const days = card.getAttribute("data-days");

    destinationInput.value = destination;
    budgetInput.value = budget;
    daysInput.value = days;

    const evt = new Event("submit", { bubbles: true, cancelable: true });
    form.dispatchEvent(evt);

    window.scrollTo({
      top: form.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const destination = destinationInput.value.trim();
  const budget = budgetInput.value;
  const days = daysInput.value;
  const travelStyle = travelStyleSelect.value;
  const interest = interestSelect.value;

  if (!destination || !days) {
    return;
  }

  generateItinerary({ destination, budget, days, travelStyle, interest });
  fetchWeather(destination);
});

