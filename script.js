// Global variables for events data
let eventsData = {};

// Configuration
const monthNames = ["January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
const monthKeys = ["jan", "feb", "mar", "apr", "may", "jun", 
                  "jul", "aug", "sep", "oct", "nov", "dec"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// State
let currentMonth = new Date().getMonth();
let currentFilter = 'both';
let touchStartX = 0;
let touchEndX = 0;

// Load events data from JSON file
async function loadEventsData() {
    try {
        const response = await fetch('holidays_2026.json');
        eventsData = await response.json();
        renderCalendar();
    } catch (error) {
        console.error('Error loading events data:', error);
        // Fallback to sample data if JSON file is not found
        loadSampleData();
        renderCalendar();
    }
}

// Sample data fallback
function loadSampleData() {
    eventsData = {
        "jan": [
            {"date": 1, "events": [{"title": "New Year's Day", "description": "New Year's Day marks the beginning of the calendar year and is celebrated worldwide with festivities, fireworks, and gatherings. It's a time for reflection on the past year and setting resolutions for the year ahead. Many cultures have unique traditions for welcoming the new year. In India, while January 1st is celebrated in urban areas, traditional new year celebrations vary by region and culture. It's a public holiday in many countries, allowing people to rest and celebrate with family and friends.", "category": "Worldwide"}]},
            {"date": 26, "events": [{"title": "Republic Day", "description": "Republic Day commemorates the date when the Constitution of India came into effect on January 26, 1950, replacing the Government of India Act 1935 as the governing document of India. The day celebrates the spirit of independent and individual India. A grand parade is held in New Delhi at Rajpath showcasing India's defense capability, cultural and social heritage. The President of India unfurls the national flag and the event includes impressive military parades and cultural performances. It's one of the three national holidays in India and is celebrated with great patriotic fervor across the country.", "category": "India"}]}
        ],
        "feb": [
            {"date": 14, "events": [{"title": "Valentine's Day", "description": "Valentine's Day is celebrated annually on February 14th as a day of love and romance. Couples exchange cards, flowers, chocolates, and gifts to express their affection. The day has historical roots in both Christian and ancient Roman tradition. In modern times, it has become a global celebration of love in all its forms. While traditionally focused on romantic love, many also celebrate friendships and familial love on this day. In India, the celebration has grown in popularity, especially among younger generations in urban areas.", "category": "Worldwide"}]}
        ],
        "mar": [
            {"date": 14, "events": [{"title": "Holi", "description": "Holi, the festival of colors, is one of the most vibrant and joyous festivals in India. It marks the arrival of spring and the victory of good over evil. People celebrate by throwing colored powders and water at each other, creating a spectacular display of colors. The festival has deep cultural and religious significance in Hinduism, associated with various legends including that of Prahlad and Holika. Traditional celebrations include bonfires on the eve of Holi, singing, dancing, and sharing festive foods. It's a time when social barriers are broken down and people of all ages come together in celebration.", "category": "India"}]}
        ],
        "apr": [
            {"date": 1, "events": [{"title": "April Fool's Day", "description": "April Fool's Day is celebrated on April 1st each year with pranks, hoaxes, and practical jokes. The origins of this day remain unclear, though some historians trace it back to the 16th century. Media outlets and companies often participate by creating elaborate hoaxes. The day is observed in many countries around the world, though traditions vary. In the modern digital age, April Fool's Day has expanded to include internet hoaxes and viral pranks. The key rule is that all jokes should be harmless and in good fun, revealed by noon in some traditions.", "category": "Worldwide"}]},
            {"date": 14, "events": [{"title": "Ambedkar Jayanti", "description": "Ambedkar Jayanti commemorates the birth anniversary of Dr. B.R. Ambedkar, the principal architect of the Indian Constitution and a champion of social justice. Born on April 14, 1891, Dr. Ambedkar devoted his life to fighting discrimination and establishing equality for all. The day is celebrated across India with special events, remembrance ceremonies, and educational programs. Government offices and organizations pay tribute to his contributions to nation-building and social reform. His work continues to inspire movements for equality and justice. The day is a public holiday in India, recognized as a celebration of constitutional values and human rights.", "category": "India"}]}
        ],
        "may": [
            {"date": 1, "events": [{"title": "International Workers' Day", "description": "International Workers' Day, also known as Labour Day or May Day, is celebrated on May 1st to honor workers and the labor movement. The day has its origins in the labor union movement, specifically the eight-hour day movement. It commemorates the historic struggles and gains made by workers and the labor movement. In many countries, it's a public holiday marked by demonstrations, parades, and celebrations. Workers' rights organizations use this day to advocate for better working conditions and fair wages. In India, Labour Day is celebrated to pay tribute to the contributions of workers to the nation's development and economy.", "category": "Worldwide"}]}
        ],
        "jun": [
            {"date": 5, "events": [{"title": "World Environment Day", "description": "World Environment Day is celebrated annually on June 5th to raise awareness about environmental issues and encourage action for the protection of the environment. Established by the United Nations in 1974, it has grown into a global platform for public outreach. Each year has a different theme focusing on specific environmental concerns such as pollution, biodiversity, or climate change. The day is marked by campaigns, clean-up drives, tree planting, and educational programs worldwide. Governments, organizations, and individuals participate in activities to promote environmental sustainability. In India, the day sees extensive participation with various events highlighting local environmental challenges.", "category": "Worldwide"}]}
        ],
        "jul": [
            {"date": 4, "events": [{"title": "Independence Day (USA)", "description": "Independence Day, commonly known as the Fourth of July, is a federal holiday in the United States commemorating the Declaration of Independence on July 4, 1776. The day celebrates American independence from Great Britain and the birth of the nation. Celebrations include fireworks, parades, barbecues, carnivals, picnics, concerts, and family reunions. The day is marked by patriotic displays and ceremonies throughout the country. The fireworks tradition began with the first anniversary in 1777. It's one of the most significant national holidays in the United States, bringing communities together in celebration of freedom and democracy.", "category": "Worldwide"}]}
        ],
        "aug": [
            {"date": 15, "events": [{"title": "Independence Day (India)", "description": "India's Independence Day marks the end of British colonial rule and the establishment of a free and independent Indian nation on August 15, 1947. The day is celebrated with great enthusiasm across the country with flag hoisting ceremonies, cultural programs, and patriotic songs. The Prime Minister addresses the nation from the historic Red Fort in Delhi. Schools, colleges, and government offices organize special events to commemorate the sacrifices of freedom fighters. The tricolor flag is hoisted at government buildings and homes. It's a national holiday that reminds citizens of the long struggle for freedom and the responsibilities that come with independence.", "category": "India"}]}
        ],
        "sep": [],
        "oct": [
            {"date": 2, "events": [{"title": "Gandhi Jayanti", "description": "Gandhi Jayanti is celebrated on October 2nd to mark the birth anniversary of Mahatma Gandhi, the Father of the Nation in India. Born in 1869, Gandhi led India's non-violent independence movement against British rule. The day is a national holiday in India and is celebrated with prayer services, commemorative ceremonies, and cultural events. Gandhi's principles of truth, non-violence, and peace continue to inspire people worldwide. The United Nations also observes this day as the International Day of Non-Violence. Activities on this day include cleanliness drives, as Gandhi emphasized sanitation and cleanliness, and educational programs about his life and teachings.", "category": "India"}]},
            {"date": 31, "events": [{"title": "Halloween", "description": "Halloween is celebrated on October 31st with costumes, trick-or-treating, parties, and spooky decorations. The holiday has roots in the ancient Celtic festival of Samhain and later Christian traditions. Children dress up in costumes and go door-to-door collecting candy and treats. Adults also participate with costume parties and haunted house attractions. Decorations include jack-o'-lanterns, ghosts, witches, and other Halloween imagery. While primarily celebrated in Western countries, Halloween has gained popularity in urban India in recent years. The holiday balances themes of fright and fun, making it enjoyable for all ages.", "category": "Worldwide"}]}
        ],
        "nov": [
            {"date": 1, "events": [{"title": "Diwali (Deepavali)", "description": "Diwali, also known as Deepavali, is the Hindu festival of lights celebrated over five days. It symbolizes the spiritual victory of light over darkness, good over evil, and knowledge over ignorance. The festival is marked by lighting oil lamps, bursting fireworks, sharing sweets, and prayers to Goddess Lakshmi for prosperity. Homes and streets are decorated with colorful rangoli patterns and lights. Diwali is one of the most important festivals in India, celebrated by Hindus, Jains, and Sikhs with equal enthusiasm. The festival also marks the beginning of the Hindu New Year in many regions. It's a time for family gatherings, gift exchanges, and feasting on traditional delicacies.", "category": "India"}]}
        ],
        "dec": [
            {"date": 25, "events": [{"title": "Christmas Day", "description": "Christmas Day, celebrated on December 25th, commemorates the birth of Jesus Christ and is one of the most widely celebrated holidays worldwide. Christians attend church services and celebrate with family gatherings, gift exchanges, and festive meals. Traditions include decorating Christmas trees, hanging stockings, and the legendary figure of Santa Claus. Carols, nativity scenes, and acts of charity are common during the Christmas season. In India, Christmas is celebrated with special midnight masses, carol singing, and festive decorations, particularly in states with significant Christian populations. The holiday has also become a secular celebration enjoyed by people of many faiths, emphasizing themes of peace, joy, and goodwill.", "category": "Worldwide"}]}
        ]
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeMonthSelector();
    initializeFilters();
    initializeNavigation();
    initializeSwipe();
    loadEventsData();
});

function initializeMonthSelector() {
    const selector = document.getElementById('monthSelector');
    monthNames.forEach((month, index) => {
        const btn = document.createElement('button');
        btn.className = 'month-btn';
        btn.textContent = month;
        btn.dataset.month = index;
        btn.addEventListener('click', () => {
            currentMonth = index;
            updateMonthButtons();
            renderCalendar();
        });
        selector.appendChild(btn);
    });
    updateMonthButtons();
}

function updateMonthButtons() {
    document.querySelectorAll('.month-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === currentMonth);
    });
}

function initializeFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderCalendar();
        });
    });
}

