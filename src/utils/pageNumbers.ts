export const getPageNumber: (
  pageNumber: number,
  volumeNumber: number
) => number = (pageNumber, volumeNumber) => {
  switch (volumeNumber.toString()) {
    case "1":
      break;
    case "2":
      break;
    case "3":
      if (pageNumber > 40) {
        return pageNumber + 1;
      } else if (pageNumber === 40) {
        return 40.41;
      }
      break;
    case "4":
      if (pageNumber > 85) {
        return pageNumber - 1;
      } else if (pageNumber === 85) {
        return 0;
      }
    case "5":
      if (pageNumber >= 73) {
        switch (pageNumber) {
          case 73:
            return 1.2;
          case 74:
            return 2.2;
          case 75:
            return 3.2;
          case 76:
            return 4.2;
          case 77:
            return 5.2;
          case 78:
            return 6.2;
          case 79:
            return 7.2;
          default:
            return pageNumber - 6;
        }
      } else if (pageNumber === 1) {
        return 1.2;
      }
    case "6":
      break;
    case "7":
      break;
    case "8":
      break;
    case "9":
      break;
    case "10":
      break;
    case "11":
      break;
    case "12":
      break;
    case "13":
      break;
    case "14":
      break;
    case "15":
      break;
    case "16":
      break;
    case "17":
      break;
    case "18":
      break;
    case "19":
      break;
    case "20":
      break;
    case "21":
      break;
    case "22":
      break;
    case "23":
      break;
    case "24":
      break;
    case "25":
      break;
    default:
      return pageNumber;
  }
  return pageNumber;
};
