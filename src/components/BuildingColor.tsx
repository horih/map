export function getBuildingBgColor(group: string) {
  switch (group) {
    case "A棟群":
      return "#A12E2A";
    case "B棟群":
      return "#D88535";
    case "C棟群":
      return "#377641";
    case "D棟群":
      return "#1E3368";
    case "E棟群":
      return "#FFFFFF";
    case "F棟群":
      return "#814A8C";
    case "G棟群":
      return "#8A8A8A";
    default:
      return "gray";
  }
}

export function getBuildingTextColor(group: string) {
  switch (group) {
    case "A棟群":
    case "B棟群":
    case "C棟群":
    case "D棟群":
    case "F棟群":
    case "G棟群":
      return "#FFFFFF";
    case "E棟群":
      return "#000000";
    default:
      return "gray";
  }
}

export function getBuildingBorderColor(group: string) {
  switch (group) {
    case "A棟群":
    case "B棟群":
    case "C棟群":
    case "D棟群":
    case "F棟群":
    case "G棟群":
      return "#FFFFFF";
    case "E棟群":
      return "#000000";
    default:
      return "gray";
  }
}
