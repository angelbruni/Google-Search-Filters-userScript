// ==UserScript==
// @name         Old Google Search Filters Restorer
// @namespace    AngelBruni
// @version      1.0
// @description  Restores the correct search filters (All, Images, Videos, etc...) to Old Google 2013.
// @author       AngelBruni
// @match        https://www.google.com/search*
// @run-at       document-body
// @grant        none
// ==/UserScript==

function addDefaultStyle() {
    // Create a new style element
    var styleElement = document.createElement('style');

    // Define your CSS rules as a string
    var defaultStyleCSS = `
        #bruniSidebarContainer {
            position: fixed;
            background-color: white;
            z-index: 130;
        }
        #bruniWarning {
            color: red;
            font-weight: bold;
            font-size: 32px;
            margin: 0;
            margin-bottom: 10px;
            height: 100vh;
            width: 100vw;
        }
        #bruniWarning a {
            color: red !important;
            text-decoration: underline;
        }
        #bruniSidebarHeader, #bruniFiltersContainer, #bruniToolsContainer {
            display: none; /* !!! RESTORE HIDDEN ELEMENTS DUE TO NO THEME WARING !!! */
        }
    `;

    // Set the CSS text of the style element
    styleElement.textContent = defaultStyleCSS;

    // Append the style element to the document's head
    document.head.appendChild(styleElement);
}

