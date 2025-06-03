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
  }

  return color;
};

export default getTagColor;
