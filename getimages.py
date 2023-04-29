import pandas as pd
import requests
import hashlib


def get_animal_info():
    mammals = pd.read_csv("mammals.csv")
    item = mammals.sample()
    item_id = item["id"].to_string(index=False)

    base_url = "https://wikidata.org/w/rest.php/wikibase/v0"

    # get image
    query_image = base_url + "/entities/items/" + item_id + "/statements?property=P18"
    image = requests.get(query_image).json()
    image_name_ext = image["P18"][0]["value"]["content"]
    image_name_ext_underline = image_name_ext.replace(" ", "_")

    md5 = hashlib.md5(image_name_ext_underline.encode()).hexdigest()
    md5_1 = md5[0]
    md5_2 = md5[1]

    image_url = (
        "https://upload.wikimedia.org/wikipedia/commons/thumb/"
        + md5_1
        + "/"
        + md5_1
        + md5_2
        + "/"
        + image_name_ext_underline
        + "/320px-"
        + image_name_ext_underline
    )

    # get label
    query_label = base_url + "/entities/items/" + item_id + "/labels/en"
    label = requests.get(query_label).json()

    return {"image_url": image_url, "label": label}
