import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const PokeView = ({ image }) => {
  return (
    <div className='pokemon-section'>
      <Card className='pokemon-element'>
        <CardMedia
          image={image}
          style={{ height: 0, paddingTop: '56.25%' }}
        />
      </Card>
    </div>
  );
};

export default PokeView;
