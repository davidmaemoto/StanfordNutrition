from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup

# Use Firefox webdriver
driver = webdriver.Firefox(executable_path='/Users/davidmaemoto/Documents/geckodriver')

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
    extracted_texts = [element.text for element in label_name_elements]

    print("Extracted Texts:", extracted_texts)
    


finally:
    # Close the browser
    driver.quit()



