module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "1sm": { "max": "437px" },
        "mdx-editor": { "min": "862px", "max": "1068px" },
        "mdx-editor1": { "min": "863px", "max": "968px" },
        "mdx-editor2": { "min": "872px", "max": "969px" },
        "mds-editor2": { "max": "452px" },
        "mds-editor3": { "max": "318px" },
        "mdx-editor5": { "min": "1068px" },
        "post-screen": { "max": "680px" },
        "mds-editor6": { "max": "370px" },
        "mds-editor7": { "max": "327px" },
        "mds-editor8": { "max": "415px" },
        "mds-editor9": { "min": "681px" },
        "mds-editor10": { "max": "300px" },
        "mds-editor12": { "min": "300px" },
        "mds-editor11": { "min": "250px" },
      }
    },
  },
  // plugins: [],
}
