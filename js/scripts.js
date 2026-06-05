// ===== EcoTrip – Calculadora de Emissões de CO₂ =====

// ── Emission factors (grams CO₂ per km) ──
const EMISSION_FACTORS = {
    bike:  0,
    bus:   80,
    car:   170,
    truck: 250
};

const TRANSPORT_LABELS = {
    bike:  'Bicicleta',
    bus:   'Ônibus',
    car:   'Carro',
    truck: 'Caminhão'
};

const TRANSPORT_COLORS = {
    bike:  'green',
    bus:   'yellow',
    car:   'orange',
    truck: 'red'
};

// ── Built-in database of Brazilian cities (capitals, metros, interior) ──
const BRAZILIAN_CITIES = [
    // Capitais
    { name: 'Aracaju', state: 'SE', lat: -10.9472, lon: -37.0731 },
    { name: 'Belém', state: 'PA', lat: -1.4550, lon: -48.5024 },
    { name: 'Belo Horizonte', state: 'MG', lat: -19.9167, lon: -43.9345 },
    { name: 'Boa Vista', state: 'RR', lat: 2.8235, lon: -60.6758 },
    { name: 'Brasília', state: 'DF', lat: -15.7938, lon: -47.8828 },
    { name: 'Campo Grande', state: 'MS', lat: -20.4697, lon: -54.6201 },
    { name: 'Cuiabá', state: 'MT', lat: -15.6014, lon: -56.0979 },
    { name: 'Curitiba', state: 'PR', lat: -25.4284, lon: -49.2733 },
    { name: 'Florianópolis', state: 'SC', lat: -27.5954, lon: -48.5480 },
    { name: 'Fortaleza', state: 'CE', lat: -3.7319, lon: -38.5267 },
    { name: 'Goiânia', state: 'GO', lat: -16.6869, lon: -49.2648 },
    { name: 'João Pessoa', state: 'PB', lat: -7.1198, lon: -34.8450 },
    { name: 'Macapá', state: 'AP', lat: 0.0355, lon: -51.0705 },
    { name: 'Maceió', state: 'AL', lat: -9.6658, lon: -35.7350 },
    { name: 'Manaus', state: 'AM', lat: -3.1190, lon: -60.0217 },
    { name: 'Natal', state: 'RN', lat: -5.7945, lon: -35.2110 },
    { name: 'Palmas', state: 'TO', lat: -10.1674, lon: -48.3277 },
    { name: 'Porto Alegre', state: 'RS', lat: -30.0346, lon: -51.2177 },
    { name: 'Porto Velho', state: 'RO', lat: -8.7612, lon: -63.9039 },
    { name: 'Recife', state: 'PE', lat: -8.0578, lon: -34.8829 },
    { name: 'Rio Branco', state: 'AC', lat: -9.9754, lon: -67.8081 },
    { name: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lon: -43.1729 },
    { name: 'Salvador', state: 'BA', lat: -12.9777, lon: -38.5016 },
    { name: 'São Luís', state: 'MA', lat: -2.5307, lon: -44.3068 },
    { name: 'São Paulo', state: 'SP', lat: -23.5505, lon: -46.6333 },
    { name: 'Teresina', state: 'PI', lat: -5.0920, lon: -42.8038 },
    { name: 'Vitória', state: 'ES', lat: -20.3155, lon: -40.3128 },

    // Região Metropolitana e Interior de São Paulo (SP)
    { name: 'Guarulhos', state: 'SP', lat: -23.4542, lon: -46.5340 },
    { name: 'Campinas', state: 'SP', lat: -22.9064, lon: -47.0616 },
    { name: 'São Bernardo do Campo', state: 'SP', lat: -23.6939, lon: -46.5649 },
    { name: 'Santo André', state: 'SP', lat: -23.6634, lon: -46.5383 },
    { name: 'Osasco', state: 'SP', lat: -23.5325, lon: -46.7917 },
    { name: 'São José dos Campos', state: 'SP', lat: -23.1896, lon: -45.8841 },
    { name: 'Ribeirão Preto', state: 'SP', lat: -21.1704, lon: -47.8103 },
    { name: 'Sorocaba', state: 'SP', lat: -23.5015, lon: -47.4526 },
    { name: 'Santos', state: 'SP', lat: -23.9608, lon: -46.3336 },
    { name: 'Jundiaí', state: 'SP', lat: -23.1857, lon: -46.8978 },
    { name: 'São José do Rio Preto', state: 'SP', lat: -20.8113, lon: -49.3758 },
    { name: 'Mogi das Cruzes', state: 'SP', lat: -23.5235, lon: -46.1878 },
    { name: 'Piracicaba', state: 'SP', lat: -22.7253, lon: -47.6492 },
    { name: 'Bauru', state: 'SP', lat: -22.3147, lon: -49.0606 },
    { name: 'Franca', state: 'SP', lat: -20.5386, lon: -47.4008 },
    { name: 'Taubaté', state: 'SP', lat: -23.0264, lon: -45.5552 },
    { name: 'Limeira', state: 'SP', lat: -22.5647, lon: -47.4017 },
    { name: 'São Carlos', state: 'SP', lat: -22.0081, lon: -47.8908 },
    { name: 'Presidente Prudente', state: 'SP', lat: -22.1225, lon: -51.3887 },
    { name: 'Marília', state: 'SP', lat: -22.2139, lon: -49.9458 },

    // Região Metropolitana e Interior do Rio de Janeiro (RJ)
    { name: 'Niterói', state: 'RJ', lat: -22.8858, lon: -43.1153 },
    { name: 'Duque de Caxias', state: 'RJ', lat: -22.7856, lon: -43.3117 },
    { name: 'São Gonçalo', state: 'RJ', lat: -22.8269, lon: -43.0539 },
    { name: 'Nova Iguaçu', state: 'RJ', lat: -22.7590, lon: -43.4511 },
    { name: 'Petrópolis', state: 'RJ', lat: -22.5050, lon: -43.1789 },
    { name: 'Volta Redonda', state: 'RJ', lat: -22.5202, lon: -44.1018 },
    { name: 'Campos dos Goytacazes', state: 'RJ', lat: -21.7511, lon: -41.3256 },
    { name: 'Cabo Frio', state: 'RJ', lat: -22.8794, lon: -42.0186 },

    // Região Metropolitana e Interior de Minas Gerais (MG)
    { name: 'Contagem', state: 'MG', lat: -19.9318, lon: -44.0530 },
    { name: 'Betim', state: 'MG', lat: -19.9678, lon: -44.1983 },
    { name: 'Uberlândia', state: 'MG', lat: -18.9113, lon: -48.2622 },
    { name: 'Juiz de Fora', state: 'MG', lat: -21.7642, lon: -43.3496 },
    { name: 'Montes Claros', state: 'MG', lat: -16.7350, lon: -43.8617 },
    { name: 'Uberaba', state: 'MG', lat: -19.7472, lon: -47.9392 },
    { name: 'Ipatinga', state: 'MG', lat: -19.4686, lon: -42.5386 },
    { name: 'Governador Valadares', state: 'MG', lat: -18.8578, lon: -41.9486 },

    // Região Metropolitana e Interior do Rio Grande do Sul (RS)
    { name: 'Canoas', state: 'RS', lat: -29.9189, lon: -51.1781 },
    { name: 'Caxias do Sul', state: 'RS', lat: -29.1678, lon: -51.1794 },
    { name: 'Pelotas', state: 'RS', lat: -31.7654, lon: -52.3376 },
    { name: 'Santa Maria', state: 'RS', lat: -29.6842, lon: -53.8069 },
    { name: 'Passo Fundo', state: 'RS', lat: -28.2581, lon: -52.4097 },
    { name: 'Novo Hamburgo', state: 'RS', lat: -29.6783, lon: -51.1306 },

    // Região Metropolitana e Interior do Paraná (PR)
    { name: 'Londrina', state: 'PR', lat: -23.3044, lon: -51.1696 },
    { name: 'Maringá', state: 'PR', lat: -23.4253, lon: -51.9386 },
    { name: 'Ponta Grossa', state: 'PR', lat: -25.0950, lon: -50.1619 },
    { name: 'Cascavel', state: 'PR', lat: -24.9578, lon: -53.4597 },
    { name: 'Foz do Iguaçu', state: 'PR', lat: -25.5469, lon: -54.5889 },
    { name: 'São José dos Pinhais', state: 'PR', lat: -25.5347, lon: -49.2064 },

    // Região Metropolitana e Interior de Santa Catarina (SC)
    { name: 'Joinville', state: 'SC', lat: -26.3044, lon: -48.8456 },
    { name: 'Blumenau', state: 'SC', lat: -26.9189, lon: -49.0661 },
    { name: 'Chapecó', state: 'SC', lat: -27.1006, lon: -52.6153 },
    { name: 'Criciúma', state: 'SC', lat: -28.6775, lon: -49.3703 },
    { name: 'Itajaí', state: 'SC', lat: -26.9078, lon: -48.6619 },
    { name: 'Balneário Camboriú', state: 'SC', lat: -26.9926, lon: -48.6347 },

    // Região Metropolitana e Interior da Bahia (BA)
    { name: 'Feira de Santana', state: 'BA', lat: -12.2664, lon: -38.9661 },
    { name: 'Vitória da Conquista', state: 'BA', lat: -14.8617, lon: -40.8444 },
    { name: 'Camaçari', state: 'BA', lat: -12.6975, lon: -38.3242 },
    { name: 'Itabuna', state: 'BA', lat: -14.7858, lon: -39.2800 },
    { name: 'Ilhéus', state: 'BA', lat: -14.7889, lon: -39.0494 },

    // Região Metropolitana e Interior de Pernambuco (PE)
    { name: 'Jaboatão dos Guararapes', state: 'PE', lat: -8.1139, lon: -35.0147 },
    { name: 'Olinda', state: 'PE', lat: -8.0089, lon: -34.8550 },
    { name: 'Caruaru', state: 'PE', lat: -8.2839, lon: -35.9761 },
    { name: 'Petrolina', state: 'PE', lat: -9.3886, lon: -40.5019 },

    // Região Metropolitana e Interior do Ceará (CE)
    { name: 'Caucaia', state: 'CE', lat: -3.7314, lon: -38.6558 },
    { name: 'Juazeiro do Norte', state: 'CE', lat: -7.2244, lon: -39.3144 },
    { name: 'Sobral', state: 'CE', lat: -3.6853, lon: -40.3475 },

    // Região Metropolitana e Interior de Goiás (GO)
    { name: 'Aparecida de Goiânia', state: 'GO', lat: -16.8228, lon: -49.2453 },
    { name: 'Anápolis', state: 'GO', lat: -16.3267, lon: -48.9528 },
    { name: 'Rio Verde', state: 'GO', lat: -17.7919, lon: -50.9208 },

    // Região Metropolitana e Interior do Pará (PA)
    { name: 'Ananindeua', state: 'PA', lat: -1.3622, lon: -48.3728 },
    { name: 'Santarém', state: 'PA', lat: -2.4431, lon: -54.6989 },
    { name: 'Marabá', state: 'PA', lat: -5.3744, lon: -49.1242 },

    // Outras Cidades Importantes
    { name: 'Campina Grande', state: 'PB', lat: -7.2244, lon: -35.8814 },
    { name: 'Mossoró', state: 'RN', lat: -5.1878, lon: -37.3442 },
    { name: 'Arapiraca', state: 'AL', lat: -9.7514, lon: -36.6603 },
    { name: 'Dourados', state: 'MS', lat: -22.2239, lon: -54.8089 },
    { name: 'Rondonópolis', state: 'MT', lat: -16.4708, lon: -54.6356 },
    { name: 'Ji-Paraná', state: 'RO', lat: -10.8803, lon: -61.9458 },
    { name: 'Imperatriz', state: 'MA', lat: -5.5264, lon: -47.4817 }
];

