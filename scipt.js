// Select all elements with the class 'name'
const names = document.querySelectorAll(".name");

function getCSSVariable(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

names.forEach(name => {
    name.innerHTML = name.textContent
        .split("")
        .map(function(letter) {
            // Check if the letter is a space
            if (letter === " ") {
                return "&nbsp;"; // Return a non-breaking space
            }
            return `<span class="hover-letter">${letter}</span>`; // Wrap letters in spans
        })
        .join("");

    // Define your set of colors
    const colors = [
        getCSSVariable('--color-main1'),
        getCSSVariable('--color-main2'),
        getCSSVariable('--color-main3'),
        getCSSVariable('--color-main4'),
        getCSSVariable('--color-main5'),
    ];

    const letters = name.querySelectorAll(".hover-letter");

    letters.forEach(letter => {
        // Set the transform origin to the bottom
        letter.style.transformOrigin = "bottom";

        letter.addEventListener("mouseenter", function() {
            // Generate a random scale between 1.05 and 1.15
            const randomScale = 1.05 + Math.random() * 0.1; // Scale factor between 1.05 and 1.15
            letter.style.transform = `scaleY(${randomScale})`; // Stretch upwards by random scale
            
            // Choose a random color from the predefined set
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            letter.style.color = randomColor; // Set random color

            // Reset the transformation after a delay (e.g., 100ms)
            setTimeout(() => {
                letter.style.transform = "scaleY(1)"; // Reset to original
                letter.style.color = ""; // Reset color
            }, 110); // Adjust the time as necessary (100ms here)
        });
    });
});
