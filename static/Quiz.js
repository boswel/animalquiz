import md5Hex from 'https://cdn.jsdelivr.net/npm/md5-hex@4.0.0/+esm'

export class Quiz {

    numberOfPictures;

    constructor(numberOfPictures = 9) {
        this.numberOfPictures = numberOfPictures;
    }

    async get_query_urls() {
        return fetch('/info?number=' + this.numberOfPictures)
            .then(response => response.json())
    }

    async get_single_animal_data(item) {

        return fetch(item.query_url)
            .then(response => response.json())
            .then(object => {
                let image_name = object['statements']['P18'][0]['value']['content'];
                let image_name_underline = image_name.replaceAll(' ', '_');

                let md5 = md5Hex(image_name_underline);
                let md5_1 = md5[0];
                let md5_2 = md5[1];

                let image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + md5_1 + '/' + md5_1 + md5_2 + '/' +
                    image_name_underline + '/320px-' + image_name_underline;

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

    async get_all_animal_data() {
        let urls = await this.get_query_urls();

        let info_promises = [];

        for (let item of urls) {
            info_promises.push(this.get_single_animal_data(item));
        }

        let results = await Promise.all(info_promises);

        return results;
    }
}
