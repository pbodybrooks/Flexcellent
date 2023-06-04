module.exports = {
    // format_date: (date) => {
    //   // Format date as MM/DD/YYYY
    //   return date.toLocaleDateString();
    // },
    // format date as MM/DD/YYYY
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    // formats a string to title case and removes underscores, replaces them with spaces
    toTitleCase: (str) => {
      let words = str.replace("_", " ").split(" ");
    let titleCaseWords = words.map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    let titleCaseStr = titleCaseWords.join(" ");
    return titleCaseStr;
    }, 
    
    // simple helper to add two numbers used to format indexes from 0 to 1, 1 to 2, etc.
    addHelper : (a, b) => {
      return a + b;
    }
};


