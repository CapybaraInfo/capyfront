import dayjs from "dayjs";

export const dateTimeToBrFormatter = (row, column, cellValue) => {
  return dayjs(cellValue).format("DD/MM/YYYY");
};
