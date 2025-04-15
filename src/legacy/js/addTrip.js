const dropzone = document.getElementById("dropzone");
const preview = document.getElementById("preview");

// Prevent default behavior for drag events
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => e.preventDefault());
    document.body.addEventListener(eventName, (e) => e.preventDefault());
});

// Add visual feedback when the item is over the drop zone
;['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => dropzone.classList.add('hover'));
});

;['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => dropzone.classList.remove('hover'));
});

// Handle the drop event
dropzone.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        // Ensure it's an image
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                preview.src = event.target.result;
            };
            reader.readAsDataURL(file); // Read file as a data URL
        } else {
            alert("Please drop an image file!");
        }
    }
});

// Handle clicking on the drag and drop zone
