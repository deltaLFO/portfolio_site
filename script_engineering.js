// GLOBAL STATE
const terminalText = document.getElementById('terminal-text');
const benchHeader = document.getElementById('bench-header');
const statusPopup = document.getElementById('status-popup');

// PUZZLE CONFIGURATION
// Note: URLs point INSIDE the subpages folder
const puzzles = {
    signal: { 
        completed: false, 
        partId: 'part-signal', 
        dropId: 'drop-signal', 
        name: 'Signal Processing', 
        url: 'subpages/signal_processing.html' 
    },
    embedded: { 
        completed: false, 
        partId: 'part-embedded', 
        dropId: 'drop-embedded', 
        name: 'Embedded Systems', 
        url: 'subpages/embedded.html' 
    },
    robotics: { 
        completed: false, 
        partId: 'part-robotics', 
        dropId: 'drop-robotics', 
        name: 'Robotics', 
        url: 'subpages/robotics.html' 
    },
    power: { 
        completed: false, 
        partId: 'part-power', 
        dropId: 'drop-power', 
        name: 'Power Systems', 
        url: 'subpages/power.html' 
    }
};

let activeModule = 'signal';

// --- SWITCHING MODULES ---
function switchModule(moduleId) {
    activeModule = moduleId;
    const p = puzzles[moduleId];

    // 1. Update Right Menu Buttons
    document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${moduleId}`).classList.add('active');

    // 2. Update Left Workbench Header
    benchHeader.innerText = `>> WORKBENCH: ${p.name.toUpperCase()}`;

    // 3. Toggle Puzzle Views (Left Screen)
    document.querySelectorAll('.circuit-area').forEach(div => div.classList.remove('active-puzzle'));
    document.getElementById(`puzzle-${moduleId}`).classList.add('active-puzzle');

    // 4. Update Toolbox (Show correct part)
    document.querySelectorAll('.toolbox-item').forEach(item => item.classList.add('hidden'));
    
    // Only show the part if it hasn't been used yet
    if (!p.completed) {
        document.getElementById(`part-${moduleId}`).classList.remove('hidden');
    }

    // 5. Update Terminal Log
    updateTerminal(moduleId);
}

function updateTerminal(moduleId) {
    const p = puzzles[moduleId];
    let msg = `> CONTEXT: ${p.name}<br>`;
    
    if (p.completed) {
        // If already done, offer a link
        msg += `> STATUS: ACCESS GRANTED.<br>`;
        msg += `> INFO: Security bypass complete.<br>`;
        msg += `> LINK: <a href="${p.url}" style="color:#0f0">CLICK TO ENTER PROJECT</a><span class="cursor">_</span>`;
    } else {
        // If not done, show the error/task
        msg += `> STATUS: <span style="color:red">LOCKDOWN ACTIVE</span>.<br>`;
        if(moduleId === 'signal') msg += `> ERROR: Feedback Loop Open.<br>> MISSION: Install 10µF Capacitor.`;
        if(moduleId === 'embedded') msg += `> ERROR: Logic Gate Missing.<br>> MISSION: Install NAND Gate.`;
        if(moduleId === 'robotics') msg += `> ERROR: Servo Disconnected.<br>> MISSION: Install Servo Motor.`;
        if(moduleId === 'power') msg += `> ERROR: Safety Fuse Blown.<br>> MISSION: Install Fuse.`;
        msg += `<span class="cursor">_</span>`;
    }
    terminalText.innerHTML = msg;
}

// --- DRAG & DROP LOGIC ---

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function dropPart(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const currentPuzzle = puzzles[activeModule];

    // Check if correct part dropped in correct zone
    if (data === currentPuzzle.partId && ev.target.closest('.component-slot').id === currentPuzzle.dropId) {
        
        if (currentPuzzle.completed) return;
        currentPuzzle.completed = true;

        // 1. Hide Toolbox Item
        document.getElementById(currentPuzzle.partId).style.visibility = 'hidden';

        // 2. Visual Success on Puzzle
        const slot = document.getElementById(currentPuzzle.dropId);
        slot.classList.add('completed');

        // 3. Terminal Success Message
        terminalText.innerHTML = `
            > COMPONENT INSTALLED [OK]<br>
            > DIAGNOSTIC: Passed.<br>
            > UNLOCKING SECURE FILE...<br>
            > REDIRECTING...<span class="cursor">_</span>
        `;

        // 4. Popup & Redirect
        statusPopup.innerHTML = `ACCESS GRANTED: ${currentPuzzle.name.toUpperCase()}`;
        statusPopup.classList.add('show');

        // WAIT 2 SECONDS, THEN LOAD THE PAGE
        setTimeout(() => {
            window.location.href = currentPuzzle.url;
        }, 2000);
    }
}