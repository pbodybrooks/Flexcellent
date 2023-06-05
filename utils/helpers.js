module.exports = {
    // format_date: (date) => {
    //   // Format date as MM/DD/YYYY
    //   return date.toLocaleDateString();
    // },
    format_date: (date) => {
      // Using JavaScript Date methods, we get and format the month, date, and year
      // We need to add one to the month since it is returned as a zero-based value
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        // We add five years to the 'year' value to calculate the end date
        new Date(date).getFullYear()
      }`;
    },
    toTitleCase: (str) => {
      let words = str.replace("_", " ").split(" ");
    let titleCaseWords = words.map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    let titleCaseStr = titleCaseWords.join(" ");
    return titleCaseStr;
  },

  addHelper: (a, b) => {
    return a + b;
  },

};


