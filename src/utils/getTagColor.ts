const getTagColor = (value: string) => {
  let color = "";

  switch (value?.toLowerCase()) {
    case "user":
      color = "blue";
      break;
    case "vendor":
      color = "orange";
      break;
    case "pending":
      color = "blue";
      break;
    case "approved":
      color = "green";
      break;
    case "rejected":
      color = "red";
      break;
    case "active":
      color = "green";
      break;
    case "blocked":
      color = "red";
      break;
    case "paid":
      color = "green";
      break;
    case "unpaid":
      color = "red";
      break;
    case "admin":
      color = "magenta";
      break;
    case "vendor":
      color = "orange";
      break;
    case "user":
      color = "geekblue";
      break;
  }

  return color;
};

export default getTagColor;
