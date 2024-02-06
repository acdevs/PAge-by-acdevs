const root = document.querySelector(':root');
const customizeBtn = document.querySelector('.customize-control');
const customizeCloseBtn = document.querySelector('.customize-control-close');
const colorSlider = document.querySelector('.customize-color-slider');
const selector = document.querySelector('.customize-selector');
let MY_PAGE_THEME = {};

chrome.storage.sync.get(['primaryColor', 'secondaryColor', 'isDark'], function(theme) {
    if(Object.keys(theme).length === 0 && theme.constructor === Object){
        return;
    }
    MY_PAGE_THEME = {
        primaryColor: theme.primaryColor,
        secondaryColor: theme.secondaryColor,
        isDark: theme.isDark
    };
    applyTheme(MY_PAGE_THEME);
});

customizeBtn.addEventListener('click', () => {
    customizeBtn.classList.add('customize-control-active');
});
customizeCloseBtn.addEventListener('click', (e) => {
    customizeBtn.classList.remove('customize-control-active');
    e.stopPropagation();
});

function getTertiaryColor(secondaryColor){
    return secondaryColor + 'ee';
};

function applyTheme(theme){
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--tertiary-color', getTertiaryColor(theme.secondaryColor));
    root.style.setProperty('--text-color', theme.secondaryColor );
}

let isDragging = false;
colorSlider.addEventListener('mousedown', function(event) {
    isDragging = true;
    updateSelectorPosition(event);
});
colorSlider.addEventListener('mousemove', function(event) {
    if (isDragging) updateSelectorPosition(event);
});
colorSlider.addEventListener('mouseup', function() {
    isDragging = false;
    chrome.storage.sync.set(MY_PAGE_THEME);
});

function updateSelectorPosition(event) {
    const rect = colorSlider.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, mouseX / rect.width)); // Clamp value between 0 and 1
    selector.style.left = percent * 100 + '%';
    const color = getColorAtPosition(percent);
    selector.style.backgroundColor = color.primaryColor;

    MY_PAGE_THEME = {
        primaryColor: color.primaryColor,
        secondaryColor: color.secondaryColor,
        isDark: color.dark
    };

    applyTheme(MY_PAGE_THEME);
}

function getColorAtPosition(percent) {
    const themes = [
        {
            primaryColor: '#ffffff',
            secondaryColor: '#3c3c3c',
            dark: true
        },
        {
            primaryColor: '#aac7ff',
            secondaryColor: '#333c4d',
            dark: true
        },
        {
            primaryColor: '#bac7e3',
            secondaryColor: '#383b43',
            dark: true
        },
        {
            primaryColor: '#b8cacd',
            secondaryColor: '#343d3f',
            dark: true
        },
        {
            primaryColor: '#74d7cb',
            secondaryColor: '#27403c',
            dark: true
        },
        {
            primaryColor: '#a0d490',
            secondaryColor: '#313f2c',
            dark: true
        },
        {
            primaryColor: '#becab8',
            secondaryColor: '#373d35',
            dark: true
        },
        {
            primaryColor: '#ffb787',
            secondaryColor: '#4f3625',
            dark: true
        },
        {
            primaryColor: '#dec1b1',
            secondaryColor: '#463931',
            dark: true
        },
        {
            primaryColor: '#ffb1c0',
            secondaryColor: '#4f3439',
            dark: true
        },
        {
            primaryColor: '#ddbfc3',
            secondaryColor: '#46383a',
            dark: true
        },
        {
            primaryColor: '#f6b0ea',
            secondaryColor: '#493545',
            dark: true
        },
        {
            primaryColor: '#d4bbff',
            secondaryColor: '#3f384c',
            dark: true
        },
        {
            primaryColor: '#6a5294',
            secondaryColor: '#fef7ff',
            dark: false
        },
        {
            primaryColor: '#834a7d',
            secondaryColor: '#fff7f9',
            dark: false
        },
        {
            primaryColor: '#70585c',
            secondaryColor: '#fff8f7',
            dark: false
        },
        {
            primaryColor: '#924759',
            secondaryColor: '#fff8f7',
            dark: false
        },
        {
            primaryColor: '#705a4d',
            secondaryColor: '#fff8f5',
            dark: false
        },
        {
            primaryColor: '#8e4e1c',
            secondaryColor: '#fff8f5',
            dark: false
        },
        {
            primaryColor: '#6f5d00',
            secondaryColor: '#fff9ee',
            dark: false
        },
        {
            primaryColor: '#566253',
            secondaryColor: '#fbf9f6',
            dark: false
        },
        {
            primaryColor: '#3b6930',
            secondaryColor: '#f8fbf1',
            dark: false
        },
        {
            primaryColor: '#006a62',
            secondaryColor: '#f4fbf8',
            dark: false
        },
        {
            primaryColor: '#516164',
            secondaryColor: '#faf9f9',
            dark: false
        },
        {
            primaryColor: '#525f77',
            secondaryColor: '#fcf8fa',
            dark: false
        },
        {
            primaryColor: '#3a5e98',
            secondaryColor: '#f9f9ff',
            dark: false
        },
    ];
    const index = Math.floor(percent * (themes.length - 1));
    return themes[index];
}
