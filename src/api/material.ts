import { http } from "@/utils/http";

export type MaterialTypeResponseDto = {
  id: string;
  description: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type MaterialTypeRequestDto = {
  id?: string;
  description: string;
};

export const getAllMaterialType = async (enabled: boolean | null): Promise<MaterialTypeResponseDto[]> => {
  return await http.request<MaterialTypeResponseDto[]>("get", "/api/material-types", { params: { enabled: enabled } });
};

export const createMaterialType = async (materialType: MaterialTypeRequestDto): Promise<MaterialTypeResponseDto> => {
  return await http.request<MaterialTypeResponseDto>("post", "/api/material-types", { data: { description: materialType.description } });
};

export const updateMaterialType = async (materialType: MaterialTypeRequestDto): Promise<MaterialTypeResponseDto> => {
  return await http.request<MaterialTypeResponseDto>("put", `/api/material-types/${materialType.id}`, { data: { description: materialType.description } });
};

export const deleteMaterialType = async (materialType: MaterialTypeRequestDto) => {
  return await http.request("delete", `/api/material-types/${materialType.id}`);
};
