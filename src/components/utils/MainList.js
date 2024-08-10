import { Grid, Container, Fade } from "@mui/material";
import ListItem from "../items/ListItem";
import Navbar from "../utils/Navbar";
import ToTopButton from "../utils/ToTopButton";
import Title from "../utils/Title";

const MainList = ({ type, items, loading, showToTopButton }) => {
  return (
    <Container>
      <Navbar />
      <Fade in={!loading}>
        <div>
          <Title title={type} />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {items &&
              items.length > 0 &&
              items.map(
                (item) =>
                  item.id && (
                    <Grid item key={`${item.id}`} width={278} height={500}>
                      <ListItem
                        type={type}
                        item={item}
                        imgWidth={278}
                        imgHeight={400}
                      />
                    </Grid>
                  )
              )}
          </Grid>
          {showToTopButton && <ToTopButton />}
        </div>
      </Fade>
    </Container>
  );
};

export default MainList;
