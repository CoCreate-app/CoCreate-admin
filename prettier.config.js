module.exports = {
        tabWidth: 4,
        semi: true,
        trailingComma: "none",
        bracketSameLine: true,
        useTabs: true,
        overrides: [
            {
                files: ["*.json", "*.yml", "*.yaml"],
                options: {
                    tabWidth: 2,
                    useTabs: false
                },
            }
        ],  
    };