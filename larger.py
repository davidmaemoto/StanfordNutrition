from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import urllib.parse
import time
import json
from StanfordNutrition import getData

def daily_food():
    dining_halls = ["Arrillaga Family Dining Commons", "Branner Dining", "EVGR Dining", "Florence Moore Dining", "Gerhard Casper Dining", "Lakeside Dining", "Ricker Dining", "Stern Dining", "Wilbur Dining"]
    meal_types = ["Breakfast", "Lunch", "Dinner"]

    database = {}
    for dining_hall in dining_halls:
        for meal_type in meal_types:
            if meal_type == "Breakfast":
                database[dining_hall] = [getData(dining_hall, meal_type)]
            else:
                database[dining_hall].append(getData(dining_hall, meal_type))

    return database

food_data = daily_food()

with open('food_data.json', 'w') as json_file:
    json.dump(food_data, json_file)