module.exports = {
    // format date as MM/DD/YYYY
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    // format date as "Thursday, June 1st, 2023", for example. (used for Workout History)
    format_date_day_of_week: (date) => {
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = new Date(date).toLocaleDateString(undefined, options);
      const day = new Date(date).getDate();
      let suffix;
    
      if (day >= 11 && day <= 13) {
        suffix = 'th';
      } else {
        switch (day % 10) {
          case 1:
            suffix = 'st';
            break;
          case 2:
            suffix = 'nd';
            break;
          case 3:
            suffix = 'rd';
            break;
          default:
            suffix = 'th';
        }
      }
    
      return formattedDate.replace(/\b\d+\b/, (match) => match + suffix);
    },
        
    // simple helper to add two numbers used to format indexes from 0 to 1, 1 to 2, etc.
    addHelper : (a, b) => {
      return a + b;
    }
};


