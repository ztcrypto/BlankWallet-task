import React, { useState, useContext } from "react";
import AppContext from "context/background/AppContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 40,
  },
  root: {
    height: 500,
  },
}));

export default function TransactionNew() {
  const classes = useStyles();
  const { state, setState, addTransaction } = useContext(AppContext);
  const [recepient, setRecepient] = useState("");
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSend = async () => {
    if (!amount || !recepient) {
      setOpen(true);
      return;
    }
    if (amount > state.accountBalance) {
      setOpen(true);
      return;
    }
    await addTransaction({
      id: state.transactions.length,
      to: recepient,
      from: state.publicAddress,
      amount: amount,
      date: new Date().toLocaleString(),
    });
    setState({ successTx: true });
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          action={
            <IconButton
              aria-label="close"
              onClick={() => setState({ newTx: false })}
            >
              <CloseIcon />
            </IconButton>
          }
          title="Send Ether"
        />
        <CardContent className={classes.root}>
          <TextField
            id="recipient"
            label="Add Recipient"
            className="my-3"
            fullWidth
            value={recepient}
            onChange={(e) => setRecepient(e.target.value)}
          />
          <TextField
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() => setState({ newTx: false })}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSend}>
            Next
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Please fill the inputs correctly."
      ></Snackbar>
    </Grid>
  );
}
