import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; 

export const fetchBarang = async (searchQuery, sort, orderDirection,currentPage,perPage) => {
  try {
    const requestData = {
      search: {
        column: ["nama_barang", "jenis_barang"],
        value: searchQuery,
      },
      order: {
        column: sort,
        dir: orderDirection,
      },
    };

    const response = await axios.get(`${API_BASE_URL}/barang`, {
      params: {
        searchValue: searchQuery,
        searchColumn: ["nama_barang", "jenis_barang"],
        orderColumn: requestData.order.column,
        orderDir: requestData.order.dir,
        page: currentPage,
        perPage: perPage,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchJenisBarangOptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jenisbarang`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const addBarang = async (newItem) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/barang`, newItem);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editBarang = async (id, updatedItemData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/barang/${id}`, updatedItemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBarang = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/barang/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
