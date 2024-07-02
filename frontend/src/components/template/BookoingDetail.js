import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";

export default function BookingDetail() {
  const location = useLocation();
  const { userName, email, petName, petType, date, services, combo, total } =
    location.state || {};

  return (
    <>
      <div className="bookingDetail-component">
        {/* Video */}
        <video src="assets/videos/video-5.webm" autoPlay muted loop></video>
        <Container>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Card sx={{ minWidth: 275, width: 600 }}>
              <CardContent>
                <Typography
                  sx={{ textAlign: "center", color: "rgb(185,114,74)" }}
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  Booking Detail
                </Typography>
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  User Name: {userName}
                </Typography>
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Email: {email}
                </Typography>
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Pet Name: {petName}
                </Typography>

                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Pet Type: {petType}
                </Typography>

                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Service:
                </Typography>
                {services.map((service) => (
                  <Typography
                  key={service}
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {service}
                </Typography>
                ))}

                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Combo: {combo}
                </Typography>
                
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Date: 
                </Typography>

                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Total: {total}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>
    </>
  );
}
