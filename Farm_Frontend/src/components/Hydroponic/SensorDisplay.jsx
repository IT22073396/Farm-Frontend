import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Grid, Container, TextField, Button
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea
} from 'recharts';

function SensorDisplay() {
  const [dataList, setDataList] = useState([]); // Historical data points
  const [latestData, setLatestData] = useState({});
  const [status, setStatus] = useState('Sensors Inactive!');
  const [xValue, setXValue] = useState(null); // User-defined sensor height (null initially)
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000');

    socket.onopen = () => {
      setStatus('Sensors Activated');
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const { temperature, humidity, soil_moisture, height } = parsedData;

        // If xValue is not set, skip processing height data
        const realHeight = xValue !== null ? xValue - height : null;

        const newEntry = {
          timestamp: new Date().toLocaleTimeString(),
          temperature: parseFloat(temperature.toFixed(2)),
          humidity: parseFloat(humidity.toFixed(2)),
          soil_moisture: parseFloat(soil_moisture.toFixed(2)),
          height: realHeight !== null ? parseFloat(realHeight.toFixed(2)) : null,
        };

        // Update data list (FIFO: keep only the last 20 entries)
        setDataList((prev) => [...prev.slice(-19), newEntry]);
        setLatestData(newEntry);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onerror = (error) => {
      setStatus('Sensors Inactive!');
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      setStatus('Sensors Inactive!');
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close(); // Cleanup WebSocket connection on component unmount
    };
  }, [xValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputError('');
  };

  const handleSetXValue = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed < 0 || parsed > 500) {
      setInputError('Please enter a valid number between 0 and 500 cm');
      return;
    }
    setXValue(parsed);
    setInputValue('');
    setInputError('');
  };

  const renderGraphCard = (title, dataKey, color, unit, optimalRange, showDots = false) => {
    // Calculate the highest value in the data for the Y-axis
    let maxValue = Math.max(...dataList.map((d) => d[dataKey] || 0), 100);
  
    // For the Height graph, ensure maxValue is at least xValue + 10
    if (dataKey === 'height' && xValue !== null) {
      maxValue = Math.max(maxValue, xValue + 10);
    }
  
    return (
      <Card sx={{ width: 350, height: 380, margin: '10px', borderRadius: 5, border: '2px solid black' }}>
        <CardContent>
          <LineChart width={300} height={250} data={dataList}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
            <YAxis
              domain={[0, maxValue]} // Set the Y-axis range from 0 to the highest value
              ticks={[0, optimalRange[0], optimalRange[1], maxValue]} // Display 0, optimal range, and max value
              tickFormatter={(value) => value.toFixed(2)} // Limit numeric values to 2 decimal points
            />
            <Tooltip />
            {optimalRange && (
              <ReferenceArea y1={optimalRange[0]} y2={optimalRange[1]} strokeOpacity={0.2} fill="#90ee90" />
            )}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              dot={showDots ? { r: 4 } : false} // Show dots only if `showDots` is true
            />
          </LineChart>
          <Typography align="center" variant="h6" sx={{ marginTop: '10px', color }}>
            {title}: {latestData[dataKey] !== undefined && latestData[dataKey] !== null ? `${latestData[dataKey]} ${unit}` : 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container>
      {/* Graphs */}
      <Grid container justifyContent="center" spacing={2} sx={{ ml: 3 }}>
        <Grid item>{renderGraphCard('Temperature', 'temperature', 'red', '°C', [22, 28], true)}</Grid>
        <Grid item>{renderGraphCard('Humidity', 'humidity', 'blue', '%', [60, 80], true)}</Grid>
        <Grid item>{renderGraphCard('Soil Moisture', 'soil_moisture', 'green', '%', [60, 75], true)}</Grid>
        <Grid item>
          {xValue !== null
            ? renderGraphCard('Height', 'height', 'purple', 'cm', [7, 8], true)
            : <Typography align="center" variant="h6" sx={{ mt: 6, color: 'gray' }}>Set height to display data</Typography>}
        </Grid>
      </Grid>

      {/* Status */}
      <Typography
        align="center"
        variant="h6"
        sx={{ mt: 6, color: status === 'Sensors Inactive!' ? 'red' : 'black' }}
      >
        Status: {status}
      </Typography>

      {/* Height Controls */}
      <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Sensor Height (X cm)"
            fullWidth
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            type="number"
            inputProps={{ step: '0.01' }}
            error={Boolean(inputError)}
            helperText={inputError}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSetXValue}>
            Set Height
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={() => { setXValue(null); setInputError(''); }}>
            Restart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SensorDisplay;