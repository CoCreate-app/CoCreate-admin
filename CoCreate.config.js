module.exports = {
    "organization_id": "",
    "key": "",
    "host": "",
    "directories": [
        {
            "entry": "./src",
            "exclude": [
                "demos"
            ],
            "array": "files",
            "object": {
                "name": "{{name}}",
                "path": "{{path}}",
                "src": "{{source}}",
                "host": [
                    "*",
                    "general.cocreate.app"
                ],
                "parentDirectory": "{{parentDirectory}}",
                "directory": "/admin{{directory}}",
                "content-type": "{{content-type}}",
                "public": "true",
                "website_id": "644d4b878036fb9d1d1fd69b" // {{object}}
            }
        }
    ]
}