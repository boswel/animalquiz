import pandas as pd
import json
import sys


def get_query_urls(number, animalClass):

    match animalClass:
        case "mammals":
            animals = pd.read_csv('mammals.csv')

        case "birds":
            animals = pd.read_csv('birds.csv')

        case _:
            animals = pd.read_csv('mammals.csv')

    items = animals.sample(number) 
    
    urls = []
    base_url = 'https://www.wikidata.org/w/rest.php/wikibase/v1'

    for index, item in items.iterrows():
        query_url = base_url + '/entities/items/' + item['id']
        species_name = item['taxonName']

        urls.append({'species_name': species_name, 'query_url': query_url}) 
    
    return json.dumps(urls)

