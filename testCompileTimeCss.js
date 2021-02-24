let { parse } = require('node-html-parser');
const fs = require('fs')
const path = require('path')


var utilityClassList = [];
let myStyle = [];


function goThrough(el) {
    if (el.classNames)
        addParsingClassList(el.classNames);

    if (el.childNodes)
        for (let child of el.childNodes)
            goThrough(child)
}



const range_names = ["xs", "sm", "md", "lg", "xl"];
const ranges = [
    [0, 567],
    [576, 768],
    [769, 992],
    [993, 1200],
    [1201, 0],
];

function addParsingClassList(classList) {
    let re = /.+:.+/;
    for (let classname of classList) {
        try {
            if (re.exec(classname)) {
                if (utilityClassList.indexOf(classname) == -1) {
                    let re_at = /.+@.+/;
                    if (re_at.exec(classname)) {
                        let parts = classname.split("@");
                        let main_rule = parseClass(classname);

                        for (let i = 1; i < parts.length; i++) {
                            let range_num = range_names.indexOf(parts[i]);
                            if (range_num == -1) continue;
                            let range = ranges[range_num];
                            let prefix = "@media screen";
                            if (range[0] != 0) {
                                prefix += " and (min-width:" + range[0] + "px)";
                            }
                            if (range[1] != 0) {
                                prefix += " and (max-width:" + range[1] + "px)";
                            }
                            let rule = prefix + "{" + main_rule + "}";
                            myStyle.push(rule);
                            utilityClassList.push(classname);
                        }
                    } else {
                        let rule = parseClass(classname);
                        myStyle.push(rule);
                        utilityClassList.push(classname);
                    }
                }
            }
        } catch (e) {}
    }
}

function parseClass(classname) {
    let res = classname.split(":");
    let rule = "";
    let suffix = res[1]
        .replace(/\./g, "\\.")
        .replace(/%/, "\\%")
        .replace(/@/g, "\\@")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)")
        .replace(/#/g, "\\#")
        .replace(/,/g, "\\,")
        .replace(/!/, "\\!");
    res[1] = res[1].split("@")[0];
    res[1] = res[1].replace(/_/g, " ");
    if (res.length > 2) {
        let pseudo = [];
        for (let i = 0; i < res.length - 2; i++) {
            suffix += "\\:" + res[2 + i];
            pseudo.push(":" + res[2 + i]);
        }
        let clsname = "." + res[0] + "\\:" + suffix;
        rule += clsname + pseudo[0];
        for (let i = 1; i < pseudo.length; i++) {
            rule += ", " + clsname + pseudo[i];
        }
        rule += `{${res[0]}:${res[1]}}`;
    } else {
        rule = `.${res[0]}\\:${suffix}{${res[0]}:${res[1]}}`;
    }
    return rule;
}


// let fileList = ['./src/index.html','./src/signup.html','./src/signin.html'];
let fileList = ['./src/index.html'];
fileList.forEach(file=>{
    let str = fs.readFileSync(file)
  
const root = parse(str);
goThrough(root)
myStyle.sort();
let style = parse(`
<style type="text/css">
${myStyle.join('\r\n')}
</style>
`)
root.querySelector('head').appendChild(style)
let result = root.toString()
 fs.writeFileSync(path.resolve('dist', path.basename(file)), result); 
})    
