import { http } from "@/utils/http";

export type UnitResponseDto = {
  id: string;
  description: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UnitRequestDto = {
  id?: string;
  description: string;
};

export const getAllUnit = async (enabled: boolean | null): Promise<UnitResponseDto[]> => {
  return await http.request<UnitResponseDto[]>("get", "/api/unit", { params: { enabled: enabled } });
};

export const createUnit = async (unit: UnitRequestDto): Promise<UnitResponseDto> => {
  return await http.request<UnitResponseDto>("post", "/api/unit", { data: { description: unit.description } });
};

export const updateUnit = async (unit: UnitRequestDto): Promise<UnitResponseDto> => {
  return await http.request<UnitResponseDto>("put", `/api/unit/${unit.id}`, { data: { description: unit.description } });
};

export const deleteUnit = async (unit: UnitRequestDto) => {
  return await http.request("delete", `/api/unit/${unit.id}`);
};
