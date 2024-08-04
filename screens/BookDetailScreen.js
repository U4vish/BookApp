import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const BookDetailScreen = ({ route }) => {
  const { title, author, publishYear } = route.params;
  const [borrowedBooksCount, setBorrowedBooksCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to fetch borrowed books count
  const fetchBorrowedBooksCount = async () => {
    try {
      const q = query(collection(firestore, "borrowedBooks"), where("user", "==", "user1"));
      const querySnapshot = await getDocs(q);
      setBorrowedBooksCount(querySnapshot.size);
    } catch (error) {
      console.error("Error fetching borrowed books count: ", error);
      Alert.alert("Error fetching borrowed books count.");
    }
  };

  // Fetch the borrowed books count on initial render
  useEffect(() => {
    fetchBorrowedBooksCount();
    setLoading(false);
  }, []);

  const handleBorrow = async () => {
    if (borrowedBooksCount >= 3) {
      Alert.alert("You can't borrow more than 3 books at a time.");
      return;
    }

    try {
      await addDoc(collection(firestore, "borrowedBooks"), {
        title,
        author,
        publishYear,
        user: "user1",
      });
      Alert.alert("Book borrowed successfully!");
      // Refresh the borrowed books count after borrowing a book
      fetchBorrowedBooksCount();
    } catch (error) {
      console.error("Error borrowing book: ", error);
      Alert.alert("Error borrowing book.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text>Title: {title || 'No Title Available'}</Text>
      <Text>Author: {author || 'Unknown'}</Text>
      <Text>Publish Year: {publishYear || 'Unknown'}</Text>
      <Button title="Borrow" onPress={handleBorrow} />
    </View>
  );
};

export default BookDetailScreen;







