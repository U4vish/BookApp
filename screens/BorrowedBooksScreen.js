import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

const BorrowedBooksScreen = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Function to listen for real-time updates
    const unsubscribe = onSnapshot(
      query(collection(firestore, "borrowedBooks"), where("user", "==", "user1")),
      (querySnapshot) => {
        const books = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBorrowedBooks(books);
      },
      (error) => {
        console.error("Error fetching borrowed books: ", error);
        Alert.alert("Error fetching borrowed books.");
      }
    );

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleReturnBook = async (bookId) => {
    try {
      await deleteDoc(doc(firestore, "borrowedBooks", bookId));
      Alert.alert("Book returned successfully!");
    } catch (error) {
      console.error("Error returning book: ", error);
      Alert.alert("Error returning book.");
    }
  };

  return (
    <View>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Title: {item.title || 'No Title Available'}</Text>
            <Button title="Return" onPress={() => handleReturnBook(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default BorrowedBooksScreen;





