module.exports = {
    "config": {
        "organization_id": "5ff747727005da1c272740ab",
        "key": "2061acef-0451-4545-f754-60cf8160",
        "host": "general.cocreate.app"
    },
    "directories": [
        {
            "entry": "./src",
            "exclude": [
                "demos"
            ],
            "collection": "files",
            "document": {
                "name": "{{name}}",
                "path": "{{path}}",
                "src": "{{source}}",
                "hosts": [
                    "*",
                    "general.cocreate.app"
                ],
                "parentDirectory": "{{parentDirectory}}",
                "directory": "/admin{{directory}}",
                "content-type": "{{content-type}}",
                "public": "true",
                "website_id": "644d4b878036fb9d1d1fd69b"
            }
        }
    ]
}