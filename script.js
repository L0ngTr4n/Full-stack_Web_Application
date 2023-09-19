// Custom JavaScript for hover effect (optional)
// You can use this to close the dropdown on mouseout if needed

// Example: Close the dropdown on mouseout
document.getElementById("dropdown-hover").addEventListener("mouseleave", function () {
    this.querySelector(".dropdown-menu").style.display = "none";
});
