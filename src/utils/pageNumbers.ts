// Exceptions for various numbers added here
export const getPageNumber: (
  pageIndex: number,
  volumeNumber: number
) => string = (pageIndex, volumeNumber) => {
  switch (volumeNumber) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      if (pageIndex > 40) {
        return (pageIndex + 1).toString();
      } else if (pageIndex === 40) {
        return "40-41";
      }
      break;
    case 4:
      if (pageIndex < 85) {
        return (pageIndex + 4).toString();
      } else if (pageIndex > 85) {
        return (pageIndex - 1).toString();
      } else if (pageIndex === 85) {
        return "Cover";
      }
      break;
    case 5:
      if (pageIndex > 1 && pageIndex < 73) {
        return (pageIndex + 1).toString();
      } else if (pageIndex > 79) {
        return (pageIndex - 6).toString();
      } else if (pageIndex > 72 && pageIndex < 80) {
        return `${pageIndex - 72}b`;
      } else if (pageIndex === 1) {
        return "1-2";
      }
      break;
    case 6:
      if (pageIndex > 2 && pageIndex < 22) {
        return (pageIndex - 1).toString();
      } else if (pageIndex > 23 && pageIndex < 32) {
        return (pageIndex - 3).toString();
      } else if (pageIndex > 30 && pageIndex < 36) {
        return `${pageIndex - 31}b`;
      } else if (pageIndex > 35 && pageIndex < 126) {
        return (pageIndex - 7).toString();
      } else if (pageIndex > 126) {
        return (pageIndex - 8).toString();
      } else if (pageIndex === 23 || pageIndex === 236) {
        return "squeak";
      } else if (pageIndex === 22) {
        return "bonk";
      } else if (pageIndex === 2) {
        return (pageIndex - 1).toString();
      } else if (pageIndex === 1) {
        return "Cover";
      }
      break;
    case 7:
      if (pageIndex > 48 && pageIndex < 80) {
        return (pageIndex - 1).toString();
      } else if (pageIndex > 79 && pageIndex < 95) {
        return `${pageIndex - 79}b`;
      } else if (pageIndex > 94 && pageIndex < 111) {
        return (pageIndex - 16).toString();
      } else if (pageIndex > 111 && pageIndex < 132) {
        return (pageIndex - 15).toString();
      } else if (pageIndex > 131) {
        return `${pageIndex - 132 + 16}b`;
      } else if (pageIndex === 111) {
        return "95-96";
      } else if (pageIndex === 48) {
        return "47.5";
      }

      break;
    case 8:
      break;
    case 9:
      if (pageIndex === 1) {
        return "cover"
      } else {
        return (pageIndex - 1).toString()
      }
      break;
    case 10:
      break;
    case 11:
      break;
    case 12:
      break;
    case 13:
      break;
    case 14:
      break;
    case 15:
      break;
    case 16:
      break;
    case 17:
      break;
    case 18:
      break;
    case 19:
      break;
    case 20:
      break;
    case 21:
      break;
    case 22:
      break;
    case 23:
      break;
    case 24:
      break;
    case 25:
      break;
    default:
      return pageIndex.toString();
  }
  return pageIndex.toString();
};
