import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const BookListScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://openlibrary.org/search.json?q=javascript&fields=key,title,author_name,first_publish_year')
      .then(response => {
        // Check if response contains the expected data
        if (response.data && response.data.docs) {
          setBooks(response.data.docs);
        } else {
          setError('No books found.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch books.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.title}>{item.title || 'No Title Available'}</Text>
            <Text style={styles.author}>Author: {item.author_name ? item.author_name.join(', ') : 'Unknown'}</Text>
            <Text style={styles.publishYear}>Publish Year: {item.first_publish_year || 'Unknown'}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('BookDetail', {
                bookId: item.key,
                title: item.title,
                author: item.author_name ? item.author_name.join(', ') : 'Unknown',
                publishYear: item.first_publish_year
              })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bookItem: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
  },
  publishYear: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default BookListScreen;


