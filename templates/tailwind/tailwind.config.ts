import * as path from "path";

module.exports = {
    content: [path.resolve(__dirname, "webapp", "**", "*.{html,js,jsx,ts,tsx}")],
    theme: {
        extend: {},
    },
    plugins: [],
}
