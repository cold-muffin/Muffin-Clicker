
const muffinPolygonCoords = "8,56,1,97,1,159,9,190,17,206,41,231,73,247,81,255,111,255,120,247,144,246,168,255,216,254,232,246,248,230,255,214,256,168,247,145,248,88,240,64,232,40,216,24,201,16,168,8,153,1,105,0,58,9,50,17,32,24,17,40";
const blueberryPolygonCoords = "35,127,17,120,2,101,1,48,9,25,25,9,50,1,104,0,120,17,127,32,128,87,120,103,104,118,85,127"; // Size the blueberry muffin down and replace these coords

// Import libraries

// Initialize variables
let cps = 0;
let lastcps = 0;
let consistentcpsInterval = 0;
let muffinCount = 250;
let sugarRushTime = 0;
let mpcUpgrade = 0;
let mpsUpgrade = 0;
let upgradeCount = [0, 0];
const initialUpgradeCost = [100, 200];
let upgradeCost = initialUpgradeCost;
document.getElementById('muffinCounter').innerText = (`Muffins: ${muffinCount}`);
document.getElementById('upgradeOneButton').innerText = (`Upgrade Click Power: ${upgradeCost[0]} Muffins`);
document.getElementById('upgradeTwoButton').innerText = (`Upgrade Idle Bakery: ${upgradeCost[1]} Muffins`);

function handleUpgradeButtonClick(id, compound) {
    if (muffinCount >= upgradeCost[id]) {
        muffinCount -= upgradeCost[id];
        upgradeCount[id] += 1;
        upgradeCost[id] = Math.round(initialUpgradeCost[0] * Math.pow(compound, upgradeCount[id]));
        document.getElementById('muffinCounter').innerText = (`Muffins: ${muffinCount}`);
        document.getElementById('upgradeOneButton').innerText = (`Upgrade Click Power: ${upgradeCost[id]} Muffins`);
        if (id === 0) {
            mpcUpgrade += 1;
        } else if (id === 1) {
            mpsUpgrade += 1;
        };
    } else {
        console.log('NOT ENOUGH MUFFINS');
    };
};

function handleMuffinClick(mpcUpgrade) {
    //console.log('Who dares click The Mighty Blueberry Muffin?');
    cps += 1;
    muffinCount += 1 + mpcUpgrade;
    document.getElementById('muffinCounter').innerText = (`Muffins: ${muffinCount}`);
};

function handleMuffinsPerSecond(mpsUpgrade) {
    muffinCount += mpsUpgrade;
    document.getElementById('muffinCounter').innerText = (`Muffins: ${muffinCount}`);
};

function handleBlueberryClick(mpsUpgrade, mpcUpgrade) {
    min = 1;
    max = 3;
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    if (randomNumber === 1) {
        muffinCount += (mpsUpgrade * 600);
        document.getElementById('muffinCounter').innerText = (`Muffins: ${muffinCount}`);
    };
    if (randomNumber === 2) {
        sugarRushBool = true;
        sugarRushTime = 10;
        console.log('SUGAR RUSH');
    };
};

function disableAllInDivision(division) {
    const buttonDivision = document.getElementById(`${division}`);
    const upgradeButtons = buttonDivision.querySelectorAll('button');
    upgradeButtons.forEach(button => button.disabled = true);
    upgradeButtons.forEach(button => button.classList.add('disabledUpgradeButtons'));
};

const setMuffinsPerSecondInterval = setInterval(function() {
    //console.log(cps, lastcps, consistentcpsInterval)
    if (cps >= 30) { // Immediatly flag 30 cps and above
        console.log('FAST AUTOCLICKER DETECTED');
        disableAllInDivision('upgradeButtons');

    } else if (cps > 8 && (cps >= lastcps - 1 || cps <= lastcps + 1)) { // If the cps is greater than 8 and stays consistent (less than or greater than 1 of last cps)
        consistentcpsInterval += 1;

        if (consistentcpsInterval >= 10) {
            console.log('AUTOCLICKER DETECTED');
            disableAllInDivision('upgradeButtons');
        };

    } else {
        consistentcpsInterval = 0;
    };

    if ((sugarRushTime + 1) > 1) {
        mpcUpgrade = (upgradeCount[0] + 1) * 10 - 1
        sugarRushTime -= 1;
        if (sugarRushTime === 1) {
            sugarRushTime = 0;
            mpcUpgrade = upgradeCount[0]; // Set mpc to amount of upgrade one bought (initial) (CHANGE THIS WHEN MORE UPDATES TO MPC ARE ADDED)
        };
    };

    lastcps = cps;
    cps = 0;
    handleMuffinsPerSecond(mpsUpgrade);
}, 1000); // Give mpsUpgrade muffins per 1000 ticks (1 second)

// Create area element to map a polygon onto The Muffin image
const muffinAreaElement = document.createElement('area');
muffinAreaElement.shape = 'poly';
muffinAreaElement.coords = muffinPolygonCoords;
muffinAreaElement.onclick = function() {
    handleMuffinClick(mpcUpgrade);
};
document.getElementById('muffinMap').appendChild(muffinAreaElement);

const blueberryAreaElement = document.createElement('area');
blueberryAreaElement.shape = 'poly';
blueberryAreaElement.coords = blueberryPolygonCoords;
blueberryAreaElement.onclick = function() {
    handleBlueberryClick(mpsUpgrade, mpcUpgrade);
};
document.getElementById('blueberryMap').appendChild(blueberryAreaElement);