// Helper mapping for O(1) coordinates lookup by normalised name variants
const CITY_MAP = {};
BRAZILIAN_CITIES.forEach(city => {
    const key = normaliseCity(city.name);
    CITY_MAP[key] = city;
    // Map with state e.g., "sao paulo sp" or "sao paulo, sp"
    CITY_MAP[`${key} ${normaliseCity(city.state)}`] = city;
});

// Haversine formula + road multiplier factor (1.27x for winding roads)
function getHaversineDistance(city1, city2) {
    const R = 6371; // Earth's radius in km
    const dLat = (city2.lat - city1.lat) * Math.PI / 180;
    const dLon = (city2.lon - city1.lon) * Math.PI / 180;
    const lat1Rad = city1.lat * Math.PI / 180;
    const lat2Rad = city2.lat * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;

    return Math.round(distanceKm * 1.27);
}

// ── Carbon credit values ──
const CREDIT_PRICE_BRL   = 80;   // R$ per credit
const CREDIT_TONNES_CO2  = 1000; // 1 credit = 1 tonne = 1000 kg
const TREE_ABSORPTION_KG = 22;   // average kg CO₂ absorbed by 1 tree/year

// ── State ──
let selectedTransport = 'car';

// ── DOM Elements ──
const $ = id => document.getElementById(id);

