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

        // Trigger the change event to populate meal selection based on the default selected dining hall
        diningHallSelection.dispatchEvent(new Event('change'));
    } catch (error) {
        console.error('Error fetching or populating dining halls:', error);
    }
}

let foodData;

async function populateMealSelection() {
    try {
        clearPlate();

        const selectedDiningHall = diningHallSelection.value;

        const mealsInHall = foodData[selectedDiningHall];

        mealType = document.getElementById('mealType');
        console.log('Dropdown element:', mealType);

        // Clear previous options
        mealType.innerHTML = '<option value="" disabled selected>Select a meal type</option>';

        // Populate dining hall selection dropdown
        for (const mT in mealsInHall) {
            const option = document.createElement('option');
            option.value = mT;
            option.text = mT;
            mealType.appendChild(option);
        }

        console.log('Number of meals:', Object.keys(foodData[selectedDiningHall]).length);

        // Trigger the change event to populate food selection based on the default selected dining hall
        mealType.dispatchEvent(new Event('change'));
    } catch (error) {
        console.error('Error fetching or populating meal types:', error);
    }
}



// Function to populate food selection dropdown based on dining hall selection
async function populateFoodSelection() {
    try {
        clearPlate();
        updateGoalStatus();
        const selectedDiningHall = diningHallSelection.value;
        const selectedMealType = mealType.value;
        const foodsInHall = foodData[selectedDiningHall][selectedMealType];

        const foodSelection = document.getElementById('foodSelection');
        console.log('Dropdown element:', foodSelection);

        foodSelection.innerHTML = '<option value="" disabled selected>Select a food</option>';

        for (const itemName in foodsInHall) {
            const option = document.createElement('option');
            option.value = itemName;
            option.text = itemName;
            foodSelection.appendChild(option);
        }
        console.log('Number of foods:', Object.keys(foodData[selectedDiningHall][selectedMealType]).length);

        foodSelection.dispatchEvent(new Event('change'));
    }
    catch (error) {
        console.error('Error fetching or populating food selection:', error);
    }
}

// Function to add selected food to the plate
function addToPlate() {
    const selectedDiningHall = diningHallSelection.value;
    const selectedMealType = mealType.value;
    const selectedFoodName = foodSelection.value;

    if (selectedDiningHall && selectedMealType && selectedFoodName) {
        const plateList = document.getElementById('plateList');
        const totalCaloriesElement = document.getElementById('totalCalories');
        const totalCarbsElement = document.getElementById('totalCarbs');
        const totalFatElement = document.getElementById('totalFat');
        const totalProteinElement = document.getElementById('totalProtein');

        // Find the selected food item in the data
        const selectedFoodItem = foodData[selectedDiningHall][selectedMealType][selectedFoodName];

        if (selectedFoodItem) {
            // Get serving size and create remove button
            const servingSize = selectedFoodItem[0].split(':')[1].trim();
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove Food';
            
            // Add click event to the remove button, passing listItem and selectedFoodItem
            removeButton.addEventListener('click', () => removeFromPlate(listItem, selectedFoodItem));

            // Create list item and append remove button
            const listItem = document.createElement('li');
            listItem.textContent = `${selectedFoodName} - (${servingSize})       `;
            listItem.appendChild(removeButton);

            listItem.style.marginBottom = '10px';

            // Append the listItem to the plateList
            plateList.appendChild(listItem);

            // Update the total values
            const totalCalories = parseInt(totalCaloriesElement.textContent) + parseInt(selectedFoodItem[1].split(' ')[1]);
            totalCaloriesElement.textContent = totalCalories;
            
            const calorieGoalElement = document.getElementById('desiredCalories');
            const calorieGoalStatusElement = document.getElementById('calorieGoalStatus');

            const calorieGoal = parseInt(calorieGoalElement.value);

            calorieGoalStatusElement.textContent = totalCalories <= calorieGoal ? 'Goal Met' : 'Goal Not Met';
            calorieGoalStatusElement.style.color = totalCalories <= calorieGoal ? 'green' : 'red';

            //percentage = parseInt(selectedFoodItem[selectedFoodName][1].split(' ')[1])/totalCalories
            
            const totalCarbs = parseInt(totalCarbsElement.textContent) + parseInt(selectedFoodItem[2].split(' ')[1]);
            totalCarbsElement.textContent = totalCarbs;

            const totalFat = parseInt(totalFatElement.textContent) + parseInt(selectedFoodItem[3].split(' ')[1]);
            totalFatElement.textContent = totalFat;

            const totalProtein = parseInt(totalProteinElement.textContent) + parseInt(selectedFoodItem[4].split(' ')[1]);
            totalProteinElement.textContent = totalProtein;

            // Clear the food selection
            foodSelection.value = '';
        }
    }
}

// Function to remove selected food from the plate
function removeFromPlate(listItem, selectedFoodItem) {
    const plateList = document.getElementById('plateList');
    const totalCaloriesElement = document.getElementById('totalCalories');
    const totalCarbsElement = document.getElementById('totalCarbs');
    const totalFatElement = document.getElementById('totalFat');
    const totalProteinElement = document.getElementById('totalProtein');

    // Update the total values based on the removed item
    const removedCalories = parseInt(selectedFoodItem[1].split(' ')[1]);
    const removedCarbs = parseInt(selectedFoodItem[2].split(' ')[1]);
    const removedFat = parseInt(selectedFoodItem[3].split(' ')[1]);
    const removedProtein = parseInt(selectedFoodItem[4].split(' ')[1]);

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

    //diningHallSelection.value = '';
    //mealType.value = '';

    updateGoalStatus()
}

// Fetch food data and populate the dropdowns on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Use the fetched food data
    foodData = await fetchFoodData();

    // Populate dining hall selection dropdown
    await populateDiningHallSelection();
    
    // Add event listener for meal calorie goal change
    const calorieGoalElement = document.getElementById('desiredCalories');
    calorieGoalElement.addEventListener('input', updateGoalStatus);
});

// Event listener for dining hall selection change
const diningHallSelection = document.getElementById('diningHallSelection');
diningHallSelection.addEventListener('change', populateMealSelection);
//const mealType = document.getElementById('mealType');
//mealType.addEventListener('change', populateFoodSelection);
