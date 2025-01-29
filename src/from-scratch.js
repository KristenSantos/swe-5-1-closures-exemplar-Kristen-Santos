// A factory function that generates unique IDs starting at 1
const makeIdFunc = () => {
  // Use a private variable to track the unique ID
  let uniqueId = 0;

  // Return an inner function (closure) that increments and returns the ID
  return () => {
    uniqueId += 1;
    return uniqueId;
  };
};

/*
  Best Practices:
  - Use closures to encapsulate and protect the `uniqueId` variable. 
    It is not accessible from outside the function, ensuring its value can't be modified unintentionally.
*/

// A function that calculates the sum of multiples of a given factor
const sumOfMultiples = (arr, factor) => {
  // Return null if the factor is 0, as dividing by zero is undefined
  if (factor === 0) return null;

  // This is the "inner function" and factor is the variable in the closure
  const reduceCallback = (sum, num) => {
    // If num is a multiple of factor, add it to sum and return 
    // Otherwise, return the current sum
    return num % factor === 0 ? sum + num : sum;
  }

  // Use reduce to calculate the sum of multiples
  return arr.reduce(reduceCallback, 0); // Start the sum at 0
};

/*
  How is this closure?
  - When we invoke .reduce(), we will temporarily leave the scope of sumOfMultiples
  go into the scope of .reduce(). The, reduceCallback function forms a closure around 
  the factor parameter. Even though we are in `reduce`, the callback maintains its
  reference to factor

  Best Practices:
  - Handle edge cases early, such as `factor === 0`, to avoid unnecessary errors.
  - Use `reduce` for concise and functional style code instead of a loop, ensuring immutability.
  - Keep logic concise with a ternary operator to handle summing only when the condition is met.
*/

// A factory function to manage a private list of friends
const makeFriendList = () => {
  // Encapsulate the private `friendsList` array
  const friendsList = [];

  // Return an object with methods to manipulate and access the friends list
  return {
    // Add a new friend to the list
    addFriend(name) {
      friendsList.push(name);
      console.log(`${name} successfully added!`);
      return friendsList.length; // Return the new length of the list
    },

    // Remove a friend by name
    removeFriend(name) {
      const index = friendsList.indexOf(name);
      if (index !== -1) {
        friendsList.splice(index, 1);
        console.log(`${name} successfully removed.`);
        return name; // Return the removed friend's name
      } else {
        console.log(`${name} not found.`);
        return undefined; // Return undefined if the friend was not found
      }
    },

    // Get a copy of the friends list to prevent external mutation
    getFriends() {
      return [...friendsList];
    },

    // Display the friends list in a formatted string
    displayFriends() {
      if (friendsList.length === 0) {
        console.log("You have not added any friends.");
      } else if (friendsList.length === 1) {
        console.log(`${friendsList[0]} is your friend.`);
      } else if (friendsList.length === 2) {
        console.log(`${friendsList[0]} and ${friendsList[1]} are your friends.`);
      } else {
        // Join all but the last friend with commas
        const friendsWithCommas = friendsList.slice(0, -1).join(", ");
        // Add the last friend with ", and " and the rest of the sentence.
        const lastFriend = friendsList[friendsList.length - 1];
        console.log(`${friendsWithCommas}, and ${lastFriend} are your friends.`);
      }
    },
  };
};

/*
  Best Practices:
  - Use closures to encapsulate the `friendsList` array, ensuring it is private and not directly accessible.
  - Use `slice(0, -1)` and `.join()` to generate formatted output for multiple friends with proper grammar (including the Oxford comma).
  - Return copies of arrays (e.g., in `getFriends`) to prevent external mutation of internal state.
  - Handle edge cases in `displayFriends` for different numbers of friends (0, 1, 2 ...).
*/

module.exports = {
  makeIdFunc,
  makeFriendList,
  sumOfMultiples,
};
