'use client'
import React, { useState } from 'react';
import { 
  Box,
  Grid2 as Grid, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Card,
  Alert
} from '@mui/material';

const apiKey = '471c54fb51bd460e596f2e21'; 
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

export default function CambioDivisas() {
const [monedaOrigen, setMonedaOrigen] = useState('USD');
  const [monedaDestino, setMonedaDestino] = useState('EUR');
  const [monto, setMonto] = useState('');
  const [mensajeErrorMonto, setMensajeErrorMonto] = useState(<></>)
  const [errorMonto, setErrorMonto] = useState(false)
  const [resultado, setResultado] = useState(null);

  const obtenerTasaCambio = async (origen, destino) => {
    try {
        const response = await fetch(`${apiUrl}${origen}`);
        if (!response.ok) {
            throw new Error('Error al obtener las tasas de cambio');
        }
        const data = await response.json();
        return data.conversion_rates[destino];
        } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al obtener las tasas de cambio. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    const convertirMoneda = async (event) => {
        event.preventDefault()
        setMensajeErrorMonto(<></>)
        setErrorMonto(false)
        if (isNaN(monto) || monto <= 0) {
        setErrorMonto(true)
        setMensajeErrorMonto(<Alert severity='error'>por favor ingrese un monto valido</Alert>)
        return;
        }

        const tasaCambio = await obtenerTasaCambio(monedaOrigen, monedaDestino);
        if (!tasaCambio) {
        return;
        }

        const montoConvertido = monto * tasaCambio;
        setResultado(montoConvertido.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        }) + " " + monedaDestino);
    };

    return(
        <Box
        sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '71vh',
                backgroundColor: '#008584',
                p: 2,
                m: 0,
            }}
        >
        <Box
            maxWidth="md"
            sx={{
            width: '100%',
            maxWidth: 800,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            m: {sm:1, md:3},
            }}
        >
            <form onSubmit={convertirMoneda}>
            <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 5, textAlign: "center" }}
            >Cambio de Divisas</Typography>
            
            <Grid container spacing={2}>
            <Card sx={{ width:"100%", height: "100%", p:2}}>
                <Grid xs={12} mb={2}>
                <FormControl fullWidth>
                <InputLabel id="moneda-origen-label" >Moneda de Origen</InputLabel>
                <Select
                    labelId="moneda-origen-label"
                    value={monedaOrigen}
                    onChange={(e) => setMonedaOrigen(e.target.value)}
                >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="ARS">ARS</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="JPY">JPY</MenuItem>
                    <MenuItem value="AUD">AUD</MenuItem>
                    <MenuItem value="CAD">CAD</MenuItem>
                    <MenuItem value="CHF">CHF</MenuItem>
                    <MenuItem value="CNY">CNY</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                </Select>
                </FormControl>
            </Grid>
            <Grid xs={12} mb={2}>
                <FormControl fullWidth>
                <InputLabel id="moneda-destino-label" >Moneda de Destino</InputLabel>
                <Select
                    labelId="moneda-destino-label"
                    value={monedaDestino}
                    onChange={(e) => setMonedaDestino(e.target.value)}
                >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="ARS">ARS</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="JPY">JPY</MenuItem>
                    <MenuItem value="AUD">AUD</MenuItem>
                    <MenuItem value="CAD">CAD</MenuItem>
                    <MenuItem value="CHF">CHF</MenuItem>
                    <MenuItem value="CNY">CNY</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                </Select>
                </FormControl>
            </Grid>
            <Grid xs={12} mb={2}>
                <TextField
                fullWidth
                label="Monto a Convertir"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                type="number"
                error={errorMonto}
                />
                {mensajeErrorMonto}
            </Grid>
            <Grid xs={12}>
              <Typography variant="h5"
                component="h5"
                sx=
                {{ 
                  mb: 1, 
                  borderRadius: 2,
                  textAlign: "center",
                  fontSize:{xs:"1.2rem", md:"h5.fontsize", lg:"1.6rem"},
                  backgroundColor: "#a6e0e0",
                  color: "black",
                }}
              >Monto convertido: {resultado}</Typography>
            </Grid>
            </Card>
            </Grid>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                    Convertir
            </Button>
            </form>
            </Box>
        </Box>
    )
}