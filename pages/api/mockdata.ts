const data = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
};

export default (req, res) => {
  res.status(200).json(data);
};
