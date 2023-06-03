/**
* organization_id required if the files are servered over network using CoCreateWS
* inorder to sync databases
**/
var CoCreateConfig = {
    key: '', // Your key can be retrived from your browsers localStorage           
    organization_id: '', // Your organization_id can be retrived from your browsers localStorage       
    host: '', // Points to socket server. If not defined it will use the url in web browser by default
    serviceWorker: '/sw.js'
}