const originInput       = $('origin');
const destinationInput  = $('destination');
const manualToggle      = $('manual-toggle');
const manualWrapper     = $('manual-input-wrapper');
const manualDistInput   = $('manual-distance');
const swapBtn           = $('swap-btn');
const calcForm          = $('calculator-form');
const loadingOverlay    = $('loading-overlay');
const resultsSection    = $('results-section');
const calcSection       = $('calculator');
const newCalcBtn        = $('new-calc-btn');
const transportGrid     = $('transport-grid');

// ── Initialise ──
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Transport selection
    document.querySelectorAll('.transport-card').forEach(card => {
        card.addEventListener('click', () => selectTransport(card));
    });

    // Manual distance toggle
    manualToggle.addEventListener('change', () => {
        manualWrapper.classList.toggle('visible', manualToggle.checked);
        if (manualToggle.checked) {
            originInput.removeAttribute('required');
            destinationInput.removeAttribute('required');
        } else {
            originInput.setAttribute('required', '');
            destinationInput.setAttribute('required', '');
        }
    });

    // Swap button
    swapBtn.addEventListener('click', swapCities);

    // Form submit
    calcForm.addEventListener('submit', handleSubmit);

    // New calculation
    newCalcBtn.addEventListener('click', resetCalculator);

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Auto-suggest autocomplete setup
    setupAutocomplete(originInput, $('origin-suggestions'));
    setupAutocomplete(destinationInput, $('destination-suggestions'));
}

