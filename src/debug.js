// Oops! This factory function exposes the students array.
// Can you make it private using closure?

const createCourse = (topic, instructor) => {
  // Private array to store student names, encapsulated via closure
  const students = [];
  return {
    topic,
    instructor,
    addStudent(name) {
     students.push(name);
    },
    removeStudent(name) {
      students.splice(students.indexOf(name), 1);
    },
    getStudents() {
      // Return a shallow copy to maintain encapsulation
      return [...students]
    }
  }
}

module.exports = {
  createCourse,
};
