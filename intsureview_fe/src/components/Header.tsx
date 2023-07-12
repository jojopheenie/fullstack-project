import React, { FC, ReactElement } from 'react';
import {AppBar,Toolbar,Typography} from '@mui/material';
import YardIcon from '@mui/icons-material/Yard';
import '../App.css';

export const Header: FC = (): ReactElement => {
  return (
    <header>
      <AppBar position={'static'} sx={{ display: 'flex', backgroundColor: 'green' }}>
        <Toolbar disableGutters sx={{ justifyContent: 'center', display: 'flex', }}>
          <Typography variant={'h3'} component={'div'}
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              letterSpacing: '.2rem',
            }}>
            Plant ProSUREment
          </Typography>
          <YardIcon fontSize={'large'} sx={{ display: 'flex' }} />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;