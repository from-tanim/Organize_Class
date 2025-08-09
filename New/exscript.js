< script >


    //Here goes the Countdown

    function updateCountdown() {
        // Set the target date to November 15, 2025 at 00:00:00
        const targetDate = new Date('November 15, 2025 00:00:00');

        const now = new Date();
        const diff = targetDate - now;

        // Calculate time difference
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update the display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // If the countdown is finished
        if (diff < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            // You could also display a message here
            document.querySelector('.countdown-title').textContent = 'The event has started!';
        }
    }

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call




// Initialize all chapters as collapsed
document.querySelectorAll('.chapter').forEach(chapter => {
    chapter.classList.remove('active');
});

// Subject tab switching
document.querySelectorAll('.subject-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.subject-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.subject-content').forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const subjectId = tab.getAttribute('data-subject');
        document.getElementById(`${subjectId}-content`).classList.add('active');
    });
});

// Toggle individual chapters
document.querySelectorAll('.chapter-header').forEach(header => {
    header.addEventListener('click', () => {
        const chapter = header.parentElement;
        chapter.classList.toggle('active');
        updateToggleAllButton();
    });
});

// Search functionality
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let hasResults = false;

    document.querySelectorAll('.video-card').forEach(card => {
        const title = card.querySelector('.video-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
            hasResults = true;

            // Show parent chapters of matching videos
            let parentChapter = card.closest('.chapter');
            parentChapter.classList.add('active');
            parentChapter.querySelector('.videos-container').style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Show "no results" message if needed
    const noResults = document.querySelector('.no-results');
    if (!hasResults) {
        if (!noResults) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.textContent = 'No lectures found matching your search.';
            document.querySelector('.video-grid').appendChild(noResultsDiv);
        }
    } else if (noResults) {
        noResults.remove();
    }
});

// Expand/Collapse All functionality
const toggleAllBtn = document.querySelector('.toggle-all-btn');
toggleAllBtn.addEventListener('click', () => {
    const activeSubject = document.querySelector('.subject-content.active');
    const chapters = activeSubject.querySelectorAll('.chapter');
    const allExpanded = Array.from(chapters).every(ch => ch.classList.contains('active'));

    chapters.forEach(chapter => {
        if (allExpanded) {
            chapter.classList.remove('active');
        } else {
            chapter.classList.add('active');
        }
    });

    updateToggleAllButton();
});

function updateToggleAllButton() {
    const activeSubject = document.querySelector('.subject-content.active');
    if (!activeSubject) return;

    const chapters = activeSubject.querySelectorAll('.chapter');
    const allExpanded = chapters.length > 0 && Array.from(chapters).every(ch => ch.classList.contains('active'));
    toggleAllBtn.innerHTML = allExpanded ? '<i class="fas fa-compress"></i> Collapse All' : '<i class="fas fa-expand"></i> Expand All';
}

// Filter button functionality (placeholder)
document.querySelector('.filter-btn').addEventListener('click', () => {
    alert('Filter functionality will be implemented here');
});

// Set random progress for demo purposes
document.querySelectorAll('.progress-completed').forEach(progress => {
    if (!progress.style.width || progress.style.width === '0%') {
        const randomProgress = Math.floor(Math.random() * 30) + 10;
        progress.style.width = `${randomProgress}%`;
    }
}); <
/script>
