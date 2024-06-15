import { http } from "@/utils/http";

export type UnitResponseDto = {
  id: string;
  description: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const getAllUnit = async (enabled: boolean | null): Promise<UnitResponseDto[]> => {
  return await http.request<UnitResponseDto[]>("get", "/api/unit", { params: { enabled: enabled } });
};
