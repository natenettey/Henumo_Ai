import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ItemCard(prop:any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 180 }}
        image={prop.itemImage}
        title="image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {prop.itemName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {prop.itemType}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button> 
        <Button component = {Link} to ={`/items/single-item/${prop.itemLink}`} size="small">Reviews</Button>
      </CardActions>
    </Card>
  );
}