// ── Transport selection ──
function selectTransport(card) {
    document.querySelectorAll('.transport-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedTransport = card.dataset.transport;

    // Micro-animation
    card.style.transform = 'scale(0.95)';
    setTimeout(() => { card.style.transform = ''; }, 150);
}

// ── Swap origin / destination ──
function swapCities() {
    const tmp = originInput.value;
    originInput.value = destinationInput.value;
    destinationInput.value = tmp;
}

// ── Normalise a city name for lookup ──
function normaliseCity(raw) {
    return raw.trim()
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') // remove accents
              .replace(/[-–]/g, ' ')
              .replace(/,.*$/, '')      // remove state after comma
              .replace(/\s+/g, ' ')
              .trim();
}

// ── Look up distance using coordinate database ──
function lookupDistance(originRaw, destRaw) {
    const o = normaliseCity(originRaw);
    const d = normaliseCity(destRaw);
    if (!o || !d) return null;

    const city1 = CITY_MAP[o];
    const city2 = CITY_MAP[d];

    if (city1 && city2) {
        if (city1.name === city2.name && city1.state === city2.state) {
            return 0;
        }
        return getHaversineDistance(city1, city2);
    }

    return null;
}

// ── Setup Auto-suggest Autocomplete behaviour ──
function setupAutocomplete(inputEl, suggestionsEl) {
    let highlightedIndex = -1;
    let filteredCities = [];

    function hideSuggestions() {
        suggestionsEl.classList.remove('visible');
        highlightedIndex = -1;
    }

    function showSuggestions() {
        const query = normaliseCity(inputEl.value);
        if (!query) {
            hideSuggestions();
            return;
        }

        filteredCities = BRAZILIAN_CITIES.filter(city => {
            const normName = normaliseCity(city.name);
            const normState = normaliseCity(city.state);
            return normName.includes(query) || normState.includes(query);
        }).slice(0, 5);

        if (filteredCities.length === 0) {
            hideSuggestions();
            return;
        }

        suggestionsEl.innerHTML = '';
        filteredCities.forEach((city, index) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            if (index === highlightedIndex) {
                item.classList.add('highlighted');
            }
            item.innerHTML = `
                <span>${city.name}</span>
                <span class="suggestion-state">${city.state}</span>
            `;
            
            item.addEventListener('click', () => {
                selectCity(city);
            });
            suggestionsEl.appendChild(item);
        });

        suggestionsEl.classList.add('visible');
    }

    function selectCity(city) {
        inputEl.value = `${city.name}, ${city.state}`;
        hideSuggestions();
        inputEl.dispatchEvent(new Event('input'));
    }

    inputEl.addEventListener('input', () => {
        highlightedIndex = -1;
        showSuggestions();
    });

    inputEl.addEventListener('focus', () => {
        showSuggestions();
    });

    inputEl.addEventListener('keydown', (e) => {
        if (!suggestionsEl.classList.contains('visible')) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = (highlightedIndex + 1) % filteredCities.length;
            updateHighlight();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = (highlightedIndex - 1 + filteredCities.length) % filteredCities.length;
            updateHighlight();
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && highlightedIndex < filteredCities.length) {
                e.preventDefault();
                selectCity(filteredCities[highlightedIndex]);
            }
        } else if (e.key === 'Escape') {
            hideSuggestions();
        }
    });

    function updateHighlight() {
        const items = suggestionsEl.querySelectorAll('.suggestion-item');
        items.forEach((item, index) => {
            if (index === highlightedIndex) {
                item.classList.add('highlighted');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('highlighted');
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target !== inputEl && !suggestionsEl.contains(e.target)) {
            hideSuggestions();
        }
    });
}

