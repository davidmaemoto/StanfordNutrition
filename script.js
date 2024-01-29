// Function to fetch food data from JSON file
async function fetchFoodData() {
    const response = await fetch('food_data.json');
    const data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', () => {
    populateDiningHallSelection();
    initializeSelectedMeal();
    // Example: Adding a click event listener to the button
    const button = document.querySelector('#selectedDiningHall');
    button.addEventListener('click', () => {
        const dropdown = document.querySelector('.custom-dropdown');
        dropdown.classList.toggle('active');

    });
    const button2 = document.querySelector('#mealType'); // Update the selector as needed

    button2.addEventListener('click', () => {
        const dropdown2 = document.querySelector('.custom-dropdown-2'); // Use the correct class
        dropdown2.classList.toggle('active');
        if (dropdown2.classList.contains('active')) {
            // Dropdown is now active, populate meal options
            populateMealSelection();
        }
    }); 

    const button3 = document.querySelector('#selectedFood'); // Update the selector as needed

    button3.addEventListener('click', () => {
        const dropdown3 = document.querySelector('.custom-dropdown-3'); // Use the correct class
        dropdown3.classList.toggle('active');
        if (dropdown3.classList.contains('active')) {
            // Dropdown is now active, populate meal options
            populateFoodSelection();
        }
    }); 

    document.addEventListener('click', (event) => {
        const dropdowns = document.querySelectorAll('.custom-dropdown, .custom-dropdown-2, .custom-dropdown-3');
        
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    });

});

function initializeSelectedDiningHall() {
    const selectedDiningHallElement = document.getElementById('selectedDiningHall');
    selectedDiningHallElement.style.display = 'flex';
    selectedDiningHallElement.style.alignItems = 'center';
    selectedDiningHallElement.style.justifyContent = 'center';
    selectedDiningHallElement.style.fontSize = '20px'; // Adjust the font size as needed
}

async function populateDiningHallSelection() {
    try {
        const foodData = await fetchFoodData();
        console.log('Fetched food data:', foodData);

        const diningHallOptions = document.getElementById('diningHallOptions');
        console.log('Dropdown content element:', diningHallOptions);

        // Clear previous options
        diningHallOptions.innerHTML = '';

        // Populate dining hall selection tiles
        for (const diningHall in foodData) {
            const tile = document.createElement('div');
            tile.classList.add('dining-hall-tile');

            // Create an <img> element for the icon
            const icon = document.createElement('img');
            icon.src = 'dining_hall.png';
            icon.alt = `${diningHall} icon`; // Provide an alt text for accessibility

            // Create a <div> for the tile text
            const tileTextDiv = document.createElement('div');
            tileTextDiv.textContent = diningHall;

            // Append the icon and tile text to the tile
            tile.appendChild(icon);
            tile.appendChild(tileTextDiv);

            tile.addEventListener('click', () => {
                // Handle tile click, you may want to trigger a function or update some state here
                console.log('Selected dining hall:', diningHall);
                updateSelectedDiningHall(diningHall);
                //populateMealSelection();
                closeDropdown('diningHallOptions');

                const dropdown = document.querySelector('.custom-dropdown');
                dropdown.classList.remove('active');
            });

            diningHallOptions.appendChild(tile);
        }

        // Add a "Quit" tile
        const quitTile = document.createElement('div');
        quitTile.classList.add('dining-hall-tile');

        // Create an <img> element for the Quit icon
        const quitIcon = document.createElement('img');
        quitIcon.src = 'quit.png';
        quitIcon.alt = 'Quit icon';

        // Create a <div> for the tile text
        const quitTextDiv = document.createElement('div');
        quitTextDiv.textContent = 'Quit';



        // Append the Quit icon and tile text to the tile
        quitTile.appendChild(quitIcon);
        quitTile.appendChild(quitTextDiv);

        quitTile.addEventListener('click', () => {
            // Handle quit tile click, you may want to trigger a function or update some state here
            console.log('Quit selected');
            updateSelectedDiningHall('Select . . . ');
            closeDropdown('diningHallOptions');

            const dropdown = document.querySelector('.custom-dropdown');
            dropdown.classList.remove('active');

            //populateMealSelection();
        });

        diningHallOptions.appendChild(quitTile);

        initializeSelectedDiningHall();
        

        console.log('Number of dining halls:', Object.keys(foodData).length);
    } catch (error) {
        console.error('Error fetching or populating dining halls:', error);
    }
}

function updateSelectedDiningHall(selectedDiningHall) {
    const selectedDiningHallElement = document.querySelector('#selectedDiningHall');
    if (selectedDiningHallElement) {
        selectedDiningHallElement.textContent = selectedDiningHall;
    }
    selectedDiningHallElement.innerHTML = '';
    // Create an <img> element for the icon
    if (selectedDiningHall != 'Select . . . ') {
        const icon = document.createElement('img');
        icon.src = 'cur_hall.png'; // Replace with the path to your icon
        icon.alt = 'Icon'; // Provide an alt text for accessibility

        // Set the icon size
        icon.style.width = '30px'; // Adjust the width as needed
        icon.style.height = '30px'; // Adjust the height as needed
        icon.style.marginRight = '5px';

        selectedDiningHallElement.appendChild(icon);


        //populateMealSelection();
    }

    updateSelectedMeal('Select . . . ');
    // Create a <div> for the text
    const textDiv = document.createElement('div');
    textDiv.textContent = selectedDiningHall;

    // Append the icon and text to the selected dining hall element
    selectedDiningHallElement.appendChild(textDiv);
    
}

