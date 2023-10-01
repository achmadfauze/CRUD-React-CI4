
import axios from 'axios';

const apiUrl = 'http://localhost:8080';

export const fetchJenisBarang = async (searchQuery, sort, orderDirection,currentPage,perPage) => {
  try {
    const requestData = {
      search: {
        column: ["jenis_barang"],
        value: searchQuery,
      },
      order: {
        column: sort,
        dir: orderDirection,
      },
    };
    const response = await axios.get(
      `${apiUrl}/jenisbarang`,{
      params: {
        searchValue: searchQuery,
        searchColumn: ["jenis_barang"],
        orderColumn: requestData.order.column,
        orderDir: requestData.order.dir,
        page: currentPage,
        perPage: perPage,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addJenisBarang = async (newItem) => {
  try {
    const response = await axios.post(`${apiUrl}/jenisbarang`, newItem);
    return response.data.message;
  } catch (error) {
    console.error('Error adding new item:', error);
    throw error;
  }
};

export const editJenisBarang = async (id, updatedItemData) => {
  try {
    const response = await axios.put(`${apiUrl}/jenisbarang/${id}`, updatedItemData);
    return response.data.message;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteJenisBarang = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/jenisbarang/${id}`);
    return response.data.message;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
