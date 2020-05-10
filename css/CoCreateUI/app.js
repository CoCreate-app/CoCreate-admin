var UglifyCss = require("uglifycss");
var fs = require('fs');
const pkg = require('./package.json');
const name = pkg.name;
const folderOutput = './../' //folder JS project
const fileOutput = folderOutput+name+'.min.css'
console.log("Compiling and minifying...")

const file_to_compress = [
'../CoCreate-core.css',
'../CoCreate-badge.css',
'../CoCreate-builder.css',
'../CoCreate-calendar.css',
'../CoCreate-card.css',
'../CoCreate-datatables.css',
'../CoCreate-dropdown.css',
'../CoCreate-flex.css',
'../CoCreate-floating-label.css',
'../CoCreate-horizontal-scroll.css',
'../CoCreate-menu-icon.css',
'../CoCreate-navbar.css',
'../CoCreate-select.css',
'../CoCreate-sidenav.css',
'../CoCreate-menu.css',
'../CoCreate-scroll.css',
'../CoCreate-windows.css'
];

var options = { 
    maxLineLen: 500, 
    expandVars: true, 
    output: {
        beautify: false,
        preamble: "/* CoCreateUI CSS*/"
    },
};

    var result = UglifyCss.processFiles(file_to_compress,options);
    fs.writeFileSync(fileOutput, result);
    
console.log("Successfully Created "+fileOutput)