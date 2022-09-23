import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const CryptoFilter = ({ handleSearch, handleOnChange, disabled }) => (
  <Grid container>
    <Grid item xs={1}>
      <TextField
        style={{ marginBottom: "10px" }}
        label="Pair"
        onChange={handleOnChange}
        id="outlined-size-small"
        defaultValue="ETH/BTC"
        size="small"
      />
    </Grid>
    <Grid item xs={1}>
      <Button
        style={{ marginLeft: "5px" }}
        variant="outlined"
        disabled={disabled}
        onClick={handleSearch}
      >
        Add to table
      </Button>
    </Grid>
  </Grid>
);

export default CryptoFilter;