// Function to generate anchor tags based on specific URL parameters with custom text labels and classes
function generateAnchorTags() {
    const body = document.body;

    // Get the current URL of the browser
    var currentURL = window.location.href;

    let up = new URLSearchParams(window.location.search);
    let query = encodeURI(up.get("q"));

    const container = document.createElement('div');
    container.id = 'bruniSidebarContainer';

    const WARNING = document.createElement("p");
    WARNING.id = 'bruniWarning';
    WARNING.innerHTML = `IF YOU ARE SEEING THIS, YOU NEED TO GET A THEME FOR THE FILTERS AT <a target="_blank" href="https://github.com/brunobits/Google-Search-Filters-userScript-Themes">Google-Search-Filters-userScript-Themes</a> OR ENABLE IT IN <a target="_blank" href="https://github.com/openstyles/stylus#releases">Stylus</a>`;
    container.appendChild(WARNING);

    const sidebarHeader = document.createElement("p");
    sidebarHeader.id = 'bruniSidebarHeader';
    sidebarHeader.textContent = 'Search';
    container.appendChild(sidebarHeader);

    // Create a div element with the ID 'bruniFiltersContainer'
    const filtersContainer = document.createElement('div');
    filtersContainer.id = 'bruniFiltersContainer';

    // Create a div element with the ID 'bruniFiltersMainContainer'
    const filtersMainContainer = document.createElement('div');
    filtersMainContainer.id = 'bruniFiltersMainContainer';

    // Create a div element with the ID 'bruniFiltersMoreContainer'
    const filtersMoreContainer = document.createElement('div');
    filtersMoreContainer.id = 'bruniFiltersMoreContainer';

    // Create a div element with the ID 'bruniToolsContainer'
    const toolsContainer = document.createElement('div');
    toolsContainer.id = 'bruniToolsContainer';

    // Create a div element with the ID 'bruniToolsTimeContainer'
    const toolsTimeContainer = document.createElement('div');
    toolsTimeContainer.id = 'bruniToolsTimeContainer';

    // Create a div element with the ID 'bruniToolsResultsContainer'
    const toolsResultsContainer = document.createElement('div');
    toolsResultsContainer.id = 'bruniToolsResultsContainer';

    const tbmValues = ['isch', 'shop', 'nws', 'vid', 'bks'];
    const tbsValues = ['qdr:h', 'qdr:d', 'qdr:w', 'qdr:m', 'qdr:y', 'li:1'];

    const everythingFilter = document.createElement('a');
    const everythingFilterURL = new URL(window.location.href);
    everythingFilter.id = 'everythingFilter';
    everythingFilter.classList.add('bruniFilters');
    everythingFilterURL.searchParams.delete('tbm');
    everythingFilter.href = everythingFilterURL.href;
    everythingFilter.textContent = 'Everything';
    filtersMainContainer.appendChild(everythingFilter);


    // Generate tbm anchor tags inside bruniFiltersMainContainer (first 4 anchors)
    for (let i = 0; i < 4; i++) {
        const tbmValue = tbmValues[i];
        const anchor = createTbmAnchor(tbmValue, `tbmFilter${i + 1}`);
        filtersMainContainer.appendChild(anchor);
    }

    // Generate tbm anchor tags inside bruniFiltersMoreContainer (remaining anchors)
    for (let i = 4; i < tbmValues.length; i++) {
        const tbmValue = tbmValues[i];
        const anchor = createTbmAnchor(tbmValue, `tbmFilter${i + 1}`);
        filtersMoreContainer.appendChild(anchor);
    }

    const placesFilter = document.createElement("a");
    placesFilter.id = 'placesFilter';
    placesFilter.classList.add('bruniFilters');
    placesFilter.href = 'https://www.google.com/maps/search/' + query;
    placesFilter.textContent = 'Places';
    filtersMoreContainer.appendChild(placesFilter);

    const flightsFilter = document.createElement("a");
    flightsFilter.setAttribute('id','flightsFilter');
    flightsFilter.classList.add('bruniFilters');
    flightsFilter.href = 'https://www.google.com/travel/flights?q=' + query;
    flightsFilter.textContent = 'Flights';
    filtersMoreContainer.appendChild(flightsFilter);

    const financeFilter = document.createElement("a");
    financeFilter.setAttribute('id','financeFilter');
    financeFilter.classList.add('bruniFilters');
    financeFilter.href = 'https://www.google.com/finance/';
    financeFilter.textContent = 'Finance';
    filtersMoreContainer.appendChild(financeFilter);

	const patentsFilter = document.createElement("a");
    patentsFilter.setAttribute('id','patentsFilter');
    patentsFilter.classList.add('bruniFilters');
    patentsFilter.href = 'https://patents.google.com/?q=(' + query + ')';
    patentsFilter.textContent = 'Patents';
    filtersMoreContainer.appendChild(patentsFilter);

    const bruniMoreFiltersBtn = document.createElement("button");
    bruniMoreFiltersBtn.setAttribute('id','bruniMoreFiltersBtn');
    bruniMoreFiltersBtn.classList.add('bruniFilters');
    bruniMoreFiltersBtn.innerHTML = `More`;

    const anyTime = document.createElement('a');
    const anyTimeURL = new URL(window.location.href);
    anyTime.id = 'anyTime';
    anyTime.classList.add('bruniTools');
    anyTimeURL.searchParams.delete('tbs');
    anyTime.href = anyTimeURL.href;
    anyTime.textContent = 'Any time';
    toolsTimeContainer.appendChild(anyTime);

    const anyResults = document.createElement('a');
    anyResults.id = 'anyResults';
    anyResults.classList.add('bruniTools');
    anyTimeURL.searchParams.delete('tbs');
    anyResults.href = anyTimeURL.href;
    anyResults.textContent = 'All results';
    toolsResultsContainer.appendChild(anyResults);

    // Generate tbs anchor tags
    for (let i = 0; i < tbsValues.length; i++) {
        const tbsValue = tbsValues[i];
        const anchor = createTbsAnchor(tbsValue, `tbsFilter${i + 1}`);

        // Determine the appropriate container based on tbsValue
        if (tbsValue === 'li:1') {
            toolsResultsContainer.appendChild(anchor);
        } else {
            toolsTimeContainer.appendChild(anchor);
        }
    }

    // Check if the parent element has any existing child nodes
    if (body.firstChild) {
        // If there are existing child nodes, insert the new element before the first child
        body.insertBefore(container, body.firstChild);
    } else {
        // If there are no existing child nodes, simply append the new element
        body.appendChild(container);
    }
    // Append the filtersContainer div to the bruniSidebarContainer
    container.appendChild(filtersContainer);
    // Append the filtersMainContainer div to the filtersContainer
    filtersContainer.appendChild(filtersMainContainer);
    // Append the filtersMoreContainer div to the filtersContainer
    filtersContainer.appendChild(filtersMoreContainer);
    container.appendChild(toolsContainer);
    toolsContainer.appendChild(toolsTimeContainer);
    toolsContainer.appendChild(toolsResultsContainer);

    filtersContainer.appendChild(bruniMoreFiltersBtn);

    function showMoreFilters() {
		filtersMoreContainer.setAttribute('style','display: block');
		bruniMoreFiltersBtn.innerHTML = `Fewer`;
	}

	function hideMoreFilters() {
		filtersMoreContainer.removeAttribute('style');
		bruniMoreFiltersBtn.innerHTML = `More`;
	}

	function toggleMoreFilters() {
		if (filtersMoreContainer.hasAttribute('style','display: block;')) {
			hideMoreFilters()
		} else {
			showMoreFilters()
		}
	}

    bruniMoreFiltersBtn.addEventListener('click', toggleMoreFilters)

    // Using indexOf() method
    if (currentURL.indexOf(tbmValues[0]) !== -1) {
        document.getElementById('tbmFilter1').classList.add('active');
        toolsResultsContainer.remove();
    } else if (currentURL.indexOf(tbmValues[1]) !== -1) {
        document.getElementById('tbmFilter2').classList.add('active');
        toolsContainer.remove();
    } else if (currentURL.indexOf(tbmValues[2]) !== -1) {
        document.getElementById('tbmFilter3').classList.add('active');
        anyTime.innerHTML = `Recent`;
        toolsResultsContainer.remove();
    } else if (currentURL.indexOf(tbmValues[3]) !== -1) {
        document.getElementById('tbmFilter4').classList.add('active');
        toolsResultsContainer.remove();
    } else if (currentURL.indexOf(tbmValues[4]) !== -1) {
        document.getElementById('tbmFilter5').classList.add('active');
        showMoreFilters()
        toolsContainer.remove();
    } else {
        everythingFilter.classList.add('active');
    }

    if (currentURL.indexOf(tbsValues[0]) !== -1) {
        document.getElementById('tbsFilter1').classList.add('active');
    } else if (currentURL.indexOf(tbsValues[1]) !== -1) {
        document.getElementById('tbsFilter2').classList.add('active');
    } else if (currentURL.indexOf(tbsValues[2]) !== -1) {
        document.getElementById('tbsFilter3').classList.add('active');
    } else if (currentURL.indexOf(tbsValues[3]) !== -1) {
        document.getElementById('tbsFilter4').classList.add('active');
    } else if (currentURL.indexOf(tbsValues[4]) !== -1) {
        document.getElementById('tbsFilter5').classList.add('active');
    } else {
        anyTime.classList.add('active');
    }

    if (currentURL.indexOf(tbsValues[5]) !== -1) {
        document.getElementById('tbsFilter6').classList.add('active');
    } else {
        anyResults.classList.add('active');
    }
}

