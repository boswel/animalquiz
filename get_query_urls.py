import pandas as pd

def get_query_urls(number):

    mammals = pd.read_csv('mammals.csv')
    items = mammals.sample(number) 
        
    ids = items['id'].tolist()
    
    urls = []
    base_url = 'https://www.wikidata.org/w/rest.php/wikibase/v0'

    for id in ids: 
        query_url = base_url + "/entities/items/" + id
        urls.append({"query_url": query_url}) 

    return urls