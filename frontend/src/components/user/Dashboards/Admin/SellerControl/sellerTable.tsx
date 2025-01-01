import {
  useState,
  React,
  CircularProgress,
  Box,
  useEffect,
  Table,
  Paper,
  TableCell,
  TextField,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableBody,
  Typography,
} from "../../../../../sharedimports/share";

interface Column {
  id:
    | "medicineID"
    | "medicineName"
    | "medicineQuantity"
    | "medicineCategory"
    | "priceofonemedicineinTablet"
    | "mediciinemadeIN"
    | "sellerID";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: "medicineID", label: "ID", minWidth: 50 },
  { id: "medicineName", label: "MedName", minWidth: 170 },
  { id: "medicineQuantity", label: "Quantity", minWidth: 170 },
  { id: "medicineCategory", label: "Category", minWidth: 100 },
  { id: "priceofonemedicineinTablet", label: "Price", minWidth: 100 },
  { id: "mediciinemadeIN", label: "Made In", minWidth: 100 },
  { id: "sellerID", label: "Seller ID", minWidth: 100 },
];

interface Medicine {
  medicineID: number;
  medicineName: string;
  medicineQuantity: number;
  medicineCategory: string;
  priceofonemedicineinTablet: number;
  medicinequantityinonetablet: number;
  mediciinemadeIN: string;
  medicineExpiryDate: string;
  sellerID: number;
  medicineManufacturingDate: string;
  mgs: number | null;
  id: number;
}
interface Props {
  data: Medicine[];
  loading: boolean;
}
const SearchableTable: React.FC<Props> = ({ data, loading }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setRows(data);
        setFilteredRows(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
      }
    };

    fetchUsers();
  }, [data]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    setFilteredRows(filtered);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ width: "100%" }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
       Seller Added Medicine - Cart Details
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={`${column.id}-${index}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`${row.id}-${index}`}
                >
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={`${column.id}-${index}`}
                        align={column.align}
                      >
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 6, 7]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default SearchableTable;
