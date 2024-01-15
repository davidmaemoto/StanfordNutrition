from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import urllib.parse
import time

# Use Firefox webdriver
driver = webdriver.Firefox(executable_path='/Users/davidmaemoto/Documents/geckodriver')
Nutrition_info = {}
try:
    # Open the webpage
    driver.get("https://rdeapps.stanford.edu/dininghallmenu/")

    # Locate and interact with the dropdown element
    dropdown_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "MainContent_lstLocations"))
    )

    # Use Selenium's Select class to handle dropdowns
    select = Select(dropdown_element)
    # Select the desired option by visible text
    select.select_by_visible_text("Arrillaga Family Dining Commons")


    dropdown_element2 = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "MainContent_lstMealType"))
    )

    # Use Selenium's Select class to handle dropdowns
    select2 = Select(dropdown_element2)
    # Select the desired option by visible text
    select2.select_by_visible_text("Dinner")


    # Wait for dynamic content to load (if needed)
    dynamic_content_element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "ctl01"))
)

    # Retrieve the updated HTML
    updated_html = driver.page_source
    soup = BeautifulSoup(updated_html, 'html.parser')

    label_name_elements = soup.find_all('span', {'class': 'clsLabel_Name'})
    stanford_food = [element.text for element in label_name_elements]
    stanford_food.pop()
    stanford_food.pop()
    print(stanford_food)

    for food_item in stanford_food:
        # Open a new browser for each food_item
        food_driver = webdriver.Firefox(executable_path='/Users/davidmaemoto/Documents/geckodriver')

        try:
            encoded_food_item = urllib.parse.quote_plus(food_item)
            myfitnesspal_url = f"https://www.myfitnesspal.com/nutrition-facts-calories/stanford-dining%20{encoded_food_item}"

            # Open the MyFitnessPal URL
            food_driver.get(myfitnesspal_url)

            time.sleep(2)
            # Wait for the page to load (adjust as needed)
            # WebDriverWait(food_driver, 10).until(EC.presence_of_element_located((By.ID, "__next")))

            # Extract information from the MyFitnessPal page
            myfitnesspal_html = food_driver.page_source
            myfitnesspal_soup = BeautifulSoup(myfitnesspal_html, 'html.parser')

            elements = myfitnesspal_soup.find_all('p', {'class': 'MuiTypography-root MuiTypography-body1 css-1vrztnh'})[:5]
            arr = []
            for des in elements:
                arr.append(des.text)

            Nutrition_info[food_item] = arr

        finally:
            # Quit the browser at the end of each iteration
            food_driver.quit()
finally:
    # Close the browser
    driver.quit()

print(Nutrition_info)



