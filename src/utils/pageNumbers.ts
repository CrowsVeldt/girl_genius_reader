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
      } else if (pageIndex > 72) {
        switch (pageIndex) {
          case 73:
            return "1b";
          case 74:
            return "2b";
          case 75:
            return "3b";
          case 76:
            return "4b";
          case 77:
            return "5b";
          case 78:
            return "6b";
          case 79:
            return "7b";
          default:
            return (pageIndex - 6).toString();
        }
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
        switch (pageIndex) {
          case 32:
            return "1b";
          case 33:
            return "2b";
          case 34:
            return "3b";
          case 35:
            return "4b";
          default:
            break;
        }
      } else if (pageIndex > 35 && pageIndex < 126) {
        return (pageIndex - 7).toString();
      } 
      
      else if (pageIndex > 126) {
        return (pageIndex - 8).toString();
      }
      else if (pageIndex === 126) {
        return "squeak";
      } else if (pageIndex === 23) {
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
      break;
    case 8:
      break;
    case 9:
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
