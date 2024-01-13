import pandas as pd

def get_query_urls(number):

    mammals = pd.read_csv('mammals.csv')
    items = mammals.sample(number) 
        
    ids = items['id'].tolist()
    
    urls = []
    base_url = 'https://www.wikidata.org/w/rest.php/wikibase/v0'

    for id in ids:          
        query_image = base_url + "/entities/items/" + id + "/statements?property=P18" 
        query_label = base_url + "/entities/items/" + id + "/labels/en"
        # query_article = base_url + "/entities/items/" + id + "/sitelinks/enwiki" # "under development", does not work at the moment

        urls.append({"image_query_url": query_image, "label_query_url": query_label}) # "wiki_url": query_article

    return urls