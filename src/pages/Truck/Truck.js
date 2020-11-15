import { makeStyles } from "@material-ui/core/styles";
import { Container, ButtonGroup, Button, Grid, Paper } from "@material-ui/core";
import "./Truck.css";

export default function Truck() {
  return (
    <div className="Truck">
      <Container className="Container" maxWidth="sm">
        <Grid container spacing={4}>
          <Grid item xs={12} spacing={12}>
            <img
              src="https://cbs6albany.com/resources/media/ef9010e4-ff57-4b7b-9ee9-7482bfad3a84-large16x9_foodtrucks.PNG?1587351056666"
              alt="Food Truck"
              className="foodTruckImage"
            ></img>
          </Grid>
          {/* <div className="containerContent"> */}
          <Grid item xs={12} spacing={3}>
            <h2>Truck Name</h2>
            <hr />
          </Grid>
          <Grid item xs={12} spacing={3}>
            Location: <br />
            <br />
            Name's Website: <br />
          </Grid>
          <Grid item xs={6} spacing={3}>
            <span className="left">Is open?</span>
          </Grid>
          <Grid item xs={6} spacing={3}>
            <span className="right">Global Rating: rating/5</span>
          </Grid>
          {/* </div> */}
          <Grid item xs={6} spacing={3}>
            <Button variant="contained" color="primary">
              Favorite
            </Button>
          </Grid>
          <Grid item xs={6} spacing={3}>
            Rate this food truck!
            {/* <br /> */}
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button>
                <i class="far fa-star"></i>
              </Button>
              <Button>
                <i class="far fa-star"></i>
              </Button>
              <Button>
                <i class="far fa-star"></i>
              </Button>
              <Button>
                <i class="far fa-star"></i>
              </Button>
              <Button>
                <i class="far fa-star"></i>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