// ── Handle form submission ──
async function handleSubmit(e) {
    e.preventDefault();

    let distance = null;
    let originName  = originInput.value.trim() || 'Origem manual';
    let destName    = destinationInput.value.trim() || 'Destino manual';

    // 1) Manual distance?
    if (manualToggle.checked) {
        distance = parseFloat(manualDistInput.value);
        if (!distance || distance <= 0) {
            highlightField(manualDistInput);
            return;
        }
    } else {
        // 2) Validate inputs
        if (!originName) { highlightField(originInput); return; }
        if (!destName)   { highlightField(destinationInput); return; }

        // Show loading
        showLoading();

        // 3) Try built-in DB
        distance = lookupDistance(originName, destName);

        if (distance === null) {
            hideLoading();
            // Prompt user to enter manually
            manualToggle.checked = true;
            manualWrapper.classList.add('visible');
            originInput.removeAttribute('required');
            destinationInput.removeAttribute('required');
            manualDistInput.focus();
            showToast('Rota não encontrada. Insira a distância manualmente.');
            return;
        }

        // Simulate a slight loading delay for UX polish
        await sleep(800);
    }

    // ── Compute results ──
    const emissionGrams = distance * EMISSION_FACTORS[selectedTransport];
    const emissionKg    = emissionGrams / 1000;

    // Route summary
    $('result-origin').textContent      = originName || '—';
    $('result-destination').textContent  = destName || '—';
    $('result-distance').textContent     = formatNumber(distance) + ' km';
    $('result-transport').textContent    = TRANSPORT_LABELS[selectedTransport];

    // Emission value (animated counter)
    animateCounter($('emission-value'), emissionKg);

    // Trees equivalent
    const trees = Math.max(1, Math.round(emissionKg / TREE_ABSORPTION_KG));
    $('trees-equivalent').textContent = selectedTransport === 'bike' ? '0' : formatNumber(trees);

    if (selectedTransport === 'bike') {
        $('emission-context').innerHTML = '🎉 <strong>Parabéns!</strong> Bicicleta não emite CO₂. Ótima escolha!';
    } else {
        $('emission-context').innerHTML =
            `Equivalente a <strong>${formatNumber(trees)}</strong> árvore${trees > 1 ? 's' : ''} absorvendo CO₂ por um ano`;
    }

    // Comparison bars
    buildComparisonBars(distance);

    // Carbon credits
    const credits = emissionKg / CREDIT_TONNES_CO2;
    const cost    = credits * CREDIT_PRICE_BRL;
    $('credits-needed').textContent = credits < 0.001 ? '0' : credits.toFixed(4);
    $('credits-cost').textContent   = `R$ ${cost.toFixed(2).replace('.', ',')}`;

    // Show results
    hideLoading();
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Build comparison bars ──
function buildComparisonBars(distance) {
    const container = $('comparison-bars');
    container.innerHTML = '';

    const maxEmission = distance * 250; // truck is highest

    const transports = ['bike', 'bus', 'car', 'truck'];

    transports.forEach((t, i) => {
        const emission   = distance * EMISSION_FACTORS[t];
        const emissionKg = emission / 1000;
        const pct        = maxEmission > 0 ? (emission / maxEmission) * 100 : 0;

        const item = document.createElement('div');
        item.className = 'comparison-item';

        const isActive = t === selectedTransport;

        item.innerHTML = `
            <span class="comparison-label">${TRANSPORT_LABELS[t]}</span>
            <div class="comparison-bar-wrapper">
                <div class="comparison-bar level-${TRANSPORT_COLORS[t]}${isActive ? ' active-transport' : ''}"
                     style="width: 0%"></div>
            </div>
            <span class="comparison-value">${emissionKg.toFixed(1)} kg</span>
        `;

        container.appendChild(item);

        // Animate bar width
        requestAnimationFrame(() => {
            setTimeout(() => {
                const bar = item.querySelector('.comparison-bar');
                bar.style.width = Math.max(pct, t === 'bike' ? 1 : pct) + '%';
            }, 100 + i * 120);
        });
    });
}

// ── Animated counter ──
function animateCounter(el, target) {
    const duration = 1200;
    const start    = performance.now();
    const decimals = target < 10 ? 2 : target < 100 ? 1 : 0;

    function tick(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current  = target * eased;
        el.textContent = current.toFixed(decimals);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals);
    }

    requestAnimationFrame(tick);
}

