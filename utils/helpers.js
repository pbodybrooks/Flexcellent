module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    toTitleCase: (str) => {
      let words = str.replace("_", " ").split(" ");
    let titleCaseWords = words.map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    let titleCaseStr = titleCaseWords.join(" ");
    return titleCaseStr;
    },      
};

