import { axiosInstance } from "../lib/api";

export interface GeneralSettings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyDescription: string;
  companyLogo?: string | null;
}

// Get all settings
export const getSettings = async () => {
    const response = await axiosInstance.get("/api/settings");
    return response.data;
  };

// Update general settings
export const updateGeneralSettings = async (data: GeneralSettings) => {
  const response = await axiosInstance.put("/api/settings/general", data);
  return response.data;
};
