/* ==========================================
   EXPANDABLE NAV SEARCH (Logo-Safe Layout)
   ========================================== */

     document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.search-container');
    const button = document.querySelector('.search-button');
    const input = document.querySelector('.search-input');

    if (!container || !button || !input) return;

    // 1. COMBINED TAP ACTION
    button.addEventListener('click', function(event) {
        // Stop blur event from triggering prematurely during layout animation shifts
        event.preventDefault(); 
        
        if (!container.classList.contains('active')) {
            // State A: Bar is closed -> Open it up
            container.classList.add('active');
            setTimeout(() => { input.focus(); }, 50); // Small delay to guarantee browser focus locks in safely
        } else {
            // State B: Bar is open -> Process Search or Close
            if (input.value.trim() !== "") {
                executeSearchAction(input.value);
            } else {
                // If text field is completely empty, tuck it away neatly
                container.classList.remove('active');
                input.blur();
            }
        }
    });

    // 2. LOSE FOCUS EVENT (Tapping outside elements closes the drawer)
    input.addEventListener('blur', function() {
        // Wait briefly so a button tap isn't overridden by a blur dismissal
        setTimeout(() => {
            if (input.value.trim() === "") {
                container.classList.remove('active');
            }
        }, 150);
    });

    // 3. KEYBOARD SUBMISSION HANDLER
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            executeSearchAction(input.value);
        }
    });

    // Dedicated search output function
    function executeSearchAction(queryValue) {
        console.log("Searching for: " + queryValue);
        // Put your specific web view search layout engine triggers right here!
        
        // Wipe string field and shut input animation frame back down
        input.value = "";
        container.classList.remove('active');
        input.blur();
    }
});