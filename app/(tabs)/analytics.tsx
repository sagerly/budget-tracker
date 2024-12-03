import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Analytics</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});