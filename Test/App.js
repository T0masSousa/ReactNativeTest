import React, { useState } from "react";
import { StatusBar, Platform } from "react-native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const componentsList = [
  {
    name: "View",
    description:
      "A container that supports layout with flexbox, style, touch handling, and accessibility controls.",
    properties: [
      {
        name: "style",
        usage: "Used to apply layout and styling.",
        example: "<View style={{ flex: 1, backgroundColor: 'blue' }} />",
      },
      {
        name: "onLayout",
        usage: "Callback when the layout of the view changes.",
        example:
          "<View onLayout={(event) => console.log(event.nativeEvent)} />",
      },
    ],
  },
  {
    name: "Text",
    description:
      "Displays, styles, and nests strings of text and even handles touch events.",
    properties: [
      {
        name: "style",
        usage: "Used to apply styling to the text.",
        example: "<Text style={{ color: 'red' }}>Hello</Text>",
      },
      {
        name: "onPress",
        usage: "Callback when the text is pressed.",
        example: "<Text onPress={() => alert('Pressed!')}>Click Me</Text>",
      },
      {
        name: "numberOfLines",
        usage: "Limits the text to a specific number of lines.",
        example: "<Text numberOfLines={1}>This is a very long text...</Text>",
      },
    ],
  },
  {
    name: "Image",
    description: "Displays different types of images.",
    properties: [
      {
        name: "source",
        usage: "Defines the image source.",
        example: "<Image source={{ uri: 'https://example.com/image.png' }} />",
      },
      {
        name: "style",
        usage: "Used to style the image.",
        example: "<Image style={{ width: 100, height: 100 }} />",
      },
      {
        name: "resizeMode",
        usage: "Determines how the image fits within its bounds.",
        example: "<Image resizeMode='cover' />",
      },
    ],
  },
  {
    name: "ScrollView",
    description:
      "A generic scrolling container that can contain multiple components and views.",
    properties: [
      {
        name: "horizontal",
        usage: "Defines if the scrolling is horizontal.",
        example: "<ScrollView horizontal />",
      },
      {
        name: "pagingEnabled",
        usage: "Enables paging behavior.",
        example: "<ScrollView pagingEnabled />",
      },
      {
        name: "showsHorizontalScrollIndicator",
        usage: "Shows or hides the horizontal scroll indicator.",
        example: "<ScrollView showsHorizontalScrollIndicator={false} />",
      },
    ],
  },
  {
    name: "FlatList",
    description: "A performant interface for rendering simple, flat lists.",
    properties: [
      {
        name: "data",
        usage: "The array of data to be rendered.",
        example: "<FlatList data={[1, 2, 3]} />",
      },
      {
        name: "renderItem",
        usage: "Defines how each item is rendered.",
        example: "<FlatList renderItem={({ item }) => <Text>{item}</Text>} />",
      },
      {
        name: "keyExtractor",
        usage: "Specifies a unique key for each item.",
        example:
          "<FlatList keyExtractor={(item, index) => index.toString()} />",
      },
    ],
  },
  {
    name: "TouchableOpacity",
    description:
      "A wrapper for making views respond properly to touches with an opacity feedback.",
    properties: [
      {
        name: "onPress",
        usage: "Callback for handling touch events.",
        example: "<TouchableOpacity onPress={() => alert('Pressed!')} />",
      },
      {
        name: "activeOpacity",
        usage: "Controls the opacity of the component when pressed.",
        example: "<TouchableOpacity activeOpacity={0.7} />",
      },
    ],
  },
  {
    name: "TextInput",
    description: "A component for text input, with focus and typing events.",
    properties: [
      {
        name: "value",
        usage: "The text value of the input field.",
        example: "<TextInput value='Hello' />",
      },
      {
        name: "onChangeText",
        usage: "Callback when the text value changes.",
        example: "<TextInput onChangeText={(text) => console.log(text)} />",
      },
      {
        name: "placeholder",
        usage: "Text displayed when input is empty.",
        example: "<TextInput placeholder='Enter text here' />",
      },
    ],
  },
  {
    name: "Button",
    description: "A basic button with default styles and press events.",
    properties: [
      {
        name: "title",
        usage: "The text displayed on the button.",
        example: "<Button title='Click Me' />",
      },
      {
        name: "onPress",
        usage: "Callback for handling press events.",
        example: "<Button onPress={() => alert('Button Pressed!')} />",
      },
      {
        name: "color",
        usage: "Defines the color of the button.",
        example: "<Button color='blue' />",
      },
    ],
  },
  {
    name: "Switch",
    description: "A toggle switch to turn a value on or off.",
    properties: [
      {
        name: "value",
        usage: "The current state of the switch.",
        example: "<Switch value={true} />",
      },
      {
        name: "onValueChange",
        usage: "Callback when the value changes.",
        example:
          "<Switch onValueChange={(newValue) => console.log(newValue)} />",
      },
      {
        name: "thumbColor",
        usage: "Color of the switch thumb.",
        example: "<Switch thumbColor='red' />",
      },
    ],
  },
  {
    name: "ActivityIndicator",
    description: "Displays a loading spinner to indicate progress.",
    properties: [
      {
        name: "size",
        usage: "Size of the spinner ('small' or 'large').",
        example: "<ActivityIndicator size='large' />",
      },
      {
        name: "color",
        usage: "Color of the spinner.",
        example: "<ActivityIndicator color='blue' />",
      },
      {
        name: "animating",
        usage: "Controls whether the spinner is visible.",
        example: "<ActivityIndicator animating={true} />",
      },
    ],
  },
  {
    name: "Modal",
    description: "Displays content in a modal dialog.",
    properties: [
      {
        name: "visible",
        usage: "Controls the visibility of the modal.",
        example: "<Modal visible={true} />",
      },
      {
        name: "onRequestClose",
        usage: "Callback when the modal is requested to close.",
        example: "<Modal onRequestClose={() => console.log('Closed!')} />",
      },
      {
        name: "animationType",
        usage:
          "Defines the animation when showing or hiding ('slide', 'fade', 'none').",
        example: "<Modal animationType='slide' />",
      },
    ],
  },
  {
    name: "SectionList",
    description: "A performant interface for rendering sectioned lists.",
    properties: [
      {
        name: "sections",
        usage: "The array of section data.",
        example: "<SectionList sections={[{ title: 'A', data: ['Apple'] }]} />",
      },
      {
        name: "renderItem",
        usage: "Function for rendering each item.",
        example:
          "<SectionList renderItem={({ item }) => <Text>{item}</Text>} />",
      },
      {
        name: "renderSectionHeader",
        usage: "Function for rendering section headers.",
        example:
          "<SectionList renderSectionHeader={({ section }) => <Text>{section.title}</Text>} />",
      },
    ],
  },
  {
    name: "KeyboardAvoidingView",
    description:
      "Adjusts the view to avoid the keyboard overlapping the inputs.",
    properties: [
      {
        name: "behavior",
        usage:
          "Defines the behavior when the keyboard is visible ('height', 'position', 'padding').",
        example: "<KeyboardAvoidingView behavior='padding' />",
      },
      {
        name: "keyboardVerticalOffset",
        usage: "Adjusts the vertical offset of the content.",
        example: "<KeyboardAvoidingView keyboardVerticalOffset={50} />",
      },
    ],
  },
  {
    name: "SafeAreaView",
    description:
      "Ensures that content is rendered within the safe area boundaries of the device.",
    properties: [
      {
        name: "style",
        usage: "Used to apply styling to the container.",
        example:
          "<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} />",
      },
    ],
  },
  {
    name: "Pressable",
    description: "A more flexible component for handling touch interactions.",
    properties: [
      {
        name: "onPress",
        usage: "Callback when the component is pressed.",
        example: "<Pressable onPress={() => alert('Pressed!')} />",
      },
      {
        name: "onLongPress",
        usage: "Callback when the component is long-pressed.",
        example: "<Pressable onLongPress={() => alert('Long Press!')} />",
      },
      {
        name: "style",
        usage: "Dynamic styling for different states (pressed, focused).",
        example:
          "<Pressable style={({ pressed }) => ({ backgroundColor: pressed ? 'blue' : 'gray' })} />",
      },
    ],
  },
  {
    name: "Picker",
    description: "A dropdown-like component for selecting items.",
    properties: [
      {
        name: "selectedValue",
        usage: "The currently selected value.",
        example: "<Picker selectedValue={selectedValue} />",
      },
      {
        name: "onValueChange",
        usage: "Callback when a value is selected.",
        example:
          "<Picker onValueChange={(itemValue) => setSelectedValue(itemValue)} />",
      },
      {
        name: "mode",
        usage: "Specifies the style of the picker ('dropdown', 'dialog').",
        example: "<Picker mode='dropdown' />",
      },
    ],
  },
  {
    name: "Slider",
    description: "A component for selecting a numeric value within a range.",
    properties: [
      {
        name: "value",
        usage: "The current value of the slider.",
        example: "<Slider value={50} />",
      },
      {
        name: "minimumValue",
        usage: "The minimum value of the slider.",
        example: "<Slider minimumValue={0} />",
      },
      {
        name: "maximumValue",
        usage: "The maximum value of the slider.",
        example: "<Slider maximumValue={100} />",
      },
      {
        name: "onValueChange",
        usage: "Callback when the slider value changes.",
        example: "<Slider onValueChange={(value) => console.log(value)} />",
      },
    ],
  },
  {
    name: "WebView",
    description: "A component for rendering web content inside your app.",
    properties: [
      {
        name: "source",
        usage: "Specifies the URL or HTML to load.",
        example: "<WebView source={{ uri: 'https://example.com' }} />",
      },
      {
        name: "style",
        usage: "Used to apply styling to the WebView.",
        example: "<WebView style={{ flex: 1 }} />",
      },
      {
        name: "onLoad",
        usage: "Callback when the content loads.",
        example: "<WebView onLoad={() => console.log('Loaded')} />",
      },
    ],
  },
  {
    name: "RefreshControl",
    description: "Adds pull-to-refresh functionality to scrollable components.",
    properties: [
      {
        name: "refreshing",
        usage: "Indicates if the view is currently refreshing.",
        example: "<RefreshControl refreshing={true} />",
      },
      {
        name: "onRefresh",
        usage: "Callback to trigger when the view is refreshed.",
        example:
          "<RefreshControl onRefresh={() => console.log('Refreshed')} />",
      },
    ],
  },
  {
    name: "StatusBar",
    description:
      "Allows you to control the appearance of the app's status bar.",
    properties: [
      {
        name: "barStyle",
        usage:
          "Defines the color style of the status bar ('default', 'light-content', 'dark-content').",
        example: "<StatusBar barStyle='dark-content' />",
      },
      {
        name: "hidden",
        usage: "Hides the status bar when true.",
        example: "<StatusBar hidden={true} />",
      },
      {
        name: "backgroundColor",
        usage: "Sets the background color of the status bar (Android only).",
        example: "<StatusBar backgroundColor='blue' />",
      },
    ],
  },
  {
    name: "ImageBackground",
    description: "Displays an image as the background of a view.",
    properties: [
      {
        name: "source",
        usage: "Specifies the background image.",
        example:
          "<ImageBackground source={{ uri: 'https://example.com/image.png' }} />",
      },
      {
        name: "style",
        usage: "Used to style the background and its children.",
        example: "<ImageBackground style={{ flex: 1 }} />",
      },
    ],
  },
  {
    name: "TouchableHighlight",
    description:
      "A wrapper for making views respond properly to touches with a highlight effect.",
    properties: [
      {
        name: "onPress",
        usage: "Callback for handling touch events.",
        example: "<TouchableHighlight onPress={() => alert('Pressed!')} />",
      },
      {
        name: "underlayColor",
        usage: "Color shown when the touch is active.",
        example: "<TouchableHighlight underlayColor='gray' />",
      },
    ],
  },
  {
    name: "TouchableWithoutFeedback",
    description:
      "A wrapper that captures touch events without providing any visual feedback.",
    properties: [
      {
        name: "onPress",
        usage: "Callback for handling touch events.",
        example:
          "<TouchableWithoutFeedback onPress={() => alert('Pressed!')} />",
      },
    ],
  },
  {
    name: "MaskedView",
    description:
      "Renders children only where the mask view is non-transparent (iOS only).",
    properties: [
      {
        name: "maskElement",
        usage: "Defines the masking element.",
        example:
          "<MaskedView maskElement={<Text style={{ fontSize: 40 }}>MASK</Text>} />",
      },
    ],
  },
  {
    name: "DrawerLayoutAndroid",
    description: "Component for rendering a navigation drawer on Android.",
    properties: [
      {
        name: "drawerWidth",
        usage: "Specifies the width of the drawer.",
        example: "<DrawerLayoutAndroid drawerWidth={300} />",
      },
      {
        name: "renderNavigationView",
        usage: "Function that renders the content of the drawer.",
        example:
          "<DrawerLayoutAndroid renderNavigationView={() => <View><Text>Menu</Text></View>} />",
      },
    ],
  },
  {
    name: "InputAccessoryView",
    description:
      "Provides an input accessory for custom keyboard controls (iOS only).",
    properties: [
      {
        name: "nativeID",
        usage: "Links the accessory view to an input field.",
        example: "<InputAccessoryView nativeID='inputID' />",
      },
    ],
  },
  {
    name: "ProgressBarAndroid",
    description:
      "A component that shows a circular progress indicator (Android only).",
    properties: [
      {
        name: "styleAttr",
        usage:
          "Sets the style of the progress bar ('Horizontal', 'Small', 'Large').",
        example: "<ProgressBarAndroid styleAttr='Horizontal' />",
      },
      {
        name: "indeterminate",
        usage: "Defines if the progress is indeterminate.",
        example: "<ProgressBarAndroid indeterminate={true} />",
      },
    ],
  },
  {
    name: "ProgressViewIOS",
    description: "A component that shows a progress bar (iOS only).",
    properties: [
      {
        name: "progress",
        usage: "Defines the progress value (0 to 1).",
        example: "<ProgressViewIOS progress={0.5} />",
      },
    ],
  },
  {
    name: "SegmentedControlIOS",
    description: "A component for rendering a segmented control (iOS only).",
    properties: [
      {
        name: "values",
        usage: "An array of segment labels.",
        example: "<SegmentedControlIOS values={['One', 'Two']} />",
      },
      {
        name: "selectedIndex",
        usage: "The index of the currently selected segment.",
        example: "<SegmentedControlIOS selectedIndex={1} />",
      },
    ],
  },
  {
    name: "Systrace",
    description:
      "A utility for performance profiling, useful for debugging (requires linking).",
    properties: [],
  },
  {
    name: "Clipboard",
    description:
      "Provides access to the clipboard for copy and paste functionality.",
    properties: [
      {
        name: "getString",
        usage: "Retrieves text from the clipboard.",
        example: "Clipboard.getString().then(text => console.log(text));",
      },
      {
        name: "setString",
        usage: "Sets text to the clipboard.",
        example: "Clipboard.setString('Hello World');",
      },
    ],
  },
  {
    name: "ActionSheetIOS",
    description: "Displays an action sheet dialog (iOS only).",
    properties: [
      {
        name: "showActionSheetWithOptions",
        usage: "Displays the action sheet with specified options.",
        example:
          "ActionSheetIOS.showActionSheetWithOptions({ options: ['Cancel', 'Delete'] }, buttonIndex => console.log(buttonIndex));",
      },
    ],
  },
  {
    name: "Animated.View",
    description: "An animated version of the View component.",
    properties: [
      {
        name: "style",
        usage: "Defines the animated styles for the view.",
        example:
          "<Animated.View style={{ transform: [{ translateY: animatedValue }] }} />",
      },
    ],
  },
  {
    name: "Animated.Text",
    description: "An animated version of the Text component.",
    properties: [
      {
        name: "style",
        usage: "Defines the animated styles for the text.",
        example:
          "<Animated.Text style={{ opacity: fadeAnim }}>Hello</Animated.Text>",
      },
    ],
  },
];