function initializeSelectedMeal() {
    const selectedMealElement = document.getElementById('mealType');
    
    selectedMealElement.style.display = 'flex';
    selectedMealElement.style.alignItems = 'center';
    selectedMealElement.style.justifyContent = 'center';
    selectedMealElement.style.fontSize = '20px'; // Adjust the font size as needed
    
}

function updateSelectedMeal(mealType) {
    const selectedMealElement = document.getElementById('mealType');
    if (selectedMealElement) {
        selectedMealElement.textContent = mealType;
    }
    selectedMealElement.innerHTML = '';

    // Create an <img> element for the icon
    if (mealType !== 'Select . . . ') {
        const icon = document.createElement('img');
        if (mealType == "Breakfast") {
            icon.src = 'breakfast.png';
        }
        else if (mealType == "Lunch") {
            icon.src = 'lunch.png';
        }
        else if (mealType == "Dinner") {
            icon.src = 'dinner.png';
        }
        icon.alt = 'Icon'; // Provide an alt text for accessibility

        // Set the icon size
        icon.style.width = '30px'; // Adjust the width as needed
        icon.style.height = '30px'; // Adjust the height as needed
        icon.style.marginRight = '5px';

        selectedMealElement.appendChild(icon);
        }

    // Create a <div> for the text
    const textDiv = document.createElement('div');
    textDiv.textContent = mealType;


    
    // Append the icon and text to the selected meal element
    selectedMealElement.appendChild(textDiv);
    const dropdown = document.querySelector('.custom-dropdown-2');
    dropdown.classList.remove('active'); // Close the meal dropdown after selection
}


async function populateMealSelection() {
    try {
        clearPlate();

        const selectedDiningHall = document.getElementById('selectedDiningHall').textContent;
        const mealOptions = foodData[selectedDiningHall];

        const mealOptionsContainer = document.getElementById('mealOptions');
        console.log('Dropdown content element:', mealOptionsContainer);
        

        //mealOptionsContainer.style.display = 'flex';
       // mealOptionsContainer.style.flexWrap = 'wrap';
        //mealOptionsContainer.style.justifyContent = 'space-around';

        // Clear previous options
        mealOptionsContainer.innerHTML = '';
        
        

        // Populate meal options tiles
        for (const mealType in mealOptions) {
            const tile = document.createElement('div');
            tile.classList.add('dining-hall-tile');

            // Create an <img> element for the icon
            const icon = document.createElement('img');
            if (mealType == "Breakfast") {
                icon.src = 'breakfast.png';
            }
            else if (mealType == "Lunch") {
                icon.src = 'lunch.png';
            }
            else if (mealType == "Dinner") {
                icon.src = 'dinner.png';
            }
            icon.alt = `${mealType} icon`; // Provide an alt text for accessibility


            // Create a <div> for the tile text
            const tileTextDiv = document.createElement('div');
            tileTextDiv.textContent = mealType;

            // Append the icon and tile text to the tile
            tile.appendChild(icon);
            tile.appendChild(tileTextDiv);

            tile.addEventListener('click', () => {
                // Handle tile click, you may want to trigger a function or update some state here
                console.log('Selected meal type:', mealType);
                updateSelectedMeal(mealType);
                closeDropdown('mealOptionsContainer');
                
            
                const dropdown2 = document.querySelector('.custom-dropdown-2');
                dropdown2.classList.remove('active');
            });

            mealOptionsContainer.appendChild(tile);
        }

        // Add a "Quit" tile
        const quitTile = document.createElement('div');
        quitTile.classList.add('dining-hall-tile');

        // Create an <img> element for the Quit icon
        const quitIcon = document.createElement('img');
        quitIcon.src = 'quit.png';
        quitIcon.alt = 'Quit icon';


        // Create a <div> for the tile text
        const quitTextDiv = document.createElement('div');
        quitTextDiv.textContent = 'Quit';



        // Append the Quit icon and tile text to the tile
        quitTile.appendChild(quitIcon);
        quitTile.appendChild(quitTextDiv);

        quitTile.addEventListener('click', () => {
            // Handle quit tile click, you may want to trigger a function or update some state here
            console.log('Quit selected');
            updateSelectedMeal('Select . . . ');
            closeDropdown('mealOptionsContainer');

            const dropdown2 = document.querySelector('.custom-dropdown-2');
            dropdown2.classList.remove('active');
        });

        mealOptionsContainer.appendChild(quitTile);

        

        //initializeSelectedMeal();


        console.log('Number of meals:', Object.keys(mealOptions).length);
    } catch (error) {
        console.error('Error fetching or populating meal types:', error);
    }
}



