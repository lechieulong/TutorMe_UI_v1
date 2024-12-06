// utils/formatDate.js
export const formatDate = (dateString) => {
  const date = new Date(dateString); // Convert the string to a Date object

  // Define options for formatting the date
  const options = {
    weekday: "long", // "Monday"
    year: "numeric", // "2024"
    month: "long", // "December"
    day: "numeric", // "3"
    hour: "2-digit", // "16"
    minute: "2-digit", // "32"
    second: "2-digit", // "00"
  };

  // Format the date
  return date.toLocaleString("en-US", options);
};
