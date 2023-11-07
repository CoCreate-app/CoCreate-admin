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
                "path": "/admin/{{path}}",
                "pathname": "{{pathname}}",
                "directory": "admin",
                "content-type": "{{content-type}}",
                "src": "{{source}}",
                "host": [
                    "*"
                ],
                "public": "true"
            }
        }
    ]
}