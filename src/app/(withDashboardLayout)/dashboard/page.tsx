"use client";

import { useGetSingleUserQuery } from "@/redux/api/userApi";
import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data
const totalUsers = 200;
const totalRevenue = "$50,000";
const totalFlats = 30;
const temperature = "25°C";

// Mock chart data
const pieData = [
  { name: "Admin", value: 20 },
  { name: "Super Admin", value: 5 },
  { name: "User", value: 175 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const lineData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
  { name: "May", revenue: 6000 },
];

const temperatureData = [
  { day: "Day 1", temp: 22 },
  { day: "Day 2", temp: 23 },
  { day: "Day 3", temp: 25 },
  { day: "Day 4", temp: 28 },
  { day: "Day 5", temp: 27 },
  { day: "Day 6", temp: 26 },
  { day: "Day 7", temp: 29 },
];

const lastUsers = [
  { name: "John Doe", email: "john@example.com", role: "User" },
  { name: "Jane Smith", email: "jane@example.com", role: "Admin" },
  { name: "Robert Brown", email: "robert@example.com", role: "User" },
  { name: "Emily Davis", email: "emily@example.com", role: "Super Admin" },
  { name: "William Johnson", email: "william@example.com", role: "User" },
];

const userTypes = [
  { type: "Admin", count: 20 },
  { type: "Super Admin", count: 5 },
  { type: "User", count: 175 },
];

const AdminDashboard = () => {
  const { data, isLoading } = useGetSingleUserQuery({});
  return (
    <Box p={4} sx={{ backgroundColor: "#F4F6F8", minHeight: "100vh" }}>
    
      <Box
        mb={4}
        p={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#EC5312",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <Box>
          <Typography variant="h3" gutterBottom>
            Welcome, {isLoading ? <> <LinearProgress /></> : <>{data?.fullName}</>}
          </Typography>
          <Typography variant="body1">
            Monitor key metrics such as users, flats, revenue, and temperature.
            Explore your dashboard below for insights.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Total Users */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#FFC107", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Total Users</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Flats */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#03A9F4", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Total Flats</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalFlats}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Revenue */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#8BC34A", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Total Revenue</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Temperature */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#FF5722", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Temperature</Typography>
              <Typography variant="h4" fontWeight="bold">
                {temperature}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graphs */}
      <Grid container spacing={4} mt={4}>
        {/* Line Chart for Revenue */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Monthly Revenue
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Grid>

        {/* Pie Chart for User Roles */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            User Roles Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      {/* Last 7 Days Temperature Chart */}
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Last 7 Days Temperature
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={temperatureData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="temp" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      {/* Last Registered Users */}
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Last 5 Registered Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lastUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* User Types Breakdown */}
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            User Types Breakdown
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Type</TableCell>
                  <TableCell>Total Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userTypes.map((type, index) => (
                  <TableRow key={index}>
                    <TableCell>{type.type}</TableCell>
                    <TableCell>{type.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