function initializeNavigation() {
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth = (currentMonth - 1 + 12) % 12;
        updateMonthButtons();
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth = (currentMonth + 1) % 12;
        updateMonthButtons();
        renderCalendar();
    });

    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('eventModal').addEventListener('click', (e) => {
        if (e.target.id === 'eventModal') closeModal();
    });
}

function initializeSwipe() {
    const calendarSection = document.getElementById('calendarSection');
    
    calendarSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    calendarSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next month
            currentMonth = (currentMonth + 1) % 12;
        } else {
            // Swipe right - previous month
            currentMonth = (currentMonth - 1 + 12) % 12;
        }
        updateMonthButtons();
        renderCalendar();
    }
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const title = document.getElementById('calendarTitle');
    
    title.textContent = `${monthNames[currentMonth]} 2026`;
    grid.innerHTML = '';

    // Add day headers
    dayNames.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day-header';
        header.textContent = day;
        grid.appendChild(header);
    });

    // Get first day of month and days in month
    const firstDay = new Date(2026, currentMonth, 1).getDay();
    const daysInMonth = new Date(2026, currentMonth + 1, 0).getDate();
    
    // Get current date
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === 2026 && today.getMonth() === currentMonth;
    const currentDate = today.getDate();

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement('div');
        cell.className = 'day-cell empty';
        grid.appendChild(cell);
    }

    // Get events for current month
    const monthData = eventsData[monthKeys[currentMonth]] || [];

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'day-cell';
        cell.textContent = day;

        // Check if current date
        if (isCurrentMonth && day === currentDate) {
            cell.classList.add('current');
        }

        // Find events for this day
        const dayData = monthData.find(d => d.date === day);
        if (dayData && dayData.events.length > 0) {
            const filteredEvents = filterEvents(dayData.events);
            
            if (filteredEvents.length > 0) {
                cell.classList.add('has-events');
                const category = getDateCategory(filteredEvents);
                cell.classList.add(category);
                cell.addEventListener('click', () => showEventModal(day, filteredEvents));
            }
        }

        grid.appendChild(cell);
    }
}

