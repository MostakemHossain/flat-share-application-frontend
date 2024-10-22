"use client";
import { useGetAllEmployeesQuery } from "@/redux/api/employeeApi";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";

const Team = () => {
  const { data, isLoading } = useGetAllEmployeesQuery({});

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h3" gutterBottom color={"#EC5312"}>
      Our Best Agents
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom marginBottom={"20px"}>
        Our team of professionals is dedicated to ensuring the best outcomes.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {data?.map((employee: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={employee.id}>
            <Card>
            
              <div
                style={{ position: "relative", width: "100%", height: "400px" }}
              >
                <Image
                  src={employee?.profilePhoto || "/default-avatar.jpg"}
                  alt={employee?.name}
                  layout="fill" 
                  objectFit="cover"
                  style={{ borderRadius: "4px 4px 0 0" }} 
                />
              </div>

              <CardContent>
                <Typography variant="h6">{employee?.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {employee?.role}
                </Typography>

               
                <div style={{ marginTop: "1rem" }}>
                  {employee?.facebookLink && (
                    <IconButton
                      component="a"
                      href={employee?.facebookLink}
                      target="_blank"
                      aria-label="Facebook"
                    >
                      <Facebook />
                    </IconButton>
                  )}
                  {employee?.twitterLink && (
                    <IconButton
                      component="a"
                      href={employee?.twitterLink}
                      target="_blank"
                      aria-label="Twitter"
                    >
                      <Twitter />
                    </IconButton>
                  )}
                  {employee?.linkedinLink && (
                    <IconButton
                      component="a"
                      href={employee?.linkedinLink}
                      target="_blank"
                      aria-label="LinkedIn"
                    >
                      <LinkedIn />
                    </IconButton>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Team;
