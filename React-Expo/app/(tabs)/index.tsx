import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleIncrement = () => setCount(count + 1);
  
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  
  const handleReset = () => setCount(0);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Determine active styles based on the current theme state
  const activeContainerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const activeTextStyle = isDarkMode ? styles.darkText : styles.lightText;

  return (
    <View style={[styles.container, activeContainerStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>

      <Text style={[styles.counterText, activeTextStyle]}>{count}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 80,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  actionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  themeButton: {
    position: 'absolute',
    top: 60,
    backgroundColor: '#6C757D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Flattened Theme Styles
  lightContainer: {
    backgroundColor: '#FFFFFF',
  },
  lightText: {
    color: '#121212',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
});
