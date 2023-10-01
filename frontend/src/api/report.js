import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getReportData = async (startDate, endDate) => {
  try {
    const response = await axios.post(`${BASE_URL}/rangeTransaksi`, {
      tanggalAwal: startDate,
      tanggalAkhir: endDate,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching report data:', error);
    throw error;
  }
};
