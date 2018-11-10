import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

interface Props {
  name: string;
  price: number;
  classes: { [key: string]: string };
}

// const AuctionCard = (props: Props) => {
const AuctionCard = ({ classes, name, price }: Props) => {
  // const { classes, name, price } = props;
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography>{name}</Typography>
        <Typography>${price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Bid</Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(AuctionCard);
