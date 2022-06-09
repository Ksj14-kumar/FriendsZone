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
        "mds-editor-search": { "min": "452px" },
        "mds-editor13": { "max": "482px" },
        "mds-editor3": { "max": "318px" },
        "mdx-editor5": { "min": "1068px" },
        "post-screen": { "max": "680px" },
        "post-screen1": { "min": "608px" },
        "mds-editor6": { "max": "370px" },
        "mds-editor7": { "max": "327px" },
        "mds-editor8": { "max": "415px" },
        "mds-editor9": { "min": "681px" },
        "mds-editor10": { "max": "300px" },
        "mds-editor12": { "min": "300px" },
        "mds-editor11": { "min": "250px" },
        "mds-editor14": { "max": "607px" },
        "mds-editor15": { "max": "534px" },
        "mds-editor16": { "max": "473px" },
        "mds-editor17": { "max": "415px" },
        "mds-editor18": { "max": "369px" },
        "mds-editor19": { "max": "369px" },
        "mds-editor20": { "max": "768px" },
        "mds-editor21": { "max": "400px" },
        "mds-editor22": { "min": "1300px" },
        "mds-editor23": { "max": "523px" },
        "mds-editor24": { "max": "767px" },
        "mds-editor25": { "max": "664px" },
        "mds-editor26": { "max": "582px" },
        "mds-editor27": { "max": "510px" },
        "mds-editor28": { "max": "478px" },
        "mds-editor29": { "max": "463px" },
        "mds-editor30": { "max": "305px" },
        "mds-editor31": { "max": "717px" },
        "mds-editor32": { "max": "561px" },
        "mds-editor33": { "max": "345px" },

      }
    },
  },
  plugins: [require("daisyui"),require('tailwind-scrollbar-hide'),require('tailwind-scrollbar'),],
  variants: {
    scrollbar: ['dark']
  }
}