// Function to create a tbm anchor tag
function createTbmAnchor(tbmValue, anchorId) {
    const anchor = document.createElement('a');
    const currentURL = new URL(window.location.href);

    // Add or replace tbm parameter in the current URL
    currentURL.searchParams.set('tbm', tbmValue);

    // Prevent ':' from being replaced with '%3A' in the href attribute
    anchor.href = decodeURIComponent(currentURL.href);
    anchor.textContent = `${getTbmText(tbmValue)}`;
    anchor.classList.add('bruniFilters'); // Add class for tbm anchor tags
    anchor.id = anchorId; // Add ID for respective tbm anchor
    return anchor;
}

// Function to get custom text for tbm parameter
function getTbmText(tbmValue) {
    const tbmText = {
        'isch': 'Images',
        'shop': 'Shopping',
        'nws': 'News',
        'vid': 'Videos',
        'bks': 'Books'
    };
    return tbmText[tbmValue] || '';
}

// Function to create a tbs anchor tag
function createTbsAnchor(tbsValue, anchorId) {
    const anchor = document.createElement('a');
    const currentURL = new URL(window.location.href);

    // Add or replace tbs parameter in the current URL
    currentURL.searchParams.set('tbs', tbsValue);

    // Prevent ':' from being replaced with '%3A' in the href attribute
    anchor.href = decodeURIComponent(currentURL.href);
    anchor.textContent = `${getTbsText(tbsValue)}`;
    anchor.classList.add('bruniTools'); // Add class for tbs anchor tags
    anchor.id = anchorId; // Add ID for respective tbs anchor
    return anchor;
}

// Function to get custom text for tbs parameter
function getTbsText(tbsValue) {
    const tbsText = {
        'qdr:h': 'Past Hour',
        'qdr:d': 'Past 24 Hours',
        'qdr:w': 'Past Week',
        'qdr:m': 'Past Month',
        'qdr:y': 'Past Year',
        'li:1': 'Verbatim'
    };
    return tbsText[tbsValue] || '';
}

addDefaultStyle();

// Generate anchor tags when the page loads
window.onload = generateAnchorTags();