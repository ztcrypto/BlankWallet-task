import React, { useContext } from "react";
import AppContext from "context/background/AppContext";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TransactionSuccess from "./components/TransactionSuccess";
import TransactionNew from "./components/TransactionNew";
import TransactionMain from "./components/TransactionMain";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 40,
  },
}));

export default function MainContainer() {
  const classes = useStyles();
  const { state } = useContext(AppContext);

  return (
    <Container className={classes.container}>
      <Grid container spacing={6}>
        <TransactionMain />
        {state.newTx && <TransactionNew />}
        {state.successTx && <TransactionSuccess />}
      </Grid>
    </Container>
  );
}
