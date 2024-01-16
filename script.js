// Function to fetch food data from JSON file
async function fetchFoodData() {
    const response = await fetch('food_data.json');
    const data = await response.json();
    return data;
}


async function populateDiningHallSelection() {
    try {
        const foodData = await fetchFoodData();
        console.log('Fetched food data:', foodData);

        const diningHallSelection = document.getElementById('diningHallSelection');
        console.log('Dropdown element:', diningHallSelection);

        // Clear previous options
        diningHallSelection.innerHTML = '<option value="" disabled selected>Select a dining hall</option>';

        // Populate dining hall selection dropdown
        for (const diningHall in foodData) {
            const option = document.createElement('option');
            option.value = diningHall;
            option.text = diningHall;
            diningHallSelection.appendChild(option);
        }

        console.log('Number of dining halls:', Object.keys(foodData).length);

        // Trigger the change event to populate food selection based on the default selected dining hall
        diningHallSelection.dispatchEvent(new Event('change'));
    } catch (error) {
        console.error('Error fetching or populating dining halls:', error);
    }
}



// Function to populate food selection dropdown based on dining hall selection
function populateFoodSelection() {
    updateGoalStatus()
    const selectedDiningHall = diningHallSelection.value;
    const foodsInHall = foodData[selectedDiningHall];

    const foodSelection = document.getElementById('foodSelection');
    foodSelection.innerHTML = '<option value="" disabled selected>Select a food</option>';

    for (const foodItem of foodsInHall) {
        for (const itemName in foodItem) {
            const option = document.createElement('option');
            option.value = itemName;
            option.text = itemName;
            foodSelection.appendChild(option);
        }
    }
}

// Function to add selected food to the plate
function addToPlate() {
    const selectedDiningHall = diningHallSelection.value;
    const selectedFoodName = foodSelection.value;

    if (selectedDiningHall && selectedFoodName) {
        const plateList = document.getElementById('plateList');
        const totalCaloriesElement = document.getElementById('totalCalories');
        const totalCarbsElement = document.getElementById('totalCarbs');
        const totalFatElement = document.getElementById('totalFat');
        const totalProteinElement = document.getElementById('totalProtein');

        // Find the selected food item in the data
        const selectedFoodItem = foodData[selectedDiningHall].find(item => item[selectedFoodName]);

        if (selectedFoodItem) {
            // Get serving size and create remove button
            const servingSize = selectedFoodItem[selectedFoodName][0].split(':')[1].trim();
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove Food';
            
            // Add click event to the remove button, passing listItem and selectedFoodItem
            removeButton.addEventListener('click', () => removeFromPlate(listItem, selectedFoodItem, selectedFoodName));

            // Create list item and append remove button
            const listItem = document.createElement('li');
            listItem.textContent = `${selectedDiningHall} - ${selectedFoodName} (${servingSize})           `;
            listItem.appendChild(removeButton);

            listItem.style.marginBottom = '10px';

            // Append the listItem to the plateList
            plateList.appendChild(listItem);

            // Update the total values
            const totalCalories = parseInt(totalCaloriesElement.textContent) + parseInt(selectedFoodItem[selectedFoodName][1].split(' ')[1]);
            totalCaloriesElement.textContent = totalCalories;
            
            const calorieGoalElement = document.getElementById('desiredCalories');
            const calorieGoalStatusElement = document.getElementById('calorieGoalStatus');

            const calorieGoal = parseInt(calorieGoalElement.value);

            calorieGoalStatusElement.textContent = totalCalories <= calorieGoal ? 'Goal Met' : 'Goal Not Met';
            calorieGoalStatusElement.style.color = totalCalories <= calorieGoal ? 'green' : 'red';

            //percentage = parseInt(selectedFoodItem[selectedFoodName][1].split(' ')[1])/totalCalories
            
            const totalCarbs = parseInt(totalCarbsElement.textContent) + parseInt(selectedFoodItem[selectedFoodName][2].split(' ')[1]);
            totalCarbsElement.textContent = totalCarbs;

            const totalFat = parseInt(totalFatElement.textContent) + parseInt(selectedFoodItem[selectedFoodName][3].split(' ')[1]);
            totalFatElement.textContent = totalFat;

            const totalProtein = parseInt(totalProteinElement.textContent) + parseInt(selectedFoodItem[selectedFoodName][4].split(' ')[1]);
            totalProteinElement.textContent = totalProtein;

            // Clear the food selection
            foodSelection.value = '';
        }
    }
}

// Function to remove selected food from the plate
function removeFromPlate(listItem, selectedFoodItem, selectedFoodName) {
    const plateList = document.getElementById('plateList');
    const totalCaloriesElement = document.getElementById('totalCalories');
    const totalCarbsElement = document.getElementById('totalCarbs');
    const totalFatElement = document.getElementById('totalFat');
    const totalProteinElement = document.getElementById('totalProtein');

    // Update the total values based on the removed item
    const removedCalories = parseInt(selectedFoodItem[selectedFoodName][1].split(' ')[1]);
    const removedCarbs = parseInt(selectedFoodItem[selectedFoodName][2].split(' ')[1]);
    const removedFat = parseInt(selectedFoodItem[selectedFoodName][3].split(' ')[1]);
    const removedProtein = parseInt(selectedFoodItem[selectedFoodName][4].split(' ')[1]);

    totalCaloriesElement.textContent = parseInt(totalCaloriesElement.textContent) - removedCalories;
    totalCarbsElement.textContent = parseInt(totalCarbsElement.textContent) - removedCarbs;
    totalFatElement.textContent = parseInt(totalFatElement.textContent) - removedFat;
    totalProteinElement.textContent = parseInt(totalProteinElement.textContent) - removedProtein;

    // Remove the item from the plate list
    plateList.removeChild(listItem);

    updateGoalStatus()
}

// Function to update the goal status
function updateGoalStatus() {
    const totalCaloriesElement = document.getElementById('totalCalories');
    const calorieGoalElement = document.getElementById('desiredCalories');
    const calorieGoalStatusElement = document.getElementById('calorieGoalStatus');

    const calorieGoal = parseInt(calorieGoalElement.value);
    const totalCalories = parseInt(totalCaloriesElement.textContent);

    calorieGoalStatusElement.textContent = totalCalories <= calorieGoal ? 'Goal Met' : 'Goal Not Met';
    calorieGoalStatusElement.style.color = totalCalories <= calorieGoal ? 'green' : 'red';
}

function clearPlate() {
    const plateList = document.getElementById('plateList');
    const totalCaloriesElement = document.getElementById('totalCalories');
    const totalCarbsElement = document.getElementById('totalCarbs');
    const totalFatElement = document.getElementById('totalFat');
    const totalProteinElement = document.getElementById('totalProtein');

    // Clear the plate list and reset total values
    plateList.innerHTML = '';
    totalCaloriesElement.textContent = '0';
    totalCarbsElement.textContent = '0';
    totalFatElement.textContent = '0';
    totalProteinElement.textContent = '0';

    diningHallSelection.value = '';

    updateGoalStatus()
}

// Fetch food data and populate the dropdowns on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Use the fetched food data
    foodData = await fetchFoodData();

    // Populate dining hall selection dropdown
    await populateDiningHallSelection();
});

// Event listener for dining hall selection change
const diningHallSelection = document.getElementById('diningHallSelection');
diningHallSelection.addEventListener('change', populateFoodSelection);
