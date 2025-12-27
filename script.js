function attemptSecretAccess() {
    // 1. Ask for password
    const password = prompt(">> SECURE CHANNEL DETECTED.\n>> ENTER ACCESS CODE:");
    
    // 2. Check password
    if (password === "12345678") {
        alert(">> ACCESS GRANTED.");
        
        // 3. Redirect to the subpages folder
        window.location.href = "subpages/secret.html";
        
    } else if (password !== null) { 
        // If they type wrong password (and didn't hit Cancel)
        alert(">> ACCESS DENIED.");
    }
}