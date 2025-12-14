import axios from "axios";
import Category from "../models/Category";

class CategoriesController {
  //CRUD
  //?access_token=${}
  async create(category) {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.post(
        `https://expenses-rtk-app-default-rtdb.firebaseio.com/categories.json?auth=${token}`,
        {
          name: category.name,
        }
      );
      console.log(response);
      if (response.status == 200) {
        return response.data.name;
      }
    } catch (error) {
      //Error 4xx-5xx
      console.log(error);
      return null;
    }
  }

  async read() {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.get(
        `https://expenses-rtk-app-default-rtdb.firebaseio.com/categories.json?auth=${token}`
      );
      if (response.data.length != 0) {
        let categories = [];
        for (let key in response.data) {
          let category = new Category();
          category.id = key;
          category.name = response.data[key].name;
          categories.push(category);
        }
        console.log(categories);
        return categories;
      }
      return [];
    } catch (error) {
      //Error
      return [];
    }
  }

  async update(category) {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.put(
        `https://expenses-rtk-app-default-rtdb.firebaseio.com/${category.id}.json?auth=${token}`,
        {
          name: category.name,
        }
      );
      return true;
    } catch (error) {
      //Error
      return false;
    }
  }

  async delete(id) {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.delete(
        `https://expenses-rtk-app-default-rtdb.firebaseio.com/categories/${id}.json?auth=${token}`
      );
      return true;
    } catch (error) {
      //Error
      return false;
    }
  }
}
export default CategoriesController;
