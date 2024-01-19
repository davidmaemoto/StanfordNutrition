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
    recurring = {}
    recurring["Breakfast"] = {}
    recurring["Lunch"] = {}
    recurring["Dinner"] = {}
    for dining_hall in dining_halls:
        database[dining_hall] = {}
        for meal_type in meal_types:
            if dining_hall == "EVGR Dining" and meal_type == "Breakfast":
                continue
            if meal_type == "Breakfast":
                database[dining_hall][meal_type] = getData(dining_hall, meal_type, recurring)
            else:
                database[dining_hall][meal_type] = getData(dining_hall, meal_type, recurring)

    return database

food_data = daily_food()

with open('food_data.json', 'w') as json_file:
    json.dump(food_data, json_file)