/**
 * Random User Generator - JavaScript Logic
 * This script handles fetching data from the Random User API and updating the DOM.
 */

// 1. Select DOM elements using modern IDs
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userCountry = document.getElementById('user-country');
const userImg = document.getElementById('user-img');
const refreshBtn = document.getElementById('refresh-btn');
const userCard = document.getElementById('user-card');

/**
 * Function to fetch a random user from the API
 * Uses async/await and the Fetch API
 */
const fetchRandomUser = async () => {
    try {
        // Show loading state
        userCard.classList.add('loading');

        // Fetch data from the API
        const response = await fetch('https://randomuser.me/api/');

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        // Convert response to JSON
        const data = await response.json();

        // Use Destructuring to extract the user object from the results array
        const [user] = data.results;

        // Update the UI with fetched data
        displayUser(user);

    } catch (error) {
        console.error('Error fetching user:', error);
        userName.textContent = 'Oops! Error loading user.';
    } finally {
        // Remove loading state regardless of success or failure
        userCard.classList.remove('loading');
    }
};

/**
 * Function to update the DOM elements with user data
 * @param {Object} user - The user object from the API
 * Uses Template Literals and Destructuring
 */
const displayUser = (user) => {
    // Destructure properties from the user object
    const { name, email, location, picture } = user;

    // Construct the full name using template literals
    const fullName = `${name.first} ${name.last}`;

    // Update DOM elements
    userName.textContent = fullName;
    userEmail.textContent = email;
    userCountry.textContent = location.country;
    userImg.src = picture.large;
    userImg.alt = `Profile picture of ${fullName}`;
};

// 2. Add Event Listener to the Refresh Button
// Uses an Arrow Function
refreshBtn.addEventListener('click', () => {
    fetchRandomUser();
});

// 3. Initial fetch when the application loads
fetchRandomUser();
