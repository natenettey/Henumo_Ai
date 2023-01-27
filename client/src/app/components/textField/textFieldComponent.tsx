import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

const TextFields = (props:any) => {
  return (
    
      
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-basic"
            label={props.label}
            variant="outlined"
            onChange={props.onChange}
            style={{ width: "80%" }}
            type={props.type}
            sx={{
              fontSize: "20px",
              fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(","),
            }}
          />
        </Grid>
  
  );
}

export default  TextFields