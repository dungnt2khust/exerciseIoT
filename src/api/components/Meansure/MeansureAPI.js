import BaseAPIConfig from "@/api/base/BaseAPIConfig.js";
import BaseAPI from "@/api/base/BaseAPI.js";
class Order extends BaseAPI {
  constructor() {
    super();
    this.controller = "Meansure";
  }

  /**
   * Lay du lieu 7 ngay gan day
   */
  GetLatest() {
    return BaseAPIConfig.get(
      `${this.controller}/get-latest?sessionID=${localStorage.getItem(
        "Session"
      )}`
    );
  }
  /**
   * Lay du lieu trung binh 7 ngay gan day
   */
  GetAverageLatest() {
    return BaseAPIConfig.get(
      `${this.controller}/average-latest?sessionID=${localStorage.getItem(
        "Session"
      )}`
    );
  }

  /**
   * Lay du lieu 7 ngay gan nhat ke tu ngay hien tai
   */
  Get() {
    return BaseAPIConfig.get(
      `${this.controller}/get?sessionID=${localStorage.getItem("Session")}`
    );
  }
  /**
   * Lay du lieu trung binh 7 ngay gan nhat ke tu ngay hien tai
   */
  GetAverage() {
    return BaseAPIConfig.get(
      `${this.controller}/average?sessionID=${localStorage.getItem("Session")}`
    );
  }
}

export default new Order();
