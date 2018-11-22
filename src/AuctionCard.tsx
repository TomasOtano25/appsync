import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { S3Image } from "aws-amplify-react";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: "0.9rem",
    marginBottom: "2px"
  },
  pos: {
    marginBottom: 12
  },
  priceText: {
    fontSize: "1.2rem",
    marginTop: "5px"
  }
};

interface Props {
  name: string;
  price: number;
  image: string | null;
  classes: { [key: string]: string };
}

// const AuctionCard = (props: Props) => {
const AuctionCard = ({ classes, name, price, image }: Props) => {
  // const { classes, name, price } = props;
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>{name}</Typography>
        <S3Image
          level="private"
          imgKey={image}
          // className="image-card"
          theme={{ photoImg: { width: 100 } }}
        />
        <Typography className={classes.priceText}>${price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Bid</Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(AuctionCard);
