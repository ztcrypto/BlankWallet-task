import React, { useContext } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AppContext from "context/background/AppContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";

import TransactionPreview from "./TransactionPreviewComponent";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 40,
  },
  root: {
    height: 536,
    overflowY: "scroll",
  },
}));

const cutOffString = (s: string) => {
  return `${s.substring(0, 6)}...${s.substring(s.length - 4)}`;
};
export default function TransactionMain() {
  const classes = useStyles();
  const { state, setState } = useContext(AppContext);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          avatar={<AccountCircleIcon fontSize="large" />}
          title="Account 1"
          subheader={cutOffString(state.publicAddress)}
        />
        <CardContent className={classes.root}>
          <div className="secondaryColor d-flex flex-column align-items-center justify-content-center my-3">
            <h1>{state.accountBalance} ETH</h1>
            <span className="secondaryColor">${state.ethPrice} USD</span>
            <IconButton
              className="sendButton primaryColor my-2"
              color="primary"
              onClick={() => setState({ newTx: true })}
            >
              <ArrowUpwardRoundedIcon></ArrowUpwardRoundedIcon>
            </IconButton>
            <p className="text-center">Send</p>
          </div>
          <div>
            {state.transactions.reverse().map((transaction, id) => {
              return (
                <TransactionPreview
                  key={transaction.id}
                  transaction={
                    state.transactions[state.transactions.length - 1 - id]
                  }
                ></TransactionPreview>
              );
            })}
          </div>
        </CardContent>
        <CardActions />
      </Card>
    </Grid>
  );
}
