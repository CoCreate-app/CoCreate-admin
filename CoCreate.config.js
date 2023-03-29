module.exports = {
    "config": {
        "apiKey": "2061acef-0451-4545-f754-60cf8160",
        "organization_id": "5ff747727005da1c272740ab",
        "host": "general.cocreate.app",
        "url": "wss://general.cocreate.app/ws/5ff747727005da1c272740ab"
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
                "src": "{{source}}",
                "domains": [
                    "*",
                    "general.cocreate.app"
                ],
                "directory": "/{{directory}}",
                "path": "{{path}}",
                "content-type": "{{content-type}}",
                "public": "true",
                "website_id": "61381ed8829b690010a4f2b2"
            }
        }
    ],
    "sources": [
        {
            "collection": "files",
            "document": {
                "name": "sw.js",
                "src": "{{./src/admin/sw.js}}",
                "domains": [
                    "*",
                    "general.cocreate.app"
                ],
                "directory": "/",
                "path": "/src/sw.js",
                "content-type": "text/javascript",
                "public": "true",
                "_id": "6423dca459e1f44b417af1d6"
            }
        }
    ]
}