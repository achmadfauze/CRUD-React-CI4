
import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const fetchTransaksi = async (searchQuery, sort, orderDirection,currentPage,perPage) => {
  try {
    const requestData = {
      search: {
        column: ["nama_barang", "tanggal_transaksi"],
        value: searchQuery,
      },
      order: {
        column: sort,
        dir: orderDirection,
      },
    };

    const response = await axios.get(
    `${baseUrl}/transaksi`,{
      params: {
        searchValue: searchQuery,
        searchColumn: ["nama_barang", "tanggal_transaksi"],
        orderColumn: requestData.order.column,
        orderDir: requestData.order.dir,
        page: currentPage,
        perPage: perPage,
      },
    });

    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fetchBarangOptions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/barang`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching barang options:', error);
    return [];
  }
};

export const addTransaksi = async (newItem) => {
  try {
    const response = await axios.post(`${baseUrl}/transaksi`, newItem);
    return response.data;
  } catch (error) {
    console.error('Error adding new item:', error);
    throw error;
  }
};

export const editTransaksi = async (id, updatedItemData) => {
  try {
    const response = await axios.put(`${baseUrl}/transaksi/${id}`, updatedItemData);
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteTransaksi = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/transaksi/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
