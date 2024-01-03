import md5Hex from 'https://cdn.jsdelivr.net/npm/md5-hex@4.0.0/+esm'

export class Quiz {

    numberOfPictures;

    constructor(numberOfPictures = 9) {
        this.numberOfPictures = numberOfPictures;
    }

    async get_query_urls() {
        return fetch('/info?number=' + this.numberOfPictures)
            .then(response => response.json())
            .then(json => console.log(json))
    }

    async get_image_url(query_url) {
        return fetch(query_url)
            .then(response => response.json())
            .then(object => {
                let image_name = object['P18'][0]['value']['content'];
                let image_name_underline = image_name.replaceAll(' ', '_');

                let md5 = md5Hex(image_name_underline);
                let md5_1 = md5[0];
                let md5_2 = md5[1];

                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + md5_1 + '/' + md5_1 + md5_2 + '/' +
                    image_name_underline + '/320px-' + image_name_underline;
            })
    }

    async get_label(query_url) {
        return fetch(query_url)
            .then(response => response.json())
    }

    async get_info() {
        let urls = await this.get_query_urls();

        let info_promises = [];

        for (let item of urls) {
            info_promises.push(this.get_image_url(item['image_query_url']));
            info_promises.push(this.get_label(item['label_query_url']));

        }

        let results = await Promise.all(info_promises);

        let info = [];

        for (let i = 0; i < results.length; i += 2) {
            let obj = { 'image_url': results[i], 'label': results[i + 1] };
            info.push(obj);
        }

        return info;
    }
}
