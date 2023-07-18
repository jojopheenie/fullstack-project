import React, { useEffect, useState } from 'react';
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  Alert,
  Collapse,
  IconButton,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup
} from '@mui/material';
import '../App.css';
import CloseIcon from '@mui/icons-material/Close';
import validator from 'validator';

interface FormData {
  email: string;
  alive: boolean;
  amount: number;
  size: string;
  shiny: boolean;
  colorful: boolean;
  smellsGood: boolean;
  highOxygen: boolean;
}

interface ResultData {
  success: string;
  error: string;
}

const CreateBrandForm = () => {
  const [editFields, setEditFields] = useState<FormData>({
    email: '',
    alive: true,
    amount: 0,
    size: '',
    shiny: false,
    colorful: false,
    smellsGood: false,
    highOxygen: false
  });
  const [formResult, setFormResult] = useState<ResultData>({ success: '', error: '' });
  const [emailError, setEmailError] = useState('');
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableEmailInput, setDisableEmailInput] = useState(false);

  const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validator.isEmail(event.target.value)) {
      setEmailError('');
      setDisableSubmit(false);
    } else {
      setEmailError('Oh SNAP PEA, LEAFS enter a valid email!');
      setDisableSubmit(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailError.length) {
      await fetch('http://localhost:8000/processForm/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFields)
      })
        .then(async (response) => {
          const result: Promise<any> = response.json()
          setFormResult(await result)
        })
        .catch((error) => { throw error })
    }
  };

  const resetForm = () => {
    setFormResult({ success: '', error: '' })
    setDisableEmailInput(false);
    setEmailError('')
    setEditFields({
      email: '',
      alive: true,
      amount: 0,
      size: '',
      shiny: false,
      colorful: false,
      smellsGood: false,
      highOxygen: false
    })
  };

  useEffect(() => {
    if (formResult.error.length) {
      setOpenErrorAlert(true);
      setDisableSubmit(true);
      setDisableEmailInput(true);
    }
    if (formResult.success.length) {
      setOpenSuccessAlert(true);
      setDisableSubmit(true);
      setDisableEmailInput(true);
    }
  }, [formResult])

  return (
    <main>
      <Typography variant={'h5'} sx={{ marginBottom: 1, width: '60%', margin: 'auto' }}>
        Welcome! Please fill OAK this form to WREATHquest plant recommendations. </Typography>
      <Typography variant={'body1'} sx={{ marginBottom: 3 }}>
        Tell us what kind of plants you've been VINEing for.</Typography>
      <form autoComplete={'off'}>
        <TextField
          id={'email'}
          sx={{ width: '40%' }}
          color={'success'}
          label={"What's your e-SNAIL?"}
          variant={'outlined'}
          value={editFields.email}
          disabled={disableEmailInput}
          type={'email'}
          size={'medium'}
          helperText={'(email)'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            validateEmail(event)
            setEditFields({ ...editFields, email: (event.target as HTMLInputElement).value })
          }}
          required
        />
        <Typography sx={{ color: 'red', margin: 0, padding: 0 }}>{emailError}</Typography>
        <br />

        <TextField
          id={'select'}
          sx={{ marginBottom: 3, width: '40%' }}
          color={'success'}
          select
          variant={'outlined'}
          label={'Do you want your plant to be alive?'}
          value={editFields.alive}
          size={'medium'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEditFields({
              ...editFields,
              alive: JSON.parse((event.target as HTMLInputElement).value.toLowerCase())
            })}
        >
          <MenuItem key={'yes'} value={'true'}>Yes</MenuItem>
          <MenuItem key={'no'} value={'false'}>No</MenuItem>
        </TextField>
        <br />

        <TextField
          id='number'
          sx={{ marginBottom: 3, width: '40%' }}
          label={'How MULCH plants do you want?'}
          color={'success'}
          type={'number'}
          InputProps={{
            inputProps: {
              max: 50, min: 0
            }
          }}
          onKeyDown={(e: any) => {
            e.preventDefault();
          }}
          size={'medium'}
          InputLabelProps={{
            shrink: true,
          }}
          variant={'outlined'}
          value={editFields.amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEditFields({
              ...editFields,
              amount: Number((event.target as HTMLInputElement).value)
            })}
        />
        <br />

        <FormControl
          component={'fieldset'}
          color={'success'}
          sx={{ marginBottom: 1 }}
          variant={'standard'}
        >
          <FormLabel component={'legend'}>What CARROTeristics are you looking for?</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox color={'success'}
                  checked={editFields.shiny}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEditFields({
                      ...editFields,
                      shiny: (event.target as HTMLInputElement).checked
                    })}
                  name={'shiny'} />
              }
              label={'Shiny'}
            />
            <FormControlLabel
              control={
                <Checkbox color={'success'}
                  checked={editFields.colorful}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEditFields({
                      ...editFields,
                      colorful: (event.target as HTMLInputElement).checked
                    })}
                  name={'colorful'} />
              }
              label={'Colorful'}
            />
            <FormControlLabel
              control={
                <Checkbox color={'success'}
                  checked={editFields.smellsGood}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEditFields({
                      ...editFields,
                      smellsGood: (event.target as HTMLInputElement).checked
                    })}
                  name={'smellsGood'} />
              }
              label={'Smells good'}
            />
            <FormControlLabel
              control={
                <Checkbox color={'success'}
                  checked={editFields.highOxygen}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEditFields({
                      ...editFields,
                      highOxygen: (event.target as HTMLInputElement).checked
                    })}
                  name={'highOxygen'} />
              }
              label={'High oxygen producer'}
            />
          </FormGroup>
        </FormControl>
        <br />

        <FormControl color={'success'}>
          <FormLabel id={'demo-controlled-radio-buttons-group'}>What photosyntheSIZE?</FormLabel>
          <RadioGroup
            aria-labelledby={'demo-controlled-radio-buttons-group'}
            name={'controlled-radio-buttons-group'}
            value={editFields.size}
            sx={{ marginBottom: 2 }}
            row
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEditFields({ ...editFields, size: (event.target as HTMLInputElement).value })}
          >
            <FormControlLabel value={'small'}
              control={<Radio color={'success'} />}
              label={'Small < 1ft'} />
            <FormControlLabel value={'medium'}
              control={<Radio color={'success'} />}
              label={'Medium < 2ft'} />
            <FormControlLabel value={'large'}
              control={<Radio color={'success'} />}
              label={'Large > 3ft'} />
          </RadioGroup>
        </FormControl>
        <br />

        {openErrorAlert ?
          <Collapse in={openErrorAlert}>
            <Alert
              severity={'error'}
              action={
                <IconButton
                  aria-label='close'
                  color={'inherit'}
                  size={'small'}
                  onClick={() => {
                    resetForm()
                    setOpenErrorAlert(false);
                  }}
                >
                  <CloseIcon fontSize={'inherit'} />
                </IconButton>
              }
              sx={{ width: '40%', margin: 'auto', mb: 2 }}
            >
              UnbeLEAFable! Sorry, but there was an error. {formResult.error} Please TREE again 
              or CORNtact josephinexamos@gmail.com for support.
            </Alert>
          </Collapse> : ""}

        {openSuccessAlert ? <Collapse in={openSuccessAlert}>
          <Alert
            action={
              <IconButton
                aria-label={'close'}
                color={'inherit'}
                size={'small'}
                onClick={() => {
                  resetForm()
                  setOpenSuccessAlert(false);
                }}
              >
                <CloseIcon fontSize={'inherit'} />
              </IconButton>
            }
            sx={{ width: '40%', margin: 'auto', mb: 2 }}
          >
            KALE yeah! Your amMAIZEing plant options will aPEAR in your inbox shortly.
          </Alert>
        </Collapse> : ""}

        <Button
          onClick={(e: any) => handleSubmit(e)}
          variant={'contained'}
          color={'success'}
          disabled={disableSubmit}
          className={'button'}>
          Submit
        </Button>

      </form>
    </main>
  );
};

export default CreateBrandForm;
