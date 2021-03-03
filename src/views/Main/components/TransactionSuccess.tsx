import React, { useContext } from "react";
import AppContext from "context/background/AppContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 40,
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: 572,
  },
}));

export default function TransactionSuccess() {
  const classes = useStyles();
  const { setState } = useContext(AppContext);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent className={classes.root}>
          <CheckBoxIcon fontSize="large" />
          <Typography
            variant="button"
            color="textPrimary"
            component="p"
            className="my-3"
          >
            Success.
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="my-1"
          >
            you've successfully sent your funds.
          </Typography>
          <Link href="https://etherscan.io" className="my-1">
            View on Etherscan
          </Link>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() => setState({ successTx: false })}
          >
            Done
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