const osInfo = `${Platform.OS} ${Platform.Version}`;

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderComponentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedComponent(item)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.osInfo}>You are using a {osInfo}</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={componentsList}
          renderItem={renderComponentItem}
          keyExtractor={(item) => item.name}
        />
      </View>
      <View style={styles.detailContainer}>
        {selectedComponent ? (
          <ScrollView>
            <Text style={styles.detailTitle}>{selectedComponent.name}</Text>
            <Text style={styles.detailDescription}>
              {selectedComponent.description}
            </Text>
            <Text style={styles.detailPropertiesTitle}>Properties:</Text>
            {selectedComponent.properties.map((property, index) => (
              <View key={index} style={styles.detailProperty}>
                <Text style={styles.propertyName}>{property.name}</Text>
                <Text style={styles.propertyUsage}>{property.usage}</Text>
                <Text style={styles.propertyExample}>{property.example}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.detailPlaceholder}>
            Select a component to see details
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  osInfo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  detailContainer: {
    flex: 2,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#e0e0e0",
  },
  itemText: {
    fontSize: 18,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detailDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  detailPropertiesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  detailProperty: {
    marginVertical: 5,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  propertyUsage: {
    fontSize: 14,
    fontStyle: "italic",
  },
  propertyExample: {
    fontSize: 14,
    color: "#555",
  },
  detailPlaceholder: {
    fontSize: 18,
    color: "#888",
  },
});

export default App;
