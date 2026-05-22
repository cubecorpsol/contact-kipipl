import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AdminDashboard = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const response = await fetch(
        "https://sheetdb.io/api/v1/h5roka0nyaipg"
      );

      const result = await response.json();

      setData(result.reverse());

    } catch (error) {

      console.log(error);
    }
  };

  // PDF DOWNLOAD

  const handleDownload = () => {

    const doc = new jsPDF();

    autoTable(doc, {

      head: [["Name", "Email", "Message", "Created At"]],

      body: data.map((item) => [
        item.name,
        item.email,
        item.message,
        item.createdAt,
      ]),
    });

    doc.save("KIPIPL-Enquiries.pdf");
  };


  // REAL PRINT

  const handlePrint = () => {

    window.print();

  };


  return (
    <Box sx={{ padding: 4 }}>

      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: "700",
          mb: 3,
          textAlign: "center",
        }}
      >
        KIPIPL Enquiries Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleDownload}
          sx={{
            backgroundColor: "#FEA515",
          }}
        >
          Download PDF
        </Button>

        <Button
          variant="contained"
          onClick={handlePrint}
          sx={{
            backgroundColor: "#1976d2",
          }}
        >
          Print
        </Button>

      </Box>

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell><b>Name</b></TableCell>

              <TableCell><b>Email</b></TableCell>

              <TableCell><b>Message</b></TableCell>

              <TableCell><b>Created At</b></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {data.map((item, index) => (

              <TableRow key={index}>

                <TableCell>{item.name}</TableCell>

                <TableCell>{item.email}</TableCell>

                <TableCell>{item.message}</TableCell>

                <TableCell>{item.createdAt}</TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>
  );
};

export default AdminDashboard;
