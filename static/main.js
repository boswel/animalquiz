import md5Hex from 'https://cdn.jsdelivr.net/npm/md5-hex@4.0.0/+esm'
import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.13.7/+esm' 

let numberOfPictures = 9;

async function get_query_urls(int) {
    return fetch('/info?number=' + int)
    .then(response => response.json())
}

async function get_single_animal_data(item) {

    return fetch(item.query_url)
    .then(response => response.json())
    .then(object => {
        let image_name = object['statements']['P18'][0]['value']['content'];// Q: P18 can be undefined, how do I safeguard?
        
//        if (image_name) {
        let image_name_underline = image_name.replaceAll(' ', '_');

        let md5 = md5Hex(image_name_underline);
        let md5_1 = md5[0];
        let md5_2 = md5[1];

        let image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + md5_1 + '/' + md5_1 + md5_2 + '/' +
            image_name_underline + '/320px-' + image_name_underline;
//        }

        let possibleLabels = [
            object.labels['en-gb'],
            object.labels['en-us'],
            object.labels.en,
            object.aliases?.en && object.aliases.en[0] // returns first false value or last true value
        ]

        let label = item.species_name;
        let hasCommonName = false;

        for (let possibleLabel of possibleLabels) {
            if (possibleLabel && possibleLabel !== label) {
                label = possibleLabel;
                hasCommonName = true;
                break;
            }
        }

        let wiki_url = object.sitelinks?.enwiki?.url; // null-safe traversal

        return { image_url, label, wiki_url, hasCommonName }; // uses var names to generate key names automatically
    })
}

async function get_all_animal_data() {
    let urls = await get_query_urls(numberOfPictures);

    let info_promises = [];

    for (let item of urls) {
        info_promises.push(get_single_animal_data(item));
    }

    return Promise.all(info_promises);
}


let info = await get_all_animal_data();
let target = info[Math.floor(Math.random() * numberOfPictures)];

Alpine.store('data', {
    info: info,
    target: target,
    answerStatus: null
});

Alpine.start();

// Q: Why are some images ("resources") "blocked by OpaqueResponseBlocking"? 