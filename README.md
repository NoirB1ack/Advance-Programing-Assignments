# Assignment 19: Digital Counter & Theme Toggle App

## Used

- React Native (Expo)

## Question

Build a single-screen mobile application using React Native. The app functions as a digital counter that allows users to increment, decrement, and reset a number displayed on the screen. To make the app more interactive, it must also include a Theme Toggle button that switches the screen's background and text colors between a Light Mode and a Dark Mode.

This assignment focuses on setting up a basic React Native environment, creating clean layouts using Flexbox, and managing UI changes dynamically using React state management.

### Implementation Rules

#### Core Layout

The application must use standard React Native components:

- `View`
- `Text`
- `TouchableOpacity` (or `Button`)

Requirements:

- The counter UI should be centered on the screen.
- Use Flexbox for layout management.

#### State Management

Use the `useState` hook to manage:

- The current counter value (`integer`)
- The active theme mode (`boolean` or `string`)

#### Counter Logic

The application should:

- Start the counter at `0`
- Increment the counter by `1`
- Decrement the counter by `1`
- Reset the counter to `0`

Constraint:

- The counter must never become negative.
- Clicking Decrement at `0` should have no effect.

#### Dynamic Styling

##### Light Mode (Default)

- White background
- Dark text

##### Dark Mode

- Dark background
- Light text

Requirements:

- Clicking the Theme Toggle button should instantly switch between themes.
- Use conditional styling or ternary operators to update the UI dynamically.

### Required Features

#### 1. UI Layout and Component Structure

- Parent container layout
- Counter display using `Text`
- Button arrangement using Flexbox
- Proper use of:
  - `flex`
  - `justifyContent`
  - `alignItems`
  - `fontSize`
  - `padding`

#### 2. Counter State and Validation Logic

- State management using `useState`
- Increment, decrement, and reset functionality
- Validation to prevent negative counter values

#### 3. Dynamic Theme Toggling

- Theme state tracking
- Conditional styling based on the selected theme
- Dynamic updates of background and text colors

#### 4. Code Cleanliness and Best Practices

- Well-organized code structure
- Meaningful variable and function names
- Readable styling and component organization
- Stable runtime behavior without crashes

### Execution Requirement

- Android users should run the application on a physical Android device in development mode.
- iPhone users may run the application using an Android Studio emulator.

## Notes

- The implementation uses React Native and the `useState` hook for state management.
- The application provides increment, decrement, and reset functionality for the counter.
- Validation is implemented to prevent negative counter values.
- Dynamic theme switching is achieved through conditional styling.
- Flexbox is used to create a clean and responsive layout.
- The application demonstrates fundamental React Native concepts including component structure, state management, event handling, and dynamic UI updates.
- Sample outputs include screen recordings, and the generated release APK.