// ── Reset calculator ──
function resetCalculator() {
    resultsSection.classList.add('hidden');
    calcSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Reset form
    originInput.value      = '';
    destinationInput.value = '';
    manualDistInput.value  = '';
    manualToggle.checked   = false;
    manualWrapper.classList.remove('visible');
    originInput.setAttribute('required', '');
    destinationInput.setAttribute('required', '');
}

// ── Loading helpers ──
function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }

// ── Highlight field on validation error ──
function highlightField(field) {
    field.style.borderColor = '#ef4444';
    field.style.boxShadow   = '0 0 0 4px rgba(239, 68, 68, 0.15)';
    field.focus();
    setTimeout(() => {
        field.style.borderColor = '';
        field.style.boxShadow   = '';
    }, 2000);
}

// ── Toast notification ──
function showToast(message) {
    // Remove any existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    Object.assign(toast.style, {
        position:       'fixed',
        bottom:         '24px',
        left:           '50%',
        transform:      'translateX(-50%) translateY(20px)',
        padding:        '12px 24px',
        background:     '#1e293b',
        color:          'white',
        borderRadius:   '12px',
        fontSize:       '0.88rem',
        fontWeight:     '500',
        fontFamily:     'Inter, sans-serif',
        zIndex:         '500',
        opacity:        '0',
        transition:     'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow:      '0 8px 32px rgba(0,0,0,0.18)',
        whiteSpace:     'nowrap'
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity   = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity   = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 350);
    }, 3500);
}

// ── Utilities ──
function formatNumber(n) {
    return n.toLocaleString('pt-BR');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}