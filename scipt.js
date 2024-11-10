window.onload = function() {
// Define the getCSSVariable function
function getCSSVariable(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

const names = document.querySelectorAll(".name");

names.forEach(name => {
    name.innerHTML = name.textContent
        .split("")
        .map(letter => {
            if (letter === " ") {
                return "&nbsp;"; // Non-breaking space for spaces
            }

            // Generate a random static rotation angle between 0 and 10 degrees
            const randomStaticAngle = Math.random() * 5 - 2.5;

            // Apply the static rotation directly in the style attribute and store it in a data attribute
            return `<span class="hover-letter" style="display: inline-block; transform: rotate(${randomStaticAngle}deg);" data-static-rotation="${randomStaticAngle}">${letter}</span>`;
        })
        .join("");

    const colors = [
        getCSSVariable('--color-main1'),
        getCSSVariable('--color-main2'),
        getCSSVariable('--color-main3'),
        getCSSVariable('--color-main4'),
        getCSSVariable('--color-main5'),
    ];

    const letters = name.querySelectorAll(".hover-letter");

    letters.forEach(letter => {
        letter.style.transformOrigin = "bottom";

        letter.addEventListener("mouseenter", function() {
            const randomScale = 1.05 + Math.random() * 0.1; 
            const randomHoverRotation = Math.random() * 14 - 7; // Hover rotation between -10 and +10

            letter.style.transform = `rotate(${randomHoverRotation}deg) scaleY(${randomScale})`; // Hover transformation

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            letter.style.color = randomColor;

            // Get the static rotation from the data attribute and reset it after the hover effect
            setTimeout(() => {
                const staticAngle = letter.getAttribute('data-static-rotation'); // Get the stored static rotation
                letter.style.transform = `rotate(${staticAngle}deg)`; // Reset to static rotation only
                letter.style.color = ""; // Reset color
            }, 110);
        });
    });
});
};
function myFunCopy() {
    // Get the text field
    var copyText = document.getElementById("myCopy");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    
    // Alert the copied text
   // alert("Copied the text: " + copyText.value);
  }

  const tags = document.querySelectorAll('.tag');
  const items = document.querySelectorAll('.album');
  
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const selectedTag = tag.getAttribute('data-tag');
  
      // Reset all items to be visible initially
      items.forEach(item => {
        item.style.display = 'flex'; // Show all items by default
      });
  
      // Apply filter based on the selected tag
      items.forEach(item => {
        const itemTags = item.getAttribute('data-tag');
        
        if (itemTags) {
          const itemTagsArray = itemTags.split(' ');
          
          // Check if the item contains the selected tag
          if (!itemTagsArray.includes(selectedTag)) {
            item.style.display = 'none'; // Hide items that don't match the selected tag
          }
        }
      });
    });
  });
