export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("fr-Fr", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDate = formatter.format(date);

  return formattedDate;
};
