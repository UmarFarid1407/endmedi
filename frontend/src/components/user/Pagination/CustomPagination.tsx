import React from "react";
import { Pagination, Box } from "@mui/material";

interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" paddingY={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default CustomPagination;
