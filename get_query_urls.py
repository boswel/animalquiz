import pandas as pd

def get_query_urls(number):

    mammals = pd.read_csv('mammals.csv')
    items = mammals.sample(number) 
    
    urls = []
    base_url = 'https://www.wikidata.org/w/rest.php/wikibase/v0'

    for index, item in items.iterrows():
        query_url = base_url + '/entities/items/' + item['id']
        species_name = item['taxonName']

        urls.append({'species_name': species_name, 'query_url': query_url}) 
        
    return urls

