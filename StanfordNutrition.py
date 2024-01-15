import requests
from bs4 import BeautifulSoup

url = 'https://rdeapps.stanford.edu/dininghallmenu/'

# Send an HTTP GET request to the URL
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Now 'soup' contains the parsed HTML, and you can work with it as needed
    # For example, print the title of the webpage
    mydivs = soup.find_all("div", {"class": "container body-content"})
    #print(mydivs)
    #print(soup.body.form)
    print(soup.find(id="MainContent_Label2"))
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")