function filterEvents(events) {
    if (currentFilter === 'both') return events;
    return events.filter(e => e.category.toLowerCase() === currentFilter);
}

function getDateCategory(events) {
    const hasIndia = events.some(e => e.category.toLowerCase() === 'india');
    const hasWorldwide = events.some(e => e.category.toLowerCase() === 'worldwide');
    
    if (hasIndia && hasWorldwide) return 'mixed';
    if (hasIndia) return 'india';
    if (hasWorldwide) return 'worldwide';
    return '';
}

function showEventModal(day, events) {
    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('modalBody');
    
    const dateStr = `${monthNames[currentMonth]} ${day}, 2026`;
    
    let html = `<h3 class="modal-date">${dateStr}</h3>`;
    
    events.forEach(event => {
        const categoryClass = event.category.toLowerCase();
        html += `
            <div class="event-item">
                <div class="event-title">
                    ${event.title}
                    <span class="event-category ${categoryClass}">${event.category}</span>
                </div>
                <p class="event-description">${event.description}</p>
            </div>
        `;
    });
    
    modalBody.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowLeft') {
        currentMonth = (currentMonth - 1 + 12) % 12;
        updateMonthButtons();
        renderCalendar();
    } else if (e.key === 'ArrowRight') {
        currentMonth = (currentMonth + 1) % 12;
        updateMonthButtons();
        renderCalendar();
    }
});