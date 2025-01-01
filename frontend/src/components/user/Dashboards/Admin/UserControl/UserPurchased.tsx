import {
    useState,
    React,
    CircularProgress,
    Box,
    getAllUsersCarts,
    useEffect,
    Table,
    decodeToken,
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
      | "paymentStatus";
    label: string;
    align?: "right";
    format?: (value: any) => string;
  }
  
  const columns: readonly Column[] = [
    { id: "medicineID", label: "ID" },
    { id: "medicineName", label: "MedName" },
    { id: "medicineQuantity", label: "Quantity"},
    { id: "medicineCategory", label: "Category" },
    { id: "priceofonemedicineinTablet", label: "Price"},
    { id: "mediciinemadeIN", label: "Made In" },
    { id: "paymentStatus", label: "Payment Status" },
  ];
  
  const SearchableTable: React.FC = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [filteredRows, setFilteredRows] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [userId, setUserId] = useState<number>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const shouldDecode = true;
      const getdecodedToken = decodeToken(shouldDecode);
  
      if (getdecodedToken && typeof getdecodedToken === "object") {
        setUserId(getdecodedToken.id);
      }
  
      if (getdecodedToken == null) {
        return console.log("user not found");
      }
    }, [userId]);
    useEffect(() => {
      if (userId) {
        const fetchUsers = async () => {
          setLoading(true);
          try {
            const data = await getAllUsersCarts();
            setRows(data);
            setFilteredRows(data);
          } catch (error) {
            console.error("Error fetching users:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchUsers();
      }
    }, [userId]);
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value.toLowerCase();
      setSearchTerm(term);
  
      const filtered = rows.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
      console.log(filtered);
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
          Sold Medicines - Cart Details
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          sx={{ marginBottom: 3, marginTop: 3 }}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                   
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No medicines available
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              )}
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
  