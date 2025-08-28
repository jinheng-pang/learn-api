import requests
import json

url = "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"

response = requests.get(url)

items = response.json()['items']
count = 0

for question in items:
    if question['tags'][0] == 'maven':
        print(question)