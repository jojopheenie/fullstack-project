import React, { FC, ReactElement } from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Footer: FC = (): ReactElement => {
  return (
    <footer>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <Container maxWidth={'lg'}>
          <Grid container direction={'column'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography variant={'h5'}>
                Thanks for visiting!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'body1'} sx={{ display: 'flex', alignItems: 'center' }}>
                &copy;{`${new Date().getFullYear()} Plant ProSUREment 
                | All Rights Reserved 
                | Created By: Josephine Amos`}&nbsp;
                <Link
                  href='https://www.linkedin.com/in/josephineamos/'
                  target={'_blank'}
                  rel={'noopener'}
                  sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinkedInIcon sx={{ color: 'white' }} fontSize='small' />
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;