function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function closeDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);  // Use getElementById instead of querySelector
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}



// Function to populate food selection dropdown based on dining hall selection
async function populateFoodSelection() {
    try {
        updateGoalStatus();

        const selectedDiningHall = document.getElementById('selectedDiningHall').textContent;
        const selectedMealType = document.getElementById('mealType').textContent;
        const foodsInHall = foodData[selectedDiningHall][selectedMealType];

        const foodSelection = document.getElementById('foodSelection');
        console.log('Dropdown element:', foodSelection);

        // Clear previous options
        foodSelection.innerHTML = '';
        
        const selectedFoods = [];

        // Populate meal options tiles
        for (const itemName in foodsInHall) {
            const tile = document.createElement('div');
            tile.classList.add('dining-hall-tile');

            // Create an <img> element for the icon
            const icon = document.createElement('img');
            icon.src = 'food.png';
            icon.alt = `${itemName} icon`; // Provide an alt text for accessibility


            // Create a <div> for the tile text
            const tileTextDiv = document.createElement('div');
            tileTextDiv.textContent = itemName;
        
            // Append the icon and tile text to the tile
            tile.appendChild(icon);
            tile.appendChild(tileTextDiv);

            tile.addEventListener('click', () => {
                // Handle tile click, you may want to trigger a function or update some state here
                
                const index = selectedFoods.indexOf(itemName);
                if (index === -1) {
                    // Not selected, add to the list
                    selectedFoods.push(itemName);
                    tile.classList.add('selected');
                } 
                else {
                    // Already selected, remove from the list
                    selectedFoods.splice(index, 1);
                    tile.classList.remove('selected');
                }
            
            console.log('Selected food:', selectedFoods);
            updateSelectedItemsDisplay(selectedFoods);

                //updateSelectedMeal(mealType);

                //closeDropdown('foodSelection');
                
            
                //const dropdown3 = document.querySelector('.custom-dropdown-3');
                //dropdown3.classList.remove('active');
            });

            foodSelection.appendChild(tile);
        }

        // Add a "Quit" tile
        const quitTile = document.createElement('div');
        quitTile.classList.add('dining-hall-tile');

        // Create an <img> element for the Quit icon
        const quitIcon = document.createElement('img');
        quitIcon.src = 'quit.png';
        quitIcon.alt = 'Quit icon';


        // Create a <div> for the tile text
        const quitTextDiv = document.createElement('div');
        quitTextDiv.textContent = 'Add to Plate';



        // Append the Quit icon and tile text to the tile
        quitTile.appendChild(quitIcon);
        quitTile.appendChild(quitTextDiv);

        quitTile.addEventListener('click', () => {

            for (const food of selectedFoods) {
                addToPlate(food);
            }
            // Handle quit tile click, you may want to trigger a function or update some state here
            console.log('Quit selected');
            //updateSelectedMeal('None');
            closeDropdown('foodSelection');

            const dropdown3 = document.querySelector('.custom-dropdown-3');
            dropdown3.classList.remove('active');
        });

        foodSelection.appendChild(quitTile);

    
        console.log('Number of meals:', Object.keys(mealOptions).length);
    } catch (error) {
        console.error('Error fetching or populating meal types:', error);
    }

}

function updateSelectedItemsDisplay(selectedFoods) {
    const selectedItemsDisplay = document.getElementById('selectedItemsDisplay');

    // Clear previous display
    selectedItemsDisplay.innerHTML = '';

    // Display selected items and quantities
    for (const itemName in selectedFoods) {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${itemName}: ${selectedFoods[itemName]}`;

        selectedItemsDisplay.appendChild(itemDiv);
    }
}


// Function to add selected food to the plate
function addToPlate(dish) {
    const selectedDiningHall = document.getElementById('selectedDiningHall').textContent;
    const selectedMealType = document.getElementById('mealType').textContent;
    const selectedFoodName = dish;

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
            listItem.textContent = `${selectedFoodName} - (${servingSize})                             `;
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
            calorieGoalStatusElement.style.color = totalCalories <= calorieGoal ? '#39ff40' : 'red';

            //percentage = parseInt(selectedFoodItem[selectedFoodName][1].split(' ')[1])/totalCalories
            
            const totalCarbs = parseInt(totalCarbsElement.textContent) + parseInt(selectedFoodItem[2].split(' ')[1]);
            totalCarbsElement.textContent = totalCarbs;

            const totalFat = parseInt(totalFatElement.textContent) + parseInt(selectedFoodItem[3].split(' ')[1]);
            totalFatElement.textContent = totalFat;

            const totalProtein = parseInt(totalProteinElement.textContent) + parseInt(selectedFoodItem[4].split(' ')[1]);
            totalProteinElement.textContent = totalProtein;
            
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
    calorieGoalStatusElement.style.color = totalCalories <= calorieGoal ? '#39ff40' : 'red';
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
