import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint,faDownload} from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function ReportsTable({filteredExpense})
{
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const columns=filteredExpense && filteredExpense.length>0? Object.keys(filteredExpense[0]):[];
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };



    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDownloadPDF = () => {
        const input = document.getElementById('table-container');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.text("Expenses", 10, 22);
            pdf.addImage(imgData, 'PNG', 5, 30, pdf.internal.pageSize.getWidth()-20, 0);
            pdf.save("table.pdf");
        });
    };


    return (
        <>
        <div className='print-download-icon'>
            <FontAwesomeIcon icon={faDownload} onClick={handleDownloadPDF} className='download-icon'/>
            <FontAwesomeIcon icon={faPrint} />
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer id='table-container' sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={columns.indexOf(column)}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredExpense
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.expenseId}>
                                        {columns.map((column) => {
                                            const value = row[column];
                                            return (
                                                <TableCell key={columns.indexOf(column)}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredExpense.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </>

    );
}
export default ReportsTable;
